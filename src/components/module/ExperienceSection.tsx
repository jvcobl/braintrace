import type { DemoType } from "@/data/modules";

interface ExperienceSectionProps {
  demoType: DemoType;
  moduleTitle: string;
}

const demoLabels: Record<DemoType, string> = {
  interactive: "Interactive Demo",
  observation: "Observation Task",
  recall: "Recall Task",
  response: "Response Task",
};

const ExperienceSection = ({ demoType, moduleTitle }: ExperienceSectionProps) => (
  <section>
    <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
    <div className="mt-4 flex min-h-[240px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-8 text-center">
      <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
        {demoLabels[demoType]}
      </span>
      <p className="text-muted-foreground">
        The {moduleTitle.toLowerCase()} demo will appear here.
      </p>
    </div>
  </section>
);

export default ExperienceSection;
