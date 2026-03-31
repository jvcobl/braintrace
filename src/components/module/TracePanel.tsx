import type { TraceNode } from "@/data/modules";

interface TracePanelProps {
  nodes: TraceNode[];
}

const TracePanel = ({ nodes }: TracePanelProps) => (
  <section>
    <h2 className="font-display text-2xl font-semibold text-foreground">Trace the Pathway</h2>
    <div className="mt-6 space-y-0">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-start gap-4">
          {/* Connector line + dot */}
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </div>
            {i < nodes.length - 1 && (
              <div className="w-px flex-1 min-h-[32px] bg-border" />
            )}
          </div>
          {/* Content */}
          <div className="pb-6">
            <p className="font-medium text-foreground">{node.label}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{node.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TracePanel;
