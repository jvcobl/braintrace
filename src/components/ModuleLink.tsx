import { Link } from "react-router-dom";
import { modules } from "@/data/modules";

interface ModuleLinkProps {
  moduleId: string;
}

const ModuleLink = ({ moduleId }: ModuleLinkProps) => {
  const mod = modules.find((m) => m.id === moduleId || m.slug === moduleId);
  if (!mod) return null;

  return (
    <Link
      to={`/module/${mod.slug}`}
      className="block border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
    >
      <span className="text-sm font-medium text-gray-900">{mod.title}</span>
      <span className="block text-xs text-gray-500 mt-0.5">{mod.hook}</span>
    </Link>
  );
};

export default ModuleLink;
