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
    <h2 className="font-display text-2xl tracking-tight text-foreground">Explain</h2>
    <div className="mt-6 space-y-6">
      {subheads.map(({ key, label }) => (
        <div key={key} className="border-l-2 border-primary/15 pl-5">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {label}
          </h3>
          <p className="mt-2 text-[14px] text-foreground/80 leading-relaxed">{explain[key]}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExplainSection;
