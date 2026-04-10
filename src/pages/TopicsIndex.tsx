import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";

const topics = [
  { slug: "perception", title: "Perception and Object Recognition", accent: "#7F77DD", modules: 3, teaser: "How the visual system recognizes objects and faces before full detail arrives." },
  { slug: "attention", title: "Attention, Cognitive Load, and the PFC", accent: "#7F77DD", modules: 2, teaser: "How the prefrontal cortex maintains focus, and what happens when it can't." },
  { slug: "emotion", title: "Emotion, Limbic System, and Amygdala", accent: "#D85A30", modules: 3, teaser: "How salience and arousal drive fast responses through subcortical circuits." },
  { slug: "learning", title: "Learning and Fear Conditioning", accent: "#1D9E75", modules: 2, teaser: "How cues become predictions, and why extinction is new learning rather than erasure." },
  { slug: "stress", title: "Stress and Homeostasis", accent: "#1D9E75", modules: 2, teaser: "How the HPA axis responds to demand, and what happens when it can't shut down." },
];

const TopicsIndex = () => (
  <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl text-foreground">Explore by topic</h1>
    <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
      Pick a topic to see the modules connected to it.
    </p>

    <div className="mt-10 space-y-3">
      {topics.map((t) => (
        <Link
          key={t.slug}
          to={`/topics/${t.slug}`}
          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white border-l-4 p-4 sm:p-5 transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{ borderLeftColor: t.accent }}
        >
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-base text-foreground group-hover:text-primary transition-colors">
              {t.title}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {t.teaser}
            </p>
          </div>
          <span className="text-xs text-muted-foreground/40 shrink-0">
            {t.modules} {t.modules === 1 ? "module" : "modules"}
          </span>
          <span
            className="text-gray-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default TopicsIndex;
