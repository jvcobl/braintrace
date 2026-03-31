interface Props {
  highlighted: "none" | "a" | "b";
}

/** Clean SVG Rubin's vase / two faces ambiguous figure. */
const RubinVaseFigure = ({ highlighted }: Props) => {
  const vaseFill =
    highlighted === "a"
      ? "hsl(var(--primary) / 0.18)"
      : "hsl(var(--card))";
  const vaseStroke =
    highlighted === "a"
      ? "hsl(var(--primary))"
      : "hsl(var(--border))";
  const bgFill =
    highlighted === "b"
      ? "hsl(var(--primary) / 0.18)"
      : "hsl(var(--secondary))";

  return (
    <svg
      viewBox="0 0 240 280"
      className="w-full h-full"
      role="img"
      aria-label="Ambiguous figure: a white vase shape on a dark background, or two dark face profiles facing each other"
    >
      <rect
        width="240"
        height="280"
        rx="14"
        fill={bgFill}
        style={{ transition: "fill 0.35s ease" }}
      />
      <path
        d="
          M 80 30
          C 80 30, 95 52, 90 84
          C 85 116, 68 138, 68 150
          C 68 170, 85 200, 90 224
          C 95 240, 83 256, 80 256
          L 160 256
          C 157 256, 145 240, 150 224
          C 155 200, 172 170, 172 150
          C 172 138, 155 116, 150 84
          C 145 52, 160 30, 160 30
          Z
        "
        fill={vaseFill}
        stroke={vaseStroke}
        strokeWidth={highlighted !== "none" ? 2 : 1}
        style={{ transition: "fill 0.35s ease, stroke 0.35s ease" }}
      />
    </svg>
  );
};

export default RubinVaseFigure;
