import { useParams, Navigate } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ModuleLink from "@/components/ModuleLink";
import ConceptLink from "@/components/ConceptLink";

/* ── Topic data ── */

interface Topic {
  title: string;
  accent: string;
  description: string;
  courseConnection: string;
  moduleIds: string[];
  conceptIds: string[];
}

const topics: Record<string, Topic> = {
  perception: {
    title: "Perception and Object Recognition",
    accent: "#7F77DD",
    description:
      "Your brain builds what you see before the picture is complete. The visual system uses shortcuts, prior experience, and specialized regions to recognize objects and faces — often before full sensory detail is available.",
    courseConnection:
      "Connects to Sensation, Perception, and Inklings of Awareness and Object Recognition and Decision-making.",
    moduleIds: ["blurry-object-guess", "face-or-not", "multistable-perception-gallery"],
    conceptIds: ["loop", "precision-attention"],
  },
  attention: {
    title: "Attention, Cognitive Load, and the PFC",
    accent: "#7F77DD",
    description:
      "Focus is expensive — and your brain runs out of it. The prefrontal cortex maintains working memory and suppresses distraction, but these operations share a finite resource pool that degrades under load.",
    courseConnection:
      "Connects to Object Recognition and Decision-making — Top-down and Bottom-up Integrations.",
    moduleIds: ["memory-under-load", "pfc-role-matcher"],
    conceptIds: ["precision-attention", "failure"],
  },
  emotion: {
    title: "Emotion, Limbic System, and Amygdala",
    accent: "#D85A30",
    description:
      "Your brain flags what matters before you've fully interpreted it. Salience, surprise, and arousal drive fast automatic responses through the amygdala and limbic system — often before cortical evaluation catches up.",
    courseConnection:
      "Connects to States that Prime Behavior — Arousal, Emotions.",
    moduleIds: ["sudden-noise-reaction", "emotion-vs-arousal-sorter", "fear-vs-anxiety-sorter"],
    conceptIds: ["loop", "failure"],
  },
  learning: {
    title: "Learning and Fear Conditioning",
    accent: "#1D9E75",
    description:
      "The brain doesn't just react — it learns what to expect next. Cues become predictions, fear is conditioned through CS-US pairing, and extinction builds a new competing memory rather than erasing the old one.",
    courseConnection:
      "Connects to Learning 101 — Behaviorism and Plasticity and The Push & Pull — Fear and Anxiety.",
    moduleIds: ["fear-cue-and-extinction", "classical-vs-operant-sorter"],
    conceptIds: ["loop", "failure"],
  },
  stress: {
    title: "Stress and Homeostasis",
    accent: "#1D9E75",
    description:
      "The stress response is built to prepare you for demand. The HPA axis activates a hormonal cascade, negative feedback normally shuts it down, and chronic stress overrides that shutdown — leading to structural damage.",
    courseConnection:
      "Connects to Stress & Survival — HPA Axis, HPG Axis.",
    moduleIds: ["stress-response-builder", "homeostasis-vs-allostasis-sorter"],
    conceptIds: ["loop", "failure"],
  },
};

/* ── Component ── */

const TopicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const topic = slug ? topics[slug] : undefined;

  if (!topic) return <Navigate to="/topics" replace />;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <Breadcrumb />

      <div className="border-l-4 rounded-r-lg pl-5" style={{ borderLeftColor: topic.accent }}>
        <h1 className="text-3xl text-foreground">{topic.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {topic.description}
        </p>
        <p className="mt-3 text-xs text-gray-400">
          {topic.courseConnection}
        </p>
      </div>

      {/* Modules */}
      <h2 className="text-lg font-medium text-foreground mt-10 mb-1">
        Explore the modules
      </h2>
      <p className="text-sm text-gray-400 mb-3">
        Each module lets you experience the phenomenon, trace the neural pathway, and read the explanation.
      </p>
      <div className="space-y-2">
        {topic.moduleIds.map((id) => (
          <ModuleLink key={id} moduleId={id} />
        ))}
      </div>

      {/* Related concepts */}
      <h2 className="text-lg font-medium text-foreground mt-10 mb-1">
        How your brain predicts
      </h2>
      <p className="text-sm text-gray-400 mb-3">
        These concept pages explain the shared framework behind the modules above.
      </p>
      <div className="space-y-2 max-w-md">
        {topic.conceptIds.map((id) => (
          <ConceptLink key={id} conceptPageId={id} />
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
