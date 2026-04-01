import type { ExplainContent } from "@/data/modules";

interface ExplainSectionProps {
  explain: ExplainContent;
}

const subheads: { key: keyof ExplainContent; label: string }[] = [
  { key: "whatHappened", label: "What Happened" },
  { key: "whatYourBrainDid", label: "What Your Brain Did" },
  { key: "keyPathway", label: "Key Pathway" },
  { key: "whyItMatters", label: "Why It Matters" },
];

const ExplainSection = ({ explain }: ExplainSectionProps) => (
  <section>
    <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">Explain</h2>
    <p className="mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground/60">
      What the experience reveals.
    </p>
    <div className="mt-5 sm:mt-6 space-y-5 sm:space-y-6">
      {subheads.map(({ key, label }) => (
        <div key={key} className="border-l-2 border-primary/10 pl-4 sm:pl-5">
          <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
            {label}
          </h3>
          <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] text-foreground/75 leading-relaxed">{explain[key]}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExplainSection;
