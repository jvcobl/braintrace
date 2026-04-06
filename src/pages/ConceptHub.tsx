import { Link } from "react-router-dom";
import { conceptPages } from "@/data/conceptPages";
import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

const CONCEPT_ACCENTS: Record<string, string> = {
  loop: "#7F77DD",
  "precision-attention": "#378ADD",
  failure: "#D85A30",
};

const moduleIds = [
  "blurry-object-guess",
  "face-or-not",
  "sudden-noise-reaction",
  "fear-cue-and-extinction",
  "memory-under-load",
  "stress-response-builder",
];

const ConceptHub = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl font-semibold text-foreground">How your brain predicts</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Your brain is not just reacting. It is constantly predicting what will happen next
      — and learning from what it gets wrong.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
      {Object.values(conceptPages).map((page) => {
        const accent = CONCEPT_ACCENTS[page.id] || "#888";
        return (
          <Link
            key={page.id}
            to={`/how-your-brain-predicts/${page.slug}`}
            className="group block border border-gray-200 rounded-xl bg-white overflow-hidden hover:shadow-sm transition-all"
          >
            <div className="h-[3px]" style={{ backgroundColor: accent }} />
            <div className="p-6">
              <h2 className="font-display text-lg text-foreground">{page.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{page.description}</p>
              <span className="inline-block mt-4 text-sm font-medium text-primary group-hover:underline">
                Explore →
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    <h2 className="text-lg font-medium text-foreground mt-12 mb-4">Try the modules</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {moduleIds.map((id) => (
        <ModuleLink key={id} moduleId={id} />
      ))}
    </div>
  </div>
);

export default ConceptHub;
