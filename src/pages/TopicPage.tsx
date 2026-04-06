import { useParams, Navigate } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ModuleLink from "@/components/ModuleLink";
import ConceptLink from "@/components/ConceptLink";

/* ── Topic data ── */

interface Topic {
  title: string;
  accent: string;
  description: string;
  moduleIds: string[];
  conceptIds: string[];
}

const topics: Record<string, Topic> = {
  perception: {
    title: "Perception and Object Recognition",
    accent: "#7F77DD",
    description:
      "Your brain builds what you see before the picture is complete. These modules explore how the visual system uses shortcuts, prior experience, and specialized regions to recognize objects and faces — often before full sensory detail is available.",
    moduleIds: ["blurry-object-guess", "face-or-not", "multistable-perception-gallery"],
    conceptIds: ["loop", "precision-attention"],
  },
  attention: {
    title: "Attention, Cognitive Load, and the PFC",
    accent: "#7F77DD",
    description:
      "Focus is expensive — and your brain runs out of it. These modules explore how the prefrontal cortex maintains working memory, suppresses distraction, and what happens when cognitive load exceeds capacity.",
    moduleIds: ["memory-under-load", "pfc-role-matcher"],
    conceptIds: ["precision-attention", "failure"],
  },
  emotion: {
    title: "Emotion, Limbic System, and Amygdala",
    accent: "#D85A30",
    description:
      "Your brain flags what matters before you've fully interpreted it. These modules explore how salience, surprise, and arousal drive fast automatic responses through the amygdala and limbic system.",
    moduleIds: ["sudden-noise-reaction", "emotion-vs-arousal-sorter", "fear-vs-anxiety-sorter"],
    conceptIds: ["loop", "failure"],
  },
  learning: {
    title: "Learning and Fear Conditioning",
    accent: "#1D9E75",
    description:
      "The brain doesn't just react — it learns what to expect next. These modules explore how cues become predictions, how fear is conditioned and extinguished, and why extinction is new learning, not erasure.",
    moduleIds: ["fear-cue-and-extinction", "classical-vs-operant-sorter"],
    conceptIds: ["loop", "failure"],
  },
  stress: {
    title: "Stress and Homeostasis",
    accent: "#1D9E75",
    description:
      "The stress response is built to prepare you for demand. These modules explore how the HPA axis activates, how negative feedback normally shuts it down, and what happens under chronic stress when the shutdown fails.",
    moduleIds: ["stress-response-builder", "homeostasis-vs-allostasis-sorter"],
    conceptIds: ["loop", "failure"],
  },
};

/* ── Component ── */

const TopicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const topic = slug ? topics[slug] : undefined;

  if (!topic) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <Breadcrumb />

      <h1 className="text-3xl text-foreground">{topic.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
        {topic.description}
      </p>

      {/* Modules */}
      <h2 className="text-lg font-medium text-foreground mt-10 mb-3">Modules</h2>
      <div className="space-y-2">
        {topic.moduleIds.map((id) => (
          <ModuleLink key={id} moduleId={id} />
        ))}
      </div>

      {/* Related concepts */}
      <h2 className="text-lg font-medium text-foreground mt-10 mb-3">Related concepts</h2>
      <div className="space-y-2 max-w-md">
        {topic.conceptIds.map((id) => (
          <ConceptLink key={id} conceptPageId={id} />
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
