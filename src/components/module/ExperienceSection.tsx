import type { Module } from "@/data/modules";
import BlurryObjectDemo from "@/components/module/demos/BlurryObjectDemo";
import FaceOrNotDemo from "@/components/module/demos/FaceOrNotDemo";
import SuddenNoiseDemo from "@/components/module/demos/SuddenNoiseDemo";
import FearCueDemo from "@/components/module/demos/FearCueDemo";
import MemoryUnderLoadDemo from "@/components/module/demos/MemoryUnderLoadDemo";

interface ExperienceSectionProps {
  module: Module;
}

const demos: Record<string, React.ComponentType> = {
  "mod-1": BlurryObjectDemo,
  "mod-2": FaceOrNotDemo,
  "mod-3": SuddenNoiseDemo,
  "mod-4": FearCueDemo,
  "mod-5": MemoryUnderLoadDemo,
};

const ExperienceSection = ({ module }: ExperienceSectionProps) => {
  const Demo = demos[module.id];

  if (!Demo) {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No demo available for this module.</p>
        </div>
      </section>
    );
  }

  return <Demo />;
};

export default ExperienceSection;
