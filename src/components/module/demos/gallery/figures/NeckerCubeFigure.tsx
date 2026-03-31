interface Props {
  highlighted: "none" | "a" | "b";
}

/** Clean wireframe Necker cube SVG. */
const NeckerCubeFigure = ({ highlighted }: Props) => {
  const stroke = "hsl(var(--foreground))";
  const faceAFill =
    highlighted === "a" ? "hsl(var(--primary) / 0.15)" : "none";
  const faceBFill =
    highlighted === "b" ? "hsl(var(--primary) / 0.15)" : "none";

  // Cube vertices (isometric-ish)
  const f = { // front face (lower-left reading)
    tl: "70,90",  tr: "160,90",
    bl: "70,180", br: "160,180",
  };
  const b = { // back face (upper-right reading)
    tl: "100,60",  tr: "190,60",
    bl: "100,150", br: "190,150",
  };

  return (
    <svg
      viewBox="0 0 240 240"
      className="w-full h-full"
      role="img"
      aria-label="Wireframe cube that can be seen from two different angles"
    >
      <rect width="240" height="240" rx="14" fill="hsl(var(--secondary))" />

      {/* Face highlights */}
      <polygon
        points={`${f.tl} ${f.tr} ${f.br} ${f.bl}`}
        fill={faceAFill}
        style={{ transition: "fill 0.35s ease" }}
      />
      <polygon
        points={`${b.tl} ${b.tr} ${b.br} ${b.bl}`}
        fill={faceBFill}
        style={{ transition: "fill 0.35s ease" }}
      />

      {/* Front face */}
      <polygon
        points={`${f.tl} ${f.tr} ${f.br} ${f.bl}`}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Back face */}
      <polygon
        points={`${b.tl} ${b.tr} ${b.br} ${b.bl}`}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Connecting edges */}
      {[
        [f.tl, b.tl],
        [f.tr, b.tr],
        [f.bl, b.bl],
        [f.br, b.br],
      ].map(([from, to], i) => (
        <line
          key={i}
          x1={from.split(",")[0]}
          y1={from.split(",")[1]}
          x2={to.split(",")[0]}
          y2={to.split(",")[1]}
          stroke={stroke}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

export default NeckerCubeFigure;
