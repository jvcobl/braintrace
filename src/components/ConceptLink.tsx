import { Link } from "react-router-dom";
import { conceptPages } from "@/data/conceptPages";
import type { ConceptPageId } from "@/data/types";

interface ConceptLinkProps {
  conceptPageId: string;
  label?: string;
}

const ConceptLink = ({ conceptPageId, label }: ConceptLinkProps) => {
  const page = conceptPages[conceptPageId as ConceptPageId];
  if (!page) return null;

  return (
    <Link
      to={`/how-your-brain-predicts/${page.slug}`}
      className="group flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-primary">{label ?? page.title}</span>
        <span className="block text-xs text-gray-400 mt-0.5 truncate">{page.description}</span>
      </div>
      <span className="text-gray-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">→</span>
    </Link>
  );
};

export default ConceptLink;
