import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";
import { modules } from "@/data/modules";
import { moduleDefinitions } from "@/data/moduleDefinitions";
import { conceptPages } from "@/data/conceptPages";
import { unitContent, lessonMappings, getUnitIds } from "@/data/content/registry";
import { searchIndex } from "@/data/searchIndex";
import { TOPIC_TO_UNIT } from "@/data/topicUnits";

/**
 * Guards the links between lessons, topics, study guides, search and the sitemap, so a renamed
 * slug or a deleted card can't leave a dead link behind.
 */

const lessonSlugs = new Set(modules.map((m) => m.slug));
const conceptSlugs = new Set(Object.values(conceptPages).map((p) => p.slug));
const unitIds = new Set(getUnitIds());
const topicSlugs = new Set(Object.keys(TOPIC_TO_UNIT));
const LESSON_TABS = new Set(["intro", "experience", "trace", "explain"]);

/** Ids a study guide renders as anchors (see ConceptCardGrid, PathwaySection, DistinctionSection, CaseNoteSection). */
function unitAnchors(unitId: string) {
  const unit = unitContent[unitId];
  return new Set([
    ...unit.conceptCards.map((c) => `concept-${c.id}`),
    ...unit.pathways.map((p) => `pathway-${p.id}`),
    ...unit.distinctions.map((d) => `distinction-${d.id}`),
    ...unit.caseNotes.map((n) => `case-${n.id}`),
  ]);
}

/** Returns why a site URL would not resolve, or null if it would. */
function brokenReason(url: string): string | null {
  const [path, hash] = url.split("#");
  const parts = path.split("/").filter(Boolean);
  if (path === "/" || ["/topics", "/about", "/course-map", "/how-your-brain-predicts"].includes(path)) return null;
  if (parts[0] === "topics" && parts.length === 2) return topicSlugs.has(parts[1]) ? null : "unknown topic";
  if (parts[0] === "how-your-brain-predicts" && parts.length === 2) return conceptSlugs.has(parts[1]) ? null : "unknown concept page";
  if (parts[0] === "module" && parts.length === 2) {
    if (!lessonSlugs.has(parts[1])) return "unknown lesson";
    if (!hash || LESSON_TABS.has(hash) || hash === "prediction-lens") return null;
    const deeper = moduleDefinitions[parts[1]]?.goDeeper ?? [];
    return deeper.some((card) => `deeper-${card.id}` === hash) ? null : `no Go Deeper card #${hash}`;
  }
  if (parts[0] === "unit" && parts.length === 2) {
    if (!unitIds.has(parts[1])) return "unknown study guide";
    return !hash || unitAnchors(parts[1]).has(hash) ? null : `no study-guide item #${hash}`;
  }
  return "unknown route";
}

describe("lessons and topics", () => {
  it("has 12 lessons with unique ids and slugs", () => {
    expect(modules).toHaveLength(12);
    expect(new Set(modules.map((m) => m.id)).size).toBe(12);
    expect(lessonSlugs.size).toBe(12);
  });

  it("files every lesson under exactly one study guide, and every guide has lessons", () => {
    for (const m of modules) {
      const mappings = lessonMappings.filter((l) => l.moduleId === m.id);
      expect(mappings, m.slug).toHaveLength(1);
      expect(unitIds.has(mappings[0].unitId), m.slug).toBe(true);
      expect(mappings[0].title, m.slug).toBe(m.title);
    }
    for (const unitId of unitIds) {
      expect(lessonMappings.some((l) => l.unitId === unitId), unitId).toBe(true);
    }
  });

  it("links each of the five topics to a study guide", () => {
    expect(topicSlugs.size).toBe(5);
    for (const unitId of Object.values(TOPIC_TO_UNIT)) expect(unitIds.has(unitId), unitId).toBe(true);
    expect(new Set(Object.values(TOPIC_TO_UNIT)).size).toBe(5);
  });
});

describe("study guides", () => {
  it("gives every item a unique anchor within its guide", () => {
    for (const unitId of unitIds) {
      const unit = unitContent[unitId];
      const ids = [...unit.conceptCards, ...unit.pathways, ...unit.distinctions, ...unit.caseNotes].map((x) => x.id);
      expect(new Set(ids).size, unitId).toBe(ids.length);
    }
  });
});

describe("search", () => {
  it("has unique result ids", () => {
    expect(new Set(searchIndex.map((i) => i.id)).size).toBe(searchIndex.length);
  });

  it("only links to pages and anchors that exist", () => {
    const broken = searchIndex
      .map((item) => ({ url: item.url, reason: brokenReason(item.url) }))
      .filter((r) => r.reason);
    expect(broken).toEqual([]);
  });

  it("indexes every lesson and every study guide", () => {
    for (const slug of lessonSlugs) expect(searchIndex.some((i) => i.url === `/module/${slug}`), slug).toBe(true);
    for (const unitId of unitIds) expect(searchIndex.some((i) => i.url === `/unit/${unitId}`), unitId).toBe(true);
  });
});

describe("sitemap.xml", () => {
  const xml = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
  const paths = [...xml.matchAll(/<loc>https:\/\/learnbraintrace\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");

  it("lists only pages that exist", () => {
    expect(paths.filter((p) => brokenReason(p))).toEqual([]);
  });

  it("lists every lesson, topic, study guide and concept page", () => {
    const listed = new Set(paths);
    const expected = [
      ...[...lessonSlugs].map((s) => `/module/${s}`),
      ...[...topicSlugs].map((s) => `/topics/${s}`),
      ...[...unitIds].map((u) => `/unit/${u}`),
      ...[...conceptSlugs].map((s) => `/how-your-brain-predicts/${s}`),
    ];
    expect(expected.filter((p) => !listed.has(p))).toEqual([]);
  });
});
