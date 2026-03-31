import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getModuleById, modules } from "@/data/modules";
import { getUnitById } from "@/data/courseMap";
import { getLessonsByUnit } from "@/data/content/registry";
import SectionNav, { type SectionId } from "@/components/module/SectionNav";
import IntroSection from "@/components/module/IntroSection";
import ExperienceSection from "@/components/module/ExperienceSection";
import TracePanel from "@/components/module/TracePanel";
import ExplainSection from "@/components/module/ExplainSection";

const ModulePage = () => {
  const { id } = useParams<{ id: string }>();
  const mod = id ? getModuleById(id) : undefined;
  const unit = mod ? getUnitById(mod.unitId) : undefined;
  const [section, setSection] = useState<SectionId>("Intro");

  if (!mod) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">Module Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          The module you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Sibling lessons in the same unit (excluding self)
  const siblingLessons = getLessonsByUnit(mod.unitId)
    .filter((l) => l.moduleId !== mod.id)
    .map((l) => {
      const m = modules.find((x) => x.id === l.moduleId);
      return m ? { id: m.id, title: m.title } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  return (
    <div className="container max-w-3xl py-12">
      <Link
        to={`/unit/${mod.unitId}`}
        className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
      >
        ← Back to unit
      </Link>

      <div className="mt-6 mb-2">
        <Link
          to={`/unit/${mod.unitId}`}
          className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
        >
          {unit ? unit.title : mod.unitId.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </Link>
        <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{mod.title}</h1>
        <p className="mt-2 text-muted-foreground">{mod.shortGoal}</p>
      </div>

      <div className="mt-8">
        <SectionNav current={section} onSelect={setSection} />

        {section === "Intro" && <IntroSection module={mod} />}
        {section === "Experience" && <ExperienceSection module={mod} />}
        {section === "Trace" && <TracePanel nodes={mod.traceNodes} />}
        {section === "Explain" && <ExplainSection explain={mod.explain} />}
      </div>

      {/* Related lessons in this unit */}
      {siblingLessons.length > 0 && (
        <div className="mt-12 border-t border-border pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            More in this unit
          </h2>
          <ul className="mt-3 space-y-1.5">
            {siblingLessons.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/module/${s.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                >
                  <span className="text-xs text-muted-foreground" aria-hidden="true">→</span>
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
