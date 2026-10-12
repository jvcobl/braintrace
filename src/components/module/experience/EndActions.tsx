interface EndActionsProps {
  onRestart?: () => void;
  /** Present when the lesson can move on; renders the primary "Continue to Trace" button. */
  onContinue?: () => void;
  className?: string;
}

/** The two ways out of a finished Experience: run it again, or carry on to Trace. */
const EndActions = ({ onRestart, onContinue, className = "" }: EndActionsProps) => {
  if (!onRestart && !onContinue) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {onRestart && (
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Try Again
        </button>
      )}
      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Continue to Trace <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
};

export default EndActions;
