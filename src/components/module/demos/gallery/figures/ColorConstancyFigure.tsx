interface Props {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

/**
 * Color Constancy / Illumination Ambiguity figure.
 *
 * A simple striped panel with two carefully chosen mid-tone colors
 * set against a gradient that makes the lighting ambiguous.
 * - Interpretation A: "Blue and dark/black" (brain assumes bright, even light)
 * - Interpretation B: "White/light and gold" (brain assumes shadow, compensates)
 *
 * The assist mode shifts the surrounding context to bias one reading.
 */
const ColorConstancyFigure = ({ highlighted, assist }: Props) => {
  // The ambiguous stripe colors — chosen to sit at the perceptual boundary.
  // A desaturated blue-lavender and a dark warm brown.
  const stripeA = "#7e8cc8"; // periwinkle — reads as blue OR washed-out white
  const stripeB = "#6b5c3e"; // olive-brown — reads as black OR gold

  // Context gradient shifts based on assist
  const gradTopColor =
    assist === "a"
      ? "hsl(220, 15%, 75%)"  // bright neutral → biases "blue & dark"
      : assist === "b"
        ? "hsl(40, 30%, 35%)"   // warm shadow → biases "white & gold"
        : "hsl(45, 15%, 55%)";  // neutral ambiguous

  const gradBottomColor =
    assist === "a"
      ? "hsl(220, 10%, 85%)"
      : assist === "b"
        ? "hsl(40, 25%, 25%)"
        : "hsl(40, 12%, 65%)";

  const accentBorder =
    highlighted !== "none" ? "hsl(var(--primary))" : "none";

  return (
    <svg
      viewBox="0 0 260 300"
      className="w-full h-full"
      role="img"
      aria-label="Striped panel with ambiguous colors that can be perceived as blue-and-dark or white-and-gold depending on assumed lighting"
    >
      <defs>
        <linearGradient id="cc-context-grad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={gradTopColor} />
          <stop offset="100%" stopColor={gradBottomColor} />
        </linearGradient>
        <clipPath id="cc-panel-clip">
          <rect x="55" y="40" width="150" height="220" rx="6" />
        </clipPath>
        {/* Diagonal light streak to create illumination ambiguity */}
        <linearGradient id="cc-light-streak" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
      </defs>

      {/* Surrounding context — the ambiguous "lighting" */}
      <rect
        width="260"
        height="300"
        rx="16"
        fill="url(#cc-context-grad)"
        style={{ transition: "fill 0.5s ease" }}
      />

      {/* Diagonal light wash across background */}
      <rect
        width="260"
        height="300"
        rx="16"
        fill="url(#cc-light-streak)"
      />

      {/* Simple dress/panel silhouette — narrow at top, wider at bottom */}
      <g clipPath="url(#cc-panel-clip)">
        {/* Alternating stripes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="55"
            y={40 + i * 27.5}
            width="150"
            height="27.5"
            fill={i % 2 === 0 ? stripeA : stripeB}
            style={{ transition: "fill 0.4s ease" }}
          />
        ))}

        {/* Subtle light gradient overlay on the panel itself */}
        <rect
          x="55"
          y="40"
          width="150"
          height="220"
          fill="url(#cc-light-streak)"
          opacity="0.6"
        />
      </g>

      {/* Panel border */}
      <rect
        x="55"
        y="40"
        width="150"
        height="220"
        rx="6"
        fill="none"
        stroke={accentBorder}
        strokeWidth={highlighted !== "none" ? 2.5 : 0}
        style={{ transition: "stroke 0.35s ease" }}
      />

      {/* Assist labels */}
      {assist === "a" && (
        <g>
          <rect x="75" y="268" width="110" height="20" rx="4" fill="hsl(var(--primary) / 0.15)" />
          <text x="130" y="282" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="hsl(var(--primary))" fontWeight="500">
            Even, bright light
          </text>
        </g>
      )}
      {assist === "b" && (
        <g>
          <rect x="75" y="268" width="110" height="20" rx="4" fill="hsl(var(--primary) / 0.15)" />
          <text x="130" y="282" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="hsl(var(--primary))" fontWeight="500">
            Deep shadow
          </text>
        </g>
      )}
    </svg>
  );
};

export default ColorConstancyFigure;
