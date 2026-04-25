export const stressResponseContent = {
  buildStepARunningCaption:
    "Cortisol kept rising. Nothing told the system to stop. This is what a stress response without feedback looks like at the wiring level.",
  buildStepBRunningCaption:
    "This is allostasis. The system isn't switched off — it's actively returning to baseline. The hippocampus detects elevated cortisol and signals the hypothalamus to stop.",
  consequencesPredictionPrompt:
    "Chronic stress damages the hippocampus over time. What happens to the feedback loop?",
  consequencesPredictionOptions: {
    works: "Loop still works",
    weakens: "Loop weakens, cortisol stays elevated",
  },
  consequencesResultIfWorks:
    "You predicted the loop would still work. It doesn't — damaged hippocampus = weakened inhibition.",
  consequencesResultIfWeakens:
    "You called it. Damaged hippocampus = weakened inhibition. Cortisol stays elevated.",
};
