import type { ComponentType } from "react";
import RubinVaseFigure from "./RubinVaseFigure";
import NeckerCubeFigure from "./NeckerCubeFigure";
import DuckRabbitFigure from "./DuckRabbitFigure";
import ColorConstancyFigure from "./ColorConstancyFigure";

export interface FigureProps {
  highlighted: "none" | "a" | "b";
  assist: "none" | "a" | "b";
}

const figureRegistry: Record<string, ComponentType<FigureProps>> = {
  "rubin-vase": RubinVaseFigure,
  "necker-cube": NeckerCubeFigure,
  "duck-rabbit": DuckRabbitFigure,
  "color-constancy": ColorConstancyFigure,
};

export default figureRegistry;
