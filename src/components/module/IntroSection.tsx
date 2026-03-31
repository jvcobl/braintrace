import type { Module } from "@/data/modules";

interface IntroSectionProps {
  module: Module;
}

const IntroSection = ({ module }: IntroSectionProps) => (
  <section>
    <h2 className="font-display text-2xl font-semibold text-foreground">Introduction</h2>
    <p className="mt-3 text-muted-foreground leading-relaxed">{module.introCopy}</p>
    <div className="mt-6 rounded-lg border border-border bg-accent/40 p-4">
      <p className="text-sm font-medium text-accent-foreground">Learning Objective</p>
      <p className="mt-1 text-sm text-muted-foreground">{module.learningObjective}</p>
    </div>
  </section>
);

export default IntroSection;
