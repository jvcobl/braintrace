import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getModuleById, modules } from "@/data/modules";
import { getUnitById } from "@/data/courseMap";
import { getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import SectionNav, { type SectionId } from "@/components/module/SectionNav";
import IntroSection from "@/components/module/IntroSection";
import ExperienceSection from "@/components/module/ExperienceSection";
import TracePanel from "@/components/module/TracePanel";
import ExplainSection from "@/components/module/ExplainSection";

const ModulePage = () => {
  const { id } = useParams<{ id: string }>();
  const mod = id ? getModuleById(id) : undefined;
  const unit = mod ? getUnitById(mod.unitId) : undefined;
  const unitContent = mod ? getUnitContent(mod.unitId) : undefined;
  const [section, setSection] = useState<SectionId>("Intro");

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
      {/* Breadcrumb */}
      <Link
        to={`/unit/${mod.unitId}`}
        className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      >
        <span aria-hidden="true">←</span> {unitTitle}
      </Link>

      {/* Header */}
      <div className="mt-6 sm:mt-7">
        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60">
          {unitTitle}
        </p>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-foreground md:text-[2rem]">
          {mod.title}
        </h1>
        <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">{mod.shortGoal}</p>
      </div>

      {/* Section nav + content */}
      <div className="mt-8 sm:mt-10">
        <SectionNav current={section} onSelect={setSection} />

        <div className="mt-6 sm:mt-8">
          {section === "Intro" && <IntroSection module={mod} />}
          {section === "Experience" && <ExperienceSection module={mod} onNavigate={setSection} />}
          {section === "Trace" && <TracePanel nodes={mod.traceNodes} />}
          {section === "Explain" && <ExplainSection explain={mod.explain} />}
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
