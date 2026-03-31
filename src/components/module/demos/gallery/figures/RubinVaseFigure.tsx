import rubinVaseImg from "@/assets/rubin-vase.png";

interface Props {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

/**
 * Rubin's Vase figure using the real classic image.
 * Assist mode overlays a translucent tint on the vase or face regions.
 */
const RubinVaseFigure = ({ highlighted, assist }: Props) => {
  const showOverlay = assist !== "none" || highlighted !== "none";
  const targetA = assist === "a" || highlighted === "a";
  const targetB = assist === "b" || highlighted === "b";

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black">
      <img
        src={rubinVaseImg}
        alt="Ambiguous figure: a bright vase shape on a dark background, or two dark face profiles facing each other"
        className="w-full h-full object-contain"
        draggable={false}
      />

      {/* Assist / highlight overlay for vase (center region) */}
      {targetA && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: "radial-gradient(ellipse 40% 80% at 50% 50%, hsl(var(--primary) / 0.2) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Assist / highlight overlay for faces (side regions) */}
      {targetB && (
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 flex">
          <div
            className="w-1/3 h-full"
            style={{ background: "linear-gradient(to right, hsl(var(--primary) / 0.2), transparent)" }}
          />
          <div className="flex-1" />
          <div
            className="w-1/3 h-full"
            style={{ background: "linear-gradient(to left, hsl(var(--primary) / 0.2), transparent)" }}
          />
        </div>
      )}

      {/* Assist labels */}
      {assist !== "none" && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="rounded-md bg-primary/15 px-2.5 py-1 text-[10px] font-medium text-primary backdrop-blur-sm">
            {assist === "a" ? "Focus on the bright center" : "Focus on the dark profiles"}
          </span>
        </div>
      )}
    </div>
  );
};

export default RubinVaseFigure;
