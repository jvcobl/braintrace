// ============================================================
// MULTISTABLE PERCEPTION GALLERY — EXAMPLE DATA
// ============================================================
// Each entry defines one ambiguous figure for the gallery.
// To add a new example, append to the array below and create
// a matching SVG component in ./figures/.
// ============================================================

export interface MultistableExample {
  /** Unique key for this example */
  id: string;
  /** Display name shown above the figure */
  title: string;
  /** Two competing interpretations */
  interpretations: [string, string];
  /** Short instructional prompt shown before the user picks */
  prompt: string;
  /** Explanation shown after the user has experienced both */
  explanation: string;
  /** Brief neuroscience note tying the example back to the unit */
  neuroscienceNote: string;
}

const examples: MultistableExample[] = [
  {
    id: "rubin-vase",
    title: "Rubin's Vase",
    interpretations: ["A vase", "Two faces in profile"],
    prompt:
      "Look at the figure. Do you see a white vase in the center, or two dark faces looking at each other?",
    explanation:
      "The same contour line serves as the edge of the vase or the edge of each face. Your visual cortex assigns figure and ground — whichever region it treats as the figure becomes the object you perceive, and the other becomes empty background.",
    neuroscienceNote:
      "Figure-ground assignment occurs in areas V2 and V4, modulated by top-down signals from the prefrontal cortex. The toggle between readings is not in the retina — it is cortical.",
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
    explanation:
      "The ears of the rabbit are the beak of the duck. Your brain's object-recognition system in the ventral stream settles on one category, and switching requires re-categorizing the same features.",
    neuroscienceNote:
      "Category-level switching engages inferotemporal cortex and the OFC's expectation system. Prior knowledge and context bias which animal you see first.",
  },
];

export default examples;
