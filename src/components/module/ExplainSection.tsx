import type { ExplainContent } from "@/data/modules";

interface ExplainSectionProps {
  explain: ExplainContent;
}

const subheads: { key: keyof ExplainContent; label: string }[] = [
  { key: "whatHappened", label: "What Happened" },
  { key: "whatYourBrainDid", label: "What Your Brain Did" },
  { key: "keyPathway", label: "Key Pathway" },
  { key: "nbb302Connection", label: "NBB302 Connection" },
];

const ExplainSection = ({ explain }: ExplainSectionProps) => (
  <section>
    <h2 className="font-display text-2xl font-semibold text-foreground">Explain</h2>
    <div className="mt-4 space-y-5">
      {subheads.map(({ key, label }) => (
        <div key={key}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </h3>
          <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{explain[key]}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExplainSection;
