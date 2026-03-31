import type { ComponentType } from "react";
import RubinVaseFigure from "./RubinVaseFigure";
import NeckerCubeFigure from "./NeckerCubeFigure";
import DuckRabbitFigure from "./DuckRabbitFigure";

export interface FigureProps {
  highlighted: "none" | "a" | "b";
}

/** Map example id → SVG figure component */
const figureRegistry: Record<string, ComponentType<FigureProps>> = {
  "rubin-vase": RubinVaseFigure,
  "necker-cube": NeckerCubeFigure,
  "duck-rabbit": DuckRabbitFigure,
};

export default figureRegistry;
