

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

const ROW_META: { key: keyof Pick<PredictionOutcomeData, "prediction" | "outcome" | "update">; label: string }[] = [
  { key: "prediction", label: "Prediction" },
  { key: "outcome", label: "Outcome" },
  { key: "update", label: "Update" },
];

/**
 * Lesson-level thesis block bridging Experience feedback → Trace.
 * Compact, scannable, visually distinct from per-trial FeedbackCards.
 *
 * Visual signature: border-l-2 with primary accent + muted bg.
 * Distinct from FeedbackCard (rounded borders, no left-accent)
 * and Explain (border-l-2 but lighter accent, no bg fill).
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
      className="animate-in fade-in slide-in-from-bottom-1 duration-400"
      role="region"
      aria-label="Prediction and outcome"
    >
      {/* Connector — subtle visual breath between FeedbackCard and this block */}
      <div className="flex justify-center py-2.5 sm:py-3" aria-hidden>
        <div className="flex items-center gap-1">
          <span className="block h-px w-4 bg-border" />
          <span className="block h-1 w-1 rounded-full bg-muted-foreground/20" />
          <span className="block h-px w-4 bg-border" />
        </div>
      </div>

      {/* Block */}
      <div className="rounded-md border-l-2 border-l-primary/30 bg-muted/25 px-3.5 py-3 sm:px-5 sm:py-3.5">
        {/* Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
            Prediction &amp; Outcome
          </span>
          {structureChip && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-primary/[0.06] px-1.5 py-px text-[9px] font-medium text-primary/45 tracking-wide">
              {structureChip}
            </span>
          )}
        </div>

        {/* Rows — stacked on mobile, inline on sm+ */}
        <div className="space-y-2.5 sm:space-y-1.5">
          {ROW_META.map(({ key, label }) => (
            <div key={key} className="sm:flex sm:items-baseline sm:gap-2 text-[12px] sm:text-[13px] leading-relaxed">
              <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/45 sm:w-[56px] shrink-0 mb-0.5 sm:mb-0 sm:pt-[1px]">
                {label}
              </span>
              <p className="text-foreground/70 min-w-0">{rows[key]}</p>
            </div>
          ))}
        </div>

        {/* Footer link — visually connected to Trace */}
        {onNavigateTrace && (
          <button
            type="button"
            onClick={onNavigateTrace}
            className="mt-3 sm:mt-4 flex items-center gap-1.5 rounded px-1.5 py-1 -mx-1.5 text-[10px] sm:text-[11px] text-primary/55 hover:text-primary/80 hover:bg-primary/[0.04] transition-colors group"
          >
            <span className="font-medium">See the pathway in Trace</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
              <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PredictionOutcome;
