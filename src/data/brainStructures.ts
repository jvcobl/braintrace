// ============================================================
// BRAINTRACE — BRAIN STRUCTURE REGISTRY
// ============================================================

export type BrainStructureId =
  | "ofc"
  | "pfc"
  | "dlpfc"
  | "vmpfc"
  | "it-cortex"
  | "ffa"
  | "v1"
  | "amygdala"
  | "amygdala-bla"
  | "amygdala-cea"
  | "itc"
  | "brainstem-startle"
  | "auditory-cortex"
  | "hippocampus"
  | "retina"
  | "lgn"
  | "ventral-stream"
  | "dorsal-stream";

export interface BrainStructure {
  id: BrainStructureId;
  name: string;
  shortDescription: string;
  nbb302Unit: number;
}

export const brainStructures: Record<BrainStructureId, BrainStructure> = {
  ofc: {
    id: "ofc",
    name: "Orbitofrontal Cortex (OFC)",
    shortDescription: "Generates rapid contextual predictions from coarse sensory input.",
    nbb302Unit: 1,
  },
  pfc: {
    id: "pfc",
    name: "Prefrontal Cortex (PFC)",
    shortDescription: "Top-down control hub for predictions, attention, and goal maintenance.",
    nbb302Unit: 3,
  },
  dlpfc: {
    id: "dlpfc",
    name: "Dorsolateral Prefrontal Cortex (dlPFC)",
    shortDescription: "Maintains working memory and suppresses irrelevant information.",
    nbb302Unit: 3,
  },
  vmpfc: {
    id: "vmpfc",
    name: "Ventromedial Prefrontal Cortex (vmPFC)",
    shortDescription: "Signals safety during extinction; regulates fear via ITC activation.",
    nbb302Unit: 4,
  },
  "it-cortex": {
    id: "it-cortex",
    name: "Inferotemporal Cortex (IT)",
    shortDescription: "End-stage ventral stream area for detailed object recognition.",
    nbb302Unit: 1,
  },
  ffa: {
    id: "ffa",
    name: "Fusiform Face Area (FFA)",
    shortDescription: "Specialized region for face detection and expertise-based recognition.",
    nbb302Unit: 1,
  },
  v1: {
    id: "v1",
    name: "Primary Visual Cortex (V1)",
    shortDescription: "First cortical stage of visual processing; receives input from LGN.",
    nbb302Unit: 1,
  },
  amygdala: {
    id: "amygdala",
    name: "Amygdala",
    shortDescription: "Salience detector; central to threat evaluation and fear learning.",
    nbb302Unit: 2,
  },
  "amygdala-bla": {
    id: "amygdala-bla",
    name: "Basolateral Amygdala (BLA)",
    shortDescription: "Receives sensory input and forms CS-US associations during fear learning.",
    nbb302Unit: 4,
  },
  "amygdala-cea": {
    id: "amygdala-cea",
    name: "Central Nucleus of Amygdala (CeA)",
    shortDescription: "Outputs fear responses: freezing, startle potentiation, autonomic arousal.",
    nbb302Unit: 4,
  },
  itc: {
    id: "itc",
    name: "Intercalated Cells (ITCs)",
    shortDescription: "Inhibitory gate between BLA and CeA; activated by vmPFC during extinction.",
    nbb302Unit: 4,
  },
  "brainstem-startle": {
    id: "brainstem-startle",
    name: "Brainstem Startle Circuit",
    shortDescription: "Mediates the acoustic startle reflex via rapid subcortical pathway.",
    nbb302Unit: 2,
  },
  "auditory-cortex": {
    id: "auditory-cortex",
    name: "Auditory Cortex",
    shortDescription: "Cortical processing of sound; slower than brainstem startle route.",
    nbb302Unit: 2,
  },
  hippocampus: {
    id: "hippocampus",
    name: "Hippocampus",
    shortDescription: "Context encoding for memory and extinction; context-dependent recall.",
    nbb302Unit: 4,
  },
  retina: {
    id: "retina",
    name: "Retina",
    shortDescription: "First stage of visual input; separates spatial frequency channels.",
    nbb302Unit: 1,
  },
  lgn: {
    id: "lgn",
    name: "Lateral Geniculate Nucleus (LGN)",
    shortDescription: "Thalamic relay for visual input from retina to V1.",
    nbb302Unit: 1,
  },
  "ventral-stream": {
    id: "ventral-stream",
    name: "Ventral Stream",
    shortDescription: "The 'what' pathway — object identity and recognition.",
    nbb302Unit: 1,
  },
  "dorsal-stream": {
    id: "dorsal-stream",
    name: "Dorsal Stream",
    shortDescription: "The 'where/how' pathway — spatial location and action guidance.",
    nbb302Unit: 1,
  },
};
