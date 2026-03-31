// ============================================================
// UNIT 2 — Attention, Cognitive Load, and the PFC
// All content sourced from neuroscience literature on attention and the PFC
// ============================================================

export const unit2Meta = {
  id: "unit-2",
  title: "Attention, Cognitive Load, and the PFC",
  subtitle: "Why your brain's executive controller has limits",
  overview:
    "This unit covers how attention is controlled and directed, why thinking is metabolically expensive, how the prefrontal cortex is divided into functionally distinct regions, and how top-down cognitive control breaks down under overload, fatigue, hunger, and illness.",
  majorStructures: [
    "Dorsolateral PFC (dlPFC)",
    "Ventromedial PFC (vmPFC)",
    "Orbitofrontal cortex (OFC)",
    "Pulvinar nucleus",
    "Superior colliculus",
    "Temporoparietal junction",
  ],
  lectureTopics: [
    "Primed States, Cognitive Load, and the PFC (March 16)",
  ],
};

// ============================================================
// CONCEPT CARDS
// ============================================================

export const unit2ConceptCards = [
  {
    id: "u2-cc-01",
    term: "Attention Network",
    definition:
      "A distributed system involving the ventral prefrontal cortex, temporoparietal junction, superior colliculus, and the pulvinar nucleus of the thalamus. These regions work together to control what receives priority processing.",
    structures: ["Ventral PFC", "Temporoparietal junction", "Superior colliculus", "Pulvinar"],
  },
  {
    id: "u2-cc-02",
    term: "Pulvinar Nucleus",
    definition:
      "A nucleus in the thalamus that operates in a loop with visual cortices (V1–V4, IT) to command attention. The pulvinar essentially tells the visual system what to focus on. Emerging research links pulvinar dysfunction to ADHD.",
    structures: ["Pulvinar", "V1–V4", "IT cortex"],
  },
  {
    id: "u2-cc-03",
    term: "Default Mode Network",
    definition:
      "A collection of brain regions that become active when attention shifts inward — during daydreaming, mind-wandering, or unstructured thought. The default mode network and the attention network tend to alternate: when one is active, the other quiets down.",
    structures: [],
  },
  {
    id: "u2-cc-04",
    term: "Metabolic Cost of Thought",
    definition:
      "Intense cognition is physiologically expensive. Robert Sapolsky noted that chess grandmasters can burn 6,000 to 7,000 calories a day simply by thinking, demonstrating the massive stress response that sustained executive function requires. The brain consumes enormous energy when the PFC is fully engaged.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-05",
    term: "Prefrontal Cortex (PFC) as Executive Controller",
    definition:
      "The PFC is responsible for working memory, logic, planning, and emotion regulation. It is the brain's top-down control center. When it functions well, behavior is deliberate and regulated. When it fails, impulsivity and poor judgment take over.",
    structures: ["Prefrontal cortex"],
  },
  {
    id: "u2-cc-06",
    term: "Dorsolateral PFC (dlPFC)",
    definition:
      "The pure logic center of the PFC — the 'Spock' of the brain. The dlPFC makes unsentimental calculations, handles working memory, and processes abstract reasoning. It generally collaborates with the vmPFC, though they can compete for control over decision-making.",
    structures: ["Dorsolateral PFC"],
  },
  {
    id: "u2-cc-07",
    term: "Ventromedial PFC (vmPFC)",
    definition:
      "Located along the midline of the PFC, the vmPFC regulates emotional subcortical input from the amygdala (avoidance signals) and nucleus accumbens (reward/approach signals). It balances emotional information with executive decisions. The dlPFC and vmPFC generally collaborate but can compete.",
    structures: ["Ventromedial PFC", "Amygdala", "Nucleus accumbens"],
  },
  {
    id: "u2-cc-08",
    term: "Orbitofrontal Cortex (OFC)",
    definition:
      "Located above the eyes, the OFC is heavily involved in categorization and object expectations. In the context of executive function, it helps set predictions about what should happen next, working closely with the other PFC regions to maintain cognitive control.",
    structures: ["Orbitofrontal cortex"],
  },
  {
    id: "u2-cc-09",
    term: "Cognitive Load Theory",
    definition:
      "When the PFC is taxed by one demanding task, unrelated cognitive processes are sacrificed. The system has finite capacity — overloading working memory causes failures in distractor suppression, self-control, and emotional regulation, even when those functions seem unrelated to the original task.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-10",
    term: "Working Memory Distraction",
    definition:
      "A 2001 study demonstrated that overburdening working memory with digit memorization caused subjects to fail at ignoring distracting faces. This shows that working memory and distractor suppression draw from the same limited PFC resource pool.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-11",
    term: "Self-Control Depletion",
    definition:
      "A 2009 study showed that depleting self-control resources drastically increases the likelihood of behaving dishonestly, cheating for monetary gain, or cheating on a diet. When the PFC is exhausted from one effortful task, it has less capacity to regulate behavior in other domains.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-12",
    term: "Hunger, Fatigue, and Judgment",
    definition:
      "A 2011 study of Israeli judges found that favorable parole rulings steadily dropped to near 0% as judges became hungry and fatigued during the day, then spiked immediately back up to 65% after a lunch break. Basic metabolic needs directly impact executive decision-making.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-13",
    term: "Maslow's Hierarchy and Survival Override",
    definition:
      "When the system is overloaded, energy is shunted to basic survival needs. Extremely deprived shipwreck survivors will eventually drink deadly seawater because the PFC is entirely disrupted by starvation and dehydration. Survival demands override executive control.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-14",
    term: "Sickness and Immune Energy Drain",
    definition:
      "Illness siphons energy away from the PFC because the immune system — specifically microglia releasing cytokines — demands massive metabolic energy to fight infections. This means being sick directly reduces the brain's capacity for executive function, self-control, and clear thinking.",
    structures: ["PFC"],
  },
  {
    id: "u2-cc-15",
    term: "Top-Down Control Failure",
    definition:
      "When the PFC is depleted by cognitive load, fatigue, hunger, or illness, its ability to regulate behavior, suppress distractions, and maintain self-control breaks down. This is not a moral failure — it is a metabolic and neurological limitation of the executive system.",
    structures: ["PFC", "dlPFC", "vmPFC"],
  },
  {
    id: "u2-cc-16",
    term: "dlPFC vs. vmPFC Collaboration and Competition",
    definition:
      "The dlPFC (logic) and vmPFC (emotion regulation) generally work together to produce balanced decisions. However, they can compete for control — situations heavy in emotional content may activate the vmPFC while the dlPFC tries to override with rational analysis, and vice versa.",
    structures: ["dlPFC", "vmPFC"],
  },
  {
    id: "u2-cc-17",
    term: "Superior Colliculus in Attention",
    definition:
      "Beyond its role in multisensory integration, the superior colliculus is part of the attention network. It helps direct gaze and orienting responses toward salient stimuli, working in coordination with the pulvinar and prefrontal regions.",
    structures: ["Superior colliculus"],
  },
];

// ============================================================
// PATHWAY BLOCKS
// ============================================================

export const unit2Pathways = [
  {
    id: "u2-pw-01",
    title: "Attention Control Loop (Pulvinar Circuit)",
    description:
      "How the thalamic pulvinar nucleus directs visual attention in coordination with cortical areas.",
    steps: [
      {
        number: 1,
        structure: "Attention Network Activation",
        description:
          "A salient stimulus or task demand activates the attention network, including the ventral PFC, temporoparietal junction, and superior colliculus.",
      },
      {
        number: 2,
        structure: "Pulvinar Nucleus (Thalamus)",
        description:
          "The pulvinar receives attentional commands and enters a processing loop with the visual cortices (V1–V4, IT cortex), amplifying signals for attended stimuli and suppressing unattended ones.",
      },
      {
        number: 3,
        structure: "Visual Cortices (V1–V4, IT)",
        description:
          "Attended visual information receives enhanced processing while unattended information is dampened, producing the subjective experience of focused attention.",
      },
    ],
  },
  {
    id: "u2-pw-02",
    title: "PFC Functional Map",
    description:
      "How the three major PFC subdivisions divide executive responsibilities.",
    steps: [
      {
        number: 1,
        structure: "Dorsolateral PFC (dlPFC)",
        description:
          "Handles pure logic, working memory, and unsentimental cost-benefit calculation. Functions as the rational analysis center.",
      },
      {
        number: 2,
        structure: "Ventromedial PFC (vmPFC)",
        description:
          "Regulates emotional input from subcortical structures — the amygdala (avoidance) and nucleus accumbens (approach/reward). Balances emotion with executive judgment.",
      },
      {
        number: 3,
        structure: "Orbitofrontal Cortex (OFC)",
        description:
          "Handles categorization, object expectations, and contextual predictions. Generates the 'what should I expect here?' signal.",
      },
      {
        number: 4,
        structure: "Collaboration and Competition",
        description:
          "The dlPFC and vmPFC generally collaborate but can compete for control. Under heavy cognitive load, all three systems may fail simultaneously because they share the same metabolic resource pool.",
      },
    ],
  },
  {
    id: "u2-pw-03",
    title: "Cognitive Overload → Control Failure",
    description:
      "How taxing the PFC with one task causes failures in seemingly unrelated functions.",
    steps: [
      {
        number: 1,
        structure: "Initial Cognitive Demand",
        description:
          "A demanding task (memorizing digits, making complex decisions, resisting temptation) consumes PFC metabolic resources — primarily glucose and oxygen.",
      },
      {
        number: 2,
        structure: "Resource Depletion in PFC",
        description:
          "The finite capacity of the PFC is consumed by the primary task. Working memory, distractor suppression, and self-regulation all draw from this shared pool.",
      },
      {
        number: 3,
        structure: "Failure in Unrelated Control",
        description:
          "With resources depleted, the PFC can no longer maintain distractor suppression (failing to ignore irrelevant faces), self-control (increased dishonesty or diet failure), or balanced judgment (harsher parole decisions before lunch).",
      },
    ],
  },
];

// ============================================================
// DISTINCTION BLOCKS
// ============================================================

export const unit2Distinctions = [
  {
    id: "u2-db-01",
    termA: "Attention Network",
    termB: "Default Mode Network",
    descriptionA:
      "Active during focused, goal-directed cognition. Involves the ventral PFC, temporoparietal junction, superior colliculus, and pulvinar. Directs processing toward external tasks and stimuli.",
    descriptionB:
      "Active when attention shifts inward — during daydreaming, mind-wandering, or unstructured thought. Represents the brain's resting or self-referential state.",
    keyDifference:
      "They tend to alternate: when one is active, the other quiets. You cannot fully daydream and fully attend to an external task at the same time.",
  },
  {
    id: "u2-db-02",
    termA: "Dorsolateral PFC (dlPFC)",
    termB: "Ventromedial PFC (vmPFC)",
    descriptionA:
      "The pure logic center. Handles working memory, abstract reasoning, and unsentimental calculation. Think of it as the 'Spock' of the brain.",
    descriptionB:
      "Located along the midline. Regulates emotional input from the amygdala (avoidance) and nucleus accumbens (reward/approach). Balances emotional content with executive decisions.",
    keyDifference:
      "The dlPFC computes logically; the vmPFC weighs emotional significance. They usually collaborate but can compete when logic and emotion pull in different directions.",
  },
  {
    id: "u2-db-03",
    termA: "dlPFC",
    termB: "OFC",
    descriptionA:
      "Handles working memory, logic, and abstract cost-benefit analysis.",
    descriptionB:
      "Handles categorization, object expectations, and contextual predictions. Located above the eyes.",
    keyDifference:
      "The dlPFC asks 'what is the logical answer?' while the OFC asks 'what should I expect here based on context?' Both contribute to executive control but from different angles.",
  },
  {
    id: "u2-db-04",
    termA: "Working Memory Load",
    termB: "Distractor Suppression",
    descriptionA:
      "The active maintenance of information in mind for immediate use. Example: holding a string of digits while performing another task.",
    descriptionB:
      "The ability to ignore irrelevant stimuli while focusing on a task. Example: tuning out a distracting face while concentrating on a problem.",
    keyDifference:
      "They feel different but draw from the same PFC resource pool. Overloading working memory causes distractor suppression to fail, because both depend on the same finite executive capacity.",
  },
  {
    id: "u2-db-05",
    termA: "Metabolic Depletion",
    termB: "Simple Distraction",
    descriptionA:
      "A genuine reduction in available cognitive resources caused by sustained PFC use, hunger, fatigue, or illness. Results in broad executive failure across multiple domains simultaneously.",
    descriptionB:
      "A momentary shift of attention caused by a salient stimulus. Attention can be redirected back to the task without lasting resource loss.",
    keyDifference:
      "Distraction is temporary and reversible. Metabolic depletion is cumulative — it degrades the PFC's ability to perform any executive function until resources are replenished (by rest, food, or recovery).",
  },
];

// ============================================================
// CASE / APPLICATION NOTES
// ============================================================

export const unit2CaseNotes = [
  {
    id: "u2-cn-01",
    title: "Judges and Lunch-Break Decisions",
    content:
      "A 2011 study of Israeli parole judges found that favorable rulings dropped steadily to near 0% as judges became hungry and fatigued during the day, then spiked immediately back to approximately 65% after a lunch break. This demonstrates that judicial decision-making — which should be purely rational — is directly affected by the metabolic state of the PFC. Hunger and fatigue deplete the same executive resources needed for careful, individualized judgment.",
    sensitivity: "standard" as const,
  },
  {
    id: "u2-cn-02",
    title: "Self-Control Depletion and Cheating",
    content:
      "A 2009 study showed that when subjects' self-control resources were experimentally depleted by a prior effortful task, they became drastically more likely to behave dishonestly and cheat for monetary gain. This illustrates that honesty and self-regulation are not purely moral traits — they depend on available PFC resources. When those resources are consumed, restraint fails.",
    sensitivity: "standard" as const,
  },
  {
    id: "u2-cn-03",
    title: "Illness Reducing Cognitive Resources",
    content:
      "When the body fights an infection, the immune system — particularly microglia releasing cytokines — demands massive metabolic energy. This energy is drawn from the same pool that fuels the PFC. The result is reduced capacity for executive function, clear thinking, and self-control during illness. Being sick does not just feel bad — it measurably impairs cognition.",
    sensitivity: "standard" as const,
  },
];

// ============================================================
// REVIEW QUESTIONS
// ============================================================

export const unit2Review = [
  {
    id: "u2-rq-01",
    question:
      "Name the major components of the attention network and identify the role of the pulvinar.",
    hint: "Think about which thalamic nucleus loops with the visual cortices to direct attentional focus.",
  },
  {
    id: "u2-rq-02",
    question:
      "What is the difference between the attention network and the default mode network, and why can't both be fully active at the same time?",
    hint: "Consider what each network does and what happens when you try to daydream during a focused task.",
  },
  {
    id: "u2-rq-03",
    question:
      "Describe the functional roles of the dlPFC, vmPFC, and OFC. How do the dlPFC and vmPFC interact?",
    hint: "One handles logic, one handles emotional input, one handles contextual expectations. They usually collaborate but can compete.",
  },
  {
    id: "u2-rq-04",
    question:
      "Why does overloading working memory cause failures in unrelated tasks like distractor suppression or self-control?",
    hint: "Think about what resource these functions share and what happens when that resource is consumed.",
  },
  {
    id: "u2-rq-05",
    question:
      "Explain why the judge parole study demonstrates metabolic depletion rather than simple laziness or bias.",
    hint: "Focus on the pattern: what happened to decision quality over time, and what restored it?",
  },
  {
    id: "u2-rq-06",
    question:
      "How does illness impair cognitive function? Identify the specific biological mechanism from the course notes.",
    hint: "Think about microglia, cytokines, and where the metabolic energy goes during an immune response.",
  },
];
