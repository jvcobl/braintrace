export type DemoType = "interactive" | "observation" | "recall" | "response";

export interface TraceNode {
  label: string;
  description: string;
}

export interface ExplainContent {
  whatHappened: string;
  whatYourBrainDid: string;
  keyPathway: string;
  nbb302Connection: string;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  unitId: string;
  shortGoal: string;
  shortDescription: string;
  introCopy: string;
  traceNodes: TraceNode[];
  explain: ExplainContent;
  demoType: DemoType;
  learningObjective: string;
}

export const modules: Module[] = [
  {
    id: "mod-1",
    title: "Blurry Object Guess",
    slug: "blurry-object-guess",
    unitId: "unit-1",
    shortGoal: "Explore how the brain resolves ambiguous visual input.",
    shortDescription: "Guess what a blurry image is and discover how top-down processing shapes perception.",
    introCopy: "You'll see a blurry image and try to identify it. Then we'll trace the pathway your brain uses to make sense of incomplete information.",
    traceNodes: [
      { label: "Retina", description: "Light enters and is converted to neural signals." },
      { label: "LGN", description: "Signals relay through the lateral geniculate nucleus." },
      { label: "V1", description: "Primary visual cortex begins edge and shape processing." },
      { label: "Inferotemporal Cortex", description: "Higher-order object recognition occurs." },
      { label: "Prefrontal Cortex", description: "Top-down expectations refine the percept." },
    ],
    explain: {
      whatHappened: "Explanation content will be added.",
      whatYourBrainDid: "Explanation content will be added.",
      keyPathway: "Explanation content will be added.",
      nbb302Connection: "Explanation content will be added.",
    },
    demoType: "interactive",
    learningObjective: "Understand the role of top-down processing in visual perception.",
  },
  {
    id: "mod-2",
    title: "Face or Not?",
    slug: "face-or-not",
    unitId: "unit-1",
    shortGoal: "Investigate the brain's bias toward detecting faces.",
    shortDescription: "Decide whether ambiguous images contain faces and learn about the fusiform face area.",
    introCopy: "You'll view a series of images and decide if each one contains a face. We'll then explore why your brain is so eager to find faces everywhere.",
    traceNodes: [
      { label: "Retina", description: "Visual input is captured." },
      { label: "V1", description: "Early feature detection begins." },
      { label: "FFA (Fusiform Face Area)", description: "Specialized region processes face-like patterns." },
      { label: "Amygdala", description: "Emotional significance is evaluated." },
      { label: "Prefrontal Cortex", description: "Conscious decision about the stimulus." },
    ],
    explain: {
      whatHappened: "Explanation content will be added.",
      whatYourBrainDid: "Explanation content will be added.",
      keyPathway: "Explanation content will be added.",
      nbb302Connection: "Explanation content will be added.",
    },
    demoType: "observation",
    learningObjective: "Identify the neural basis of face perception and pareidolia.",
  },
  {
    id: "mod-3",
    title: "Sudden Noise Reaction",
    slug: "sudden-noise-reaction",
    unitId: "unit-3",
    shortGoal: "Examine the startle reflex and rapid brainstem responses.",
    shortDescription: "Experience a sudden auditory stimulus and trace the fast neural circuit behind your reaction.",
    introCopy: "A sudden sound will play and we'll look at how quickly your body responds — before your conscious mind even catches up.",
    traceNodes: [
      { label: "Cochlea", description: "Sound waves are transduced into neural signals." },
      { label: "Cochlear Nucleus", description: "First brainstem relay for auditory input." },
      { label: "Reticular Formation", description: "Rapid alerting response is triggered." },
      { label: "Motor Neurons", description: "Startle muscles contract involuntarily." },
      { label: "Auditory Cortex", description: "Conscious awareness of the sound follows." },
    ],
    explain: {
      whatHappened: "Explanation content will be added.",
      whatYourBrainDid: "Explanation content will be added.",
      keyPathway: "Explanation content will be added.",
      nbb302Connection: "Explanation content will be added.",
    },
    demoType: "response",
    learningObjective: "Describe the neural circuit underlying the acoustic startle reflex.",
  },
  {
    id: "mod-4",
    title: "Fear Cue and Extinction",
    slug: "fear-cue-and-extinction",
    unitId: "unit-4",
    shortGoal: "Model how fear responses are learned and extinguished.",
    shortDescription: "Observe a simple conditioning paradigm and trace the amygdala-based pathway for fear learning.",
    introCopy: "You'll watch a cue become associated with an aversive outcome, then see what happens when that association is removed.",
    traceNodes: [
      { label: "Sensory Input", description: "The conditioned stimulus is perceived." },
      { label: "Thalamus", description: "Quick relay to the amygdala (low road)." },
      { label: "Amygdala", description: "Fear association is formed and expressed." },
      { label: "Hypothalamus", description: "Autonomic fear responses are initiated." },
      { label: "vmPFC", description: "Inhibitory control enables extinction learning." },
    ],
    explain: {
      whatHappened: "Explanation content will be added.",
      whatYourBrainDid: "Explanation content will be added.",
      keyPathway: "Explanation content will be added.",
      nbb302Connection: "Explanation content will be added.",
    },
    demoType: "observation",
    learningObjective: "Explain the roles of the amygdala and prefrontal cortex in fear conditioning and extinction.",
  },
  {
    id: "mod-5",
    title: "Memory Under Load",
    slug: "memory-under-load",
    unitId: "unit-2",
    shortGoal: "Test how cognitive load affects working memory capacity.",
    shortDescription: "Try a short memory task under varying levels of distraction and explore the limits of working memory.",
    introCopy: "You'll attempt to remember items while handling a secondary task. We'll see how your performance changes as load increases.",
    traceNodes: [
      { label: "Sensory Cortex", description: "Stimulus information is initially encoded." },
      { label: "Prefrontal Cortex", description: "Items are maintained in working memory." },
      { label: "Parietal Cortex", description: "Attentional resources are allocated." },
      { label: "Basal Ganglia", description: "Gating of relevant vs. irrelevant information." },
      { label: "Hippocampus", description: "Supports binding when load exceeds capacity." },
    ],
    explain: {
      whatHappened: "Explanation content will be added.",
      whatYourBrainDid: "Explanation content will be added.",
      keyPathway: "Explanation content will be added.",
      nbb302Connection: "Explanation content will be added.",
    },
    demoType: "recall",
    learningObjective: "Understand working memory capacity limits and the prefrontal contributions to maintenance under load.",
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulesByUnit(unitId: string): Module[] {
  return modules.filter((m) => m.unitId === unitId);
}
