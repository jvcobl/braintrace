import { useState } from "react";
import type { ConceptCard } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface ConceptCardGridProps {
  cards: ConceptCard[];
}

const ConceptCardGrid = ({ cards }: ConceptCardGridProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-foreground">Concept Cards</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {cards.map((card) => {
          const isOpen = expanded === card.id;
          const isHigh = card.sensitivity === "high";

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setExpanded(isOpen ? null : card.id)}
              className={`flex flex-col rounded-lg border bg-card p-4 text-left transition-shadow hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isHigh ? "border-destructive/30" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-card-foreground leading-snug">
                  {card.term}
                </h3>
                <span
                  className="mt-0.5 shrink-0 text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              {card.structures.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {card.structures.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-accent-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {isOpen && (
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-sm text-foreground/80 leading-relaxed">{card.definition}</p>
                  {isHigh && <SensitivityBadge note={card.sensitivityNote} />}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ConceptCardGrid;
