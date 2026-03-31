// ============================================================
// MULTISTABLE PERCEPTION GALLERY — EXAMPLE DATA
// ============================================================

export interface MultistableExample {
  id: string;
  title: string;
  /** Short label for the type of ambiguity demonstrated */
  category: string;
  interpretations: [string, string];
  prompt: string;
  switchFeedback: [string, string];
  switchHint: [string, string];
  resultFeedback: [string, string];
  /** Explicit "what changed / what didn't" statement */
  invariant: string;
  explanation: string;
  neuroscienceNote: string;
}

const examples: MultistableExample[] = [
  {
    id: "rubin-vase",
    title: "Rubin's Vase",
    category: "Figure–Ground",
    interpretations: ["A vase", "Two faces in profile"],
    prompt:
      "Look at the figure below — don't overthink it. What do you see first?",
    switchFeedback: [
      "You saw the vase — your brain assigned the bright center as the object and the dark sides as empty background. Now try the opposite: look at the dark regions on each side as two face profiles looking at each other.",
      "You saw two faces — your brain assigned the dark side regions as objects and the bright center as background. Now try the opposite: look at the bright center as a vase or goblet.",
    ],
    switchHint: [
      "Focus on one dark side. Follow the contour and look for a forehead, nose, lips, and chin in profile.",
      "Follow the bright shape's outline from the narrow top, out to the wide middle, and back in to the narrow base.",
    ],
    resultFeedback: [
      "Most people see the vase first — bright shapes tend to pop as figures against dark backgrounds. But the exact same contour that forms the vase's edge also traces a human face in profile on each side.",
      "Seeing the faces first is less common — your brain prioritized the dark side regions as meaningful shapes. But the exact same contour that forms each profile also traces the curved edge of a vase.",
    ],
    invariant:
      "What changed: your brain's figure–ground assignment — which region is the object and which is empty space. What did not change: the image. Every pixel remained identical.",
    explanation:
      "This is figure–ground assignment. The visual cortex must decide which region of an image is an object (figure) and which is background (ground). In Rubin's vase, both assignments are equally valid, so your brain can hold only one at a time and toggles between them. That toggle is multistable perception.",
    neuroscienceNote:
      "Figure–ground segregation begins in V2, is refined in V4, and is modulated by top-down feedback from the prefrontal cortex. Your brain's initial assignment is a cognitive heuristic — an automatic shortcut applied before conscious deliberation. The perceptual switch reflects a change in cortical communication, not a change in retinal input.",
  },
  {
    id: "color-constancy",
    title: "Color Constancy",
    category: "Illumination",
    interpretations: ["Blue and dark", "White and gold"],
    prompt:
      "Look at the striped panel. What colors do you see?",
    switchFeedback: [
      "You see blue and dark stripes — your brain is reading the lighting as bright and even, so it takes the colors at face value. Now try imagining this panel is sitting in deep shadow. Could those same tones be a washed-out white and a muted gold?",
      "You see white and gold stripes — your brain is assuming shadow and compensating, subtracting darkness to perceive lighter, warmer colors. Now try imagining the lighting is bright and even. Could those tones simply be blue and dark brown?",
    ],
    switchHint: [
      "Imagine warm shadow falling across white-and-gold fabric — the shadow would shift white toward blue-grey and gold toward dark brown.",
      "Imagine flat, even light. No shadow correction is needed — what you see is what's there.",
    ],
    resultFeedback: [
      "You saw blue and dark — your visual system treated the lighting as neutral and read the colors directly. Someone else, assuming shadow, would automatically compensate and perceive white and gold from the same pixels.",
      "You saw white and gold — your visual system assumed shadow and compensated, perceiving lighter, warmer colors than the pixels contain. Someone else, treating the light as even, would see blue and dark from the same pixels.",
    ],
    invariant:
      "What changed: your brain's assumption about the lighting — whether the panel is in shadow or evenly lit. What did not change: the actual pixel colors on screen. They are identical for both interpretations.",
    explanation:
      "This is color constancy — the brain's automatic correction for lighting conditions. Your visual system does not report raw colors; it infers the illumination and adjusts perception so objects appear stable across different lighting. When the illumination itself is ambiguous, different brains make different assumptions and produce genuinely different conscious experiences.",
    neuroscienceNote:
      "Color constancy is computed in V4 and modulated by contextual surround signals. The surrounding gradient serves as a cue for inferring illumination. Different assumptions lead V4 to apply different corrections — which is why two people looking at identical pixels can sincerely report different colors. This is the same mechanism behind the widely-discussed dress photograph.",
  },
  {
    id: "necker-cube",
    title: "Necker Cube",
    category: "Depth Reversal",
    interpretations: [
      "Lower-left face is in front",
      "Upper-right face is in front",
    ],
    prompt:
      "This wireframe cube has no shading or perspective cues. Which face appears closest to you?",
    switchFeedback: [
      "You see the lower-left face as the front — as if you're looking at the cube from above. Now try to flip the depth: imagine the upper-right face is closest to you, as if you're looking up at the cube from below.",
      "You see the upper-right face as the front — as if you're looking at the cube from below. Now try to flip the depth: imagine the lower-left face is closest to you, as if you're looking down from above.",
    ],
    switchHint: [
      "Focus on the upper-right square and try to see it as a solid surface in front of everything else.",
      "Focus on the lower-left square and try to see it as a solid surface in front of everything else.",
    ],
    resultFeedback: [
      "You interpreted the lower-left face as nearest — your brain imposed a viewpoint from above-right. The drawing is perfectly flat: the same twelve lines support both 3D interpretations equally, and your visual system chose one automatically.",
      "You interpreted the upper-right face as nearest — your brain imposed a viewpoint from below-left. The drawing is perfectly flat: the same twelve lines support both 3D interpretations equally, and your visual system chose one automatically.",
    ],
    invariant:
      "What changed: your brain's assumed viewpoint — whether you're looking at the cube from above or below. What did not change: the drawing. It is a flat 2D wireframe with no shading, perspective, or occlusion cues.",
    explanation:
      "The Necker cube demonstrates depth reversal — a different category of multistability from figure–ground or color constancy. Your brain automatically constructs a 3D interpretation from a 2D wireframe, but the drawing is genuinely ambiguous: no shadows, no perspective convergence, no occlusion. With nothing to anchor the depth, your visual system periodically flips between two equally valid readings.",
    neuroscienceNote:
      "Depth-from-ambiguity recruits parietal cortex areas that process 3D spatial relationships. The spontaneous reversal reflects competition between two neural populations in the dorsal visual stream, each encoding a different depth interpretation. The switching rate is influenced by attention, fatigue, and individual differences in cortical inhibition.",
  },
];

export default examples;
