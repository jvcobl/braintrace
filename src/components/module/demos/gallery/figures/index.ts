import type { ComponentType } from "react";
import RubinVaseFigure from "./RubinVaseFigure";
import ColorConstancyFigure from "./ColorConstancyFigure";

export interface FigureProps {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

const figureRegistry: Record<string, ComponentType<FigureProps>> = {
  "rubin-vase": RubinVaseFigure,
  "color-constancy": ColorConstancyFigure,
};

export default figureRegistry;
