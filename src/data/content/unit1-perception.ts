// ============================================================
// UNIT 1 — Perception and Object Recognition
// All content sourced strictly from NBB302 lecture notes
// ============================================================

export const unit1Meta = {
  id: "unit-1",
  title: "Perception and Object Recognition",
  subtitle: "How the brain constructs what you see",
  overview:
    "This unit covers how raw sensory input becomes conscious perception, why the brain relies on shortcuts and context to interpret the world, how objects and faces are recognized through parallel visual streams, and how top-down predictions from the prefrontal cortex shape what you see before you are even aware of it.",
  majorStructures: [
    "Visual cortex (V1–V5, V8)",
    "Superior colliculus",
    "Inferior temporal (IT) cortex",
    "Fusiform face area (FFA)",
    "Orbitofrontal cortex (OFC)",
    "Prefrontal cortex (PFC)",
    "Posterior parietal lobe",
  ],
  lectureTopics: [
    "Sensation vs. Perception & Multisensory Integration (March 2)",
    "Object Recognition & The Visual Streams (March 4)",
  ],
};

// ============================================================
// CONCEPT CARDS
// ============================================================

export const unit1ConceptCards = [
  {
    id: "u1-cc-01",
    term: "Sensation vs. Perception",
    definition:
      "There is no clear anatomical boundary where sensation ends and perception begins. Sensation refers to the initial detection of a stimulus by sensory receptors, while perception is the brain's interpretation of that input. The two blend together along the processing pathway.",
    structures: ["Retina", "Visual cortex (V1–V8)"],
  },
  {
    id: "u1-cc-02",
    term: "Flicker Fusion",
    definition:
      "Rapidly flashing lights are processed by the retina (sensation) long before we consciously perceive a solid, continuous light. That conscious experience does not occur until the visual signal reaches cortical area V8, demonstrating the gap between early sensory processing and later perceptual awareness.",
    structures: ["Retina", "V8"],
  },
  {
    id: "u1-cc-03",
    term: "Perceptual Gain (Illusory Movement)",
    definition:
      "Static optical illusions that appear to move demonstrate a 'gain' in perception — the brain generates motion that does not exist in the physical stimulus. During these illusions, area V5 shows neural activity associated with movement even though nothing is actually moving.",
    structures: ["V5"],
  },
  {
    id: "u1-cc-04",
    term: "Scotoma (Loss of Function)",
    definition:
      "Blind spots in the visual field that correspond with a reduced BOLD (blood-oxygen-level-dependent) response in visual areas V1 through V4. Scotomas are likely linked to a mechanism called cortical spreading depression and represent a loss of visual function.",
    structures: ["V1", "V2", "V3", "V4"],
  },
  {
    id: "u1-cc-05",
    term: "Scintillating Scotoma (Gain of Function)",
    definition:
      "Visual artifacts such as 'ants and snow' or color pixels that patients perceive during visual migraine auras. These show an increased BOLD response. Loss and gain of function can occur simultaneously, and manifestation varies drastically by individual, making these auras notoriously difficult to study via fMRI.",
    structures: ["Visual cortex"],
  },
  {
    id: "u1-cc-06",
    term: "Multistable Perception",
    definition:
      "When the brain toggles between two valid interpretations of a single ambiguous image — like a white vase versus two silhouetted faces, or the blue/black dress. Toggling perspectives changes how the visual cortex communicates with higher-order regions like the prefrontal cortex and ventral stream.",
    structures: ["Visual cortex", "Prefrontal cortex", "Ventral stream"],
  },
  {
    id: "u1-cc-07",
    term: "Cognitive Heuristics",
    definition:
      "The brain uses energetic shortcuts to jump to conclusions efficiently without conscious thought. Multistability proves these heuristics exist: the brain picks one interpretation and runs with it. Heuristics extend beyond vision to empathy, emotion, and logic.",
    structures: ["Prefrontal cortex"],
  },
  {
    id: "u1-cc-08",
    term: "Aphantasia",
    definition:
      "The inability to visualize in the 'mind's eye,' rated as 0 on a scale from 0 to 5. Aphantasia is not a perceptual failure, disorder, or face blindness — it is a different cognitive thinking style. People with aphantasia can still recognize objects and faces normally.",
    structures: [],
  },
  {
    id: "u1-cc-09",
    term: "Hyperphantasia",
    definition:
      "Extremely vivid mental imagery, rated as 5 on the visualization scale. Represents the opposite end of the spectrum from aphantasia. The ability to visualize exists on a continuum across the population.",
    structures: [],
  },
  {
    id: "u1-cc-10",
    term: "Synesthesia",
    definition:
      "Present in 4–5% of the population, synesthesia involves experiencing multiple sensory modalities through a single stimulus. For example, in color-grapheme synesthesia, the letter 'S' is always perceived as magenta. It provides a distinct memory advantage because multiple sensory nodes fire simultaneously, strengthening neural connections via the Hebbian rule.",
    structures: [],
  },
  {
    id: "u1-cc-11",
    term: "Hebbian Rule",
    definition:
      "'Neurons that fire together, wire together.' When multiple neurons activate simultaneously and repeatedly, the synaptic connections between them strengthen. This is why synesthesia provides a memory advantage — multiple sensory representations reinforce the same association.",
    structures: [],
  },
  {
    id: "u1-cc-12",
    term: "Multisensory Integration",
    definition:
      "The brain naturally unifies inputs from different senses into a single coherent experience. This is demonstrated by the ventriloquist dummy effect and the McGurk effect, where visual input (watching lips move) fundamentally alters what is heard. The brain prioritizes a unified interpretation over conflicting raw signals.",
    structures: ["Superior colliculus"],
  },
  {
    id: "u1-cc-13",
    term: "Superior Colliculus",
    definition:
      "A midbrain structure that houses multisensory cells converging visual, auditory, and tactile inputs. It plays a central role in multisensory integration and is also part of the attention network, helping direct gaze and orienting responses toward salient stimuli.",
    structures: ["Superior colliculus"],
  },
  {
    id: "u1-cc-14",
    term: "Object Constancy",
    definition:
      "The brain's ability to recognize an object as the same thing despite changes in viewing position, illumination, and context. We fill in gaps using prior knowledge — recognizing the Golden Gate Bridge without visiting it, or assuming a dog behind a couch has four legs. Context illusions like the Ames Room exploit these assumptions.",
    structures: ["Ventral stream", "IT cortex"],
  },
  {
    id: "u1-cc-15",
    term: "Ames Room",
    definition:
      "A context illusion where a room with a slanted floor tricks the brain into perceiving people at dramatically different sizes. It demonstrates that the brain relies heavily on contextual assumptions to maintain object constancy, and those assumptions can be exploited.",
    structures: [],
  },
  {
    id: "u1-cc-16",
    term: "Dorsal Stream ('Where/How')",
    definition:
      "One of two parallel visual processing streams. Travels via the superior longitudinal fasciculus to the posterior parietal lobe. Responsible for spatial orientation and guiding action — knowing where an object is and how to interact with it. Damage leaves subjects able to identify an object but unable to orient it properly (e.g., rotating it to fit a slot).",
    structures: ["Superior longitudinal fasciculus", "Posterior parietal lobe"],
  },
  {
    id: "u1-cc-17",
    term: "Ventral Stream ('What')",
    definition:
      "The second parallel visual processing stream. Travels via the inferior longitudinal fasciculus to the inferior temporal (IT) cortex. Responsible for object identification — knowing what something is. Damage impairs the ability to grasp an object or begin a task because the object cannot be identified.",
    structures: ["Inferior longitudinal fasciculus", "Inferior temporal cortex"],
  },
  {
    id: "u1-cc-18",
    term: "Inferior Temporal (IT) Cortex",
    definition:
      "The endpoint of the ventral stream where conscious visual recognition occurs. Receptive fields grow larger moving from V1/V2 to the IT cortex. Single neurons here fire for specific complex concepts (like a hand) regardless of blurriness or spatial orientation. In binocular rivalry experiments, IT cortex cells spiked exactly one second before the monkey pressed a button, proving this is where conscious visual perception occurs.",
    structures: ["Inferior temporal cortex"],
  },
  {
    id: "u1-cc-19",
    term: "Binocular Rivalry",
    definition:
      "When different images are shown to each eye, the brain alternates between perceiving one or the other. In macaque studies, lower visual areas (V1) showed only 10–20% fluctuation with perception, and V4 showed 25–33%. But IT cortex cells spiked precisely with conscious perception, proving the IT cortex is the site of conscious visual recognition.",
    structures: ["V1", "V4", "IT cortex"],
  },
  {
    id: "u1-cc-20",
    term: "Pareidolia",
    definition:
      "The tendency to perceive faces in objects that are not faces — like seeing a face in a wall plug or a monkey orchid. This occurs because the face-recognition system is biased toward detecting face-like patterns, even when they are not actually present.",
    structures: ["Fusiform face area"],
  },
  {
    id: "u1-cc-21",
    term: "Ensemble Theory",
    definition:
      "The idea that recognition relies on cell ensembles — subgroups of neurons that each recognize specific features like hair, eyes, and mouth shapes — rather than a single 'grandmother cell' dedicated to one person. The grandmother cell theory (one neuron per known person) is considered flawed.",
    structures: ["IT cortex", "Fusiform face area"],
  },
  {
    id: "u1-cc-22",
    term: "Fusiform Face Area (FFA)",
    definition:
      "A region on the fusiform gyrus dedicated to facial recognition. Damage here causes prosopagnosia (face blindness), preventing the construction of an individual's identity. The FFA is likely a general 'expertise' area — it lights up in chess masters viewing chessboards, not just during face processing.",
    structures: ["Fusiform gyrus"],
  },
  {
    id: "u1-cc-23",
    term: "Prosopagnosia (Face Blindness)",
    definition:
      "A condition caused by damage to the fusiform face area that prevents a person from constructing an individual's identity abstract from facial features. People with prosopagnosia can see faces but cannot recognize who they belong to.",
    structures: ["Fusiform face area"],
  },
  {
    id: "u1-cc-24",
    term: "Low Spatial Frequency (LSF) Processing",
    definition:
      "When viewing highly blurred images, the visual system extracts coarse, low spatial frequency information first — broad shapes and contrast patterns. This rough signal jumps via anatomical shortcuts to the orbitofrontal cortex and prefrontal cortex, which generate an initial 'best guess' about the object's identity 50 milliseconds before conscious recognition occurs in the IT cortex.",
    structures: ["OFC", "PFC", "IT cortex"],
  },
  {
    id: "u1-cc-25",
    term: "Orbitofrontal Cortex (OFC)",
    definition:
      "Located above the eyes, the OFC is heavily involved in categorization and object expectations. In the context of visual perception, it receives low spatial frequency input via a fast shortcut and generates a contextual prediction — a top-down guess — that is sent back to the IT cortex before full conscious recognition occurs.",
    structures: ["Orbitofrontal cortex"],
  },
  {
    id: "u1-cc-26",
    term: "Top-Down Processing",
    definition:
      "Vision is simultaneously bottom-up (stimulus-driven) and top-down (expectation-driven). Moshe Bar's research showed that the PFC makes an initial guess based on context using low spatial frequency information and routes it back to the IT cortex 50 milliseconds before conscious recognition. The brain does not passively receive — it actively predicts.",
    structures: ["PFC", "OFC", "IT cortex"],
  },
  {
    id: "u1-cc-27",
    term: "Implicit Bias as a Cost of Heuristics",
    definition:
      "The same PFC-driven heuristic system that enables fast recognition also carries costs. Joshua Correll's research showed that in computer simulations, subjects consistently shot Black individuals faster than White individuals. The neurobiology reveals a rapid 'threat' P200 ERP waveform followed by a delayed or weakened N200 'inhibitory/think-a-second' waveform originating in the PFC. This illustrates how the speed of heuristic processing can override careful evaluation.",
    structures: ["PFC"],
  },
  {
    id: "u1-cc-28",
    term: "Expertise Area (FFA)",
    definition:
      "The fusiform face area may function as a general expertise-recognition area rather than being exclusively for faces. Evidence: it activates in chess masters viewing chessboards, suggesting it specializes in rapid pattern recognition for any domain where a person has developed deep expertise.",
    structures: ["Fusiform face area"],
  },
  {
    id: "u1-cc-29",
    term: "McGurk Effect",
    definition:
      "A multisensory integration phenomenon where visual input (watching lips form one syllable) fundamentally alters what is heard (a different syllable is playing). This demonstrates that the brain does not process senses independently — it fuses them, and vision can override audition.",
    structures: ["Superior colliculus"],
  },
  {
    id: "u1-cc-30",
    term: "Posterior Parietal Lobe",
    definition:
      "The destination of the dorsal visual stream. This region processes spatial relationships and guides motor actions toward objects. Damage here leaves a person able to identify what an object is but unable to orient their hand or body to interact with it correctly.",
    structures: ["Posterior parietal lobe"],
  },
];

// ============================================================
// PATHWAY BLOCKS
// ============================================================

export const unit1Pathways = [
  {
    id: "u1-pw-01",
    title: "Low Spatial Frequency Shortcut (Top-Down Prediction)",
    description:
      "How the brain makes a fast guess about blurry or degraded visual input before conscious recognition occurs.",
    steps: [
      {
        number: 1,
        structure: "Retina / Early Visual Cortex",
        description:
          "The visual system receives coarse, blurry information first — broad shapes and contrast patterns that carry low spatial frequency data before fine edges and textures arrive.",
      },
      {
        number: 2,
        structure: "Orbitofrontal Cortex (OFC)",
        description:
          "The rough signal jumps via an anatomical shortcut to the OFC, which rapidly generates a contextual prediction — a best guess about the object's identity — using prior experience and expectations.",
      },
      {
        number: 3,
        structure: "Prefrontal Cortex (PFC)",
        description:
          "The PFC refines the initial guess and routes this top-down prediction back toward the temporal lobe 50 milliseconds before conscious recognition occurs.",
      },
      {
        number: 4,
        structure: "Inferior Temporal (IT) Cortex",
        description:
          "As finer detail arrives through the ventral stream, the IT cortex performs detailed object recognition and either confirms or overrides the OFC's initial prediction. This is where conscious visual perception occurs.",
      },
    ],
  },
  {
    id: "u1-pw-02",
    title: "Dorsal vs. Ventral Stream Split",
    description:
      "How the brain separates 'what is it?' from 'where is it and how do I use it?' into two parallel processing pathways.",
    steps: [
      {
        number: 1,
        structure: "Primary Visual Cortex (V1/V2)",
        description:
          "Visual information is initially processed in the early visual cortex, where basic features like edges, orientation, and color are extracted.",
      },
      {
        number: 2,
        structure: "Pathway Split",
        description:
          "The signal splits into two parallel streams traveling through the longitudinal fasciculus — one heading upward (dorsal) and one heading downward and forward (ventral).",
      },
      {
        number: 3,
        structure: "Dorsal Stream → Posterior Parietal Lobe",
        description:
          "The 'Where/How' pathway travels via the superior longitudinal fasciculus to the posterior parietal lobe. It processes spatial location and guides motor interaction with objects.",
      },
      {
        number: 4,
        structure: "Ventral Stream → Inferior Temporal (IT) Cortex",
        description:
          "The 'What' pathway travels via the inferior longitudinal fasciculus to the IT cortex. It processes object identity — recognizing what the object is regardless of angle, lighting, or context.",
      },
    ],
  },
  {
    id: "u1-pw-03",
    title: "Multisensory Convergence in the Superior Colliculus",
    description:
      "How the brain unifies visual, auditory, and tactile inputs into a single coherent experience.",
    steps: [
      {
        number: 1,
        structure: "Sensory Inputs (Visual, Auditory, Tactile)",
        description:
          "Separate sensory signals arrive from the eyes, ears, and body carrying information about the same event from different modalities.",
      },
      {
        number: 2,
        structure: "Superior Colliculus",
        description:
          "A midbrain structure containing multisensory cells that receive converging visual, auditory, and tactile inputs. These cells integrate the signals into a unified representation.",
      },
      {
        number: 3,
        structure: "Unified Percept",
        description:
          "The brain produces a single coherent experience rather than three separate ones. This is why a ventriloquist's voice seems to come from the dummy's mouth, and why visual lip movements alter what you hear in the McGurk effect.",
      },
    ],
  },
  {
    id: "u1-pw-04",
    title: "From Sensation to Conscious Visual Recognition",
    description:
      "How a visual stimulus travels from the retina to conscious awareness, with perception emerging gradually along the pathway.",
    steps: [
      {
        number: 1,
        structure: "Retina",
        description:
          "Light hits photoreceptors. Basic sensory transduction occurs here. The retina processes rapidly flashing lights (as in flicker fusion) long before any conscious perception.",
      },
      {
        number: 2,
        structure: "V1 / V2 (Early Visual Cortex)",
        description:
          "Basic features are extracted — edges, orientation, spatial frequency. In binocular rivalry, cells here fluctuate only 10–20% with conscious perception, meaning they are not yet 'deciding' what you see.",
      },
      {
        number: 3,
        structure: "V4 / Higher Visual Areas",
        description:
          "More complex features are processed. V4 cells fluctuate 25–33% with perception in rivalry studies. The signal is being refined but is not yet fully conscious.",
      },
      {
        number: 4,
        structure: "Inferior Temporal (IT) Cortex",
        description:
          "Conscious visual perception occurs here. Single neurons fire for specific complex concepts regardless of blurriness or orientation. In binocular rivalry, IT cortex activity tracked perfectly with what the subject reported seeing.",
      },
    ],
  },
];

// ============================================================
// DISTINCTION BLOCKS
// ============================================================

export const unit1Distinctions = [
  {
    id: "u1-db-01",
    termA: "Sensation",
    termB: "Perception",
    descriptionA:
      "The initial detection and transduction of a physical stimulus by sensory receptors. Example: the retina detecting rapidly flashing lights.",
    descriptionB:
      "The brain's constructed interpretation of sensory input, shaped by context, expectations, and prior experience. Example: perceiving a continuous light from those same flashes (flicker fusion in V8).",
    keyDifference:
      "There is no clean anatomical boundary between them. They blend together along the processing pathway, but sensation refers to early detection and perception refers to the brain's interpretation.",
  },
  {
    id: "u1-db-02",
    termA: "Bottom-Up Processing",
    termB: "Top-Down Processing",
    descriptionA:
      "Processing driven by the physical stimulus itself — information flows from sensory receptors upward through the visual hierarchy. The brain responds to what is actually there.",
    descriptionB:
      "Processing driven by expectations, context, and prior knowledge — information flows from the PFC and OFC downward to shape perception. Moshe Bar's research showed the PFC sends a prediction to the IT cortex 50ms before conscious recognition.",
    keyDifference:
      "Vision uses both simultaneously. Bottom-up carries the raw signal; top-down carries the brain's guess. When they conflict, you get illusions or recognition errors.",
  },
  {
    id: "u1-db-03",
    termA: "Dorsal Stream ('Where/How')",
    termB: "Ventral Stream ('What')",
    descriptionA:
      "Travels to the posterior parietal lobe via the superior longitudinal fasciculus. Processes spatial location and guides motor interaction. Damage leaves a person able to name an object but unable to orient it.",
    descriptionB:
      "Travels to the inferior temporal cortex via the inferior longitudinal fasciculus. Processes object identity. Damage impairs the ability to identify what an object is.",
    keyDifference:
      "The dorsal stream answers 'where is it and how do I use it?' while the ventral stream answers 'what is it?' They operate in parallel from the same visual input.",
  },
  {
    id: "u1-db-04",
    termA: "Pareidolia",
    termB: "True Face Recognition",
    descriptionA:
      "Perceiving face-like patterns in non-face objects (wall plugs, orchids). The face-recognition system is biased to detect faces even when none are present.",
    descriptionB:
      "Accurate identification of an actual individual's face. Relies on cell ensembles in the FFA that encode specific features (hair, eyes, mouth) to construct an identity.",
    keyDifference:
      "Pareidolia is a false positive from an over-eager pattern detector. True recognition requires the FFA to construct a detailed identity abstract from real facial features.",
  },
  {
    id: "u1-db-05",
    termA: "Aphantasia",
    termB: "Prosopagnosia (Face Blindness)",
    descriptionA:
      "The inability to visualize in the mind's eye (rated 0 on the imagery scale). It is not a disorder or perceptual failure — it is a different cognitive thinking style. People with aphantasia can still recognize faces normally.",
    descriptionB:
      "A condition caused by damage to the fusiform face area that prevents constructing an individual's identity from facial features. Prosopagnosia is a genuine recognition impairment.",
    keyDifference:
      "Aphantasia affects internal mental imagery but not external visual recognition. Prosopagnosia impairs the ability to identify faces in the real world. They are unrelated conditions.",
  },
  {
    id: "u1-db-06",
    termA: "Multistability",
    termB: "Optical Illusion",
    descriptionA:
      "The brain toggles between two equally valid interpretations of a single ambiguous stimulus. Both percepts are real — the image genuinely supports both readings. Example: the vase/faces image.",
    descriptionB:
      "The brain is tricked into perceiving something that does not match physical reality. Example: the Ames Room makes people appear different sizes due to a slanted floor. Only one interpretation matches reality.",
    keyDifference:
      "In multistability, both interpretations are valid and the brain alternates. In an illusion, one interpretation is wrong — the brain has been deceived by context.",
  },
];

// ============================================================
// CASE NOTES
// ============================================================

export const unit1CaseNotes = [
  {
    id: "u1-cn-01",
    title: "Visual Migraine Auras",
    content:
      "Visual migraine auras demonstrate both loss and gain of function in the visual system. Scotomas (blind spots) show reduced BOLD response in V1–V4, likely linked to cortical spreading depression. Scintillating scotomas produce visual artifacts like 'ants and snow' or color pixels with increased BOLD response. Loss and gain can occur simultaneously. The extreme variability between individuals makes these auras notoriously difficult to study with fMRI.",
    sensitivity: "standard",
  },
  {
    id: "u1-cn-02",
    title: "Prosopagnosia",
    content:
      "Prosopagnosia (face blindness) results from damage to the fusiform face area on the fusiform gyrus. People with this condition can see faces — they know a face is in front of them — but they cannot construct an individual's identity from those features. They may fail to recognize close family members or even their own reflection. This demonstrates that face recognition depends on a specialized cortical region, not general visual ability.",
    sensitivity: "standard",
  },
  {
    id: "u1-cn-03",
    title: "Chess Expertise and the FFA",
    content:
      "The fusiform face area is likely not exclusively a 'face area' but a general expertise-recognition area. Evidence: the FFA lights up in chess masters viewing chessboard configurations. This suggests the FFA specializes in rapid, expert-level pattern recognition for any domain where deep familiarity has been developed, not just for faces.",
    sensitivity: "standard",
  },
  {
    id: "u1-cn-04",
    title: "The Cost of Heuristics: Implicit Bias",
    content:
      "Joshua Correll's research demonstrated that the same fast heuristic system enabling rapid object recognition also carries serious costs. In computer simulations, subjects consistently shot Black individuals faster than White individuals. The neurobiology shows a rapid P200 ERP 'threat' waveform followed by a delayed or weakened N200 'inhibitory/think-a-second' waveform from the PFC. This illustrates how the speed of the top-down prediction system can override careful evaluation when societal biases have shaped the brain's heuristic expectations.",
    sensitivity: "high",
    sensitivityNote:
      "This material is presented as a neuroscience study card, not as an interactive experience. It demonstrates the biological cost of the same heuristic system covered in this unit.",
  },
];

// ============================================================
// REVIEW QUESTIONS
// ============================================================

export const unit1Review = [
  {
    id: "u1-rq-01",
    question:
      "Why does flicker fusion demonstrate that the line between sensation and perception is blurred?",
    hint: "Think about what the retina detects versus what you consciously see, and where in the visual pathway the switch happens.",
  },
  {
    id: "u1-rq-02",
    question:
      "What does multistable perception prove about how the brain processes ambiguous information?",
    hint: "Consider what it means that the brain toggles between two interpretations rather than blending them.",
  },
  {
    id: "u1-rq-03",
    question:
      "A patient can name a screwdriver but cannot orient it to fit into a screw. Which visual stream is likely damaged, and where does that stream project?",
    hint: "One stream handles identity; the other handles spatial orientation and motor guidance.",
  },
  {
    id: "u1-rq-04",
    question:
      "Explain the pathway by which your brain identifies a blurry object before you are consciously aware of what it is.",
    hint: "Start with low spatial frequency input and trace through the OFC, PFC, and IT cortex.",
  },
  {
    id: "u1-rq-05",
    question:
      "Why is the fusiform face area better described as an 'expertise area' than a dedicated face-recognition module?",
    hint: "Think about what other types of stimuli activate the FFA in experts.",
  },
  {
    id: "u1-rq-06",
    question:
      "How does the superior colliculus contribute to multisensory integration, and what everyday phenomenon demonstrates this?",
    hint: "Consider what kinds of sensory inputs converge there and what happens when vision and sound conflict.",
  },
  {
    id: "u1-rq-07",
    question:
      "In binocular rivalry experiments, why is the IT cortex considered the site of conscious visual perception rather than V1 or V4?",
    hint: "Compare the percentage of cells that tracked with what the subject reported seeing at each level.",
  },
  {
    id: "u1-rq-08",
    question:
      "Explain how the Ames Room illusion demonstrates the brain's reliance on contextual assumptions for object constancy.",
    hint: "Think about what assumption the brain makes about the room's geometry and how that distorts size perception.",
  },
];
