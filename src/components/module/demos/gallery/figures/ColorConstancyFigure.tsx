import dressImg from "@/assets/the-dress.jpg";

interface Props {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

/**
 * "The Dress" color-constancy figure using the real photograph.
 * Assist mode shifts an overlay to bias one lighting interpretation.
 */
const ColorConstancyFigure = ({ highlighted, assist }: Props) => {
  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
      <img
        src={dressImg}
        alt="A photograph of a dress whose colors are ambiguous — perceived as either blue-and-black or white-and-gold depending on the viewer's lighting assumption"
        className="w-full h-full object-contain"
        draggable={false}
      />

      {/* Assist overlay: bright/even light bias → colors appear as-is (blue & black) */}
      {assist === "a" && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, hsla(220, 15%, 85%, 0.25) 0%, transparent 60%)" }}
        />
      )}

      {/* Assist overlay: shadow bias → brain compensates toward white & gold */}
      {assist === "b" && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, hsla(40, 30%, 25%, 0.3) 0%, hsla(40, 25%, 35%, 0.15) 100%)" }}
        />
      )}

      {/* Highlight border */}
      {highlighted !== "none" && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary/40 pointer-events-none" />
      )}

      {/* Assist labels */}
      {assist !== "none" && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="rounded-md bg-primary/15 px-2.5 py-1 text-[10px] font-medium text-primary backdrop-blur-sm">
            {assist === "a" ? "Imagine even, bright light" : "Imagine deep shadow"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ColorConstancyFigure;
