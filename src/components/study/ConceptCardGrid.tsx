import { useState } from "react";
import type { ConceptCard } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface ConceptCardGridProps {
  cards: ConceptCard[];
}

const INITIAL_VISIBLE = 8;

const ConceptCardGrid = ({ cards }: ConceptCardGridProps) => {
  const [expanded, setExpanded] = useState(false);
  const showToggle = cards.length > INITIAL_VISIBLE;
  const visible = expanded ? cards : cards.slice(0, INITIAL_VISIBLE);

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-lg tracking-tight text-foreground">Key Concepts</h2>
        <span className="text-[11px] text-muted-foreground">{cards.length} concepts</span>
      </div>
      <div className="mt-5 space-y-3">
        {visible.map((card) => (
          <div
            key={card.id}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[14px] font-semibold text-card-foreground leading-snug">
                {card.term}
              </h3>
              {card.structures.length > 0 && (
                <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                  {card.structures.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] text-accent-foreground whitespace-nowrap"
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
            <p className="mt-2.5 text-[13px] text-foreground/80 leading-relaxed">{card.definition}</p>
            {card.sensitivity === "high" && <SensitivityBadge note={card.sensitivityNote} />}
          </div>
        ))}
      </div>
      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-5 w-full rounded-xl border border-dashed border-border py-3 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {expanded ? "Show fewer" : `Show all ${cards.length} concepts`}
        </button>
      )}
    </section>
  );
};

export default ConceptCardGrid;
