import { useState, useMemo } from "react";
import type { TracePathway, TraceNode as TNode, TraceEdge, TraceBadge } from "@/data/types";

/* ── Design tokens ── */

const BADGE_COLOR: Record<TraceBadge, string> = {
  prediction: "#7F77DD",
  input: "#378ADD",
  mismatch: "#D85A30",
  update: "#1D9E75",
};

const BADGE_LABEL: Record<TraceBadge, string> = {
  prediction: "PREDICTION",
  input: "INPUT",
  mismatch: "MISMATCH",
  update: "UPDATE",
};

const NW = 148;
const NH = 46;
const LG = 90;
const CG = 180;
const PAD = 40;

/* ── Layout types ── */

interface Pos {
  id: string;
  label: string;
  badge?: TraceBadge;
  active: boolean;
  cx: number;
  cy: number;
}

/* ── Back-edge detection via DFS ── */

function findBackEdges(ids: string[], edges: TraceEdge[]): Set<string> {
  const idSet = new Set(ids);
  const adj = new Map<string, string[]>();
  for (const id of ids) adj.set(id, []);
  for (const e of edges) {
    if (idSet.has(e.from) && idSet.has(e.to)) adj.get(e.from)!.push(e.to);
  }

  const GRAY = 1, BLACK = 2;
  const color = new Map<string, number>();
  const result = new Set<string>();

  function dfs(u: string) {
    color.set(u, GRAY);
    for (const v of adj.get(u) || []) {
      if (color.get(v) === GRAY) result.add(`${u}->${v}`);
      else if (!color.has(v)) dfs(v);
    }
    color.set(u, BLACK);
  }

  for (const id of ids) if (!color.has(id)) dfs(id);
  return result;
}

/* ── Graph layout ── */

function layoutGraph(nodes: TNode[], edges: TraceEdge[]) {
  if (!nodes.length) return { items: [] as Pos[], w: 0, h: 0, backEdgeKeys: new Set<string>() };

  const ids = nodes.map((n) => n.structureId);
  const idSet = new Set(ids);
  const backEdgeKeys = findBackEdges(ids, edges);

  // Forward edges only
  const fwdEdges = edges.filter(
    (e) => idSet.has(e.from) && idSet.has(e.to) && !backEdgeKeys.has(`${e.from}->${e.to}`),
  );

  // Predecessors map (forward only)
  const preds = new Map<string, string[]>();
  for (const id of ids) preds.set(id, []);
  for (const e of fwdEdges) preds.get(e.to)!.push(e.from);

  // Connected nodes (any edge)
  const connected = new Set<string>();
  for (const e of edges) {
    if (idSet.has(e.from) && idSet.has(e.to)) {
      connected.add(e.from);
      connected.add(e.to);
    }
  }

  // Assign layers (longest path from roots)
  const layerOf = new Map<string, number>();

  function assign(id: string, seen = new Set<string>()): number {
    if (layerOf.has(id)) return layerOf.get(id)!;
    if (seen.has(id)) return 0;
    seen.add(id);
    const ps = preds.get(id) || [];
    const l = ps.length === 0 ? 0 : Math.max(...ps.map((p) => assign(p, seen))) + 1;
    layerOf.set(id, l);
    return l;
  }

  for (const id of ids) assign(id);

  // Push disconnected inactive nodes to bottom
  const maxConnected = Math.max(
    0,
    ...ids.filter((id) => connected.has(id)).map((id) => layerOf.get(id) ?? 0),
  );
  for (const id of ids) {
    if (!connected.has(id)) layerOf.set(id, maxConnected + 1);
  }

  // Group by layer
  const groups = new Map<number, string[]>();
  for (const [id, l] of layerOf) {
    if (!groups.has(l)) groups.set(l, []);
    groups.get(l)!.push(id);
  }

  const maxLayer = Math.max(0, ...layerOf.values());
  const maxPerLayer = Math.max(1, ...Array.from(groups.values()).map((g) => g.length));
  const hasBack = backEdgeKeys.size > 0;

  const w = PAD * 2 + Math.max((maxPerLayer - 1) * CG, NW) + (hasBack ? 80 : 0);
  const h = PAD * 2 + maxLayer * LG + NH;

  const items: Pos[] = [];
  for (let l = 0; l <= maxLayer; l++) {
    const group = groups.get(l) || [];
    const count = group.length;
    const layerW = (count - 1) * CG;
    const baseW = w - (hasBack ? 80 : 0);
    const startX = (baseW - layerW) / 2;

    group.forEach((id, i) => {
      const node = nodes.find((n) => n.structureId === id)!;
      items.push({
        id,
        label: node.label,
        badge: node.badge,
        active: node.active,
        cx: startX + i * CG,
        cy: PAD + NH / 2 + l * LG,
      });
    });
  }

  // ── Resolve edge-through-node collisions for multi-layer edges ──
  const itemById = new Map(items.map((n) => [n.id, n]));
  const CLEARANCE = NW * 0.65;

  for (const e of edges) {
    const src = itemById.get(e.from);
    const tgt = itemById.get(e.to);
    if (!src || !tgt) continue;
    const fl = layerOf.get(e.from)!;
    const tl = layerOf.get(e.to)!;
    if (backEdgeKeys.has(`${e.from}->${e.to}`)) continue;
    if (tl - fl <= 1) continue;

    for (let l = fl + 1; l < tl; l++) {
      const t = (l - fl) / (tl - fl);
      const edgeX = src.cx + t * (tgt.cx - src.cx);

      for (const node of items) {
        if (layerOf.get(node.id) !== l) continue;
        const dist = Math.abs(node.cx - edgeX);
        if (dist >= CLEARANCE) continue;
        const nudge = CLEARANCE - dist;
        node.cx += node.cx <= edgeX ? -nudge : nudge;
      }
    }
  }

  // Re-normalize: keep all nodes in bounds and recompute width
  const minCx = Math.min(...items.map((n) => n.cx));
  const desiredMin = PAD + NW / 2;
  if (minCx < desiredMin) {
    const shift = desiredMin - minCx;
    for (const n of items) n.cx += shift;
  }
  const maxCx = Math.max(...items.map((n) => n.cx));
  const finalW = maxCx + NW / 2 + PAD + (hasBack ? 80 : 0);

  return { items, w: finalW, h, backEdgeKeys };
}

/* ── Edge path + label position ── */

function getEdgePath(from: Pos, to: Pos, isBack: boolean, totalW: number) {
  if (isBack) {
    const rx = totalW - 20;
    return {
      d: `M ${from.cx + NW / 2} ${from.cy} C ${rx} ${from.cy}, ${rx} ${to.cy}, ${to.cx + NW / 2} ${to.cy}`,
      lx: rx - 20,
      ly: (from.cy + to.cy) / 2,
      anchor: "end" as const,
    };
  }

  const x1 = from.cx;
  const y1 = from.cy + NH / 2;
  const x2 = to.cx;
  const y2 = to.cy - NH / 2;
  const dx = Math.abs(x2 - x1);

  const d =
    dx < 5
      ? `M ${x1} ${y1} L ${x2} ${y2}`
      : `M ${x1} ${y1} C ${x1} ${y1 + (y2 - y1) * 0.4}, ${x2} ${y2 - (y2 - y1) * 0.4}, ${x2} ${y2}`;

  return {
    d,
    lx: (x1 + x2) / 2 + (dx < 5 ? 10 : 0),
    ly: (y1 + y2) / 2,
    anchor: (dx < 5 ? "start" : "middle") as "start" | "middle" | "end",
  };
}

/* ── Split long labels into two lines ── */

function splitLabel(text: string, max = 22): string[] {
  if (text.length <= max) return [text];
  const mid = Math.floor(text.length / 2);
  let idx = text.lastIndexOf(" ", mid);
  if (idx === -1) idx = text.indexOf(" ", mid);
  if (idx === -1) return [text];
  return [text.slice(0, idx), text.slice(idx + 1)];
}

/* ── Main component ── */

interface TracePathwaySVGProps {
  pathway: TracePathway;
}

export default function TracePathwaySVG({ pathway }: TracePathwaySVGProps) {
  const [showAlt, setShowAlt] = useState(false);

  const nodes = showAlt && pathway.alternateState ? pathway.alternateState.nodes : pathway.nodes;
  const edges = showAlt && pathway.alternateState ? pathway.alternateState.edges : pathway.edges;

  const { items, w, h, backEdgeKeys } = useMemo(() => layoutGraph(nodes, edges), [nodes, edges]);
  const nodeMap = useMemo(() => new Map(items.map((n) => [n.id, n])), [items]);

  const renderedEdges = edges.filter((e) => nodeMap.has(e.from) && nodeMap.has(e.to));

  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
        Trace the Pathway
      </h2>
      <p className="mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground/60">
        {pathway.description}
      </p>

      {/* State toggle */}
      {pathway.alternateState && (
        <div className="mt-4 inline-flex rounded-lg bg-secondary p-1">
          <button
            onClick={() => setShowAlt(false)}
            className={`rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              !showAlt
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pathway.title}
          </button>
          <button
            onClick={() => setShowAlt(true)}
            className={`rounded-md px-4 py-2 text-xs font-medium transition-colors ${
              showAlt
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pathway.alternateState.label}
          </button>
        </div>
      )}

      {/* SVG diagram */}
      {w > 0 && h > 0 && (
        <div className="mt-5 overflow-x-auto -mx-2 px-2">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full mx-auto"
            style={{ maxWidth: Math.max(w, 360), minWidth: 300 }}
            role="img"
            aria-label={`Neural pathway diagram: ${pathway.title}`}
          >
            <defs>
              <marker
                id="arr"
                viewBox="0 0 10 10"
                refX={9}
                refY={5}
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
              </marker>
              <marker
                id="arr-fast"
                viewBox="0 0 10 10"
                refX={9}
                refY={5}
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#D85A30" />
              </marker>
            </defs>

            {/* Edges */}
            {renderedEdges.map((e, i) => {
              const from = nodeMap.get(e.from)!;
              const to = nodeMap.get(e.to)!;
              const isBack = backEdgeKeys.has(`${e.from}->${e.to}`);
              const { d, lx, ly, anchor } = getEdgePath(from, to, isBack, w);
              const route = e.route || "primary";
              const stroke = route === "fast" ? "#D85A30" : "#aaa";
              const dash = route === "slow" ? "6 4" : undefined;
              const marker = route === "fast" ? "arr-fast" : "arr";
              const op = from.active && to.active ? 0.75 : 0.2;
              const lines = e.label ? splitLabel(e.label) : [];

              return (
                <g key={`${e.from}-${e.to}-${i}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={1.5}
                    strokeDasharray={dash}
                    markerEnd={`url(#${marker})`}
                    opacity={op}
                  />
                  {lines.length > 0 && (
                    <text
                      textAnchor={anchor}
                      fontSize={10}
                      fill="#777"
                      stroke="white"
                      strokeWidth={3.5}
                      paintOrder="stroke"
                      opacity={from.active && to.active ? 1 : 0.3}
                    >
                      {lines.map((line, li) => (
                        <tspan
                          key={li}
                          x={lx}
                          y={ly + (li - (lines.length - 1) / 2) * 13}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {items.map((node) => {
              const color = node.badge ? BADGE_COLOR[node.badge] : undefined;
              const op = node.active ? 1 : 0.3;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.cx - NW / 2}, ${node.cy - NH / 2})`}
                  opacity={op}
                >
                  <rect
                    width={NW}
                    height={NH}
                    rx={10}
                    fill="white"
                    stroke={color || "#ddd"}
                    strokeWidth={color ? 2 : 1}
                  />
                  {node.badge && color && (
                    <>
                      <rect
                        x={NW / 2 - 32}
                        y={-9}
                        width={64}
                        height={18}
                        rx={9}
                        fill={color}
                      />
                      <text
                        x={NW / 2}
                        y={3}
                        textAnchor="middle"
                        fontSize={8.5}
                        fontWeight={700}
                        fill="white"
                        style={{ letterSpacing: "0.06em" }}
                      >
                        {BADGE_LABEL[node.badge]}
                      </text>
                    </>
                  )}
                  <text
                    x={NW / 2}
                    y={NH / 2 + (node.badge ? 3 : 5)}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={600}
                    fill="#1a1a1a"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
        {(["input", "prediction", "mismatch", "update"] as TraceBadge[]).map((b) => (
          <span key={b} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BADGE_COLOR[b] }} />
            <span className="text-[11px] text-muted-foreground capitalize">{b}</span>
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0 border-t-[1.5px] border-[#D85A30]" />
          <span className="text-[11px] text-muted-foreground">Fast</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0 border-t-[1.5px] border-dashed border-muted-foreground/60" />
          <span className="text-[11px] text-muted-foreground">Slow</span>
        </span>
      </div>
    </section>
  );
}
