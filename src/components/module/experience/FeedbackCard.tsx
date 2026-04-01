import type { ExperienceFeedback } from "./types";

interface FeedbackCardProps {
  feedback: ExperienceFeedback;
  /** Navigate to Trace or Explain. Bridge text auto-detects target. */
  onNavigate?: (target: "Trace" | "Explain") => void;
}

/** Detect which section the bridge text references. */
function bridgeTarget(bridge: string): "Trace" | "Explain" {
  const lower = bridge.toLowerCase();
  if (lower.includes("trace")) return "Trace";
  return "Explain";
}

/**
 * Renders a single feedback state using the NeuroRoute schema:
 * primary → secondary → bridge → structure.
 *
 * Visually: rounded borders, bg fills, no left-accent — keeps it
 * distinct from Prediction & Outcome (border-l) and Explain (border-l).
 */
const FeedbackCard = ({ feedback, onNavigate }: FeedbackCardProps) => {
  const target = bridgeTarget(feedback.bridge);
  const handleNavigate = onNavigate ? () => onNavigate(target) : undefined;

  return (
    <div className="space-y-2.5 sm:space-y-3 max-w-md mx-auto">
      {/* Primary — outcome */}
      <div className="rounded-lg border border-border bg-accent/40 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <p className="text-[13px] sm:text-[14px] font-medium text-foreground leading-relaxed">
          {feedback.primary}
        </p>
      </div>

      {/* Secondary — interpretation */}
      <div className="rounded-lg border border-border bg-secondary/30 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70 mb-1 sm:mb-1.5">
          What this reflects
        </p>
        <p className="text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed">
          {feedback.secondary}
        </p>
      </div>

      {/* Structure — pathway reference */}
      {feedback.structure && (
        <div
          className={`rounded-lg border px-3.5 py-2.5 sm:px-4 sm:py-3 transition-colors ${
            handleNavigate
              ? "border-primary/15 bg-primary/[0.03] cursor-pointer hover:bg-primary/[0.06]"
              : "border-primary/10 bg-primary/[0.03]"
          }`}
          onClick={handleNavigate}
          role={handleNavigate ? "button" : undefined}
          tabIndex={handleNavigate ? 0 : undefined}
          onKeyDown={handleNavigate ? (e) => { if (e.key === "Enter" || e.key === " ") handleNavigate(); } : undefined}
        >
          <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-primary/50 mb-1 sm:mb-1.5">
            Pathway
            {handleNavigate && (
              <span className="ml-1.5 text-primary/35 hidden sm:inline">→ view in {target}</span>
            )}
          </p>
          <p className="text-[12px] sm:text-[13px] font-mono text-foreground/60 leading-relaxed break-words">
            {feedback.structure}
          </p>
        </div>
      )}

      {/* Bridge — clickable transition */}
      {handleNavigate ? (
        <button
          type="button"
          onClick={handleNavigate}
          className="w-full text-center text-[11px] sm:text-xs text-primary/60 hover:text-primary/80 transition-colors pt-0.5 sm:pt-1 flex items-center justify-center gap-1.5 group"
        >
          <span>{feedback.bridge}</span>
          <span className="text-primary/30 group-hover:text-primary/50 transition-colors" aria-hidden>→</span>
        </button>
      ) : (
        <p className="text-[11px] sm:text-xs text-muted-foreground/60 text-center italic pt-0.5 sm:pt-1">
          {feedback.bridge}
        </p>
      )}
    </div>
  );
};

export default FeedbackCard;
