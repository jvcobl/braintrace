// ============================================================
// MULTISTABLE PERCEPTION GALLERY — EXAMPLE DATA
// ============================================================

export interface MultistableExample {
  id: string;
  title: string;
  interpretations: [string, string];
  prompt: string;
  /** Choice-specific feedback shown in the switch phase */
  switchFeedback: [string, string];
  /** Choice-specific hint for finding the other interpretation */
  switchHint: [string, string];
  /** Choice-specific result text — acknowledges what they saw */
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
      "Front face is lower-left",
      "Front face is upper-right",
    ],
    prompt:
      "This wireframe cube can be seen from two angles. Which face appears to be in front?",
    switchFeedback: [
      "You see the lower-left face as the front. Now try to see the upper-right face as the front instead — as if you're looking at the cube from below.",
      "You see the upper-right face as the front. Now try to see the lower-left face as the front instead — as if you're looking at the cube from above.",
    ],
    switchHint: [
      "Try focusing on the upper-right square and imagining it as the nearest face of the cube.",
      "Try focusing on the lower-left square and imagining it as the nearest face of the cube.",
    ],
    resultFeedback: [
      "Your brain imposed a 3D interpretation with the lower-left face forward. The drawing has no depth cues that favor either reading.",
      "Your brain imposed a 3D interpretation with the upper-right face forward. The drawing has no depth cues that favor either reading.",
    ],
    explanation:
      "The drawing contains no depth cues that favor one orientation. Your brain imposes a 3D interpretation on a flat 2D pattern, and periodically reverses which face it treats as the front.",
    neuroscienceNote:
      "Depth-from-ambiguity recruits parietal areas that normally process 3D space. The reversal reflects competing neural populations in the dorsal visual stream.",
  },
  {
    id: "duck-rabbit",
    title: "Duck or Rabbit",
    interpretations: ["A duck facing left", "A rabbit facing right"],
    prompt:
      "What animal do you see? Look carefully — the same shape can be read two different ways.",
    switchFeedback: [
      "You saw a duck. The beak points left. Now try to see those same shapes as long ears pointing right — a rabbit facing the other direction.",
      "You saw a rabbit. The ears point right. Now try to see those same shapes as a wide beak pointing left — a duck facing the other direction.",
    ],
    switchHint: [
      "The duck's beak becomes the rabbit's ears. Imagine the animal facing to the right.",
      "The rabbit's ears become the duck's beak. Imagine the animal facing to the left.",
    ],
    resultFeedback: [
      "You parsed the protruding shapes as a beak — duck. Re-categorizing those features as ears requires your ventral stream to reclassify the entire object.",
      "You parsed the protruding shapes as ears — rabbit. Re-categorizing those features as a beak requires your ventral stream to reclassify the entire object.",
    ],
    explanation:
      "The ears of the rabbit are the beak of the duck. Your brain's object-recognition system in the ventral stream settles on one category, and switching requires re-categorizing the same features.",
    neuroscienceNote:
      "Category-level switching engages inferotemporal cortex and the OFC's expectation system. Prior knowledge and context bias which animal you see first.",
  },
];

export default examples;
