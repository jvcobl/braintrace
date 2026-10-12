import { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getModuleById, modules } from "@/data/modules";
import { moduleDefinitions } from "@/data/moduleDefinitions";
import { getUnitById } from "@/data/courseMap";
import { getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SectionNav, { type SectionId } from "@/components/module/SectionNav";
import IntroSection from "@/components/module/IntroSection";
import ExperienceSection from "@/components/module/ExperienceSection";
import TracePanel from "@/components/module/TracePanel";
import TracePathwaySVG from "@/components/module/TracePathwaySVG";
import ExplainSection from "@/components/module/ExplainSection";
import { scrollBehavior } from "@/lib/utils";
import { usePageMeta } from "@/hooks/use-page-meta";

const MODULE_TOPIC: Record<string, { slug: string; title: string }> = {
  "blurry-object-guess": { slug: "perception", title: "Perception and Object Recognition" },
  "face-or-not": { slug: "perception", title: "Perception and Object Recognition" },
  "multistable-perception-gallery": { slug: "perception", title: "Perception and Object Recognition" },
  "memory-under-load": { slug: "attention", title: "Attention, Cognitive Load, and the PFC" },
  "pfc-role-matcher": { slug: "attention", title: "Attention, Cognitive Load, and the PFC" },
  "sudden-noise-reaction": { slug: "emotion", title: "Emotion, Limbic System, and Amygdala" },
  "emotion-vs-arousal-sorter": { slug: "emotion", title: "Emotion, Limbic System, and Amygdala" },
  "fear-vs-anxiety-sorter": { slug: "emotion", title: "Emotion, Limbic System, and Amygdala" },
  "fear-cue-and-extinction": { slug: "learning", title: "Learning and Fear Conditioning" },
  "classical-vs-operant-sorter": { slug: "learning", title: "Learning and Fear Conditioning" },
  "stress-response-builder": { slug: "stress", title: "Stress and Homeostasis" },
  "homeostasis-vs-allostasis-sorter": { slug: "stress", title: "Stress and Homeostasis" },
};

/** The four tab containers; a hash naming one of them opens that tab without a highlight flash. */
const TAB_IDS = ["intro", "experience", "trace", "explain"];

function sectionFromHash(hash: string): SectionId {
  if (hash === "trace") return "Trace";
  if (hash === "experience") return "Experience";
  if (hash === "explain" || hash.startsWith("deeper-") || hash === "prediction-lens" || hash === "concept-links") return "Explain";
  return "Intro";
}

const ModulePageContent = () => {
  const { id } = useParams<{ id: string }>();
  const mod = id ? getModuleById(id) : undefined;
  usePageMeta(
    mod
      ? { title: mod.title, description: mod.shortGoal, canonicalPath: `/module/${mod.slug}` }
      : { title: "Page not found", noindex: true },
  );
  const unit = mod ? getUnitById(mod.unitId) : undefined;
  const unitContent = mod ? getUnitContent(mod.unitId) : undefined;
  const location = useLocation();
  const sectionNavRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<SectionId>(() => sectionFromHash(window.location.hash.slice(1)));

  // Open the tab a hash points to and scroll to its target: on first load and whenever
  // an in-app link (such as a search result) navigates here with a hash.
  useEffect(() => {
    const target = location.hash.slice(1);
    if (!target) return;
    setSection(sectionFromHash(target));
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: scrollBehavior() });
      // Flash specific targets (a Go Deeper card, the Prediction Lens), not whole tabs.
      if (!TAB_IDS.includes(target)) {
        el.classList.add("search-highlight");
        setTimeout(() => el.classList.remove("search-highlight"), 1500);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash, location.key]);

  const handleSection = (s: SectionId) => {
    setSection(s);
    // Keep the open tab in the URL so refresh, sharing and Back return to it. Uses
    // replaceState (keeping the router's state) so it doesn't add history entries.
    const url = s === "Intro" ? window.location.pathname : `${window.location.pathname}#${s.toLowerCase()}`;
    window.history.replaceState(window.history.state, "", url);
    // Bring the top of the new tab into view if the reader has scrolled past it.
    const navTop = (sectionNavRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 72;
    if (window.scrollY > navTop) window.scrollTo({ top: navTop, behavior: scrollBehavior() });
  };

  if (!mod) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground">Lesson Not Found</h1>
        <p className="mt-4 text-[14px] sm:text-[15px] text-muted-foreground">
          The lesson you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const siblingLessons = getLessonsByUnit(mod.unitId)
    .filter((l) => l.moduleId !== mod.id)
    .map((l) => {
      const m = modules.find((x) => x.id === l.moduleId);
      return m ? { id: m.id, slug: m.slug, title: m.title } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  return (
    <div className="container max-w-3xl px-4 sm:px-6 py-10 md:py-16">
      <Breadcrumb />

      {/* Header */}
      <div>
        {MODULE_TOPIC[mod.slug] && (
          <Link
            to={`/topics/${MODULE_TOPIC[mod.slug].slug}`}
            className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
          >
            {MODULE_TOPIC[mod.slug].title}
          </Link>
        )}
        <h1 className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-foreground md:text-[2rem]">
          {mod.title}
        </h1>
        <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">{mod.shortGoal}</p>
      </div>

      {/* Section nav + content */}
      <div ref={sectionNavRef} className="mt-8 sm:mt-10">
        <SectionNav current={section} onSelect={handleSection} />

        <div className="mt-6 sm:mt-8">
          {section === "Intro" && <div id="intro"><IntroSection module={mod} onAdvance={handleSection} /></div>}
          {section === "Experience" && <div id="experience"><ExperienceSection module={mod} onNavigate={handleSection} /></div>}
          {section === "Trace" && <div id="trace">{(() => {
            const modDef = moduleDefinitions[mod.slug];
            return modDef?.tracePathway
              ? <TracePathwaySVG pathway={modDef.tracePathway} onAdvanceToExplain={() => handleSection("Explain")} />
              : <TracePanel nodes={mod.traceNodes} />;
          })()}</div>}
          {section === "Explain" && <div id="explain">{(() => {
            const modDef = moduleDefinitions[mod.slug];
            return (
              <ExplainSection
                explain={mod.explain}
                predictionLens={modDef?.predictionLens}
                goDeeper={modDef?.goDeeper}
                conceptLinks={modDef?.conceptLinks}
                traceBridge={modDef?.traceBridge}
                topicLink={MODULE_TOPIC[mod.slug] ? { to: `/topics/${MODULE_TOPIC[mod.slug].slug}`, label: MODULE_TOPIC[mod.slug].title } : undefined}
              />
            );
          })()}</div>}
        </div>
      </div>

      {/* Sibling lessons */}
      {siblingLessons.length > 0 && (
        <div className="mt-12 sm:mt-14 border-t border-border pt-6 sm:pt-8">
          <h2 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            More in this topic
          </h2>
          <ul className="mt-3 sm:mt-4 space-y-2">
            {siblingLessons.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/module/${s.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  <span className="text-xs text-muted-foreground/50" aria-hidden="true">→</span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Remount per lesson so the active tab and demo state never carry over
 * when moving between lessons on the same /module/:id route.
 */
const ModulePage = () => {
  const { id } = useParams<{ id: string }>();
  return <ModulePageContent key={id} />;
};

export default ModulePage;
