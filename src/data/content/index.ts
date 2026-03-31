// ============================================================
// NEUROROUTE — MASTER CONTENT INDEX
// ============================================================
// All content sourced strictly from NBB302 lecture notes.
// No external sources. No internet-derived information.
//
// This file exports all unit content and provides
// a summary of what exists for each unit.
// ============================================================

// Unit 1 — Perception and Object Recognition
export {
  unit1Meta,
  unit1ConceptCards,
  unit1Pathways,
  unit1Distinctions,
  unit1CaseNotes,
  unit1Review,
} from "./unit1-perception";

// Unit 2 — Attention, Cognitive Load, and the PFC
export {
  unit2Meta,
  unit2ConceptCards,
  unit2Pathways,
  unit2Distinctions,
  unit2CaseNotes,
  unit2Review,
} from "./unit2-attention-pfc";

// Unit 3 — Emotion, Limbic System, and Amygdala
export {
  unit3Meta,
  unit3ConceptCards,
  unit3Pathways,
  unit3Distinctions,
  unit3CaseNotes,
  unit3Review,
} from "./unit3-emotion-amygdala";

// Unit 4 — Learning and Fear Conditioning
export {
  unit4Meta,
  unit4ConceptCards,
  unit4Pathways,
  unit4Distinctions,
  unit4CaseNotes,
  unit4Review,
} from "./unit4-fear-conditioning";

// Unit 5 — Stress and Homeostasis
export {
  unit5Meta,
  unit5ConceptCards,
  unit5Pathways,
  unit5Distinctions,
  unit5CaseNotes,
  unit5Review,
} from "./unit5-stress-homeostasis";

// ============================================================
// CONTENT SUMMARY
// ============================================================
//
// Unit 1 — Perception and Object Recognition
//   Concept cards:    30
//   Pathway blocks:    4
//   Distinction blocks: 6
//   Case notes:         4 (1 high-sensitivity: implicit bias)
//   Review questions:   8
//
// Unit 2 — Attention, Cognitive Load, and the PFC
//   Concept cards:    17
//   Pathway blocks:    3
//   Distinction blocks: 5
//   Case notes:         3
//   Review questions:   6
//
// Unit 3 — Emotion, Limbic System, and Amygdala
//   Concept cards:    30
//   Pathway blocks:    5
//   Distinction blocks: 5
//   Case notes:         5 (2 high-sensitivity: Kluver-Bucy, Patient SM)
//   Review questions:   7
//
// Unit 4 — Learning and Fear Conditioning
//   Concept cards:    17
//   Pathway blocks:    3
//   Distinction blocks: 4
//   Case notes:         2
//   Review questions:   7
//
// Unit 5 — Stress and Homeostasis
//   Concept cards:    23 (1 high-sensitivity: suicide neurobiology)
//   Pathway blocks:    3
//   Distinction blocks: 5
//   Case notes:         3 (1 high-sensitivity: suicide neurobiology)
//   Review questions:   6
//
// ============================================================
// TOTALS ACROSS ALL UNITS
// ============================================================
//
//   Concept cards:       117
//   Pathway blocks:       18
//   Distinction blocks:   25
//   Case notes:           17
//   Review questions:     34
//   High-sensitivity items: 4
//
//   Total content items: 211
//
// ============================================================
// CONTENT TYPE REFERENCE
// ============================================================
//
// Concept Card
//   { id, term, definition, structures, sensitivity?, sensitivityNote? }
//   Short, scannable definition tied to brain structures.
//   The core study-tool layer.
//
// Pathway Block
//   { id, title, description, steps: [{ number, structure, description }] }
//   Step-based circuit/stream trace.
//   Matches the existing "Trace the Pathway" UI pattern.
//
// Distinction Block
//   { id, termA, termB, descriptionA, descriptionB, keyDifference }
//   Compare/contrast study block for commonly confused terms.
//
// Case Note
//   { id, title, content, sensitivity, sensitivityNote? }
//   Clinical examples, case studies, and sensitive material.
//   sensitivity: "standard" | "high"
//
// Review Question
//   { id, question, hint }
//   Recall and application questions per unit.
//   Hints guide without giving the answer.
//
// ============================================================
