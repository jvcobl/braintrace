import { modules } from "./modules";
import { moduleDefinitions } from "./moduleDefinitions";
import { conceptPages } from "./conceptPages";
import { brainStructures } from "./brainStructures";
import { unitContent } from "./content/registry";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: "module" | "concept" | "structure" | "deeper" | "guide";
  url: string;
  keywords: string[];
}

// Build structure → module mapping from tracePathway nodes
const structureToModule = new Map<string, string>();
for (const [slug, def] of Object.entries(moduleDefinitions)) {
  for (const node of def.tracePathway.nodes) {
    if (!structureToModule.has(node.structureId)) {
      structureToModule.set(node.structureId, slug);
    }
  }
  if (def.tracePathway.alternateState) {
    for (const node of def.tracePathway.alternateState.nodes) {
      if (!structureToModule.has(node.structureId)) {
        structureToModule.set(node.structureId, slug);
      }
    }
  }
}

const items: SearchItem[] = [];

// Modules + Go Deeper cards
for (const mod of modules) {
  const def = moduleDefinitions[mod.slug];
  const keywords = [mod.title, mod.slug, mod.shortGoal];
  if (def) {
    keywords.push(def.tagline, def.predictionLens.nbb302Connection);
  }

  items.push({
    id: `mod-${mod.id}`,
    title: mod.title,
    description: def?.tagline ?? mod.shortGoal,
    type: "module",
    url: `/module/${mod.slug}`,
    keywords,
  });

  if (def?.goDeeper) {
    for (const card of def.goDeeper) {
      items.push({
        id: `deeper-${card.id}`,
        title: card.title,
        description: card.explanation.slice(0, 100),
        type: "deeper",
        url: `/module/${mod.slug}#deeper-${card.id}`,
        keywords: [card.title, card.explanation.slice(0, 200), ...card.keyStructures],
      });
    }
  }
}

// Concept pages
for (const page of Object.values(conceptPages)) {
  items.push({
    id: `concept-${page.id}`,
    title: page.title,
    description: page.description,
    type: "concept",
    url: `/how-your-brain-predicts/${page.slug}`,
    keywords: [page.title, page.description],
  });
}

// Brain structures
for (const struct of Object.values(brainStructures)) {
  const moduleSlug = structureToModule.get(struct.id);
  const url = moduleSlug
    ? `/module/${moduleSlug}#trace`
    : `/unit/unit-${struct.nbb302Unit}`;

  items.push({
    id: `struct-${struct.id}`,
    title: struct.name,
    description: struct.shortDescription,
    type: "structure",
    url,
    keywords: [struct.name, struct.id, struct.shortDescription],
  });
}

// Study guides: the guide itself, then its concepts, pathways, distinctions and case notes.
// Listed last, so lessons and structures come first when a search matches both.
for (const [unitId, unit] of Object.entries(unitContent)) {
  const base = `/unit/${unitId}`;
  const where = `${unit.meta.title} study guide`;
  items.push({
    id: `guide-${unitId}`,
    title: `${unit.meta.title}: Study Guide`,
    description: unit.meta.subtitle,
    type: "guide",
    url: base,
    keywords: [unit.meta.title, unit.meta.subtitle, ...unit.meta.majorStructures, ...unit.meta.lectureTopics],
  });
  for (const card of unit.conceptCards) {
    items.push({
      id: `guide-concept-${card.id}`,
      title: card.term,
      description: `Key concept · ${where}`,
      type: "guide",
      url: `${base}#concept-${card.id}`,
      keywords: [card.term, ...card.structures, card.definition],
    });
  }
  for (const pathway of unit.pathways) {
    items.push({
      id: `guide-pathway-${pathway.id}`,
      title: pathway.title,
      description: `Pathway · ${where}`,
      type: "guide",
      url: `${base}#pathway-${pathway.id}`,
      keywords: [pathway.title, pathway.description, ...pathway.steps.map((s) => s.structure)],
    });
  }
  for (const d of unit.distinctions) {
    items.push({
      id: `guide-distinction-${d.id}`,
      title: `${d.termA} vs. ${d.termB}`,
      description: `Distinction · ${where}`,
      type: "guide",
      url: `${base}#distinction-${d.id}`,
      keywords: [d.termA, d.termB, d.keyDifference],
    });
  }
  for (const note of unit.caseNotes) {
    items.push({
      id: `guide-case-${note.id}`,
      title: note.title,
      description: `Case note · ${where}`,
      type: "guide",
      url: `${base}#case-${note.id}`,
      keywords: [note.title, note.content],
    });
  }
}

export const searchIndex = items;
