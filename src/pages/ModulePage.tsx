import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getModuleById } from "@/data/modules";
import { getUnitById } from "@/data/courseMap";
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

  return (
    <div className="container max-w-3xl py-12">
      <Link
        to="/"
        className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
      >
        ← Back to home
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
    </div>
  );
};

export default ModulePage;
