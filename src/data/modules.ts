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
      { label: "Low Spatial Frequency Input", description: "The visual system receives coarse, blurry information first — broad shapes and contrast patterns that carry low spatial frequency data before fine edges and textures arrive." },
      { label: "Orbitofrontal Cortex (OFC)", description: "The OFC rapidly generates a contextual prediction — a best guess about the object's identity — using this rough input combined with prior experience and expectations." },
      { label: "Ventral Stream → IT Cortex", description: "As finer detail becomes available, the ventral visual stream carries it forward to inferotemporal (IT) cortex, which performs detailed object recognition and either confirms or overrides the OFC's initial prediction." },
    ],
    explain: {
      whatHappened: "You viewed an object that started heavily blurred and sharpened in stages. Early on, only low spatial frequency information was available — coarse blobs of contrast and shape without fine detail. You could guess at the object or wait for the image to clarify.",
      whatYourBrainDid: "Your orbitofrontal cortex (OFC) used the low spatial frequency input to generate a rapid top-down contextual prediction — an educated guess based on rough shape and prior knowledge. This prediction reached your visual processing areas before the ventral stream had finished extracting fine detail. As the image sharpened, inferotemporal (IT) cortex in the ventral stream performed full object recognition, confirming or correcting the OFC's guess. If you identified the object early, your OFC prediction was driving perception; if you waited, your brain relied more on bottom-up detail from IT cortex.",
      keyPathway: "Low spatial frequency visual input → OFC (rapid contextual prediction) → Ventral stream → Inferotemporal cortex (detailed object recognition). This pathway demonstrates that perception is not passive: higher-order areas like the OFC actively predict what you are seeing before complete sensory data is available.",
      nbb302Connection: "This module illustrates NBB302 concepts of top-down processing and predictive coding in the visual system. The OFC's role in generating rapid object predictions from degraded input connects directly to course material on how cortical feedback shapes perception. The ventral stream and IT cortex pathway is the canonical object recognition route covered in the visual processing unit.",
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
      { label: "Visual Input", description: "The image enters the visual system, where early processing extracts edges, contrast patterns, and basic shapes — features that could belong to a face or any other object." },
      { label: "Ventral Stream Processing", description: "Information flows along the ventral (\"what\") pathway toward temporal cortex, where increasingly complex features are assembled into candidate object representations." },
      { label: "Fusiform Face Area (FFA)", description: "The FFA, a region in the fusiform gyrus with learned expertise for faces, responds strongly to face-like configurations. It is biased to detect faces even in ambiguous or non-face stimuli — the neural basis of pareidolia." },
      { label: "Face vs. Non-Face Judgment", description: "The brain resolves whether the stimulus is a real face or a false alarm. When the FFA fires strongly for a non-face, you experience pareidolia — seeing a face where none exists." },
    ],
    explain: {
      whatHappened: "You saw a mix of images — some with clear face-like patterns, some with no face features, and some that were spatially ambiguous. For each, you judged whether it looked like a face. The ambiguous images (an outlet, a house front, three circles in a triangle) had elements arranged in the basic face configuration: two features above one feature, mimicking eyes-above-mouth. If you called 'face' on any of those, that's pareidolia.",
      whatYourBrainDid: "Your fusiform face area (FFA), a region in the fusiform gyrus specialized through years of face-processing experience, scanned every image for the canonical face configuration. The FFA is not just passively detecting faces — it is actively biased to detect them. It responds to any stimulus with a roughly face-like spatial layout (two horizontally aligned elements above a central lower element), even when the stimulus is clearly not a face. This bias exists because faces carry essential social information — identity, emotion, intent — so the cost of missing a face is higher than the cost of a false alarm. The result is pareidolia: a systematic over-detection of faces in non-face stimuli.",
      keyPathway: "Visual input → Ventral stream (the 'what' pathway) → Fusiform Face Area (face-biased expertise region) → Face vs. non-face judgment. The FFA's specialization is not innate at birth but develops through extensive experience with faces. It becomes so finely tuned that it fires rapidly and automatically for any face-like configuration, driving the pareidolia effect.",
      nbb302Connection: "This module connects to NBB302 coverage of the fusiform face area, face-selective neural populations, and the concept of perceptual expertise. The FFA demonstrates how cortical regions can become highly specialized through experience — the same principle underlies expert recognition in other domains. Critically, damage to the FFA or its connections can produce prosopagnosia, a selective inability to recognize faces despite otherwise intact vision. This dissociation proves that face recognition is not simply a subset of general object recognition — it relies on a dedicated cortical mechanism.",
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
    introCopy: "You'll do a short reaction-time task. Some trials will include a gentle interruption — a brief visual flash and optional soft tone. Afterward, we'll trace the brainstem reflex circuit and how the amygdala can amplify it. Sound is off by default; you can toggle it on if you'd like.",
    traceNodes: [
      { label: "Reflex Path: Sudden Stimulus → Cochlear Root Neurons → PnC → Motor Output", description: "The core acoustic startle circuit is one of the fastest in the nervous system. A sudden stimulus reaches cochlear root neurons, which project directly to the pontine reticular nucleus (PnC). The PnC then drives spinal and facial motor neurons to produce the startle flinch — all within two to three synapses, before conscious awareness." },
      { label: "Salience Path: Thalamic Input → BLA → CeA → PnC (Amplified Startle)", description: "In parallel, sensory information reaches the basolateral amygdala (BLA) via a fast thalamic relay (the 'low road'). The BLA evaluates the salience of the stimulus — not just whether it's threatening, but whether it matters. If the context is primed (you're tense, expecting something), the BLA activates the central nucleus (CeA), which feeds back onto the PnC to amplify the startle. This is fear-potentiated startle: the amygdala doesn't create the reflex, it turns up the volume." },
    ],
    explain: {
      whatHappened: "You performed a reaction-time task under calm and interrupted conditions. On some trials, a brief flash (and optional tone) appeared just before the target. This sudden stimulus was designed to engage your startle reflex — a fast, involuntary brainstem response.",
      whatYourBrainDid: "The sudden stimulus activated a minimal reflex arc: sensory input → cochlear root neurons → pontine reticular nucleus (PnC) → motor neurons. This circuit produces the startle flinch before your cortex even registers what happened. At the same time, the amygdala — specifically the basolateral nucleus (BLA) — assessed the salience of the event via a fast subcortical route (the 'low road' through the thalamus). The BLA functions as a salience detector, not just a fear center. When it flags the stimulus as significant, it activates the central nucleus (CeA), which amplifies the startle via feedback to the PnC. This is how emotional state or context can make a startle bigger — fear-potentiated startle. The slower cortical 'high road' delivers a detailed, conscious analysis afterward.",
      keyPathway: "Reflex path: Sudden stimulus → Cochlear root neurons → PnC → Motor neurons → Startle. Salience path: Thalamic relay → BLA (salience evaluation) → CeA → PnC (amplified response). The amygdala modulates startle intensity — it doesn't generate the reflex itself.",
      nbb302Connection: "This module covers the acoustic startle reflex as a model minimal sensorimotor circuit, the amygdala's role as a salience center (not solely a fear center), and the low-road/high-road distinction for threat processing. The BLA→CeA→PnC pathway illustrates how emotional priming amplifies basic reflexes — the mechanism behind fear-potentiated startle studied extensively in NBB302.",
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
    introCopy: "You'll step through a simplified conditioning experiment. First, a neutral cue will be paired with an unpleasant outcome — your brain learns to predict danger. Then the cue appears without the outcome, and the fear response fades. Finally, we'll test whether that fear can come back on its own.",
    traceNodes: [
      { label: "Conditioned Cue (CS)", description: "A neutral stimulus is perceived. After repeated pairing with an unpleasant outcome (the US), the amygdala learns to treat this cue as a danger signal — classical fear conditioning." },
      { label: "Amygdala → Fear Response", description: "The amygdala stores the CS–US association and drives the fear response: heightened arousal, vigilance, and avoidance. Each CS–US pairing strengthens this link during acquisition." },
      { label: "vmPFC + ITCs → Suppressed Fear", description: "During extinction, the vmPFC activates intercalated cells (ITCs) — inhibitory neurons that act as a brake on the amygdala's fear output. The original fear memory is not erased. Instead, a new competing memory is formed: 'the cue is now safe.' This is new learning, not forgetting." },
      { label: "Spontaneous Recovery", description: "If time passes or the context changes, the extinction memory can weaken — and the original fear response returns. This proves the amygdala still holds the CS–US association; extinction only suppressed it." },
    ],
    explain: {
      whatHappened: "A neutral cue (CS) was paired with an unpleasant outcome (US) — classical fear conditioning. Then the cue appeared alone during extinction, and the fear response faded. After a delay, the cue returned in a test trial. If the fear came back, that was spontaneous recovery.",
      whatYourBrainDid: "During acquisition, your amygdala learned the CS–US association and began driving a fear response each time the cue appeared. During extinction, your vmPFC activated intercalated cells (ITCs) — small inhibitory neurons that suppress the amygdala's output. This did not erase the original fear memory. It created a new, competing memory: 'the cue is now safe.' Extinction is new learning, not forgetting. Spontaneous recovery happens when this extinction memory weakens over time, allowing the original amygdala-based fear association to re-emerge.",
      keyPathway: "Acquisition: CS → Amygdala (CS–US learning) → Fear response. Extinction: CS → vmPFC → ITCs (inhibitory brake) → Suppressed fear output. The ITCs are the key — they let the brain suppress fear without erasing the underlying memory. When vmPFC/ITC control weakens, fear returns (spontaneous recovery).",
      nbb302Connection: "This module covers classical fear conditioning, the amygdala as an associative threat-learning system, and extinction as new inhibitory learning — not erasure. The vmPFC → ITC pathway is central to modern fear research and directly relevant to NBB302 material on emotion regulation. Spontaneous recovery demonstrates that conditioned fears persist beneath extinction, which is why exposure therapy must build strong, context-independent safety memories.",
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
    introCopy: "You'll try to remember a sequence of items. First with a light load, then with more items and distractors. Watch how your performance changes — that's your dlPFC reaching its limits.",
    traceNodes: [
      { label: "Incoming Task Demands", description: "Sensory information and task instructions arrive. The items you need to remember compete with distractors for limited processing resources." },
      { label: "dlPFC: Working Memory & Executive Control", description: "The dorsolateral prefrontal cortex (dlPFC) actively maintains task-relevant items in working memory and coordinates executive control — deciding what to hold, what to ignore, and how to respond. This is metabolically expensive." },
      { label: "Distractor Suppression", description: "The dlPFC exerts top-down control to suppress irrelevant information and keep focus on the memory set. Under low load, this works well. The irrelevant items are filtered out before they interfere." },
      { label: "Top-Down Control Failure Under Overload", description: "As load increases, the dlPFC's capacity is exceeded. Executive control weakens, distractor suppression fails, and irrelevant items begin to intrude. Performance drops — not because memory erased the items, but because the prefrontal system can no longer maintain them against interference." },
    ],
    explain: {
      whatHappened: "You performed the same memory task under two conditions. Low load: 3 letters, recall immediately. High load: 7 letters, with a math distractor forcing your dlPFC to hold the sequence while processing something else. The task was identical in structure — only the demand on working memory changed. If your accuracy dropped under high load, that's not a failure of memory storage — it's a failure of executive control.",
      whatYourBrainDid: "Your dorsolateral prefrontal cortex (dlPFC) actively maintained the letter sequence in working memory. Under low load (3 items, no distraction), the dlPFC managed comfortably — it had spare capacity to suppress interference and keep the items online. Under high load (7 items + distractor), the dlPFC was forced to do two expensive things at once: maintain a longer sequence and suppress the competing math task. This executive control is metabolically costly. When demand exceeded capacity, top-down control failed — the dlPFC could no longer keep all items active or filter out interference, and errors increased. This is cognitive overload: not a memory problem, but a prefrontal control problem.",
      keyPathway: "Task demands → dlPFC (active maintenance + executive control) → Top-down distractor suppression → Under overload: control failure → Performance decline. Working memory is not passive storage. It is an active, energy-expensive prefrontal process. When the dlPFC is overloaded, its ability to maintain information and suppress interference collapses together.",
      nbb302Connection: "This module covers NBB302 material on working memory capacity, cognitive load, and the dlPFC's role in executive function. The key insight is that prefrontal control is powerful but resource-limited — it consumes significant metabolic energy and degrades under sustained or excessive demand. When top-down control fails, behavior becomes more stimulus-driven and less goal-directed. This principle explains why multitasking impairs performance, why stress degrades decision-making, and why cognitive overload is a fundamental constraint on human information processing.",
    },
    demoType: "recall",
    learningObjective: "Understand working memory capacity limits and the prefrontal contributions to maintenance under load.",
  },
  {
    id: "mod-6",
    title: "HPA Axis Builder",
    slug: "hpa-axis-builder",
    unitId: "unit-5",
    shortGoal: "Learn the order of the HPA axis and what happens when cortisol feedback fails.",
    shortDescription: "Build the stress response cascade step by step and trace how chronic stress overrides the shutdown mechanism.",
    introCopy: "You'll assemble the HPA axis in the correct order — from the hypothalamus releasing CRH through cortisol negative feedback. Then we'll trace what happens when extreme stress from the central amygdala and PFC prevents the system from shutting down.",
    traceNodes: [
      { label: "Hypothalamus → CRH", description: "The hypothalamus detects a stressor and releases corticotropin-releasing hormone (CRH) into the portal blood system connecting it to the anterior pituitary." },
      { label: "Anterior Pituitary → ACTH", description: "The pituitary receives CRH and releases adrenocorticotropic hormone (ACTH) into the general bloodstream, targeting the adrenal glands." },
      { label: "Adrenal Cortex → Cortisol", description: "The adrenal cortex receives ACTH and releases glucocorticoids — primarily cortisol — which mobilize energy, suppress the immune system, and modulate brain function." },
      { label: "Negative Feedback → Shutdown", description: "Cortisol circulates back to the hypothalamus and pituitary, inhibiting further CRH and ACTH release. This normally shuts the stress response down once the stressor passes." },
      { label: "CeA / PFC Override (Extreme Stress)", description: "Under extreme or chronic stress, the central amygdala and PFC send override signals that prevent negative feedback from working. The HPA axis stays active, cortisol accumulates, and chronic damage follows — hippocampal atrophy, PFC dendritic shrinkage, immune suppression." },
    ],
    explain: {
      whatHappened: "You assembled the HPA axis in sequence — placing each structure and its hormone output in order, from the hypothalamus through cortisol release, negative feedback, and the override mechanism under extreme stress.",
      whatYourBrainDid: "By building the cascade step by step, you traced the same neuroendocrine pathway your own body uses during stress. The hypothalamus initiates with CRH, the pituitary amplifies with ACTH, and the adrenal cortex produces cortisol. Under normal conditions, cortisol feeds back to shut the system down. Under extreme stress, the central amygdala and PFC override that feedback — keeping cortisol elevated and driving the chronic damage seen in allostatic overload.",
      keyPathway: "Hypothalamus (CRH) → Anterior Pituitary (ACTH) → Adrenal Cortex (Cortisol) → Negative feedback to hypothalamus and pituitary. Override path: CeA / PFC → block negative feedback → sustained cortisol → hippocampal and PFC atrophy.",
      nbb302Connection: "This module covers the HPA axis as the primary neuroendocrine stress system from NBB302. The negative feedback loop and its failure under chronic stress connect directly to course material on allostatic overload, hippocampal atrophy in CA3 and dentate gyrus, PFC dendritic shrinkage, and the resilience-vulnerability spectrum measured by vmPFC activation.",
    },
    demoType: "interactive",
    learningObjective: "Trace the HPA axis cascade and explain how cortisol negative feedback can be overridden under extreme stress.",
  },
  {
    id: "mod-7",
    title: "Multistable Perception Toggle",
    slug: "multistable-perception-toggle",
    unitId: "unit-1",
    shortGoal: "Experience how the brain toggles between two valid interpretations of one image.",
    shortDescription: "View an ambiguous figure and discover why your brain picks one interpretation before you consciously choose.",
    introCopy: "You'll look at a single ambiguous image that can be seen as two different things. Your brain will pick one interpretation instantly — a cognitive heuristic. Then you'll try to switch and trace the circuit that toggles between them.",
    traceNodes: [
      { label: "Ambiguous Visual Input", description: "The retina sends the same signal regardless of which interpretation you perceive. The image itself never changes." },
      { label: "Visual Cortex (V1–V4)", description: "Early visual areas extract edges, contours, and figure-ground boundaries. Both interpretations are neurally plausible at this stage." },
      { label: "PFC / Ventral Stream Toggle", description: "The prefrontal cortex and ventral stream shift which interpretation dominates conscious perception. When you 'switch,' this is the circuit changing its bias." },
    ],
    explain: {
      whatHappened: "You viewed an ambiguous figure — a Rubin's vase — that can be perceived as either a central vase or two face profiles. You selected your initial interpretation, then attempted to switch to the alternative.",
      whatYourBrainDid: "Your visual cortex processed the same edges and contours for both interpretations. The prefrontal cortex applied a cognitive heuristic — an energetic shortcut — to select one reading instantly. When you switched, communication between the visual cortex and higher-order regions like the PFC and ventral stream changed, even though the stimulus remained identical. This is multistable perception: the brain toggles between two valid readings of the same input.",
      keyPathway: "Retina → V1–V4 (edge/contour extraction) → PFC and ventral stream (interpretation selection and toggle). The toggle occurs at the level of higher-order cortical communication, not at the retina or early visual cortex.",
      nbb302Connection: "This module demonstrates multistable perception and cognitive heuristics from NBB302. The brain's automatic selection of one interpretation over another illustrates how heuristics operate below conscious awareness. These same shortcut mechanisms extend beyond vision to empathy, emotion, and logical reasoning.",
    },
    demoType: "interactive",
    learningObjective: "Explain multistable perception and how cognitive heuristics shape initial interpretation of ambiguous stimuli.",
  },
  {
    id: "mod-8",
    title: "PFC Role Matcher",
    slug: "pfc-role-matcher",
    unitId: "unit-2",
    shortGoal: "Learn the functional divisions of the prefrontal cortex.",
    shortDescription: "Match cognitive scenarios to the correct PFC region and trace why the executive system has distinct subdivisions.",
    introCopy: "You'll read short scenarios describing things the prefrontal cortex does — logic, emotion regulation, predictions — and assign each to the correct PFC subregion: dlPFC, vmPFC, or OFC. Then we'll trace the functional map.",
    traceNodes: [
      { label: "dlPFC — Logic and Working Memory", description: "Handles unsentimental calculations, abstract reasoning, and active maintenance of task-relevant information. The rational analysis center — the 'Spock' of the brain." },
      { label: "vmPFC — Emotion Regulation", description: "Regulates emotional subcortical input — avoidance signals from the amygdala and reward signals from the nucleus accumbens. Balances emotion with executive judgment." },
      { label: "OFC — Categorization and Expectations", description: "Sets predictions about what should happen next, categorizes stimuli, and generates contextual expectations that guide perception and decision-making." },
    ],
    explain: {
      whatHappened: "You matched six cognitive scenarios to three PFC subdivisions — dorsolateral PFC, ventromedial PFC, and orbitofrontal cortex — based on each region's functional specialization.",
      whatYourBrainDid: "To sort each scenario, your own PFC was actively engaged — using working memory (dlPFC) to hold the region definitions, emotional reasoning (vmPFC) to evaluate scenarios involving threat and reward, and categorical expectations (OFC) to predict which label fit. The task itself exercised the system it was asking you to learn about.",
      keyPathway: "dlPFC (logic, working memory, cost-benefit analysis) ↔ vmPFC (amygdala regulation, reward balancing) ↔ OFC (categorization, contextual prediction). These three generally collaborate but can compete for control over decision-making.",
      nbb302Connection: "This module covers the PFC functional map from NBB302 — how the prefrontal cortex is not a single monolithic controller but a set of specialized subdivisions that collaborate and sometimes compete. Understanding this map is essential for the cognitive load material: when the PFC is depleted by fatigue, hunger, or illness, all three regions lose capacity simultaneously.",
    },
    demoType: "interactive",
    learningObjective: "Distinguish the functional roles of the dlPFC, vmPFC, and OFC within the prefrontal cortex.",
  },
  {
    id: "mod-9",
    title: "Fear vs. Anxiety Sorter",
    slug: "fear-vs-anxiety-sorter",
    unitId: "unit-3",
    shortGoal: "Distinguish fear from anxiety using the course definitions.",
    shortDescription: "Classify scenarios as fear or anxiety and trace why the distinction matters neurobiologically.",
    introCopy: "You'll read short scenarios and decide whether each describes fear — a response to an imminent, tangible threat — or anxiety — the anticipation of a future, predicted threat. Then we'll trace the different circuits involved.",
    traceNodes: [
      { label: "Fear: Tangible Threat → Amygdala → Immediate Response", description: "Fear is the emotional appraisal of an imminent threat that is present and identifiable. Sensory input reaches the amygdala via the fast subcortical low road, driving an immediate defensive response." },
      { label: "Anxiety: Predicted Threat → PFC + Amygdala → Anticipatory State", description: "Anxiety is the anticipation of a future threat. The PFC generates predictions about what might happen, and the amygdala responds to those predictions." },
      { label: "The Distinction", description: "Fear responds to what is in front of you. Anxiety responds to what your brain predicts might happen. Both engage the amygdala, but anxiety additionally requires prefrontal prediction and can become pathological when overgeneralized." },
    ],
    explain: {
      whatHappened: "You classified six scenarios as either fear or anxiety based on whether the threat was present and tangible or predicted and future-oriented.",
      whatYourBrainDid: "For each scenario, your brain assessed whether the described threat was imminent (triggering the fear classification) or anticipated (triggering the anxiety classification). This distinction mirrors how the amygdala processes threats differently depending on whether sensory input arrives via the fast low road (fear) or via prefrontal prediction pathways (anxiety).",
      keyPathway: "Fear: Sensory input → Low road (fast subcortical) → Amygdala → Immediate defensive response. Anxiety: PFC prediction → Amygdala activation → Anticipatory physiological state. The amygdala is engaged in both, but the input pathway and timing differ.",
      nbb302Connection: "The fear–anxiety distinction is central to NBB302's coverage of the amygdala. The amygdala is not a simple fear center — it is a salience center that stamps importance onto events. Fear and anxiety both engage it, but through different circuits. This distinction matters clinically because anxiety disorders involve overgeneralized threat prediction, not an overactive fear response to present stimuli.",
    },
    demoType: "interactive",
    learningObjective: "Distinguish fear from anxiety using the neurobiological definitions from the course.",
  },
  {
    id: "mod-10",
    title: "Emotion vs. Arousal Sorter",
    slug: "emotion-vs-arousal-sorter",
    unitId: "unit-3",
    shortGoal: "Distinguish emotion from arousal using the course definitions.",
    shortDescription: "Classify scenarios as emotion or arousal and learn why valence is the key differentiator.",
    introCopy: "You'll read short scenarios and decide whether each describes an emotion — a transient state with specific valence that motivates approach or avoidance — or arousal — physiological intensity without inherent direction. Then we'll trace why this distinction matters.",
    traceNodes: [
      { label: "Arousal: Intensity Without Direction", description: "The magnitude of physiological activation — cortisol release, heart rate, pupil dilation. Arousal has no valence; high arousal accompanies both terror and excitement equally." },
      { label: "Valence: The Directional Quality", description: "The positive or negative quality that gives an experience its approach or avoid character. Valence is what distinguishes emotion from arousal." },
      { label: "Emotion: Arousal + Valence → Motivated Behavior", description: "A transient state — not a trait — that combines physiological activation with specific valence, producing approach or avoidance motivation." },
    ],
    explain: {
      whatHappened: "You classified six scenarios as either emotion or arousal based on whether the description included specific valence (positive or negative direction) or only physiological intensity.",
      whatYourBrainDid: "For each scenario, you assessed whether the experience had a clear directional quality — approach or avoid — or simply reflected how activated the body was. This mirrors the distinction the course draws between arousal (intensity) and emotion (intensity plus valence plus motivated behavior).",
      keyPathway: "Arousal = physiological intensity without direction. Valence = positive or negative quality. Emotion = arousal + valence → transient state motivating approach or avoidance. Confusing arousal with emotion is a common reasoning error.",
      nbb302Connection: "This module covers the emotion–arousal–valence framework from NBB302. The distinction is foundational: arousal tells you how activated the body is, valence tells you the direction, and emotion combines both into a transient motivational state. Understanding this framework is essential for interpreting amygdala function, fear vs. anxiety, and how interoceptive signals become labeled emotional experiences.",
    },
    demoType: "interactive",
    learningObjective: "Distinguish emotion from arousal and explain the role of valence in creating directional emotional states.",
  },
  {
    id: "mod-11",
    title: "Classical vs. Operant Sorter",
    slug: "classical-vs-operant-sorter",
    unitId: "unit-4",
    shortGoal: "Distinguish the two major learning paradigms from NBB302.",
    shortDescription: "Classify scenarios as classical or operant conditioning and learn why fear conditioning is strictly classical.",
    introCopy: "You'll read short scenarios and decide whether each describes classical conditioning — where a neutral stimulus is paired with an unconditioned stimulus to produce an automatic response — or operant conditioning — where a voluntary behavior is shaped by its consequences. Then we'll trace why this distinction matters for understanding fear.",
    traceNodes: [
      { label: "Classical: Automatic Association", description: "A neutral CS is paired with a US. The learned response forms automatically — the organism does not choose to respond. Relies on amygdala circuitry, particularly the BLA." },
      { label: "Operant: Voluntary Action → Consequence", description: "The organism's own behavior determines the outcome. Relies on nucleus accumbens and dopamine signaling." },
      { label: "Key Differentiator: Agency", description: "In classical conditioning, the organism is passive. In operant conditioning, the organism's action is the critical variable." },
    ],
    explain: {
      whatHappened: "You classified six scenarios as either classical or operant conditioning based on whether the learned response was automatic (stimulus-driven) or voluntary (action-driven).",
      whatYourBrainDid: "For each scenario, you assessed whether the organism passively acquired an association or actively changed behavior based on consequences. This mirrors the distinction the course draws between Pavlovian and Skinnerian paradigms.",
      keyPathway: "Classical conditioning: CS + US → automatic CR, mediated by amygdala (BLA → CeA). Operant conditioning: voluntary action → consequence, mediated by nucleus accumbens and dopamine. Fear conditioning is strictly classical.",
      nbb302Connection: "This module covers the two learning paradigms from NBB302. Fear conditioning — the core mechanism of Unit 4 — is strictly classical: the organism does not choose to become afraid. The CS-US association forms automatically through BLA circuitry. Understanding this distinction is essential for grasping why extinction is new learning (vmPFC inhibiting the original trace) rather than erasure, and why fear can spontaneously return.",
    },
    demoType: "interactive",
    learningObjective: "Distinguish classical from operant conditioning and explain why fear conditioning is a classical paradigm.",
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
