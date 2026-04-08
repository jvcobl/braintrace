import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";

const topics = [
  { slug: "perception", title: "Perception and Object Recognition", accent: "#7F77DD", modules: 2 },
  { slug: "attention", title: "Attention, Cognitive Load, and the PFC", accent: "#7F77DD", modules: 1 },
  { slug: "emotion", title: "Emotion, Limbic System, and Amygdala", accent: "#D85A30", modules: 1 },
  { slug: "learning", title: "Learning and Fear Conditioning", accent: "#1D9E75", modules: 1 },
  { slug: "stress", title: "Stress and Homeostasis", accent: "#1D9E75", modules: 0 },
];

const TopicsIndex = () => (
  <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl text-foreground">Explore by topic</h1>
    <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
      Choose a neuroscience topic and explore the BrainTrace modules connected to it.
    </p>

    <div className="mt-8 space-y-2">
      {topics.map((t) => (
        <Link
          key={t.slug}
          to={`/topics/${t.slug}`}
          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white border-l-4 p-4 sm:p-5 transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{ borderLeftColor: t.accent }}
        >
          <h2 className="font-display text-base text-foreground group-hover:text-primary transition-colors flex-1">
            {t.title}
          </h2>
          <span className="text-xs text-muted-foreground/40 shrink-0">
            {t.modules > 0
              ? `${t.modules} ${t.modules === 1 ? "module" : "modules"}`
              : "Coming soon"}
          </span>
          <span
            className="text-muted-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
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
