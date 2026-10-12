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

const NW = 152;
const NH = 54;
const LG = 100;
const CG = 184;
const PAD = 48;
/** Graphs wider than this keep a readable size on phones and scroll sideways instead of shrinking. */
const WIDE_GRAPH = 500;

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

  const fwdEdges = edges.filter(
    (e) => idSet.has(e.from) && idSet.has(e.to) && !backEdgeKeys.has(`${e.from}->${e.to}`),
  );

  const preds = new Map<string, string[]>();
  for (const id of ids) preds.set(id, []);
  for (const e of fwdEdges) preds.get(e.to)!.push(e.from);

  const connected = new Set<string>();
  for (const e of edges) {
    if (idSet.has(e.from) && idSet.has(e.to)) {
      connected.add(e.from);
      connected.add(e.to);
    }
  }

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

  const maxConnected = Math.max(
    0,
    ...ids.filter((id) => connected.has(id)).map((id) => layerOf.get(id) ?? 0),
  );
  for (const id of ids) {
    if (!connected.has(id)) layerOf.set(id, maxConnected + 1);
  }

  const groups = new Map<number, string[]>();
  for (const [id, l] of layerOf) {
    if (!groups.has(l)) groups.set(l, []);
    groups.get(l)!.push(id);
  }

  const maxLayer = Math.max(0, ...layerOf.values());
  const maxPerLayer = Math.max(1, ...Array.from(groups.values()).map((g) => g.length));
  const hasBack = backEdgeKeys.size > 0;

  const w = PAD * 2 + Math.max((maxPerLayer - 1) * CG, NW) + (hasBack ? 90 : 0);
  const h = PAD * 2 + maxLayer * LG + NH;

  const items: Pos[] = [];
  for (let l = 0; l <= maxLayer; l++) {
    const group = groups.get(l) || [];
    const count = group.length;
    const layerW = (count - 1) * CG;
    const baseW = w - (hasBack ? 90 : 0);
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

  // Resolve edge-through-node collisions
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

  const minCx = Math.min(...items.map((n) => n.cx));
  const desiredMin = PAD + NW / 2;
  if (minCx < desiredMin) {
    const shift = desiredMin - minCx;
    for (const n of items) n.cx += shift;
  }
  const maxCx = Math.max(...items.map((n) => n.cx));
  const finalW = maxCx + NW / 2 + PAD + (hasBack ? 90 : 0);

  return { items, w: finalW, h, backEdgeKeys };
}

/* ── Edge path + label position ── */

function getEdgePath(from: Pos, to: Pos, isBack: boolean, totalW: number) {
  if (isBack) {
    const rx = totalW - 24;
    return {
      d: `M ${from.cx + NW / 2} ${from.cy} C ${rx} ${from.cy}, ${rx} ${to.cy}, ${to.cx + NW / 2} ${to.cy}`,
      lx: rx - 24,
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
    lx: (x1 + x2) / 2 + (dx < 5 ? 12 : 0),
    ly: (y1 + y2) / 2,
    anchor: (dx < 5 ? "start" : "middle") as "start" | "middle" | "end",
  };
}

/* ── Split long labels ── */

function splitLabel(text: string, max = 22): string[] {
  if (text.length <= max) return [text];
  const mid = Math.floor(text.length / 2);
  let idx = text.lastIndexOf(" ", mid);
  if (idx === -1) idx = text.indexOf(" ", mid);
  if (idx === -1) return [text];
  return [text.slice(0, idx), text.slice(idx + 1)];
}

/* ── Edge label placement: keep labels clear of nodes, badges and each other ── */

type Anchor = "start" | "middle" | "end";

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PlacedLabel {
  lines: string[];
  x: number;
  y: number;
  anchor: Anchor;
}

const LABEL_CHAR_W = 6; // generous width of one 10px system-ui glyph
const LABEL_LINE_H = 14;
const LABEL_GAP = 3;

function wrapWords(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(" ")) {
    const last = lines[lines.length - 1];
    if (last && (last + " " + word).length <= maxChars) lines[lines.length - 1] = last + " " + word;
    else lines.push(word);
  }
  return lines;
}

function labelBox(lines: string[], x: number, y: number, anchor: Anchor): Box {
  const w = Math.max(...lines.map((l) => l.length)) * LABEL_CHAR_W;
  const h = (lines.length - 1) * LABEL_LINE_H + 12;
  const left = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
  return { x: left, y: y - (lines.length - 1) * (LABEL_LINE_H / 2) - 9, w, h };
}

function overlaps(a: Box, b: Box) {
  return (
    a.x < b.x + b.w + LABEL_GAP &&
    a.x + a.w + LABEL_GAP > b.x &&
    a.y < b.y + b.h + LABEL_GAP &&
    a.y + a.h + LABEL_GAP > b.y
  );
}

function placeLabels(
  edges: TraceEdge[],
  nodeMap: Map<string, Pos>,
  backEdgeKeys: Set<string>,
  totalW: number,
): (PlacedLabel | null)[] {
  const obstacles: Box[] = [];
  const xs = [...nodeMap.values()].map((n) => n.cx);
  const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
  for (const n of nodeMap.values()) {
    obstacles.push({ x: n.cx - NW / 2, y: n.cy - NH / 2, w: NW, h: NH });
    if (n.badge) obstacles.push({ x: n.cx - 34, y: n.cy - NH / 2 - 10, w: 68, h: 20 });
  }

  return edges.map((e) => {
    if (!e.label) return null;
    const from = nodeMap.get(e.from)!;
    const to = nodeMap.get(e.to)!;
    const isBack = backEdgeKeys.has(`${e.from}->${e.to}`);
    const base = getEdgePath(from, to, isBack, totalW);
    let lines = splitLabel(e.label);

    if (isBack) {
      // Loop-back edges bow out to the right margin. Sit the label just inside the
      // curve and wrap it to the room left between the nodes and the curve.
      const rx = totalW - 24;
      const curveX = 0.125 * (from.cx + NW / 2) + 0.75 * rx + 0.125 * (to.cx + NW / 2);
      const nodesRight = Math.max(...[...nodeMap.values()].map((n) => n.cx + NW / 2));
      const room = curveX - 8 - (nodesRight + LABEL_GAP + 2);
      lines = wrapWords(e.label, Math.max(8, Math.floor(room / LABEL_CHAR_W)));
      const placed: PlacedLabel = { lines, x: curveX - 8, y: base.ly, anchor: "end" };
      obstacles.push(labelBox(lines, placed.x, placed.y, placed.anchor));
      return placed;
    }

    // Candidate anchors, preferred first: curved edges put the label on the side
    // facing away from the diagram's center, so labels of edges that fan out from
    // (or converge on) one node land on opposite sides instead of meeting.
    let anchors: { x: number; anchor: Anchor }[];
    if (base.anchor === "start") {
      anchors = [
        { x: base.lx, anchor: "start" },
        { x: base.lx - 24, anchor: "end" },
      ];
    } else {
      const away: Anchor = base.lx < centerX ? "end" : "start";
      const toward: Anchor = away === "end" ? "start" : "end";
      const off = (a: Anchor) => (a === "start" ? 8 : -8);
      anchors = [
        { x: base.lx + off(away), anchor: away },
        { x: base.lx + off(toward), anchor: toward },
        { x: base.lx, anchor: "middle" },
      ];
    }

    let chosen: PlacedLabel | null = null;
    // Vertical nudges; +-50 lands in the gap between two node rows (row pitch 100).
    outer: for (const dy of [0, -16, 16, -32, 32, -50, 50, -64, 64]) {
      for (const a of anchors) {
        const box = labelBox(lines, a.x, base.ly + dy, a.anchor);
        if (box.x < 2 || box.x + box.w > totalW - 2) continue;
        if (obstacles.some((o) => overlaps(box, o))) continue;
        chosen = { lines, x: a.x, y: base.ly + dy, anchor: a.anchor };
        obstacles.push(box);
        break outer;
      }
    }
    if (!chosen) {
      chosen = { lines, x: anchors[0].x, y: base.ly, anchor: anchors[0].anchor };
      obstacles.push(labelBox(lines, chosen.x, chosen.y, chosen.anchor));
    }
    return chosen;
  });
}

/* ── Main component ── */

interface TracePathwaySVGProps {
  pathway: TracePathway;
  onAdvanceToExplain?: () => void;
}

export default function TracePathwaySVG({ pathway, onAdvanceToExplain }: TracePathwaySVGProps) {
  const [showAlt, setShowAlt] = useState(false);

  const nodes = showAlt && pathway.alternateState ? pathway.alternateState.nodes : pathway.nodes;
  const edges = showAlt && pathway.alternateState ? pathway.alternateState.edges : pathway.edges;

  const { items, w, h, backEdgeKeys } = useMemo(() => layoutGraph(nodes, edges), [nodes, edges]);
  const nodeMap = useMemo(() => new Map(items.map((n) => [n.id, n])), [items]);

  const renderedEdges = useMemo(
    () => edges.filter((e) => nodeMap.has(e.from) && nodeMap.has(e.to)),
    [edges, nodeMap],
  );
  const placedLabels = useMemo(
    () => placeLabels(renderedEdges, nodeMap, backEdgeKeys, w),
    [renderedEdges, nodeMap, backEdgeKeys, w],
  );

  const usedBadges = useMemo(
    () => [...new Set(nodes.filter((n) => n.badge).map((n) => n.badge!))] as TraceBadge[],
    [nodes],
  );

  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
        Trace the Pathway
      </h2>
      <h3 className="mt-3 text-lg font-medium text-foreground">{pathway.title}</h3>
      <p className="mt-1.5 text-sm text-gray-500 max-w-lg">{pathway.description}</p>

      {/* State toggle */}
      {pathway.alternateState && (
        <div className="mt-5 inline-flex rounded-full bg-gray-100 p-0.5">
          <button
            onClick={() => setShowAlt(false)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              !showAlt
                ? "bg-white text-foreground shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {pathway.title}
          </button>
          <button
            onClick={() => setShowAlt(true)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              showAlt
                ? "bg-white text-foreground shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {pathway.alternateState.label}
          </button>
        </div>
      )}

      {/* SVG diagram */}
      {w > 0 && h > 0 && (
        <div
          key={showAlt ? "alt" : "default"}
          className="mt-6 overflow-x-auto border border-gray-200 rounded-xl bg-gray-50/40 p-3 sm:p-8"
          style={{ animation: "tpFadeIn 250ms ease-out" }}
        >
          <style>{`@keyframes tpFadeIn{from{opacity:0}to{opacity:1}}`}</style>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full mx-auto"
            style={{ maxWidth: Math.max(w, 360), minWidth: w > WIDE_GRAPH ? 480 : 300 }}
            role="img"
            aria-label={`Neural pathway diagram: ${pathway.title}`}
          >
            <defs>
              {/* Subtle shadow for active nodes */}
              <filter id="nodeShadow" x="-8%" y="-8%" width="116%" height="124%">
                <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#000" floodOpacity="0.06" />
              </filter>
              {/* Arrow markers */}
              <marker id="arr" viewBox="0 0 10 8" refX={9} refY={4} markerWidth={8} markerHeight={7} orient="auto-start-reverse">
                <path d="M 0 0 L 10 4 L 0 8 z" fill="#bbb" />
              </marker>
              <marker id="arr-fast" viewBox="0 0 10 8" refX={9} refY={4} markerWidth={8} markerHeight={7} orient="auto-start-reverse">
                <path d="M 0 0 L 10 4 L 0 8 z" fill="#D85A30" />
              </marker>
              <marker id="arr-slow" viewBox="0 0 10 8" refX={9} refY={4} markerWidth={8} markerHeight={7} orient="auto-start-reverse">
                <path d="M 0 0 L 10 4 L 0 8 z" fill="#ccc" />
              </marker>
            </defs>

            {/* Edges */}
            {renderedEdges.map((e, i) => {
              const from = nodeMap.get(e.from)!;
              const to = nodeMap.get(e.to)!;
              const isBack = backEdgeKeys.has(`${e.from}->${e.to}`);
              const { d } = getEdgePath(from, to, isBack, w);
              const route = e.route || "primary";
              const bothActive = from.active && to.active;

              const stroke = route === "fast" ? "#D85A30" : route === "slow" ? "#ccc" : "#bbb";
              const strokeW = route === "fast" ? 2 : 1.5;
              const dash = route === "slow" ? "7 5" : undefined;
              const marker = route === "fast" ? "arr-fast" : route === "slow" ? "arr-slow" : "arr";

              return (
                <g key={`${e.from}-${e.to}-${i}`} opacity={bothActive ? 1 : 0.2}>
                  <path
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeW}
                    strokeDasharray={dash}
                    markerEnd={e.arrowAt === "from" ? undefined : `url(#${marker})`}
                    markerStart={e.arrowAt === "from" ? `url(#${marker})` : undefined}
                    opacity={0.7}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {items.map((node) => {
              const color = node.badge ? BADGE_COLOR[node.badge] : undefined;

              if (!node.active) {
                // Inactive: dashed border, muted fill, no shadow
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.cx - NW / 2}, ${node.cy - NH / 2})`}
                  >
                    <rect
                      width={NW}
                      height={NH}
                      rx={12}
                      fill="#f8f8f8"
                      stroke="#ddd"
                      strokeWidth={1}
                      strokeDasharray="4 3"
                    />
                    <text
                      x={NW / 2}
                      y={NH / 2 + 5}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#bbb"
                      fontFamily="system-ui, sans-serif"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              }

              // Active node
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.cx - NW / 2}, ${node.cy - NH / 2})`}
                  filter="url(#nodeShadow)"
                >
                  <rect
                    width={NW}
                    height={NH}
                    rx={12}
                    fill="white"
                    stroke={color || "#e0e0e0"}
                    strokeWidth={color ? 2 : 1}
                  />
                  {/* Badge pill */}
                  {node.badge && color && (
                    <>
                      <rect
                        x={NW / 2 - 34}
                        y={-10}
                        width={68}
                        height={20}
                        rx={10}
                        fill={color}
                      />
                      <text
                        x={NW / 2}
                        y={4}
                        textAnchor="middle"
                        fontSize={8.5}
                        fontWeight={700}
                        fill="white"
                        fontFamily="system-ui, sans-serif"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {BADGE_LABEL[node.badge]}
                      </text>
                    </>
                  )}
                  {/* Label */}
                  <text
                    x={NW / 2}
                    y={NH / 2 + (node.badge ? 4 : 5)}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={600}
                    fill="#1a1a1a"
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Edge labels: drawn after nodes so a node can never cover a label */}
            {renderedEdges.map((e, i) => {
              const placed = placedLabels[i];
              if (!placed) return null;
              const bothActive = nodeMap.get(e.from)!.active && nodeMap.get(e.to)!.active;
              return (
                <text
                  key={`label-${e.from}-${e.to}-${i}`}
                  textAnchor={placed.anchor}
                  fontSize={10}
                  fill="#6b7280"
                  stroke="white"
                  strokeWidth={4}
                  paintOrder="stroke"
                  fontFamily="system-ui, sans-serif"
                  opacity={bothActive ? 1 : 0.2}
                >
                  {placed.lines.map((line, li) => (
                    <tspan key={li} x={placed.x} y={placed.y + (li - (placed.lines.length - 1) / 2) * LABEL_LINE_H}>
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            })}
          </svg>
        </div>
      )}

      {w > WIDE_GRAPH && (
        <p className="mt-2 text-center text-xs text-muted-foreground sm:hidden">
          Scroll sideways to see the whole diagram.
        </p>
      )}

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2 justify-center">
        {usedBadges.map((b) => (
          <span key={b} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BADGE_COLOR[b] }} />
            <span className="text-xs text-gray-500 capitalize">{b}</span>
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-0 border-t-2 border-[#D85A30]" />
          <span className="text-xs text-gray-500">Fast route</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-0 border-t-[1.5px] border-dashed border-gray-300" />
          <span className="text-xs text-gray-500">Slow route</span>
        </span>
      </div>

      {onAdvanceToExplain && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onAdvanceToExplain}
            className="inline-flex items-center gap-2 rounded-sm px-2 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Read the explanation
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
