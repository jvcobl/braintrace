import type { ReactNode } from "react";

export interface PredictionOutcomeData {
  prediction: string;
  outcome: string;
  update: string;
  /** Optional brain-region or circuit chip label, e.g. "Amygdala → PFC" */
  structureChip?: string;
}

interface PredictionOutcomeProps extends PredictionOutcomeData {
  /** If false/undefined the component renders nothing. */
  visible?: boolean;
  /** Navigate to the Trace section. */
  onNavigateTrace?: () => void;
}

const ROW_META: { key: keyof Pick<PredictionOutcomeData, "prediction" | "outcome" | "update">; label: string; icon: ReactNode }[] = [
  {
    key: "prediction",
    label: "Prediction",
    icon: (
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "outcome",
    label: "Outcome",
    icon: (
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "update",
    label: "Update",
    icon: (
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
        <path d="M11.5 7A4.5 4.5 0 1 1 7 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 2.5L9 4.5 7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/**
 * Lesson-level thesis block bridging Experience feedback → Trace.
 * Compact, scannable, visually distinct from per-trial FeedbackCards.
 */
const PredictionOutcome = ({
  prediction,
  outcome,
  update,
  structureChip,
  visible = false,
  onNavigateTrace,
}: PredictionOutcomeProps) => {
  if (!visible) return null;

  const rows = { prediction, outcome, update };

  return (
    <div
      className="rounded-lg border-l-2 border-l-primary/30 border border-border/40 bg-card/60 px-4 py-4 sm:px-5 sm:py-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
      role="region"
      aria-label="Prediction and outcome"
    >
      {/* Header — tight single line */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Prediction &amp; Outcome
        </span>
        {structureChip && (
          <span className="inline-flex items-center rounded-full bg-primary/8 px-2 py-px text-[10px] font-medium text-primary/60 truncate">
            {structureChip}
          </span>
        )}
      </div>

      {/* Rows — compact, no background boxes */}
      <div className="space-y-1.5">
        {ROW_META.map(({ key, label, icon }) => (
          <div key={key} className="flex items-baseline gap-2.5 text-[13px] leading-snug">
            <span className="flex items-center gap-1.5 shrink-0 text-muted-foreground/60 mt-px">
              {icon}
              <span className="text-[10px] font-semibold uppercase tracking-wider w-[60px]">
                {label}
              </span>
            </span>
            <p className="text-foreground/80 min-w-0">
              {rows[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Footer — simple inline link */}
      {onNavigateTrace && (
        <button
          type="button"
          onClick={onNavigateTrace}
          className="flex items-center gap-1.5 pt-0.5 text-[12px] font-medium text-primary/60 hover:text-primary transition-colors group"
        >
          <span>See the pathway in Trace</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
            <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PredictionOutcome;
