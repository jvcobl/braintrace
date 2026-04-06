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
      className="block border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
    >
      <span className="flex items-center justify-between">
        <span className="text-sm text-blue-600">{label ?? page.title}</span>
        <span className="text-gray-400 text-sm">→</span>
      </span>
    </Link>
  );
};

export default ConceptLink;
