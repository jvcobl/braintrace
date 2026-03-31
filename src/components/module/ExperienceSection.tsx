import type { Module } from "@/data/modules";
import type { SectionId } from "@/components/module/SectionNav";
import BlurryObjectDemo from "@/components/module/demos/BlurryObjectDemo";
import FaceOrNotDemo from "@/components/module/demos/FaceOrNotDemo";
import SuddenNoiseDemo from "@/components/module/demos/SuddenNoiseDemo";
import FearCueDemo from "@/components/module/demos/FearCueDemo";
import MemoryUnderLoadDemo from "@/components/module/demos/MemoryUnderLoadDemo";
import HPAAxisBuilderDemo from "@/components/module/demos/HPAAxisBuilderDemo";
import MultistablePerceptionDemo from "@/components/module/demos/MultistablePerceptionDemo";
import PFCRoleMatcherDemo from "@/components/module/demos/PFCRoleMatcherDemo";
import FearAnxietySorterDemo from "@/components/module/demos/FearAnxietySorterDemo";
import EmotionArousalSorterDemo from "@/components/module/demos/EmotionArousalSorterDemo";
import ClassicalOperantSorterDemo from "@/components/module/demos/ClassicalOperantSorterDemo";
import HomeostasisAllostasisSorterDemo from "@/components/module/demos/HomeostasisAllostasisSorterDemo";

export interface DemoProps {
  onNavigate?: (target: "Trace" | "Explain") => void;
}

interface ExperienceSectionProps {
  module: Module;
  onNavigate?: (section: SectionId) => void;
}

const demos: Record<string, React.ComponentType<DemoProps>> = {
  "mod-1": BlurryObjectDemo,
  "mod-2": FaceOrNotDemo,
  "mod-3": SuddenNoiseDemo,
  "mod-4": FearCueDemo,
  "mod-5": MemoryUnderLoadDemo,
  "mod-6": HPAAxisBuilderDemo,
  "mod-7": MultistablePerceptionDemo,
  "mod-8": PFCRoleMatcherDemo,
  "mod-9": FearAnxietySorterDemo,
  "mod-10": EmotionArousalSorterDemo,
  "mod-11": ClassicalOperantSorterDemo,
  "mod-12": HomeostasisAllostasisSorterDemo,
};

const ExperienceSection = ({ module, onNavigate }: ExperienceSectionProps) => {
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

  return <Demo onNavigate={onNavigate} />;
};

export default ExperienceSection;
