// ============================================================
// UNIT 3 — Emotion, Limbic System, and Amygdala
// All content sourced from neuroscience literature on emotion and the amygdala
// ============================================================

export const unit3Meta = {
  id: "unit-3",
  title: "Emotion, Limbic System, and Amygdala",
  subtitle: "How the brain detects what matters",
  overview:
    "This unit covers the architecture of emotion, how the limbic system and hypothalamus regulate survival responses, the precise definitions that distinguish emotion from arousal and fear from anxiety, how the amygdala functions as a salience center rather than a simple fear center, the anatomy of startle circuitry, and what happens when amygdala function is disrupted.",
  majorStructures: [
    "Hypothalamus",
    "Basolateral amygdala (BLA)",
    "Central amygdala (CeA)",
    "Medial amygdala (MeA)",
    "Intercalated cells (ITCs)",
    "Pontine reticular nucleus (PNC)",
    "Medial geniculate nucleus (MGN)",
    "Ventral hippocampus",
  ],
  lectureTopics: [
    "The Limbic System and Definitions of Emotion (March 18)",
    "The Amygdala and the Architecture of Fear (March 23)",
  ],
};

// ============================================================
// CONCEPT CARDS
// ============================================================

export const unit3ConceptCards = [
  {
    id: "u3-cc-01",
    term: "Triune Brain Metaphor",
    definition:
      "Paul MacLean's model divides the brain into three evolutionary layers: Layer 1 (Reptilian) is the brainstem, handling autonomic and regulatory reflexes. Layer 2 (Paleomammalian) is the limbic system, handling emotion and motivation. Layer 3 (Neomammalian) is the cortex, handling cognition, memory, and sentience. The model is technically flawed — reptiles do feel emotion — but it serves as a useful anatomical metaphor for understanding brain organization.",
    structures: ["Brainstem", "Limbic system", "Cortex"],
  },
  {
    id: "u3-cc-02",
    term: "Hypothalamus",
    definition:
      "Sits between the brainstem and limbic system, mediating between Layer 1 and Layer 2. Regulates the Four F's: Feeding, Fleeing, Fighting, and Reproduction. Acts as the switch between the sympathetic and parasympathetic nervous systems.",
    structures: ["Hypothalamus"],
  },
  {
    id: "u3-cc-03",
    term: "The Four F's",
    definition:
      "The four survival functions regulated by the hypothalamus: Feeding, Fleeing, Fighting, and Reproduction. These represent the most fundamental motivational drives that the limbic system manages.",
    structures: ["Hypothalamus"],
  },
  {
    id: "u3-cc-04",
    term: "Sympathetic Nervous System",
    definition:
      "The 'Fight or Flight' division of the autonomic nervous system. Activated for short-term survival — increases heart rate, dilates pupils, halts digestion, and redirects energy to muscles. The hypothalamus acts as the switch that activates this system.",
    structures: ["Hypothalamus"],
  },
  {
    id: "u3-cc-05",
    term: "Parasympathetic Nervous System",
    definition:
      "The 'Rest and Digest' division of the autonomic nervous system. Active during long-term survival and recovery — slows heart rate, constricts pupils, promotes digestion and energy storage. Represents the body's recovery and maintenance state.",
    structures: ["Hypothalamus"],
  },
  {
    id: "u3-cc-06",
    term: "PFC as Layer 2/3 Mediator",
    definition:
      "The prefrontal cortex mediates between the emotional limbic system (Layer 2) and higher cognition (Layer 3). It is the structure that allows you to regulate emotional impulses with reason. A severe failure of this top-down PFC control is called hypofrontality.",
    structures: ["Prefrontal cortex"],
  },
  {
    id: "u3-cc-07",
    term: "Hypofrontality",
    definition:
      "A severe lack of top-down PFC control over subcortical emotional circuits. When the PFC fails to regulate the limbic system, behavior becomes impulsive, emotionally reactive, and poorly planned. This is the neurological basis of what happened to Phineas Gage.",
    structures: ["PFC"],
  },
  {
    id: "u3-cc-08",
    term: "Emotion",
    definition:
      "A transient state — not a personality trait — that contains specific valence (positive or negative) and motivates approach or avoid behaviors. An emotion is a brief episode with a clear direction, not a permanent characteristic of a person.",
    structures: [],
  },
  {
    id: "u3-cc-09",
    term: "Arousal",
    definition:
      "The magnitude or intensity of physiological activation — for example, cortisol release or surprise. Arousal has no valence; it is neither positive nor negative by itself. It simply reflects how activated the body is. High arousal can accompany both terror and excitement.",
    structures: [],
  },
  {
    id: "u3-cc-10",
    term: "Valence",
    definition:
      "The positive or negative quality of an emotional state. Valence is what distinguishes emotion from arousal — arousal is intensity without direction, while valence gives the emotional state its positive (approach) or negative (avoid) character.",
    structures: [],
  },
  {
    id: "u3-cc-11",
    term: "Introspection",
    definition:
      "Looking inward to analyze one's own thoughts. Introduced by Wundt. Introspection is a cognitive process — deliberate self-examination of mental content. It is distinct from interoception, which involves sensing the body's physiological state.",
    structures: [],
  },
  {
    id: "u3-cc-12",
    term: "Interoception",
    definition:
      "Deep, visceral physiological signals from within the body — like hunger, nausea, a racing heart, or vague unease. Interoception is about sensing the body's internal state, not analyzing thoughts. Barrett's theory of constructed emotion relies heavily on interoceptive signals as the raw material for emotional experience.",
    structures: [],
  },
  {
    id: "u3-cc-13",
    term: "Fear",
    definition:
      "The emotional appraisal of a tangible, imminent threat that is staring you in the face. Fear is a response to something present and identifiable — a snake on the path, a car swerving toward you. It is distinct from anxiety, which is about predicted future threats.",
    structures: ["Amygdala"],
  },
  {
    id: "u3-cc-14",
    term: "Anxiety",
    definition:
      "The prediction or anticipation of a future threat. Unlike fear, anxiety does not require a tangible stimulus in front of you — it is about what might happen. Anxiety reflects the brain's forward-looking threat-assessment system and can become pathological when overgeneralized.",
    structures: ["Amygdala", "PFC"],
  },
  {
    id: "u3-cc-15",
    term: "LeDoux's Low Road",
    definition:
      "A fast, low-precision, subcortical heuristic pathway where sensory stimuli travel directly to the amygdala to bias survival. The low road is quick and dirty — it detects potential threats before conscious evaluation occurs. Speed is prioritized over accuracy.",
    structures: ["Amygdala"],
  },
  {
    id: "u3-cc-16",
    term: "LeDoux's High Road",
    definition:
      "A slower, precise pathway where sensory information travels through the cortex for full contextual processing before reaching the amygdala. The high road can then inhibit or confirm the low road's initial alarm. It is the brain's 'think-a-second' system.",
    structures: ["Cortex", "Amygdala"],
  },
  {
    id: "u3-cc-17",
    term: "Barrett's Constructed Emotion",
    definition:
      "Lisa Feldman Barrett's highly debated theory that there are no specific emotion centers in the brain. Instead, emotions are socially constructed memories based on deep bodily interoceptions that we learn to label based on cultural context. The brain builds emotions from raw physiological signals plus learned categories.",
    structures: [],
  },
  {
    id: "u3-cc-18",
    term: "Amygdala as Salience Center",
    definition:
      "The amygdala is NOT the 'fear center.' It is the salience center — its job is to stamp importance onto an event's memory formation, saying 'this is important, remember it.' It is hyper-active during fear, but also intensely active during reward, addiction (with the nucleus accumbens), and highly positive events like the birth of a child, marriage, or earning a PhD.",
    structures: ["Amygdala", "Nucleus accumbens"],
  },
  {
    id: "u3-cc-19",
    term: "Basolateral Amygdala (BLA)",
    definition:
      "Comprised of the lateral and basal nuclei. The BLA is the major input hub — the 'ears' of the amygdala. It receives sensory and cortical information and routes it to other amygdala subregions for processing.",
    structures: ["Basolateral amygdala"],
  },
  {
    id: "u3-cc-20",
    term: "Central Amygdala (CeA)",
    definition:
      "The major output hub of the amygdala. The CeA sends behavioral and hormonal commands outward — triggering freezing, autonomic responses, and hormonal cascades. It is the structure that translates amygdala processing into observable behavior.",
    structures: ["Central amygdala"],
  },
  {
    id: "u3-cc-21",
    term: "Medial Amygdala (MeA)",
    definition:
      "Processes social situations and contains dense receptors for gonadal hormones (estrogen, testosterone). The MeA can bypass the BLA for direct priming, meaning social and hormonal signals can activate the amygdala through a separate channel.",
    structures: ["Medial amygdala"],
  },
  {
    id: "u3-cc-22",
    term: "Intercalated Cells (ITCs)",
    definition:
      "GABAergic (inhibitory) cells flanking the BLA that act as 'brakes' to quiet the amygdala. When activated, ITCs suppress amygdala output. They are the critical mechanism by which the prefrontal cortex can inhibit fear and anxiety responses.",
    structures: ["Intercalated cells", "BLA"],
  },
  {
    id: "u3-cc-23",
    term: "Amygdala Primers",
    definition:
      "Conditions that pre-activate the amygdala, making it more reactive to subsequent stimuli. Known primers include: sleep deprivation, generalized anxiety, epileptic activity, and pain or physiological shock. A primed amygdala exaggerates responses to events that might otherwise be processed calmly.",
    structures: ["Amygdala"],
  },
  {
    id: "u3-cc-24",
    term: "Acoustic Startle Reflex",
    definition:
      "A fast, 3-synapse survival loop: high-intensity sound → cochlear root neurons → contralateral projection to the pontine reticular nucleus (PNC) in the brainstem → spinal cord → alpha motor neuron → muscle jolt. This reflex is so fast because it uses only three synapses, bypassing cortical processing entirely.",
    structures: ["Cochlear root neurons", "Pontine reticular nucleus", "Spinal cord"],
  },
  {
    id: "u3-cc-25",
    term: "Cochlear Root Neurons",
    definition:
      "The first synapse in the acoustic startle reflex. These neurons detect high-intensity sound and rapidly relay the signal to the pontine reticular nucleus on the opposite side of the brainstem.",
    structures: ["Cochlear root neurons"],
  },
  {
    id: "u3-cc-26",
    term: "Pontine Reticular Nucleus (PNC)",
    definition:
      "The second synapse in the acoustic startle reflex, located in the brainstem. It receives the contralateral projection from cochlear root neurons and relays the motor command to the spinal cord, triggering the startle response.",
    structures: ["Pontine reticular nucleus"],
  },
  {
    id: "u3-cc-27",
    term: "Fear-Potentiated Startle",
    definition:
      "If the amygdala is pre-activated (primed) by anxiety or a fear cue, it exaggerates the acoustic startle response. Mike Davis's rat models showed that auditory inputs route from the medial geniculate nucleus (MGN) to the basolateral amygdala (BLA), which amplifies the startle circuit and triggers freezing behavior — an evolutionary prey response.",
    structures: ["MGN", "BLA", "Amygdala"],
  },
  {
    id: "u3-cc-28",
    term: "Medial Geniculate Nucleus (MGN)",
    definition:
      "A thalamic relay station for auditory input. In the context of fear-potentiated startle, the MGN routes auditory signals to the basolateral amygdala, allowing fear cues to amplify the startle response.",
    structures: ["MGN"],
  },
  {
    id: "u3-cc-29",
    term: "Amygdala Hyperactivity",
    definition:
      "When the amygdala is chronically overactive, it leads to generalized anxiety, PTSD, and paralyzing phobias through overgeneralized threat cues. Pharmacological treatment includes SSRIs, where serotonin acts as a 'volume knob downward' on amygdala activity. Older MAOIs can be dangerous in adolescents because excessive serotonin modulation can cause suicidal behavior.",
    structures: ["Amygdala"],
  },
  {
    id: "u3-cc-30",
    term: "Sleep Deprivation and Social Isolation as Primers",
    definition:
      "Sleep deprivation and disrupted circadian rhythms (often via blue light exposure) directly prime amygdala activity, leading to nightmares or disrupted sleep. Social isolation and withdrawal physically reduce the volume of the prefrontal cortex (gray matter) within just a week, weakening top-down control over the amygdala and highlighting the necessity of a social support network.",
    structures: ["Amygdala", "PFC"],
  },
];

// ============================================================
// PATHWAY BLOCKS
// ============================================================

export const unit3Pathways = [
  {
    id: "u3-pw-01",
    title: "Acoustic Startle Reflex",
    description:
      "The fast, 3-synapse survival loop from loud sound to muscle jolt.",
    steps: [
      {
        number: 1,
        structure: "Cochlear Root Neurons",
        description:
          "High-intensity sound is detected and immediately relayed from the cochlea. This is synapse 1.",
      },
      {
        number: 2,
        structure: "Pontine Reticular Nucleus (PNC)",
        description:
          "The signal crosses to the contralateral PNC in the brainstem. This is synapse 2. No cortical processing has occurred.",
      },
      {
        number: 3,
        structure: "Spinal Cord → Alpha Motor Neuron → Muscle",
        description:
          "The PNC sends a motor command down the spinal cord to alpha motor neurons, producing the involuntary muscle jolt. This is synapse 3. The entire loop is complete before you are consciously aware of the sound.",
      },
    ],
  },
  {
    id: "u3-pw-02",
    title: "Fear-Potentiated Startle (MGN → BLA → Amplified Response)",
    description:
      "How the amygdala amplifies the startle reflex when primed by anxiety or a fear cue.",
    steps: [
      {
        number: 1,
        structure: "Medial Geniculate Nucleus (MGN)",
        description:
          "Auditory input is relayed through the MGN, the thalamic relay for sound.",
      },
      {
        number: 2,
        structure: "Basolateral Amygdala (BLA)",
        description:
          "The MGN routes the auditory signal to the BLA. If the amygdala has been primed by anxiety, a prior fear cue, or sleep deprivation, the BLA is already in a heightened state.",
      },
      {
        number: 3,
        structure: "Central Amygdala (CeA) → Amplified Startle",
        description:
          "The BLA activates the CeA, which amplifies the outgoing motor and autonomic commands. The startle response is exaggerated, and freezing behavior (an evolutionary prey response) may occur.",
      },
    ],
  },
  {
    id: "u3-pw-03",
    title: "High Road vs. Low Road",
    description:
      "LeDoux's dual-pathway model for how the brain processes potential threats.",
    steps: [
      {
        number: 1,
        structure: "Sensory Input (Visual or Auditory)",
        description:
          "A stimulus enters the sensory system — something potentially threatening is detected.",
      },
      {
        number: 2,
        structure: "Low Road: Thalamus → Amygdala (Direct)",
        description:
          "The fast, low-precision route sends the signal directly from the thalamus to the amygdala. This produces an immediate survival bias — the body reacts before the brain has fully identified the stimulus. Speed over accuracy.",
      },
      {
        number: 3,
        structure: "High Road: Thalamus → Cortex → Amygdala (Indirect)",
        description:
          "The slower, precise route sends the signal through the cortex for full contextual processing. The cortex evaluates the stimulus carefully and then either confirms the low road's alarm or inhibits it.",
      },
      {
        number: 4,
        structure: "Behavioral Outcome",
        description:
          "If the low road fires and the high road confirms → sustained fear/defensive response. If the high road overrides → the alarm is suppressed ('it was just a stick, not a snake'). The high road is the think-a-second system.",
      },
    ],
  },
  {
    id: "u3-pw-04",
    title: "Amygdala Subregion Flow",
    description:
      "How information moves through the amygdala's internal architecture.",
    steps: [
      {
        number: 1,
        structure: "Basolateral Amygdala (BLA) — Input Hub",
        description:
          "Sensory and cortical inputs arrive at the BLA (lateral + basal nuclei). This is the 'ears' of the amygdala — where information enters.",
      },
      {
        number: 2,
        structure: "Intercalated Cells (ITCs) — Inhibitory Brakes",
        description:
          "GABAergic cells flanking the BLA that can suppress amygdala output. When activated by the prelimbic cortex (vmPFC), ITCs quiet the system.",
      },
      {
        number: 3,
        structure: "Central Amygdala (CeA) — Output Hub",
        description:
          "The CeA receives processed signals and sends behavioral and hormonal commands outward — triggering freezing, autonomic changes, and stress-hormone release.",
      },
      {
        number: 4,
        structure: "Medial Amygdala (MeA) — Social/Hormonal Channel",
        description:
          "The MeA processes social situations and contains dense gonadal hormone receptors. It can bypass the BLA to prime the amygdala directly through hormonal and social signals.",
      },
    ],
  },
  {
    id: "u3-pw-05",
    title: "Hypothalamus: Autonomic Switching",
    description:
      "How the hypothalamus toggles between sympathetic and parasympathetic states.",
    steps: [
      {
        number: 1,
        structure: "Hypothalamus (Resting State)",
        description:
          "Under baseline conditions, the hypothalamus maintains parasympathetic dominance — rest, digest, and recover.",
      },
      {
        number: 2,
        structure: "Threat or Demand Signal",
        description:
          "A threat, stressor, or survival demand is detected by limbic circuits (especially the amygdala) and relayed to the hypothalamus.",
      },
      {
        number: 3,
        structure: "Sympathetic Activation",
        description:
          "The hypothalamus switches to sympathetic dominance — increased heart rate, dilated pupils, halted digestion, redirected energy to muscles. The body enters Fight or Flight mode.",
      },
      {
        number: 4,
        structure: "Return to Parasympathetic",
        description:
          "When the threat passes and the PFC/cortex signals safety, the hypothalamus switches back to parasympathetic dominance. Digestion resumes, heart rate slows, and recovery begins.",
      },
    ],
  },
];

// ============================================================
// DISTINCTION BLOCKS
// ============================================================

export const unit3Distinctions = [
  {
    id: "u3-db-01",
    termA: "Emotion",
    termB: "Arousal",
    descriptionA:
      "A transient state (not a personality trait) with specific valence — positive or negative — that motivates approach or avoidance behavior.",
    descriptionB:
      "The magnitude or intensity of physiological activation (e.g., cortisol release, surprise). Arousal has no valence — it is neither positive nor negative by itself.",
    keyDifference:
      "Emotion has direction (positive or negative, approach or avoid). Arousal is just intensity. You can be highly aroused by joy or by terror — the arousal level might be identical, but the emotion is opposite.",
  },
  {
    id: "u3-db-02",
    termA: "Fear",
    termB: "Anxiety",
    descriptionA:
      "The emotional appraisal of a tangible, imminent threat staring you in the face. Fear is about something present and identifiable.",
    descriptionB:
      "The prediction or anticipation of a future threat. Anxiety does not require a tangible stimulus — it is about what might happen.",
    keyDifference:
      "Fear responds to what is here now. Anxiety responds to what might come next. Fear is reactive; anxiety is predictive.",
  },
  {
    id: "u3-db-03",
    termA: "Introspection",
    termB: "Interoception",
    descriptionA:
      "Looking inward to analyze one's own thoughts. A cognitive, deliberate process of self-examination introduced by Wundt.",
    descriptionB:
      "Sensing deep, visceral physiological signals from within the body — hunger, nausea, a racing heart, vague unease. These are body signals, not thought analysis.",
    keyDifference:
      "Introspection analyzes thoughts. Interoception senses the body. One is a cognitive act; the other is a physiological signal.",
  },
  {
    id: "u3-db-04",
    termA: "Low Road",
    termB: "High Road",
    descriptionA:
      "Fast, subcortical, heuristic. Sensory input travels directly from the thalamus to the amygdala. Produces an immediate survival bias before conscious evaluation. Prioritizes speed over accuracy.",
    descriptionB:
      "Slower, cortical, precise. Sensory input travels through the cortex for full contextual processing before reaching the amygdala. Can confirm or override the low road's alarm. Prioritizes accuracy.",
    keyDifference:
      "The low road is the quick-and-dirty alarm. The high road is the think-a-second verification. Both run simultaneously; the low road just gets there first.",
  },
  {
    id: "u3-db-05",
    termA: "Salience Center",
    termB: "Fear Center",
    descriptionA:
      "The accurate description of the amygdala. It stamps importance onto events — 'this matters, remember it' — for both negative (fear, threat) and positive (reward, love, achievement) events.",
    descriptionB:
      "A common but inaccurate label for the amygdala. While the amygdala is hyper-active during fear, it is equally active during reward, addiction, and intensely positive life events.",
    keyDifference:
      "Calling the amygdala a 'fear center' misses half of what it does. It detects salience — importance — regardless of whether the event is positive or negative.",
  },
];

// ============================================================
// CASE NOTES
// ============================================================

export const unit3CaseNotes = [
  {
    id: "u3-cn-01",
    title: "Phineas Gage",
    content:
      "A railroad foreman who survived a tamping iron destroying a hemisphere of his prefrontal cortex. After the injury, he transformed from a responsible, respected leader into someone described as obstinate, impulsive, capricious, and rude. This case is a foundational example of hypofrontality — the total loss of vmPFC emotional regulation. The PFC mediates between the emotional limbic system and rational cognition; without it, subcortical impulses go unchecked.",
    sensitivity: "standard" as const,
  },
  {
    id: "u3-cn-02",
    title: "Klüver-Bucy Syndrome",
    content:
      "Caused by bilateral temporal lobe and amygdala damage, historically resulting from severe epilepsy surgeries. Symptoms include visual agnosia (inability to recognize objects), loss of normal fear and anger responses, hyperorality (putting inappropriate objects in the mouth), and hypersexuality. This syndrome demonstrates what happens when the amygdala's salience-stamping function is completely removed — the brain can no longer mark anything as important, dangerous, or socially inappropriate.",
    sensitivity: "high" as const,
    sensitivityNote:
      "This is clinical study material. It demonstrates the consequences of amygdala loss and should be presented as an informational case card, not simulated.",
  },
  {
    id: "u3-cn-03",
    title: "Patient SM (Urbach-Wiethe Disease)",
    content:
      "Patient SM has a rare genetic disorder (Urbach-Wiethe disease) that caused a calcified, completely nonfunctional amygdala. She has a complete loss of physiological fear impulses and emotional braking — she cannot feel fear in her body. However, she retains full cognitive understanding of danger (she knows a train track is deadly). This dissociation proves that knowing something is dangerous and feeling afraid of it depend on different brain systems: cognitive awareness resides in the cortex, while the visceral fear response depends on the amygdala.",
    sensitivity: "high" as const,
    sensitivityNote:
      "Present as clinical reference material demonstrating the amygdala's role in fear physiology.",
  },
  {
    id: "u3-cn-04",
    title: "Sleep Deprivation as Amygdala Primer",
    content:
      "Sleep deprivation and disrupted circadian rhythms (often caused by blue light exposure) directly prime amygdala activity, making it more reactive to subsequent stimuli. This can lead to nightmares, disrupted 'work sleep,' and heightened emotional reactivity during waking hours. The amygdala becomes over-responsive because its normal reset during sleep does not occur.",
    sensitivity: "standard" as const,
  },
  {
    id: "u3-cn-05",
    title: "Social Isolation and PFC Reduction",
    content:
      "Social isolation and withdrawal physically reduce the volume of the prefrontal cortex (gray matter) in both humans and animal models — and this can occur within just one week. This highlights the necessity of a social support network for maintaining healthy brain function. Reduced PFC volume means weakened top-down control over the amygdala and limbic system.",
    sensitivity: "standard" as const,
  },
];

// ============================================================
// REVIEW QUESTIONS
// ============================================================

export const unit3Review = [
  {
    id: "u3-rq-01",
    question:
      "Define emotion, arousal, fear, and anxiety using the precise course definitions. What distinguishes each term?",
    hint: "Emotion has valence; arousal is just intensity. Fear is about the present; anxiety is about the future.",
  },
  {
    id: "u3-rq-02",
    question:
      "Why is the amygdala better described as a 'salience center' than a 'fear center'?",
    hint: "Think about what else the amygdala is intensely active during besides fear.",
  },
  {
    id: "u3-rq-03",
    question:
      "Identify the roles of the BLA, CeA, MeA, and ITCs within the amygdala.",
    hint: "One is the input hub, one is the output hub, one handles social/hormonal processing, and one acts as inhibitory brakes.",
  },
  {
    id: "u3-rq-04",
    question:
      "Trace the acoustic startle reflex from sound to muscle jolt. How many synapses does it use, and why is that significant?",
    hint: "Three synapses, no cortical involvement — that's what makes it so fast.",
  },
  {
    id: "u3-rq-05",
    question:
      "Compare the high road and the low road. Which is faster? Which is more accurate? How do they interact?",
    hint: "They run simultaneously. One arrives first; the other can override it.",
  },
  {
    id: "u3-rq-06",
    question:
      "How do primers like sleep deprivation and social isolation change amygdala responsiveness and PFC control?",
    hint: "One directly pre-activates the amygdala; the other physically reduces PFC volume.",
  },
  {
    id: "u3-rq-07",
    question:
      "What does Patient SM's case demonstrate about the difference between cognitive understanding of danger and physiological fear?",
    hint: "She knows things are dangerous but cannot feel afraid. What does that tell you about where fear 'lives' in the brain?",
  },
];
