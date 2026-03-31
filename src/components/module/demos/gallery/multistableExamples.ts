// ============================================================
// MULTISTABLE PERCEPTION GALLERY — EXAMPLE DATA
// ============================================================

export interface MultistableExample {
  id: string;
  title: string;
  interpretations: [string, string];
  prompt: string;
  switchFeedback: [string, string];
  switchHint: [string, string];
  resultFeedback: [string, string];
  explanation: string;
  neuroscienceNote: string;
}

const examples: MultistableExample[] = [
  {
    id: "rubin-vase",
    title: "Rubin's Vase",
    interpretations: ["A vase", "Two faces in profile"],
    prompt:
      "Look at the figure below. What do you see first?",
    switchFeedback: [
      "You saw the vase first — your brain treated the bright center as the figure and the dark sides as empty background. Now try to see the dark regions as two face profiles looking at each other.",
      "You saw two faces first — your brain treated the dark side regions as figures and the bright center as background. Now try to see the bright center as a vase or goblet shape.",
    ],
    switchHint: [
      "Focus on the dark areas on each side. Look for a forehead, nose, lips, and chin in profile.",
      "Focus on the bright shape in the center. Follow its outline from the narrow top, out to the wide middle, and back in to the narrow base.",
    ],
    resultFeedback: [
      "Most people see the vase first — the bright central shape pops against the dark background. But the exact same contour line that forms the vase's edge also traces a human face in profile on each side. Nothing in the image changed; your brain simply reassigned which region is the \"figure\" and which is the \"ground.\"",
      "Seeing the faces first is less common — your brain immediately parsed the dark side regions as meaningful shapes. The exact same contour line that forms each face's profile also traces the curved edge of a vase. Nothing in the image changed; your brain simply reassigned which region is the \"figure\" and which is the \"ground.\"",
    ],
    explanation:
      "This is figure-ground assignment: the visual cortex must decide which region of an image is an object (figure) and which is empty space (ground). In Rubin's vase, both assignments are equally valid, so your brain toggles between them. This toggle is multistable perception — one stimulus, two stable interpretations, and your brain can only hold one at a time.",
    neuroscienceNote:
      "Figure-ground segregation begins in V2 and is refined in V4, modulated by top-down feedback from the prefrontal cortex. The initial assignment happens automatically — a cognitive heuristic — before conscious deliberation. The perceptual switch reflects a change in cortical communication patterns, not a change in the retinal input.",
  },
  {
    id: "color-constancy",
    title: "Color Constancy",
    interpretations: ["Blue and dark", "White and gold"],
    prompt:
      "Look at the striped panel. What colors do you see — blue and dark, or white and gold?",
    switchFeedback: [
      "You see blue and dark stripes. Your brain is reading the lighting as bright and even, so it takes the colors at face value. Now try imagining the panel is sitting in deep shadow — could those same tones be a washed-out white and a muted gold?",
      "You see white and gold stripes. Your brain is assuming the panel is in shadow and compensating — subtracting the darkness to reveal lighter, warmer colors underneath. Now try imagining the lighting is bright and even — could those tones simply be blue and dark brown?",
    ],
    switchHint: [
      "Imagine a warm shadow falling across a white-and-gold fabric. The shadow would shift white toward blue-grey and gold toward dark brown — exactly these colors.",
      "Imagine bright, even light on the panel. Under flat lighting, no shadow correction is needed — the blue is blue and the dark tone is dark.",
    ],
    resultFeedback: [
      "You saw blue and dark — your visual system treated the lighting as neutral, so it read the pixel colors directly. But someone else's brain, assuming the panel is in shadow, would automatically subtract the shadow and perceive white and gold instead. Neither reading is wrong; the ambiguity is in the assumed illumination, not the image.",
      "You saw white and gold — your visual system assumed the panel is in shadow and compensated, perceiving lighter, warmer colors than the pixels actually contain. But someone else's brain, treating the light as even, would see blue and dark. Neither reading is wrong; the ambiguity is in the assumed illumination, not the image.",
    ],
    explanation:
      "This is color constancy — the brain's automatic correction for lighting conditions. Your visual system does not report raw pixel colors; it infers the lighting and adjusts what you perceive so that objects appear to have stable colors across changing illumination. When the lighting itself is ambiguous, different brains make different assumptions, producing genuinely different conscious experiences of the same image.",
    neuroscienceNote:
      "Color constancy is computed in V4 and modulated by contextual surround signals. The brain uses the surrounding gradient as a cue to infer illumination. Different assumptions about the light source lead V4 to apply different corrections — which is why two people can look at identical pixel values and sincerely report different colors. This is the same mechanism behind the widely-discussed dress photograph.",
  },
  {
    id: "necker-cube",
    title: "Necker Cube",
    interpretations: [
      "Lower-left face is in front",
      "Upper-right face is in front",
    ],
    prompt:
      "This wireframe cube has no shading or perspective cues. Which square face appears to be closest to you?",
    switchFeedback: [
      "You see the lower-left face as the front — as if you're looking at the cube from slightly above. Now try to flip the depth: imagine the upper-right face is the one closest to you, as if you're looking up at the cube from below.",
      "You see the upper-right face as the front — as if you're looking at the cube from below. Now try to flip the depth: imagine the lower-left face is the one closest to you, as if you're looking down at the cube from above.",
    ],
    switchHint: [
      "Focus on the upper-right square. Try to see it as a solid surface sitting in front of everything else. The lower-left square should recede into the background.",
      "Focus on the lower-left square. Try to see it as a solid surface sitting in front of everything else. The upper-right square should recede into the background.",
    ],
    resultFeedback: [
      "You interpreted the lower-left face as nearest — your brain imposed a viewpoint from above-right. But the drawing is perfectly flat with no depth cues favoring either reading. The same twelve lines support both 3D interpretations equally. Your visual system chose a depth assignment automatically and ran with it.",
      "You interpreted the upper-right face as nearest — your brain imposed a viewpoint from below-left. But the drawing is perfectly flat with no depth cues favoring either reading. The same twelve lines support both 3D interpretations equally. Your visual system chose a depth assignment automatically and ran with it.",
    ],
    explanation:
      "The Necker cube demonstrates depth reversal — a different category of multistable perception from figure-ground (Rubin's vase) or color constancy. Your brain automatically constructs a 3D interpretation from a 2D wireframe, but the drawing is genuinely ambiguous: it contains no shadows, no perspective convergence, and no occlusion cues. With nothing to anchor the depth assignment, your visual system periodically flips between two equally valid readings.",
    neuroscienceNote:
      "Depth-from-ambiguity recruits parietal cortex areas that normally process 3D spatial relationships. The spontaneous reversal reflects competition between two neural populations in the dorsal visual stream, each encoding a different depth interpretation. The rate of switching is influenced by attention, fatigue, and even individual differences in cortical inhibition.",
  },
];

export default examples;
