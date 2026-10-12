// ============================================================
// BRAINTRACE — SHARED MODULE & TRACE TYPES
// ============================================================

export type TraceBadge = "prediction" | "input" | "mismatch" | "update";

export interface PredictionLens {
  whatHappened: string;
  whatBrainPredicted: string;
  whatInputArrived: string;
  whatMismatchMattered: string;
  whatPathwayHandledIt: string;
  howBrainUpdated: string;
  nbb302Connection: string;
}

export interface TraceNode {
  structureId: string;
  label: string;
  badge?: TraceBadge;
  active: boolean;
}

export interface TraceEdge {
  from: string;
  to: string;
  label?: string;
  route?: "primary" | "fast" | "slow";
  /**
   * Which end gets the arrowhead (default "to"). "from" keeps the edge's place in
   * the top-down layout while showing influence flowing back up, e.g. the amygdala
   * amplifying the brainstem startle circuit.
   */
  arrowAt?: "to" | "from";
}

export interface TracePathway {
  title: string;
  description: string;
  nodes: TraceNode[];
  edges: TraceEdge[];
  alternateState?: {
    label: string;
    nodes: TraceNode[];
    edges: TraceEdge[];
  };
}

export interface GoDeeperCard {
  id: string;
  title: string;
  explanation: string;
  keyStructures: string[];
  whyItMattersHere: string;
  clinicalNote?: string;
}

export type ConceptPageId = "loop" | "precision-attention" | "failure";

export interface ModuleDefinition {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  nbb302Units: number[];
  predictionLens: PredictionLens;
  tracePathway: TracePathway;
  goDeeper: GoDeeperCard[];
  conceptLinks: ConceptPageId[];
  traceBridge?: string;
}
