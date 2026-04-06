import type { ExplainContent } from "@/data/modules";
import type { PredictionLens as PredictionLensData, GoDeeperCard as GoDeeperCardData, ConceptPageId } from "@/data/types";
import PredictionLens from "@/components/PredictionLens";
import GoDeeperCard from "@/components/GoDeeperCard";
import ConceptLink from "@/components/ConceptLink";

interface ExplainSectionProps {
  explain: ExplainContent;
  predictionLens?: PredictionLensData;
  goDeeper?: GoDeeperCardData[];
  conceptLinks?: ConceptPageId[];
}

const subheads: { key: keyof ExplainContent; label: string }[] = [
  { key: "whatHappened", label: "What Happened" },
  { key: "whatYourBrainDid", label: "What Your Brain Did" },
  { key: "keyPathway", label: "Key Pathway" },
  { key: "whyItMatters", label: "Why It Matters" },
];

const ExplainSection = ({ explain, predictionLens, goDeeper, conceptLinks }: ExplainSectionProps) => (
  <section>
    <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">Explain</h2>
    <p className="mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground/60">
      What the experience reveals.
    </p>
    <div className="mt-5 sm:mt-6 space-y-5 sm:space-y-6">
      {subheads.map(({ key, label }) => (
        <div key={key as string} className="border-l-2 border-primary/10 pl-4 sm:pl-5">
          <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
            {label}
          </h3>
          <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] text-foreground/75 leading-relaxed">{explain[key]}</p>
        </div>
      ))}
    </div>

    {/* Prediction Lens */}
    {predictionLens && (
      <div id="prediction-lens" className="pt-8">
        <PredictionLens data={predictionLens} />
      </div>
    )}

    {/* Go Deeper */}
    {goDeeper && goDeeper.length > 0 && (
      <div className="pt-8">
        <h3 className="text-lg font-medium text-foreground mb-3">Go deeper</h3>
        <div className="space-y-2">
          {goDeeper.map((card) => (
            <div key={card.id} id={`deeper-${card.id}`}>
              <GoDeeperCard data={card} autoExpand={typeof window !== "undefined" && window.location.hash === `#deeper-${card.id}`} />
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Related concepts */}
    {conceptLinks && conceptLinks.length > 0 && (
      <div id="concept-links" className="pt-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Related concepts</h3>
        <div className="space-y-2">
          {conceptLinks.map((id) => (
            <ConceptLink key={id} conceptPageId={id} />
          ))}
        </div>
      </div>
    )}
  </section>
);

export default ExplainSection;
