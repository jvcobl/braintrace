// ============================================================
// NEUROROUTE — COURSE REGISTRY
// ============================================================
// Central registry mapping all 5 units to their content bundles
// and linking existing lesson modules to their parent units.
// ============================================================

import type { UnitContent } from "./types";

import {
  unit1Meta, unit1ConceptCards, unit1Pathways, unit1Distinctions, unit1CaseNotes, unit1Review,
  unit2Meta, unit2ConceptCards, unit2Pathways, unit2Distinctions, unit2CaseNotes, unit2Review,
  unit3Meta, unit3ConceptCards, unit3Pathways, unit3Distinctions, unit3CaseNotes, unit3Review,
  unit4Meta, unit4ConceptCards, unit4Pathways, unit4Distinctions, unit4CaseNotes, unit4Review,
  unit5Meta, unit5ConceptCards, unit5Pathways, unit5Distinctions, unit5CaseNotes, unit5Review,
} from "./index";

// ---------------------------------------------------------------------------
// Unit content bundles
// ---------------------------------------------------------------------------

export const unitContent: Record<string, UnitContent> = {
  "unit-1": {
    meta: unit1Meta,
    conceptCards: unit1ConceptCards,
    pathways: unit1Pathways,
    distinctions: unit1Distinctions,
    caseNotes: unit1CaseNotes,
    review: unit1Review,
  },
  "unit-2": {
    meta: unit2Meta,
    conceptCards: unit2ConceptCards,
    pathways: unit2Pathways,
    distinctions: unit2Distinctions,
    caseNotes: unit2CaseNotes,
    review: unit2Review,
  },
  "unit-3": {
    meta: unit3Meta,
    conceptCards: unit3ConceptCards,
    pathways: unit3Pathways,
    distinctions: unit3Distinctions,
    caseNotes: unit3CaseNotes,
    review: unit3Review,
  },
  "unit-4": {
    meta: unit4Meta,
    conceptCards: unit4ConceptCards,
    pathways: unit4Pathways,
    distinctions: unit4Distinctions,
    caseNotes: unit4CaseNotes,
    review: unit4Review,
  },
  "unit-5": {
    meta: unit5Meta,
    conceptCards: unit5ConceptCards,
    pathways: unit5Pathways,
    distinctions: unit5Distinctions,
    caseNotes: unit5CaseNotes,
    review: unit5Review,
  },
};

// ---------------------------------------------------------------------------
// Lesson → Unit mapping
// ---------------------------------------------------------------------------
// Maps existing module IDs from src/data/modules.ts to their parent units.

export interface LessonMapping {
  moduleId: string;
  unitId: string;
  title: string;
}

export const lessonMappings: LessonMapping[] = [
  { moduleId: "mod-1", unitId: "unit-1", title: "Blurry Object Guess" },
  { moduleId: "mod-2", unitId: "unit-1", title: "Face or Not?" },
  { moduleId: "mod-7", unitId: "unit-1", title: "Multistable Perception Gallery" },
  { moduleId: "mod-5", unitId: "unit-2", title: "Memory Under Load" },
  { moduleId: "mod-8", unitId: "unit-2", title: "PFC Role Matcher" },
  { moduleId: "mod-3", unitId: "unit-3", title: "Sudden Noise Reaction" },
  { moduleId: "mod-9", unitId: "unit-3", title: "Fear vs. Anxiety Sorter" },
  { moduleId: "mod-10", unitId: "unit-3", title: "Emotion vs. Arousal Sorter" },
  { moduleId: "mod-4", unitId: "unit-4", title: "Fear Cue and Extinction" },
  { moduleId: "mod-11", unitId: "unit-4", title: "Classical vs. Operant Sorter" },
  { moduleId: "mod-6", unitId: "unit-5", title: "HPA Axis Builder" },
  { moduleId: "mod-12", unitId: "unit-5", title: "Homeostasis vs. Allostasis Sorter" },
];

// Unit 5 anchor lesson mapping
export const unit5AnchorLesson: LessonMapping | undefined = undefined;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get the full content bundle for a unit. */
export function getUnitContent(unitId: string): UnitContent | undefined {
  return unitContent[unitId];
}

/** Get all unit IDs in order. */
export function getUnitIds(): string[] {
  return ["unit-1", "unit-2", "unit-3", "unit-4", "unit-5"];
}

/** Get lesson mappings for a given unit. */
export function getLessonsByUnit(unitId: string): LessonMapping[] {
  return lessonMappings.filter((l) => l.unitId === unitId);
}
