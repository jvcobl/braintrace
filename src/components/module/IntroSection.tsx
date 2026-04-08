import type { Module } from "@/data/modules";
import type { SectionId } from "./SectionNav";

interface IntroSectionProps {
  module: Module;
  onAdvance?: (section: SectionId) => void;
}

const IntroSection = ({ module, onAdvance }: IntroSectionProps) => (
  <section>
    <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">Introduction</h2>
    <p className="mt-3 text-[14px] sm:text-[15px] text-foreground/70 leading-relaxed italic">{module.hook}</p>
    <p className="mt-3 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">{module.introCopy}</p>
    <div className="mt-6 rounded-xl border border-border bg-accent/30 px-4 py-3.5 sm:px-5 sm:py-4">
      <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-accent-foreground">
        Learning Objective
      </p>
      <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">{module.learningObjective}</p>
    </div>
    {onAdvance && (
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => onAdvance("Experience")}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Begin Experience
          <span aria-hidden="true">→</span>
        </button>
      </div>
    )}
  </section>
);

export default IntroSection;
