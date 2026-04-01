

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

const ROW_META: { key: keyof Pick<PredictionOutcomeData, "prediction" | "outcome" | "update">; label: string; icon: string }[] = [
  { key: "prediction", label: "Prediction", icon: "↗" },
  { key: "outcome", label: "Outcome", icon: "↩" },
  { key: "update", label: "Update", icon: "△" },
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
      className="animate-in fade-in slide-in-from-bottom-1 duration-400"
      role="region"
      aria-label="Prediction and outcome"
    >
      {/* Connector — subtle visual breath between FeedbackCard and this block */}
      <div className="flex justify-center py-2.5 sm:py-3" aria-hidden>
        <div className="flex items-center gap-1">
          <span className="block h-px w-4 bg-border" />
          <span className="block h-1 w-1 rounded-full bg-muted-foreground/25" />
          <span className="block h-px w-4 bg-border" />
        </div>
      </div>

      {/* Block */}
      <div className="rounded-md border-l-2 border-l-primary/25 bg-muted/30 px-3 py-2.5 sm:px-5 sm:py-3">
        {/* Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
            Prediction &amp; Outcome
          </span>
          {structureChip && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-primary/[0.06] px-1.5 py-px text-[9px] font-medium text-primary/50 tracking-wide">
              {structureChip}
            </span>
          )}
        </div>

        {/* Rows — stacked on mobile, inline on sm+ */}
        <div className="space-y-2 sm:space-y-1">
          {ROW_META.map(({ key, label, icon }) => (
            <div key={key} className="sm:flex sm:items-baseline sm:gap-2 text-[12px] sm:text-[13px] leading-relaxed">
              <span className="flex items-center gap-0.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 sm:w-[52px] shrink-0 mb-0.5 sm:mb-0 sm:pt-[2px]">
                <span className="text-muted-foreground/30" aria-hidden>{icon}</span>
                {label}
              </span>
              <p className="text-foreground/75 min-w-0">{rows[key]}</p>
            </div>
          ))}
        </div>

        {/* Footer link — visually connected to Trace */}
        {onNavigateTrace && (
          <button
            type="button"
            onClick={onNavigateTrace}
            className="mt-2.5 sm:mt-3.5 flex items-center gap-1.5 rounded px-1.5 py-1 -mx-1.5 text-[10px] sm:text-[11px] text-primary/60 hover:text-primary hover:bg-primary/[0.04] transition-colors group"
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
