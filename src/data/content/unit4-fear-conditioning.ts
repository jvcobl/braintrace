// ============================================================
// UNIT 4 — Learning and Fear Conditioning
// All content sourced from neuroscience literature on learning and fear conditioning
// ============================================================

export const unit4Meta = {
  id: "unit-4",
  title: "Learning and Fear Conditioning",
  subtitle: "The brain doesn't just react — it learns what to expect next.",
  overview:
    "These lessons explore how cues become predictions, and how those predictions change over time. You'll see the two major learning paradigms, how the brain acquires conditioned fear through CS-US pairing, the vmPFC circuitry that controls extinction, why extinction is new learning rather than erasure, and why fear can spontaneously return even after successful extinction.",
  majorStructures: [
    "Basolateral amygdala (BLA)",
    "Central amygdala (CeA)",
    "Intercalated cells (ITCs)",
    "Ventromedial PFC (vmPFC)",
    "Infralimbic cortex (IL)",
    "Prelimbic cortex (PL)",
    "Hippocampus",
    "Nucleus accumbens",
  ],
  lectureTopics: [
    "Learning, fear conditioning, and vmPFC circuitry",
  ],
};

// ============================================================
// CONCEPT CARDS
// ============================================================

export const unit4ConceptCards = [
  {
    id: "u4-cc-01",
    term: "Classical (Pavlovian) Conditioning",
    definition:
      "A learning paradigm where a neutral stimulus is paired with an unconditioned stimulus to produce a learned response. The organism does not choose to respond — the association forms automatically through repeated pairing. The classic example is Pavlov's dog learning to salivate at the sound of a bell.",
    structures: ["Amygdala"],
  },
  {
    id: "u4-cc-02",
    term: "Operant (Skinnerian) Conditioning",
    definition:
      "A learning paradigm where a voluntary behavior is associated with a consequence or reward. Unlike classical conditioning, the organism's own action determines the outcome. Operant conditioning relies heavily on the nucleus accumbens and dopamine signaling.",
    structures: ["Nucleus accumbens"],
  },
  {
    id: "u4-cc-03",
    term: "Conditioned Stimulus (CS)",
    definition:
      "A previously neutral stimulus (like a light or tone) that, after being repeatedly paired with an unconditioned stimulus, begins to elicit a learned response on its own. In fear conditioning, the CS is the cue that predicts danger.",
    structures: [],
  },
  {
    id: "u4-cc-04",
    term: "Unconditioned Stimulus (US)",
    definition:
      "A stimulus that naturally and automatically produces a response without any prior learning. In fear conditioning experiments, the US is typically a mild electric floor shock (approximately 1 milliamp). The response to the US is innate, not learned.",
    structures: [],
  },
  {
    id: "u4-cc-05",
    term: "Conditioned Fear Response",
    definition:
      "After CS-US pairing, the organism exhibits fear responses to the CS alone. In rat models, this manifests as freezing behavior — the animal becomes motionless in anticipation of the aversive outcome. This is anticipatory fear, not a reflexive startle.",
    structures: ["Amygdala"],
  },
  {
    id: "u4-cc-06",
    term: "Freezing Behavior",
    definition:
      "A conditioned defensive response where the animal becomes motionless upon encountering the CS. Freezing is an evolutionary prey response — staying still reduces the chance of detection by a predator. It represents learned anticipatory fear, not a simple reflex.",
    structures: ["Amygdala", "CeA"],
  },
  {
    id: "u4-cc-07",
    term: "Anticipatory Fear",
    definition:
      "Fear that occurs in response to a cue predicting a future aversive event, not in response to the aversive event itself. When a rat freezes at the light (CS) before any shock (US) arrives, that is anticipatory fear — the brain has learned to predict the threat.",
    structures: ["Amygdala", "BLA"],
  },
  {
    id: "u4-cc-08",
    term: "Ventromedial PFC (vmPFC) in Conditioning",
    definition:
      "The vmPFC dictates extinction learning. It contains two functionally distinct subregions — the infralimbic cortex and the prelimbic cortex — that have opposite effects on the amygdala and therefore opposite roles in fear expression versus fear suppression.",
    structures: ["vmPFC", "IL", "PL"],
  },
  {
    id: "u4-cc-09",
    term: "Infralimbic Cortex (IL)",
    definition:
      "A subregion of the vmPFC that sends excitatory (glutamatergic) signals directly to the BLA. The IL activates the amygdala, effectively saying 'this is dangerous.' It is critical for initial fear conditioning — strengthening the association between the CS and danger.",
    structures: ["Infralimbic cortex", "BLA"],
  },
  {
    id: "u4-cc-10",
    term: "Prelimbic Cortex (PL)",
    definition:
      "A subregion of the vmPFC that sends excitatory signals to the intercalated cells (ITCs). By activating these GABAergic inhibitory cells, the PL effectively inhibits the amygdala, saying 'calm down, I got this.' The PL is the key structure enabling extinction.",
    structures: ["Prelimbic cortex", "ITCs"],
  },
  {
    id: "u4-cc-11",
    term: "Intercalated Cells (ITCs) in Extinction",
    definition:
      "GABAergic (inhibitory) cells flanking the BLA. When activated by the prelimbic cortex during extinction, they suppress amygdala output. This is the mechanism by which the brain learns 'the cue is now safe' — not by erasing the original fear memory, but by actively inhibiting its expression.",
    structures: ["ITCs", "BLA"],
  },
  {
    id: "u4-cc-12",
    term: "Cued Extinction",
    definition:
      "Extinction of fear to a specific cue (like a light or tone) that was paired with the US. Cued extinction requires the amygdala and vmPFC circuitry. The organism learns that this specific cue no longer predicts danger.",
    structures: ["Amygdala", "vmPFC"],
  },
  {
    id: "u4-cc-13",
    term: "Contextual Extinction",
    definition:
      "Extinction of fear to the environmental context where conditioning occurred (like the specific chamber). Contextual extinction requires both the amygdala and the hippocampus, because the hippocampus is needed to encode and retrieve contextual/spatial memories.",
    structures: ["Amygdala", "Hippocampus"],
  },
  {
    id: "u4-cc-14",
    term: "Extinction Is Not Forgetting",
    definition:
      "Extinction is the active learning of a new safety association via vmPFC-ITC-amygdala projections. The original fear memory is not erased — it is suppressed by a competing safety memory. Because both memories exist simultaneously, the fear can return.",
    structures: ["vmPFC", "ITCs", "Amygdala"],
  },
  {
    id: "u4-cc-15",
    term: "Spontaneous Recovery",
    definition:
      "After successful extinction, the original fear response can randomly return — sometimes after a delay, sometimes after a change in context. This proves the original fear memory still exists underneath the newer extinction memory. Extinction suppressed the fear; it did not erase it.",
    structures: ["Amygdala"],
  },
  {
    id: "u4-cc-16",
    term: "Glutamatergic Signaling (IL → BLA)",
    definition:
      "The infralimbic cortex sends excitatory glutamate signals to the basolateral amygdala, strengthening fear associations. This is the neurochemical basis of how the vmPFC activates fear during conditioning.",
    structures: ["IL", "BLA"],
  },
  {
    id: "u4-cc-17",
    term: "Hippocampus in Contextual Learning",
    definition:
      "The hippocampus is required for contextual fear conditioning and contextual extinction because it encodes the spatial and environmental details of where events occurred. Without the hippocampus, the brain can learn to fear a specific cue but cannot associate fear with a specific place.",
    structures: ["Hippocampus"],
  },
];

// ============================================================
// PATHWAY BLOCKS
// ============================================================

export const unit4Pathways = [
  {
    id: "u4-pw-01",
    title: "Fear Acquisition (CS-US Pairing)",
    description:
      "How a neutral cue becomes a fear signal through repeated pairing with an aversive stimulus.",
    steps: [
      {
        number: 1,
        structure: "Neutral Stimulus (Pre-Conditioning)",
        description:
          "A neutral stimulus like a light (CS) produces no fear response. The organism notices it but does not react defensively.",
      },
      {
        number: 2,
        structure: "CS-US Pairing",
        description:
          "The CS (light) is repeatedly presented just before the US (mild floor shock, ~1 milliamp). The temporal pairing allows the BLA to associate the two stimuli.",
      },
      {
        number: 3,
        structure: "Basolateral Amygdala (BLA) — Association Formed",
        description:
          "The BLA encodes the association between the CS and the US. The infralimbic cortex (IL) sends excitatory glutamatergic signals to the BLA, strengthening this connection.",
      },
      {
        number: 4,
        structure: "Central Amygdala (CeA) — Fear Output",
        description:
          "The CeA sends behavioral commands: the organism now freezes (anticipatory fear) when the CS appears alone. The CS has become a danger signal.",
      },
    ],
  },
  {
    id: "u4-pw-02",
    title: "Fear Extinction (vmPFC → ITC → Amygdala Inhibition)",
    description:
      "How the brain learns that a fear cue is now safe — not by erasing the memory, but by actively suppressing it.",
    steps: [
      {
        number: 1,
        structure: "Repeated CS Without US",
        description:
          "The CS (light) is presented repeatedly without the US (shock). The organism initially freezes, but over time the fear response diminishes.",
      },
      {
        number: 2,
        structure: "Prelimbic Cortex (PL) Activation",
        description:
          "The PL subregion of the vmPFC becomes active, recognizing that the CS no longer predicts danger.",
      },
      {
        number: 3,
        structure: "ITCs Activated (GABAergic Inhibition)",
        description:
          "The PL sends excitatory signals to the intercalated cells. These GABAergic cells inhibit the BLA's output, suppressing the fear response. The amygdala is being actively quieted.",
      },
      {
        number: 4,
        structure: "New Safety Memory Formed",
        description:
          "A new association is learned: 'the cue is now safe.' This safety memory competes with the original fear memory. The original fear memory still exists — it is suppressed, not erased.",
      },
    ],
  },
  {
    id: "u4-pw-03",
    title: "Hippocampus in Contextual Extinction",
    description:
      "Why contextual fear requires the hippocampus in addition to the amygdala.",
    steps: [
      {
        number: 1,
        structure: "Contextual Encoding (Hippocampus)",
        description:
          "During conditioning, the hippocampus encodes the spatial and environmental details of the context — the specific chamber, its smells, lighting, and layout.",
      },
      {
        number: 2,
        structure: "Context + Fear Association",
        description:
          "The hippocampal context representation is linked to the amygdala's fear association. The organism becomes afraid not just of the CS, but of the place where conditioning occurred.",
      },
      {
        number: 3,
        structure: "Contextual Extinction",
        description:
          "Extinction of contextual fear requires both the amygdala (to suppress the fear association) and the hippocampus (to update the context memory with new safety information). Cued extinction only requires the amygdala.",
      },
    ],
  },
];

// ============================================================
// DISTINCTION BLOCKS
// ============================================================

export const unit4Distinctions = [
  {
    id: "u4-db-01",
    termA: "Classical Conditioning",
    termB: "Operant Conditioning",
    descriptionA:
      "A neutral stimulus is paired with an unconditioned stimulus to produce a learned, automatic response. The organism does not choose to respond — the association forms through repeated pairing. Relies on amygdala circuitry for fear conditioning.",
    descriptionB:
      "A voluntary behavior is associated with a consequence or reward. The organism's own action determines the outcome. Relies heavily on the nucleus accumbens and dopamine for reward learning.",
    keyDifference:
      "Classical conditioning creates automatic associations (stimulus → response). Operant conditioning shapes voluntary behavior (action → consequence). Different brain systems drive each.",
  },
  {
    id: "u4-db-02",
    termA: "Extinction",
    termB: "Forgetting",
    descriptionA:
      "The active learning of a new safety association. The original fear memory is suppressed by vmPFC-ITC-amygdala inhibition, not removed. The old memory persists underneath the new one.",
    descriptionB:
      "The passive loss or decay of a memory trace over time. The original information is genuinely gone or degraded beyond retrieval.",
    keyDifference:
      "Extinction is active new learning that suppresses old learning. Forgetting is passive loss. The proof: spontaneous recovery shows the original fear memory still exists after extinction.",
  },
  {
    id: "u4-db-03",
    termA: "Cued Extinction",
    termB: "Contextual Extinction",
    descriptionA:
      "Extinction of fear to a specific cue (tone, light) that was paired with the US. Requires the amygdala and vmPFC. The organism learns this specific signal no longer predicts danger.",
    descriptionB:
      "Extinction of fear to the environmental context where conditioning occurred. Requires both the amygdala and the hippocampus, because the hippocampus encodes the spatial/contextual memory.",
    keyDifference:
      "Cued extinction is about the signal. Contextual extinction is about the place. The hippocampus is only required for contextual extinction.",
  },
  {
    id: "u4-db-04",
    termA: "Infralimbic Cortex (IL)",
    termB: "Prelimbic Cortex (PL)",
    descriptionA:
      "Sends excitatory (glutamatergic) signals directly to the BLA. Activates the amygdala — 'this is dangerous.' Critical for initial fear conditioning and strengthening fear associations.",
    descriptionB:
      "Sends excitatory signals to the intercalated cells (ITCs). By activating these GABAergic inhibitory cells, the PL suppresses amygdala output — 'calm down, I got this.' Critical for extinction.",
    keyDifference:
      "The IL turns fear on by exciting the BLA. The PL turns fear off by exciting the ITCs, which inhibit the BLA. Both are in the vmPFC but have opposite functional effects.",
  },
];

// ============================================================
// CASE / EXPLANATORY NOTES
// ============================================================

export const unit4CaseNotes = [
  {
    id: "u4-cn-01",
    title: "Why Fear Returns After Extinction",
    content:
      "Spontaneous recovery demonstrates that the original fear memory is never truly erased. During extinction, the vmPFC (specifically the prelimbic cortex) activates inhibitory ITCs to suppress amygdala output. A new 'safety' memory is formed that competes with the original fear memory. But because both memories coexist, the original fear can resurface — sometimes after a time delay, sometimes after a context change. This is why a person who has overcome a phobia might suddenly feel the fear return in an unexpected moment.",
    sensitivity: "standard" as const,
  },
  {
    id: "u4-cn-02",
    title: "Suppression of Output Is Not Erasure of Memory",
    content:
      "This is one of the most important principles in the unit. When ITCs inhibit the amygdala during extinction, they are suppressing the behavioral and hormonal output of fear — the freezing, the cortisol, the autonomic arousal. But the synaptic changes in the BLA that encode the original CS-US association remain intact. The brain has learned a second thing ('the cue is safe now') without unlearning the first thing ('the cue once predicted danger'). This dual-memory architecture explains spontaneous recovery, renewal effects, and why therapeutic extinction of phobias and PTSD is genuinely difficult.",
    sensitivity: "standard" as const,
  },
];

// ============================================================
// REVIEW QUESTIONS
// ============================================================

export const unit4Review = [
  {
    id: "u4-rq-01",
    question:
      "Distinguish classical conditioning from operant conditioning. Which brain systems are primarily involved in each?",
    hint: "One is about automatic associations (amygdala); the other is about voluntary behavior and reward (nucleus accumbens).",
  },
  {
    id: "u4-rq-02",
    question:
      "Define CS and US. In a standard fear conditioning experiment, what serves as the CS and what serves as the US?",
    hint: "The CS starts neutral (light); the US is naturally aversive (shock). Pairing them creates the learned fear.",
  },
  {
    id: "u4-rq-03",
    question:
      "Why is freezing behavior described as conditioned anticipatory fear rather than a simple reflex?",
    hint: "Think about what the animal is responding to — the cue predicting a future event, not the aversive event itself.",
  },
  {
    id: "u4-rq-04",
    question:
      "Explain why extinction is described as new learning rather than forgetting. What is the key evidence?",
    hint: "If the original memory were erased, spontaneous recovery would be impossible.",
  },
  {
    id: "u4-rq-05",
    question:
      "Identify the roles of the infralimbic cortex, prelimbic cortex, and intercalated cells in fear conditioning and extinction.",
    hint: "IL activates the amygdala (fear on). PL activates ITCs, which inhibit the amygdala (fear off).",
  },
  {
    id: "u4-rq-06",
    question:
      "Why does contextual extinction require the hippocampus while cued extinction does not?",
    hint: "Think about what type of memory the hippocampus specializes in and what 'contextual' means.",
  },
  {
    id: "u4-rq-07",
    question:
      "Explain spontaneous recovery. What does it prove about the original fear memory?",
    hint: "The fear returns after extinction — what does that tell you about whether the memory was erased or suppressed?",
  },
];
