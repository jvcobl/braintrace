

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
      className="rounded-md border-l-2 border-l-primary/25 bg-muted/30 px-3 py-2.5 sm:px-5 sm:py-3 animate-in fade-in slide-in-from-bottom-1 duration-400"
      role="region"
      aria-label="Prediction and outcome"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
          Lesson Insight
        </span>
        {structureChip && (
          <span className="inline-flex items-center rounded-full bg-primary/[0.06] px-1.5 py-px text-[9px] font-medium text-primary/50 tracking-wide">
            {structureChip}
          </span>
        )}
      </div>

      {/* Rows */}
      <div className="space-y-1">
        {ROW_META.map(({ key, label }) => (
          <div key={key} className="flex items-baseline gap-2 text-[13px] leading-relaxed">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 w-[52px] shrink-0 pt-[2px]">
              {label}
            </span>
            <p className="text-foreground/75 min-w-0">{rows[key]}</p>
          </div>
        ))}
      </div>

      {/* Footer link */}
      {onNavigateTrace && (
        <button
          type="button"
          onClick={onNavigateTrace}
          className="mt-2.5 flex items-center gap-1 text-[11px] text-primary/50 hover:text-primary/80 transition-colors group"
        >
          <span>Continue to Trace</span>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
            <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PredictionOutcome;
