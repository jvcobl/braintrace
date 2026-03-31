import type { ComponentType } from "react";
import RubinVaseFigure from "./RubinVaseFigure";
import ColorConstancyFigure from "./ColorConstancyFigure";
import NeckerCubeFigure from "./NeckerCubeFigure";

export interface FigureProps {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

const figureRegistry: Record<string, ComponentType<FigureProps>> = {
  "rubin-vase": RubinVaseFigure,
  "color-constancy": ColorConstancyFigure,
  "necker-cube": NeckerCubeFigure,
};

export default figureRegistry;
