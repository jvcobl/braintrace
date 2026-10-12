import { Link } from "react-router-dom";
import { conceptPages } from "@/data/conceptPages";
import type { ConceptPageId } from "@/data/types";

const ORDER: ConceptPageId[] = ["loop", "precision-attention", "failure"];
const href = (id: ConceptPageId) => `/how-your-brain-predicts/${conceptPages[id].slug}`;

/** Previous / next links that join the three concept pages into a short sequence. */
const ConceptPageNav = ({ current }: { current: ConceptPageId }) => {
  const i = ORDER.indexOf(current);
  const prev = i > 0 ? ORDER[i - 1] : null;
  const next = i < ORDER.length - 1 ? ORDER[i + 1] : null;
  const linkClass =
    "group flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <nav aria-label="Concept pages" className="mt-14 flex flex-col sm:flex-row gap-3 border-t border-border pt-8">
      {prev ? (
        <Link to={href(prev)} className={linkClass}>
          <span className="block text-xs text-muted-foreground">← Previous</span>
          <span className="block font-display text-base text-foreground">{conceptPages[prev].title}</span>
        </Link>
      ) : (
        <Link to="/how-your-brain-predicts" className={linkClass}>
          <span className="block text-xs text-muted-foreground">← Overview</span>
          <span className="block font-display text-base text-foreground">How Your Brain Predicts</span>
        </Link>
      )}
      {next ? (
        <Link to={href(next)} className={`${linkClass} sm:text-right`}>
          <span className="block text-xs text-muted-foreground">Next →</span>
          <span className="block font-display text-base text-foreground">{conceptPages[next].title}</span>
        </Link>
      ) : (
        <Link to="/topics" className={`${linkClass} sm:text-right`}>
          <span className="block text-xs text-muted-foreground">Next →</span>
          <span className="block font-display text-base text-foreground">Try the lessons</span>
        </Link>
      )}
    </nav>
  );
};

export default ConceptPageNav;
