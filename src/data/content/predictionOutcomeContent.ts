import type { PredictionOutcomeData } from "@/components/module/PredictionOutcome";

/**
 * Lesson-level content for the Prediction & Outcome block.
 * Keyed by demo component id (matches registry slugs).
 */
export const predictionOutcomeContent: Record<string, PredictionOutcomeData> = {
  "blurry-object": {
    structureChip: "OFC / ventral stream",
    prediction: "Your brain made an early guess from blurry shape and contrast before full visual detail arrived.",
    outcome: "As the image sharpened, that first guess was either confirmed or corrected by later ventral-stream processing.",
    update: "This lesson shows that the brain predicts first and refines later — fast enough to be useful, but not always accurate.",
  },
  "face-or-not": {
    structureChip: "FFA",
    prediction: "Your visual system quickly treated some patterns as face-like before you fully evaluated them.",
    outcome: "Some of those patterns were real faces, while others were false alarms that only matched the template loosely.",
    update: "This lesson shows that the brain is biased to detect faces early, because missing one matters more than occasionally seeing one that is not there.",
  },
  "sudden-noise": {
    structureChip: "Startle loop + amygdala",
    prediction: "Your brain was treating the environment as stable and not urgently threatening.",
    outcome: "A sudden stimulus violated that expectation, triggering a rapid startle response before full conscious evaluation.",
    update: "This lesson shows that surprise is a prediction mismatch — the system reacts first, then works out what the signal means.",
  },
  "fear-cue": {
    structureChip: "BLA / vmPFC / ITCs",
    prediction: "Your brain learned that the cue predicted something aversive, so the cue began to trigger anticipation before anything happened.",
    outcome: "When the cue appeared without the aversive event, a competing safety prediction began to form.",
    update: "This lesson shows that extinction does not erase the old prediction — it layers a new one on top, which is why fear can return later.",
  },
  "memory-under-load": {
    structureChip: "dlPFC",
    prediction: "Your prefrontal cortex was trying to hold the task rules in mind and stay ahead of distraction.",
    outcome: "As the load increased, that control model became harder to maintain and errors became more likely.",
    update: "This lesson shows that prediction-based control depends on limited PFC resources — when the system is overloaded, performance drops.",
  },
  "hpa-axis-builder": {
    structureChip: "HPA axis",
    prediction: "Your stress system prepared the body for continuing demand by activating a coordinated hormone cascade.",
    outcome: "That cascade either shut down through negative feedback or kept running when the shutdown signal failed.",
    update: "This lesson shows that stress regulation is also predictive: the body prepares for what it expects will continue, and chronic stress begins when that preparation does not turn off.",
  },
};
