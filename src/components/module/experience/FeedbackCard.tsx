import type { ExperienceFeedback } from "./types";

interface FeedbackCardProps {
  feedback: ExperienceFeedback;
}

/**
 * Renders a single feedback state using the NeuroRoute schema:
 * primary → secondary → bridge → structure.
 */
const FeedbackCard = ({ feedback }: FeedbackCardProps) => (
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
      <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60 mb-1.5">
          Pathway
        </p>
        <p className="text-[13px] font-mono text-foreground/70 leading-relaxed">
          {feedback.structure}
        </p>
      </div>
    )}

    {/* Bridge — next step */}
    <p className="text-xs text-muted-foreground text-center italic pt-1">
      {feedback.bridge}
    </p>
  </div>
);

export default FeedbackCard;
