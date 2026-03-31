interface Props {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

/**
 * High-contrast Rubin's Vase / Two Faces SVG.
 *
 * Design: solid dark background with a bright vase silhouette.
 * The contour is carefully shaped so the negative-space face profiles
 * (forehead → brow → nose → lips → chin) are clearly readable.
 */
const RubinVaseFigure = ({ highlighted, assist }: Props) => {
  // Colors
  const dark = "hsl(var(--foreground))";
  const bright = "hsl(var(--card))";
  const accentFill = "hsl(var(--primary) / 0.25)";
  const accentStroke = "hsl(var(--primary))";

  // The key contour — designed so the negative space reads as a face profile.
  // Left side: forehead at top, brow ridge, nose bump, upper lip indent, lower lip, chin.
  // Right side is mirrored.
  const vasePath = `
    M 88 24
    C 88 24, 84 28, 82 36
    C 80 44, 82 50, 86 56
    C 90 62, 92 66, 92 72
    C 92 78, 88 86, 82 94
    C 76 102, 68 112, 62 124
    C 56 136, 52 148, 52 160
    C 52 176, 58 192, 68 206
    C 78 220, 84 230, 88 244
    C 90 250, 88 256, 84 260
    L 196 260
    C 192 256, 190 250, 192 244
    C 196 230, 202 220, 212 206
    C 222 192, 228 176, 228 160
    C 228 148, 224 136, 218 124
    C 212 112, 204 102, 198 94
    C 192 86, 188 78, 188 72
    C 188 66, 190 62, 194 56
    C 198 50, 200 44, 198 36
    C 196 28, 192 24, 192 24
    Z
  `;

  const showAssistA = assist === "a";
  const showAssistB = assist === "b";
  const showHighA = highlighted === "a";
  const showHighB = highlighted === "b";

  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-full"
      role="img"
      aria-label="Ambiguous figure: a bright vase shape on a dark background, or two dark face profiles facing each other"
    >
      {/* Dark background — this IS the face region */}
      <rect
        width="280"
        height="280"
        rx="16"
        fill={dark}
        style={{ transition: "fill 0.35s ease" }}
      />

      {/* Assist overlay: highlight the face regions (dark sides) */}
      {showAssistB && (
        <>
          {/* Left face region highlight */}
          <path
            d={`M 0 0 L 0 280 L 84 260 ${vasePath.split("Z")[0].split("L")[0]} L 88 24 L 88 0 Z`}
            fill={accentFill}
            style={{ transition: "fill 0.3s ease" }}
          />
          {/* Simplified: just overlay translucent accent on the sides */}
          <rect x="0" y="0" width="88" height="280" rx="16" fill={accentFill} />
          <rect x="192" y="0" width="88" height="280" rx="16" fill={accentFill} />
        </>
      )}

      {/* Bright vase shape */}
      <path
        d={vasePath}
        fill={showAssistA || showHighA ? accentFill : bright}
        stroke={showAssistA || showHighA ? accentStroke : "none"}
        strokeWidth={showAssistA || showHighA ? 2 : 0}
        style={{ transition: "fill 0.35s ease, stroke 0.35s ease" }}
      />

      {/* Result highlight overlays */}
      {showHighB && (
        <>
          <rect x="0" y="0" width="88" height="280" rx="16" fill={accentFill} />
          <rect x="192" y="0" width="88" height="280" rx="16" fill={accentFill} />
        </>
      )}

      {/* Thin inner contour for vase definition */}
      <path
        d={vasePath}
        fill="none"
        stroke={showHighA ? accentStroke : bright}
        strokeWidth="0.5"
        opacity={showHighA ? 1 : 0.3}
        style={{ transition: "stroke 0.35s ease, opacity 0.35s ease" }}
      />
    </svg>
  );
};

export default RubinVaseFigure;
