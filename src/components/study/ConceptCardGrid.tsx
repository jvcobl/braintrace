import type { ConceptCard } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface ConceptCardGridProps {
  cards: ConceptCard[];
}

const ConceptCardGrid = ({ cards }: ConceptCardGridProps) => (
  <section>
    <h2 className="font-display text-lg font-semibold text-foreground">Concept Cards</h2>
    <div className="mt-4 space-y-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold text-card-foreground leading-snug">
              {card.term}
            </h3>
            {card.structures.length > 0 && (
              <div className="flex shrink-0 flex-wrap justify-end gap-1">
                {card.structures.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-accent-foreground whitespace-nowrap"
                  >
                    {s}
                  </span>
                ))}
                {card.structures.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{card.structures.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{card.definition}</p>
          {card.sensitivity === "high" && <SensitivityBadge note={card.sensitivityNote} />}
        </div>
      ))}
    </div>
  </section>
);

export default ConceptCardGrid;
