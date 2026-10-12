import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollBehavior } from "@/lib/utils";
import type { ConceptCard } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface ConceptCardGridProps {
  cards: ConceptCard[];
}

const INITIAL_VISIBLE = 6;

const ConceptCardGrid = ({ cards }: ConceptCardGridProps) => {
  // A link to a card behind "Show all" (from search or a shared URL) opens the full list.
  const { hash } = useLocation();
  const linkedToHiddenCard = cards.slice(INITIAL_VISIBLE).some((card) => hash === `#concept-${card.id}`);
  const [expanded, setExpanded] = useState(linkedToHiddenCard);
  useEffect(() => {
    if (linkedToHiddenCard) setExpanded(true);
  }, [linkedToHiddenCard, hash]);
  const sectionRef = useRef<HTMLElement>(null);
  const showToggle = cards.length > INITIAL_VISIBLE;
  const visible = expanded ? cards : cards.slice(0, INITIAL_VISIBLE);

  return (
    <section id="key-concepts" ref={sectionRef} className="scroll-mt-24">
      <h2 className="font-display text-lg tracking-tight text-foreground">Key Concepts</h2>
      <p className="mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
        {cards.length} terms and definitions for this topic.
      </p>
      <div className="mt-5 space-y-3">
        {visible.map((card) => (
          <div
            key={card.id}
            id={`concept-${card.id}`}
            className="scroll-mt-24 rounded-xl border border-border/70 bg-card p-4 sm:p-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <h3 className="font-sans text-[13px] sm:text-[14px] font-semibold text-card-foreground leading-snug">
                {card.term}
              </h3>
              {card.structures.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:shrink-0 sm:justify-end">
                  {card.structures.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent px-2 sm:px-2.5 py-0.5 text-[10px] text-accent-foreground whitespace-nowrap"
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
            <p className="mt-2 sm:mt-2.5 text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed">{card.definition}</p>
            {card.sensitivity === "high" && <SensitivityBadge note={card.sensitivityNote} />}
          </div>
        ))}
      </div>
      {showToggle && (
        <button
          type="button"
          onClick={() => {
            // Collapsing removes many cards above the button; bring the section back into view.
            if (expanded) sectionRef.current?.scrollIntoView({ block: "start", behavior: scrollBehavior() });
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          className="mt-4 w-full rounded-xl border border-border/70 bg-card py-3 text-[12px] sm:text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {expanded ? "Show fewer" : `Show all ${cards.length}`}
        </button>
      )}
    </section>
  );
};

export default ConceptCardGrid;
