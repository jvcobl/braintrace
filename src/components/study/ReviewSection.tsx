import { useState } from "react";
import type { ReviewQuestion } from "@/data/content/types";

interface ReviewSectionProps {
  questions: ReviewQuestion[];
}

const ReviewSection = ({ questions }: ReviewSectionProps) => {
  const [showHint, setShowHint] = useState<string | null>(null);

  return (
    <section className="rounded-xl border border-border/70 bg-section-alt p-6 md:p-8">
      <h3 className="font-display text-lg tracking-tight text-foreground">Test Your Understanding</h3>
      <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
        Try answering these before checking the hints.
      </p>
      <ol className="mt-6 space-y-4">
        {questions.map((q, i) => {
          const hintOpen = showHint === q.id;

          return (
            <li
              key={q.id}
              className="rounded-lg border border-border/50 bg-card p-5"
            >
              <p className="text-[13px] text-foreground/80 leading-relaxed">
                <span className="font-semibold text-foreground">{i + 1}. </span>
                {q.question}
              </p>
              <button
                type="button"
                onClick={() => setShowHint(hintOpen ? null : q.id)}
                className="mt-3 text-[12px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
              >
                {hintOpen ? "Hide hint" : "Show hint"}
              </button>
              {hintOpen && (
                <p className="mt-3 border-t border-border/50 pt-3 text-[12px] text-muted-foreground leading-relaxed">
                  {q.hint}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ReviewSection;
