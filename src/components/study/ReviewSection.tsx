import { useState } from "react";
import type { ReviewQuestion } from "@/data/content/types";

interface ReviewSectionProps {
  questions: ReviewQuestion[];
}

const ReviewSection = ({ questions }: ReviewSectionProps) => {
  const [showHint, setShowHint] = useState<string | null>(null);

  return (
    <section>
      <h2 className="font-display text-lg tracking-tight text-foreground">Review Questions</h2>
      <ol className="mt-5 space-y-3">
        {questions.map((q, i) => {
          const hintOpen = showHint === q.id;

          return (
            <li
              key={q.id}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-[13px] text-foreground/80 leading-relaxed">
                <span className="font-semibold text-foreground">{i + 1}. </span>
                {q.question}
              </p>
              <button
                type="button"
                onClick={() => setShowHint(hintOpen ? null : q.id)}
                className="mt-3 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
              >
                {hintOpen ? "Hide hint" : "Show hint"}
              </button>
              {hintOpen && (
                <p className="mt-3 border-t border-border pt-3 text-[12px] text-muted-foreground leading-relaxed">
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
