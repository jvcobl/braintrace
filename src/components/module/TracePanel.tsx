import type { TraceNode } from "@/data/modules";

interface TracePanelProps {
  nodes: TraceNode[];
  onAdvanceToExplain?: () => void;
  /** Line under the heading; lessons whose list is concepts rather than a signal path pass their own. */
  subtitle?: string;
  /** Accessible name for the list. */
  listLabel?: string;
  /** Set for lessons whose list is concepts rather than a signal path: shown as cards, not numbered steps. */
  heading?: string;
}

const TracePanel = ({
  nodes,
  onAdvanceToExplain,
  subtitle = "Follow the signal through the circuit.",
  listLabel = "Neural pathway steps",
  heading,
}: TracePanelProps) => (
  <section>
    <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">{heading ?? "Trace the Pathway"}</h2>
    <p className="mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground">
      {subtitle}
    </p>
    {heading ? (
      <ul className="mt-5 sm:mt-6 grid gap-3 sm:grid-cols-2" aria-label={listLabel}>
        {nodes.map((node) => (
          <li key={node.label} className="rounded-xl border border-border/70 bg-card p-4 sm:p-5 sm:[&:last-child:nth-child(odd)]:col-span-2">
            <h3 className="font-display text-[15px] sm:text-base text-foreground leading-snug">{node.label}</h3>
            <p className="mt-1 text-[13px] text-foreground/70 leading-relaxed">{node.description}</p>
          </li>
        ))}
      </ul>
    ) : (
      <ol className="mt-5 sm:mt-6 space-y-0" aria-label={listLabel}>
        {nodes.map((node, i) => (
          <li key={node.label} className="flex gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] sm:text-xs font-bold text-primary-foreground shadow-sm">
                {i + 1}
              </div>
              {i < nodes.length - 1 && (
                <div className="w-px flex-1 bg-border" aria-hidden="true" />
              )}
            </div>
            <div className="pb-5 sm:pb-6">
              <p className="text-[13px] sm:text-[14px] font-semibold text-foreground leading-snug">{node.label}</p>
              <p className="mt-1 text-[12px] sm:text-[13px] text-foreground/65 leading-relaxed">{node.description}</p>
            </div>
          </li>
        ))}
      </ol>
    )}

    {onAdvanceToExplain && (
      <div className="mt-6 flex justify-center">
        <button
          onClick={onAdvanceToExplain}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Read the explanation
          <span aria-hidden="true">→</span>
        </button>
      </div>
    )}
  </section>
);

export default TracePanel;
