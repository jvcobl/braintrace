import type { Module } from "@/data/modules";
import BlurryObjectDemo from "@/components/module/demos/BlurryObjectDemo";
import FaceOrNotDemo from "@/components/module/demos/FaceOrNotDemo";
import SuddenNoiseDemo from "@/components/module/demos/SuddenNoiseDemo";
import FearCueDemo from "@/components/module/demos/FearCueDemo";
import MemoryUnderLoadDemo from "@/components/module/demos/MemoryUnderLoadDemo";

interface ExperienceSectionProps {
  module: Module;
}

const ExperienceSection = ({ module }: ExperienceSectionProps) => {
  if (module.id === "mod-1") return <BlurryObjectDemo />;
  if (module.id === "mod-2") return <FaceOrNotDemo />;
  if (module.id === "mod-3") return <SuddenNoiseDemo />;
  if (module.id === "mod-4") return <FearCueDemo />;
  if (module.id === "mod-5") return <MemoryUnderLoadDemo />;

  const demoLabels: Record<string, string> = {
    interactive: "Interactive Demo",
    observation: "Observation Task",
    recall: "Recall Task",
    response: "Response Task",
  };

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <div className="mt-4 flex min-h-[240px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-8 text-center">
        <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {demoLabels[module.demoType] ?? "Demo"}
        </span>
        <p className="text-muted-foreground">
          The {module.title.toLowerCase()} demo will appear here.
        </p>
      </div>
    </section>
  );
};

export default ExperienceSection;
