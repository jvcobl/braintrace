// ============================================================
// UNIT 5 — Stress and Homeostasis
// All content sourced from neuroscience literature on stress and homeostasis
// ============================================================

export const unit5Meta = {
  id: "unit-5",
  title: "Stress and Homeostasis",
  subtitle: "The stress response is built to prepare you for demand.",
  overview:
    "These lessons explore how that system activates, when it shuts down, and what happens when it doesn't. You'll see why stress is a physiological state rather than an emotion, how the body maintains stability through homeostasis and allostasis, how the HPA axis produces and regulates cortisol, what happens when chronic stress overwhelms the system, and how resilience and vulnerability map to brain function.",
  majorStructures: [
    "Hypothalamus",
    "Pituitary gland (anterior)",
    "Adrenal cortex",
    "Central amygdala (CeA)",
    "Prefrontal cortex (PFC)",
    "Ventromedial PFC (vmPFC)",
    "Hippocampus (CA3, dentate gyrus)",
  ],
  lectureTopics: [
    "Stress, homeostasis, and allostasis",
  ],
};

// ============================================================
// CONCEPT CARDS
// ============================================================

export const unit5ConceptCards = [
  {
    id: "u5-cc-01",
    term: "Stress Is Not an Emotion",
    definition:
      "Stress is defined as a binary physiological state — the body shifting between the parasympathetic and sympathetic peripheral nervous systems. It is not an emotion because it lacks specific valence (positive/negative direction). Stress is a state of physiological activation, not a feeling with a label.",
    structures: [],
  },
  {
    id: "u5-cc-02",
    term: "Homeostasis",
    definition:
      "The ideal, stable set point essential for life. Example: body temperature maintained at 37°C / 98.6°F. Homeostasis is maintained through negative feedback — when a parameter drifts from its set point, corrective mechanisms activate to bring it back. Homeostasis represents the baseline the body is always trying to return to.",
    structures: [],
  },
  {
    id: "u5-cc-03",
    term: "Negative Feedback",
    definition:
      "The regulatory mechanism that maintains homeostasis. When a physiological parameter drifts from its set point, the deviation triggers a corrective response that pushes the parameter back. Example: rising body temperature triggers sweating, which cools the body. In the HPA axis, cortisol feeds back to inhibit further CRH and ACTH release.",
    structures: ["Hypothalamus", "Pituitary"],
  },
  {
    id: "u5-cc-04",
    term: "Allostasis",
    definition:
      "'Stability through change.' The dynamic process of actively modifying physiological parameters to maintain homeostasis under environmental demands. Unlike homeostasis (a fixed set point), allostasis involves the body adjusting its targets to meet changing conditions — like increasing blood pressure during exercise.",
    structures: [],
  },
  {
    id: "u5-cc-05",
    term: "Allostatic Load",
    definition:
      "The cumulative wear and tear of the stress response. Every time the body activates allostatic mechanisms to cope with a stressor, there is a biological cost. Allostatic load is the running total of that cost over time.",
    structures: [],
  },
  {
    id: "u5-cc-06",
    term: "Allostatic Overload",
    definition:
      "Occurs when the energy required to manage stress exceeds available energy and intake. The body can no longer maintain stability — the cost of coping has exceeded the system's capacity. Overload leads to breakdown in multiple body and brain systems.",
    structures: [],
  },
  {
    id: "u5-cc-07",
    term: "HPA Axis",
    definition:
      "The hypothalamic-pituitary-adrenal axis — the primary neuroendocrine stress response system. It is a three-step hormonal cascade: the hypothalamus releases CRH → the anterior pituitary releases ACTH → the adrenal cortex releases glucocorticoids (cortisol). A negative feedback loop normally shuts the system down after the stressor passes.",
    structures: ["Hypothalamus", "Pituitary", "Adrenal cortex"],
  },
  {
    id: "u5-cc-08",
    term: "Corticotropin-Releasing Hormone (CRH)",
    definition:
      "Released by the hypothalamus as the first step in the HPA axis. CRH signals the anterior pituitary gland to release ACTH. It is the initiating signal of the stress response cascade.",
    structures: ["Hypothalamus"],
  },
  {
    id: "u5-cc-09",
    term: "Adrenocorticotropic Hormone (ACTH)",
    definition:
      "Released by the anterior pituitary gland in response to CRH. ACTH travels through the bloodstream to the adrenal cortex, where it triggers the release of glucocorticoids. It is the second step in the HPA cascade.",
    structures: ["Pituitary (anterior)"],
  },
  {
    id: "u5-cc-10",
    term: "Glucocorticoids (Cortisol)",
    definition:
      "Stress hormones released by the adrenal cortex in response to ACTH. Cortisol mobilizes energy, suppresses the immune system, and modulates brain function. Under normal conditions, cortisol travels back to the hypothalamus and pituitary to inhibit further CRH and ACTH release via negative feedback.",
    structures: ["Adrenal cortex"],
  },
  {
    id: "u5-cc-11",
    term: "Cortisol Negative Feedback Loop",
    definition:
      "Cortisol usually travels back up to the hypothalamus and pituitary, inhibiting further CRH and ACTH release. This shuts off the stress response once the stressor has passed. However, extreme stress signals from the central amygdala (CeA) and PFC can override this feedback loop, preventing the stress response from turning off.",
    structures: ["Hypothalamus", "Pituitary", "CeA", "PFC"],
  },
  {
    id: "u5-cc-12",
    term: "CeA / PFC Override",
    definition:
      "Under extreme stress, the central amygdala and PFC can override the cortisol negative feedback loop, preventing the HPA axis from shutting down. This means the stress response continues even though cortisol levels are high enough that the system should have turned off. This is a mechanism for chronic stress damage.",
    structures: ["Central amygdala", "PFC"],
  },
  {
    id: "u5-cc-13",
    term: "Chronic Stress: Digestive Disruption",
    definition:
      "Prolonged allostatic overload disrupts the digestive system because the sympathetic stress response continuously halts digestion to redirect energy to muscles and survival systems. Over time this leads to gastrointestinal issues and nutrient absorption problems.",
    structures: [],
  },
  {
    id: "u5-cc-14",
    term: "Chronic Stress: Immune Suppression",
    definition:
      "Cortisol suppresses the immune system to redirect energy toward immediate survival. Under acute stress this is temporary and adaptive. Under chronic stress, sustained immune suppression leaves the body vulnerable to illness and infection.",
    structures: [],
  },
  {
    id: "u5-cc-15",
    term: "Chronic Stress: Weight Gain, Fatigue, Sleep Disruption",
    definition:
      "Prolonged cortisol exposure promotes fat storage (especially visceral), creates persistent fatigue as the body's energy systems are depleted, and severely disrupts sleep architecture — further compounding the damage by preventing recovery.",
    structures: [],
  },
  {
    id: "u5-cc-16",
    term: "Hippocampal Atrophy Under Chronic Stress",
    definition:
      "Chronic stress causes physical degradation in the hippocampus, specifically in the CA3 region and dentate gyrus. Dendritic branching shrinks, losing complexity and length. Because the hippocampus is critical for memory and contextual learning, this atrophy directly impairs cognitive function.",
    structures: ["Hippocampus", "CA3", "Dentate gyrus"],
  },
  {
    id: "u5-cc-17",
    term: "PFC Atrophy Under Chronic Stress",
    definition:
      "Chronic stress also causes dendritic atrophy in the prefrontal cortex. Since the PFC is responsible for executive control, working memory, and emotion regulation, this atrophy leads to impaired decision-making, reduced self-control, and weakened ability to regulate the amygdala — creating a vicious cycle where stress damages the very system needed to manage stress.",
    structures: ["PFC"],
  },
  {
    id: "u5-cc-18",
    term: "Resilience",
    definition:
      "The ability to bounce back from allostatic overload. Resilience maps directly to functional activity levels in the vmPFC — resilient individuals show higher vmPFC activation compared to those with risky coping patterns. Resilience is not just psychological; it has a measurable neural signature.",
    structures: ["vmPFC"],
  },
  {
    id: "u5-cc-19",
    term: "Vulnerability",
    definition:
      "The susceptibility to harm from allostatic overload. Vulnerability is the opposite end of the spectrum from resilience and is associated with lower vmPFC activation and weaker top-down regulation of stress circuits. Vulnerable brains show vastly different vmPFC patterns compared to resilient ones.",
    structures: ["vmPFC"],
  },
  {
    id: "u5-cc-20",
    term: "Bottom-Up Interventions (Pharmaceutical)",
    definition:
      "Interventions that target neurotransmitter systems directly — serotonin, norepinephrine, GABA — typically via medications like SSRIs. These work from the bottom of the brain upward, modulating the chemical environment that subcortical stress circuits operate in.",
    structures: [],
  },
  {
    id: "u5-cc-21",
    term: "Top-Down Interventions (Cognitive)",
    definition:
      "Interventions that work through cortical processing — therapy, cognitive behavioral techniques, and mindfulness. These strengthen the PFC's ability to regulate subcortical stress and emotional circuits. They work from the top of the brain downward.",
    structures: ["PFC"],
  },
  {
    id: "u5-cc-22",
    term: "Combinatorial Interventions",
    definition:
      "Exercise, healthy diet, sleep, and social support. These structurally rewire both the top-down and bottom-up networks simultaneously. They enhance resilience by strengthening both cortical regulation and neurotransmitter balance at the same time.",
    structures: ["PFC", "Hippocampus"],
  },
  {
    id: "u5-cc-23",
    term: "Suicide Neurobiology",
    definition:
      "Suicidal behavior maps to depletion of serotonin and noradrenaline. Post-mortem studies show decreased serotonin transporter binding and increased 5-HT receptor binding specifically in the prefrontal cortex. This represents a neurobiological basis for the condition, not a moral or character failing.",
    structures: ["PFC"],
    sensitivity: "high" as const,
    sensitivityNote:
      "This material is presented as a factual neurobiology study card. If you or someone you know is struggling, please reach out to the 988 Suicide and Crisis Lifeline (call or text 988).",
  },
];

// ============================================================
// PATHWAY BLOCKS
// ============================================================

export const unit5Pathways = [
  {
    id: "u5-pw-01",
    title: "HPA Axis",
    description:
      "The three-step neuroendocrine cascade that produces cortisol in response to stress.",
    steps: [
      {
        number: 1,
        structure: "Hypothalamus",
        description:
          "Detects a stressor (or receives stress signals from the amygdala/PFC) and releases corticotropin-releasing hormone (CRH) into the portal blood system connecting it to the pituitary.",
      },
      {
        number: 2,
        structure: "Anterior Pituitary Gland",
        description:
          "Receives CRH and responds by releasing adrenocorticotropic hormone (ACTH) into the general bloodstream.",
      },
      {
        number: 3,
        structure: "Adrenal Cortex",
        description:
          "Receives ACTH via the bloodstream and releases glucocorticoids — primarily cortisol. Cortisol mobilizes energy, modulates immune function, and affects brain systems.",
      },
      {
        number: 4,
        structure: "Negative Feedback (Normal Conditions)",
        description:
          "Cortisol circulates back to the hypothalamus and pituitary, inhibiting further CRH and ACTH release. This shuts down the stress response once the stressor has passed.",
      },
    ],
  },
  {
    id: "u5-pw-02",
    title: "Cortisol Feedback Override Under Extreme Stress",
    description:
      "How the normal shutdown mechanism fails when stress is severe or chronic.",
    steps: [
      {
        number: 1,
        structure: "Normal Negative Feedback",
        description:
          "Under typical conditions, rising cortisol inhibits the hypothalamus and pituitary, turning the HPA axis off.",
      },
      {
        number: 2,
        structure: "Extreme Stress Signal",
        description:
          "Under extreme or chronic stress, the central amygdala (CeA) and PFC send override signals that prevent the negative feedback from working.",
      },
      {
        number: 3,
        structure: "Sustained Cortisol Production",
        description:
          "The HPA axis stays active despite high cortisol. The stress response does not shut off. Cortisol continues to accumulate.",
      },
      {
        number: 4,
        structure: "Chronic Damage",
        description:
          "Sustained high cortisol leads to hippocampal atrophy (CA3, dentate gyrus), PFC dendritic shrinkage, immune suppression, digestive disruption, and sleep dysregulation.",
      },
    ],
  },
  {
    id: "u5-pw-03",
    title: "Chronic Stress Impact on Brain Structures",
    description:
      "How prolonged allostatic overload physically degrades the hippocampus and PFC.",
    steps: [
      {
        number: 1,
        structure: "Sustained Cortisol Exposure",
        description:
          "Chronic stress keeps cortisol levels elevated for extended periods, bathing brain structures in glucocorticoids.",
      },
      {
        number: 2,
        structure: "Hippocampus (CA3 and Dentate Gyrus)",
        description:
          "Dendritic branching shrinks in CA3 and dentate gyrus, losing complexity and length. This impairs memory formation, contextual learning, and the hippocampus's own role in regulating the HPA axis.",
      },
      {
        number: 3,
        structure: "Prefrontal Cortex",
        description:
          "Dendritic atrophy also occurs in the PFC, weakening executive control, working memory, emotion regulation, and the ability to manage stress — creating a feedback loop where stress damages the system needed to cope with stress.",
      },
    ],
  },
];

// ============================================================
// DISTINCTION BLOCKS
// ============================================================

export const unit5Distinctions = [
  {
    id: "u5-db-01",
    termA: "Stress",
    termB: "Emotion",
    descriptionA:
      "A binary physiological state — the body shifting between parasympathetic and sympathetic activation. Stress has no specific valence (it is not inherently positive or negative) and is not a transient feeling.",
    descriptionB:
      "A transient state with specific valence (positive or negative) that motivates approach or avoid behavior. Emotions are brief episodes with a clear directional quality.",
    keyDifference:
      "Stress is a physiological state. Emotion is a valenced psychological state. You can be stressed without feeling a specific emotion, and you can feel an emotion without being physiologically stressed.",
  },
  {
    id: "u5-db-02",
    termA: "Homeostasis",
    termB: "Allostasis",
    descriptionA:
      "A fixed, ideal set point that the body maintains through negative feedback. Example: body temperature at 37°C. The system detects deviation and corrects back to the set point.",
    descriptionB:
      "'Stability through change.' The body actively modifies its set points to meet changing environmental demands. Unlike homeostasis, allostasis involves dynamic adjustment rather than a fixed target.",
    keyDifference:
      "Homeostasis is maintaining a fixed set point. Allostasis is changing the set point to adapt. Homeostasis is a thermostat; allostasis is adjusting the thermostat's target temperature.",
  },
  {
    id: "u5-db-03",
    termA: "Allostatic Load",
    termB: "Allostatic Overload",
    descriptionA:
      "The cumulative wear and tear from repeated activation of the stress response. Every allostatic adjustment has a biological cost; load is the running total of that cost.",
    descriptionB:
      "The point where the accumulated cost exceeds available energy and resources. The system breaks down — neural atrophy, immune failure, digestive disruption, and sleep collapse follow.",
    keyDifference:
      "Load is the accumulating cost. Overload is when the cost exceeds capacity and the system starts failing. Load is manageable; overload is not.",
  },
  {
    id: "u5-db-04",
    termA: "Resilience",
    termB: "Vulnerability",
    descriptionA:
      "The ability to bounce back from allostatic overload. Maps to higher functional activity in the vmPFC. Resilient brains show stronger top-down regulation of stress circuits.",
    descriptionB:
      "Susceptibility to harm from allostatic overload. Associated with lower vmPFC activation and weaker regulation. Vulnerable brains show different vmPFC patterns than resilient ones.",
    keyDifference:
      "Both are measurable neural profiles, not just personality descriptions. Resilience = stronger vmPFC regulation. Vulnerability = weaker vmPFC regulation.",
  },
  {
    id: "u5-db-05",
    termA: "Bottom-Up Interventions",
    termB: "Top-Down Interventions",
    descriptionA:
      "Pharmaceutical approaches targeting neurotransmitter systems (serotonin, norepinephrine, GABA) via medications like SSRIs. Work from subcortical chemistry upward.",
    descriptionB:
      "Cognitive approaches like therapy and mindfulness that strengthen PFC regulation of stress circuits. Work from cortical processing downward.",
    keyDifference:
      "Bottom-up changes the chemical environment. Top-down strengthens the regulatory circuits. Combinatorial interventions (exercise, diet, sleep, social support) do both simultaneously.",
  },
];

// ============================================================
// CASE / SENSITIVITY NOTES
// ============================================================

export const unit5CaseNotes = [
  {
    id: "u5-cn-01",
    title: "Chronic Stress and Neural Atrophy",
    content:
      "Chronic allostatic overload causes measurable physical degradation in the brain. Dendritic branching shrinks specifically in the hippocampus (CA3 region and dentate gyrus) and the prefrontal cortex. This means chronic stress does not just feel bad — it physically reduces the complexity of the neural structures needed for memory, learning, executive control, and emotion regulation. The damage creates a vicious cycle: stress impairs the brain systems responsible for managing stress.",
    sensitivity: "standard" as const,
  },
  {
    id: "u5-cn-02",
    title: "Resilience vs. Risky Coping",
    content:
      "Resilient and vulnerable brains show vastly different patterns of vmPFC activation. Resilient coping is associated with stronger vmPFC function — better top-down regulation of stress circuits and more effective recovery from allostatic overload. Risky coping patterns correlate with weaker vmPFC activation. This is not a moral judgment — it is a neural measurement. Interventions (pharmaceutical, cognitive, and combinatorial) can shift the brain toward more resilient patterns.",
    sensitivity: "standard" as const,
  },
  {
    id: "u5-cn-03",
    title: "Suicide Neurobiology",
    content:
      "Post-mortem studies of individuals who died by suicide reveal specific neurobiological markers: decreased serotonin transporter binding and increased 5-HT receptor binding in the prefrontal cortex, alongside depletion of serotonin and noradrenaline. Suicidal behavior has a neurobiological basis — it maps to measurable changes in brain chemistry. This does not diminish the role of environmental factors, but it establishes that the condition involves genuine dysfunction in the brain systems responsible for mood regulation and executive control.",
    sensitivity: "high" as const,
    sensitivityNote:
      "This material is included because it covers real neurobiology. It is presented as factual content, not as an interactive experience. If you or someone you know is in crisis, contact the 988 Suicide and Crisis Lifeline (call or text 988).",
  },
];

// ============================================================
// REVIEW QUESTIONS
// ============================================================

export const unit5Review = [
  {
    id: "u5-rq-01",
    question:
      "Why is stress defined as a physiological state rather than an emotion?",
    hint: "Think about the definitions from the emotion unit. What does stress lack that emotions have?",
  },
  {
    id: "u5-rq-02",
    question:
      "Distinguish homeostasis from allostasis. Give an example of each.",
    hint: "One is a fixed target the body returns to. The other is the body changing its target to meet new demands.",
  },
  {
    id: "u5-rq-03",
    question:
      "Trace the HPA axis in order, naming each structure and the hormone it releases.",
    hint: "Three structures, three hormones: hypothalamus → pituitary → adrenal cortex.",
  },
  {
    id: "u5-rq-04",
    question:
      "How does the cortisol negative feedback loop normally work, and how can it be overridden?",
    hint: "Normally cortisol inhibits the hypothalamus and pituitary. Under extreme stress, which structures prevent this from working?",
  },
  {
    id: "u5-rq-05",
    question:
      "What specific brain structures are damaged by chronic allostatic overload, and why does this create a vicious cycle?",
    hint: "Think about which structures shrink and what those structures are responsible for.",
  },
  {
    id: "u5-rq-06",
    question:
      "Distinguish the three categories of intervention. Which brain systems does each target?",
    hint: "Bottom-up = chemistry. Top-down = cortical regulation. Combinatorial = both simultaneously.",
  },
];
