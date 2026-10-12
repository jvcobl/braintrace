/**
 * Slightly darker shades of the loop-role accent colors, used only where white
 * text sits on a solid accent badge, so the label meets WCAG AA (4.5:1).
 */
const BADGE_SHADE: Record<string, string> = {
  "#7F77DD": "#716AC5",
  "#378ADD": "#2F77BE",
  "#D85A30": "#C2512B",
  "#1D9E75": "#188562",
};

export const badgeFill = (accent: string) => BADGE_SHADE[accent.toUpperCase()] ?? accent;
