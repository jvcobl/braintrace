import { Link } from "react-router-dom";
import { conceptPages } from "@/data/conceptPages";
import ModuleLink from "@/components/ModuleLink";

const moduleIds = [
  "blurry-object-guess",
  "face-or-not",
  "sudden-noise-reaction",
  "fear-cue-and-extinction",
  "memory-under-load",
];

const ConceptHub = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <h1 className="text-3xl font-semibold text-foreground">How your brain predicts</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Your brain is not just reacting. It is constantly predicting what will happen next
      — and learning from what it gets wrong.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
      {Object.values(conceptPages).map((page) => (
        <Link
          key={page.id}
          to={`/how-your-brain-predicts/${page.slug}`}
          className="block border border-border rounded-xl p-6 bg-card hover:border-primary/30 transition-colors"
        >
          <h2 className="text-lg font-medium text-foreground">{page.title}</h2>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{page.description}</p>
          <span className="inline-block mt-4 text-sm text-primary">Explore →</span>
        </Link>
      ))}
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
