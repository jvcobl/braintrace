interface Props {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

/**
 * High-quality Necker Cube SVG.
 *
 * A wireframe cube with no shading or perspective cues.
 * - Interpretation A: lower-left face is in front (viewed from above-right)
 * - Interpretation B: upper-right face is in front (viewed from below-left)
 *
 * Assist mode tints the "front" face to bias one reading.
 * Highlight mode shows which face the user selected.
 */
const NeckerCubeFigure = ({ highlighted, assist }: Props) => {
  const stroke = "hsl(var(--foreground))";
  const bg = "hsl(var(--secondary))";
  const accentFill = "hsl(var(--primary) / 0.18)";
  const accentStroke = "hsl(var(--primary))";

  const fA = [
    [62, 118],
    [152, 118],
    [152, 208],
    [62, 208],
  ] as const;

  const fB = [
    [108, 72],
    [198, 72],
    [198, 162],
    [108, 162],
  ] as const;

  const toPoints = (face: readonly (readonly [number, number])[]) =>
    face.map((p) => p.join(",")).join(" ");

  const edges = fA.map((p, i) => ({ from: p, to: fB[i] }));

  const showAssistA = assist === "a";
  const showAssistB = assist === "b";
  const showHighA = highlighted === "a";
  const showHighB = highlighted === "b";

  return (
    <svg
      viewBox="0 0 260 280"
      className="w-full h-full"
      role="img"
      aria-label="Wireframe cube that can be perceived with either face in front"
    >
      <rect width="260" height="280" rx="16" fill={bg} />

      <polygon
        points={toPoints(fA)}
        fill={showAssistA || showHighA ? accentFill : "none"}
        stroke="none"
        style={{ transition: "fill 0.35s ease" }}
      />

      <polygon
        points={toPoints(fB)}
        fill={showAssistB || showHighB ? accentFill : "none"}
        stroke="none"
        style={{ transition: "fill 0.35s ease" }}
      />

      <polygon
        points={toPoints(fB)}
        fill="none"
        stroke={showHighB ? accentStroke : stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.35s ease" }}
      />

      {edges.map(({ from, to }, i) => (
        <line
          key={i}
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      <polygon
        points={toPoints(fA)}
        fill="none"
        stroke={showHighA ? accentStroke : stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.35s ease" }}
      />

      {showAssistA && (
        <g>
          <rect x="65" y="246" width="130" height="20" rx="4" fill="hsl(var(--primary) / 0.15)" />
          <text x="130" y="260" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="hsl(var(--primary))" fontWeight="500">
            Viewed from above
          </text>
        </g>
      )}
      {showAssistB && (
        <g>
          <rect x="65" y="246" width="130" height="20" rx="4" fill="hsl(var(--primary) / 0.15)" />
          <text x="130" y="260" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="hsl(var(--primary))" fontWeight="500">
            Viewed from below
          </text>
        </g>
      )}
    </svg>
  );
};

export default NeckerCubeFigure;
