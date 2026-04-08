import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

const ModulePage = () => {
  const { id } = useParams<{ id: string }>();
  const mod = id ? getModuleById(id) : undefined;
  const unit = mod ? getUnitById(mod.unitId) : undefined;
  const unitContent = mod ? getUnitContent(mod.unitId) : undefined;
  const [section, setSection] = useState<SectionId>(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return "Intro";
    if (hash === "trace") return "Trace";
    if (hash === "experience") return "Experience";
    if (hash.startsWith("deeper-") || hash === "prediction-lens" || hash === "concept-links" || hash === "explain") return "Explain";
    return "Intro";
  });

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      el.classList.add("search-highlight");
      setTimeout(() => el.classList.remove("search-highlight"), 1500);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

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
      return m ? { id: m.id, title: m.title } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  const unitTitle = unitContent?.meta.title ?? unit?.title ?? mod.unitId.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="container max-w-3xl px-4 sm:px-6 py-10 md:py-16">
      <Breadcrumb />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60">
            {unitTitle}
          </p>
          {MODULE_TOPIC[mod.slug] && (
            <>
              <span className="text-gray-300 text-[10px]">/</span>
              <Link
                to={`/topics/${MODULE_TOPIC[mod.slug].slug}`}
                className="text-[10px] sm:text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                {MODULE_TOPIC[mod.slug].title}
              </Link>
            </>
          )}
        </div>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-foreground md:text-[2rem]">
          {mod.title}
        </h1>
        <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">{mod.shortGoal}</p>
      </div>

      {/* Section nav + content */}
      <div className="mt-8 sm:mt-10">
        <SectionNav current={section} onSelect={setSection} />

        <div className="mt-6 sm:mt-8">
          {section === "Intro" && <div id="intro"><IntroSection module={mod} /></div>}
          {section === "Experience" && <div id="experience"><ExperienceSection module={mod} onNavigate={setSection} /></div>}
          {section === "Trace" && <div id="trace">{(() => {
            const modDef = moduleDefinitions[mod.slug];
            return modDef?.tracePathway
              ? <TracePathwaySVG pathway={modDef.tracePathway} />
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
              />
            );
          })()}</div>}
        </div>
      </div>

      {/* Sibling lessons */}
      {siblingLessons.length > 0 && (
        <div className="mt-12 sm:mt-14 border-t border-border pt-6 sm:pt-8">
          <h2 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            More in this unit
          </h2>
          <ul className="mt-3 sm:mt-4 space-y-2">
            {siblingLessons.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/module/${s.id}`}
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

export default ModulePage;
