import type { TraceNode } from "@/data/modules";

interface TracePanelProps {
  nodes: TraceNode[];
}

const TracePanel = ({ nodes }: TracePanelProps) => (
  <section>
    <h2 className="font-display text-2xl tracking-tight text-foreground">Trace the Pathway</h2>
    <ol className="mt-8 space-y-0" aria-label="Neural pathway steps">
      {nodes.map((node, i) => (
        <li key={node.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
              {i + 1}
            </div>
            {i < nodes.length - 1 && (
              <div className="w-px flex-1 bg-border" aria-hidden="true" />
            )}
          </div>
          <div className="pb-6">
            <p className="text-[14px] font-semibold text-foreground leading-snug">{node.label}</p>
            <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{node.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default TracePanel;
