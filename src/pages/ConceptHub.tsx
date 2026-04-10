import { Link } from "react-router-dom";
import { conceptPages } from "@/data/conceptPages";
import Breadcrumb from "@/components/layout/Breadcrumb";

const CONCEPT_ACCENTS: Record<string, string> = {
  loop: "#7F77DD",
  "precision-attention": "#378ADD",
  failure: "#D85A30",
};

const ConceptHub = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl font-semibold text-foreground">How your brain predicts</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Every BrainTrace module runs on the same prediction loop. These
      three pages explain how that loop works, how attention shapes it,
      and where it breaks.
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
                Read more →
              </span>
            </div>
          </Link>
        );
      })}
    </div>

    <div className="mt-12 text-center">
      <p className="text-sm text-muted-foreground">
        Looking for the interactive modules?
      </p>
      <Link
        to="/topics"
        className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        Browse by topic →
      </Link>
    </div>
  </div>
);

export default ConceptHub;
