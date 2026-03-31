import type { ReactNode } from "react";
import type { ExperienceSummary } from "./types";

interface ExperienceShellProps {
  /** Brief instruction text shown below the heading. */
  instructions: string;
  /** Whether the experience is complete. */
  done?: boolean;
  /** Summary shown when done is true. */
  summary?: ExperienceSummary;
  /** Callback to restart the experience. */
  onRestart?: () => void;
  children: ReactNode;
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
  children,
}: ExperienceShellProps) => {
  if (done && summary) {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Experience
        </h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center space-y-3">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {summary.heading}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {summary.body}
          </p>
          <p className="text-xs text-muted-foreground italic">
            {summary.bridge}
          </p>
          {onRestart && (
            <button
              onClick={onRestart}
              className="mt-4 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Try Again
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-xl">
        {instructions}
      </p>
      <div className="mt-4">{children}</div>
    </section>
  );
};

export default ExperienceShell;
