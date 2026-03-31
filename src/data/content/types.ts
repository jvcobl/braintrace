// ============================================================
// NEUROROUTE — SHARED CONTENT TYPES
// ============================================================
// Canonical type definitions for all content.
// Every unit file conforms to these shapes.
// ============================================================

export interface UnitMeta {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  majorStructures: string[];
  lectureTopics: string[];
}

export interface ConceptCard {
  id: string;
  term: string;
  definition: string;
  structures: string[];
  sensitivity?: "high";
  sensitivityNote?: string;
}

export interface PathwayStep {
  number: number;
  structure: string;
  description: string;
}

export interface PathwayBlock {
  id: string;
  title: string;
  description: string;
  steps: PathwayStep[];
}

export interface DistinctionBlock {
  id: string;
  termA: string;
  termB: string;
  descriptionA: string;
  descriptionB: string;
  keyDifference: string;
}

export interface CaseNote {
  id: string;
  title: string;
  content: string;
  sensitivity: "standard" | "high";
  sensitivityNote?: string;
}

export interface ReviewQuestion {
  id: string;
  question: string;
  hint: string;
}

/** A complete unit content bundle. */
export interface UnitContent {
  meta: UnitMeta;
  conceptCards: ConceptCard[];
  pathways: PathwayBlock[];
  distinctions: DistinctionBlock[];
  caseNotes: CaseNote[];
  review: ReviewQuestion[];
}
