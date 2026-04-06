// ============================================================
// BRAINTRACE — CONCEPT PAGES
// ============================================================

import type { ConceptPageId } from "./types";

export interface ConceptPage {
  id: ConceptPageId;
  title: string;
  slug: string;
  description: string;
  moduleLinks: string[];
}

export const conceptPages: Record<ConceptPageId, ConceptPage> = {
  loop: {
    id: "loop",
    title: "The Loop",
    slug: "loop",
    description: "Your brain runs a constant cycle: predict, receive input, detect mismatch, update the model. Every BrainTrace module shows you one version of this loop.",
    moduleLinks: ["blurry-object-guess", "face-or-not", "sudden-noise-reaction", "fear-cue-and-extinction", "memory-under-load"],
  },
  "precision-attention": {
    id: "precision-attention",
    title: "Precision & Attention",
    slug: "precision-attention",
    description: "Your brain assigns a confidence weight to every signal. Attention is the process of turning that weight up or down. This is the volume knob behind perception.",
    moduleLinks: ["blurry-object-guess", "face-or-not", "memory-under-load"],
  },
  failure: {
    id: "failure",
    title: "When Prediction Fails",
    slug: "when-prediction-fails",
    description: "Prediction breaks in three ways: the brain trusts its assumptions too much, overreacts to noise, or runs out of control capacity. Each failure mode maps to a BrainTrace module.",
    moduleLinks: ["face-or-not", "sudden-noise-reaction", "fear-cue-and-extinction", "memory-under-load"],
  },
};
