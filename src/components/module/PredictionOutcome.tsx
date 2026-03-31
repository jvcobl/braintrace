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

const ROW_LABELS: { key: keyof Pick<PredictionOutcomeData, "prediction" | "outcome" | "update">; label: string; icon: ReactNode }[] = [
  {
    key: "prediction",
    label: "Prediction",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "outcome",
    label: "Outcome",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 7l1.5 1.5L9 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "update",
    label: "Update",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden>
        <path d="M11.5 7A4.5 4.5 0 1 1 7 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 2.5L9 4.5 7 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/**
 * Calm study-insight block that bridges Experience feedback and Trace.
 *
 * Renders a stacked card with Prediction → Outcome → Update rows
 * plus an optional structure chip and a footer link to Trace.
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
      className="rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm px-5 py-5 sm:px-6 sm:py-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
      role="region"
      aria-label="Prediction and outcome"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <h3 className="font-display text-[15px] font-semibold tracking-tight text-foreground">
          Prediction &amp; Outcome
        </h3>
        {structureChip && (
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-primary/70 uppercase">
            {structureChip}
          </span>
        )}
      </div>

      {/* Rows */}
      <div className="space-y-2.5">
        {ROW_LABELS.map(({ key, label, icon }) => (
          <div
            key={key}
            className="flex items-start gap-3 rounded-md bg-secondary/40 px-3.5 py-3 text-sm"
          >
            <span className="mt-0.5 text-muted-foreground">{icon}</span>
            <div className="min-w-0">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">
                {label}
              </span>
              <p className="mt-0.5 text-[13px] leading-relaxed text-foreground/90">
                {rows[key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bridge footer — connects to Trace */}
      {onNavigateTrace && (
        <div className="flex items-center gap-3 pt-1">
          {/* Thin connector line */}
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />

          <button
            type="button"
            onClick={onNavigateTrace}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[12px] font-medium text-primary/80 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all group"
          >
            {structureChip && (
              <span className="text-[10px] text-primary/50 group-hover:text-primary/70 transition-colors hidden sm:inline">
                {structureChip}
              </span>
            )}
            {structureChip && (
              <span className="h-3 w-px bg-primary/20 hidden sm:block" aria-hidden />
            )}
            <span>See the pathway in Trace</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
              <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      )}
    </div>
  );
};

export default PredictionOutcome;
