import type { Module } from "@/data/modules";

interface IntroSectionProps {
  module: Module;
}

const IntroSection = ({ module }: IntroSectionProps) => (
  <section>
    <h2 className="font-display text-2xl tracking-tight text-foreground">Introduction</h2>
    <p className="mt-3 text-[15px] text-foreground/70 leading-relaxed italic">{module.hook}</p>
    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{module.introCopy}</p>
    <div className="mt-6 rounded-xl border border-border bg-accent/30 px-5 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent-foreground">
        Learning Objective
      </p>
      <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{module.learningObjective}</p>
    </div>
  </section>
);

export default IntroSection;
