import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { ExperienceSummary } from "./types";
import { useStepFocus } from "./useStepFocus";
import { scrollBehavior } from "@/lib/utils";

interface ExperienceShellProps {
  /** Brief instruction text shown below the heading. */
  instructions: string;
  /** Whether the experience is complete. */
  done?: boolean;
  /** Summary shown when done is true. */
  summary?: ExperienceSummary;
  /** Callback to restart the experience. */
  onRestart?: () => void;
  /** Navigate to Trace or Explain when bridge is clicked. */
  onNavigate?: (target: "Trace" | "Explain") => void;
  /** Shown under the summary once the experience is done (e.g. the Prediction & Outcome recap). */
  footer?: ReactNode;
  /**
   * Changes whenever the demo moves to a new step. Focus then moves to the child marked
   * `data-autofocus` (if the last control used is gone), and `data-announce` text is read out.
   */
  stepKey?: string | number;
  children: ReactNode;
}

/** Detect which section the bridge text references. */
function bridgeTarget(bridge: string): "Trace" | "Explain" | null {
  const lower = bridge.toLowerCase();
  if (lower.includes("trace")) return "Trace";
  if (lower.includes("explain") || lower.includes("review")) return "Explain";
  return null;
}

/**
 * Lightweight wrapper for every Experience section.
 * Provides a consistent heading, instructions block, and
 * end-of-experience summary — without constraining lesson logic.
 */
const ExperienceShell = ({
  instructions,
  done = false,
  summary,
  onRestart,
  onNavigate,
  footer,
  stepKey = 0,
  children,
}: ExperienceShellProps) => {
  const showSummary = done && !!summary;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const wasShowingSummary = useRef(showSummary);

  // Finishing moves focus to the summary; "Try Again" moves it back to the top of the Experience.
  // (Declared before useStepFocus so this wins when both fire on a restart.)
  useEffect(() => {
    if (wasShowingSummary.current === showSummary) return;
    wasShowingSummary.current = showSummary;
    const target = showSummary ? summaryRef.current : headingRef.current;
    if (!target) return;
    target.scrollIntoView({ block: showSummary ? "nearest" : "start", behavior: scrollBehavior() });
    target.focus({ preventScroll: true });
  }, [showSummary]);

  const { containerRef, announcement } = useStepFocus(showSummary ? "summary" : stepKey);

  const target = summary ? bridgeTarget(summary.bridge) : null;
  const handleBridgeClick = target && onNavigate ? () => onNavigate(target) : undefined;

  return (
    <section>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-xl sm:text-2xl tracking-tight text-foreground focus:outline-none"
      >
        Experience
      </h2>

      {showSummary ? (
        <>
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="group"
            aria-labelledby="experience-summary-heading"
            className="mt-4 rounded-lg border border-border bg-card px-5 py-6 sm:p-8 text-center space-y-3 focus:outline-none"
          >
            <h3 id="experience-summary-heading" className="font-display text-base sm:text-lg text-foreground">
              {summary.heading}
            </h3>
            <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              {summary.body}
            </p>

            {/* Bridge as clickable transition */}
            {handleBridgeClick ? (
              <button
                type="button"
                onClick={handleBridgeClick}
                className="inline-flex items-center gap-1.5 py-2 text-[13px] sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                <span>{summary.bridge}</span>
                <span className="text-primary/40 group-hover:text-primary/60 transition-colors" aria-hidden>→</span>
              </button>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                {summary.bridge}
              </p>
            )}

            {onRestart && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onRestart}
                  className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
          {footer}
        </>
      ) : (
        <>
          <p className="mt-2 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-xl">
            {instructions}
          </p>
          <div ref={containerRef} className="mt-4">{children}</div>
        </>
      )}

      {/* Step changes are read out here (see useStepFocus). */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </section>
  );
};

export default ExperienceShell;
