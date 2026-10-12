import { Link } from "react-router-dom";
import { conceptPages } from "@/data/conceptPages";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";

const CONCEPT_ACCENTS: Record<string, string> = {
  loop: "#7F77DD",
  "precision-attention": "#378ADD",
  failure: "#D85A30",
};

const ConceptHub = () => {
  usePageMeta({ title: "How Your Brain Predicts", description: "The prediction loop behind every BrainTrace lesson: predict, receive input, detect mismatch, update." });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <Breadcrumb />
      <h1 className="font-display text-3xl tracking-tight text-foreground">How Your Brain Predicts</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        Every BrainTrace lesson runs on the same prediction loop. These
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
              className="group block border border-gray-200 rounded-xl bg-white overflow-hidden hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="h-[3px]" style={{ backgroundColor: accent }} />
              <div className="p-6">
                <h2 className="font-display text-lg text-foreground">{page.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{page.description}</p>
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
          Looking for the interactive lessons?
        </p>
        <Link
          to="/topics"
          className="-mb-3 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Browse by topic →
        </Link>
      </div>
    </div>
  );
};

export default ConceptHub;
