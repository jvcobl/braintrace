import type { ExperienceFeedback } from "./types";

interface FeedbackCardProps {
  feedback: ExperienceFeedback;
  /** Called when the user clicks the bridge line. */
  onBridgeClick?: () => void;
}

/** Detect which section the bridge text references. */
function bridgeTarget(bridge: string): "Trace" | "Explain" | null {
  const lower = bridge.toLowerCase();
  if (lower.includes("trace")) return "Trace";
  if (lower.includes("explain") || lower.includes("review")) return "Explain";
  return null;
}

/**
 * Renders a single feedback state using the NeuroRoute schema:
 * primary → secondary → bridge → structure.
 */
const FeedbackCard = ({ feedback, onBridgeClick }: FeedbackCardProps) => {
  const target = bridgeTarget(feedback.bridge);

  return (
    <div className="space-y-3 max-w-md mx-auto">
      {/* Primary — outcome */}
      <div className="rounded-lg border border-border bg-accent/40 px-4 py-3">
        <p className="text-sm font-medium text-foreground leading-relaxed">
          {feedback.primary}
        </p>
      </div>

      {/* Secondary — interpretation */}
      <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
          What this reflects
        </p>
        <p className="text-[13px] text-foreground/80 leading-relaxed">
          {feedback.secondary}
        </p>
      </div>

      {/* Structure — pathway reference */}
      {feedback.structure && (
        <div
          className={`rounded-lg border px-4 py-3 ${
            onBridgeClick
              ? "border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
              : "border-primary/15 bg-primary/5"
          }`}
          onClick={target === "Trace" && onBridgeClick ? onBridgeClick : undefined}
          role={target === "Trace" && onBridgeClick ? "button" : undefined}
          tabIndex={target === "Trace" && onBridgeClick ? 0 : undefined}
          onKeyDown={target === "Trace" && onBridgeClick ? (e) => { if (e.key === "Enter" || e.key === " ") onBridgeClick(); } : undefined}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60 mb-1.5">
            Pathway
            {target === "Trace" && onBridgeClick && (
              <span className="ml-1.5 text-primary/40">→ view in Trace</span>
            )}
          </p>
          <p className="text-[13px] font-mono text-foreground/70 leading-relaxed">
            {feedback.structure}
          </p>
        </div>
      )}

      {/* Bridge — next step as clickable link */}
      {onBridgeClick ? (
        <button
          type="button"
          onClick={onBridgeClick}
          className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors pt-1 flex items-center justify-center gap-1.5 group"
        >
          <span>{feedback.bridge}</span>
          <span className="text-primary/40 group-hover:text-primary/60 transition-colors" aria-hidden>→</span>
        </button>
      ) : (
        <p className="text-xs text-muted-foreground text-center italic pt-1">
          {feedback.bridge}
        </p>
      )}
    </div>
  );
};

export default FeedbackCard;
