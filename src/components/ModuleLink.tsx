import { Link } from "react-router-dom";
import { modules } from "@/data/modules";

interface ModuleLinkProps {
  moduleId: string;
}

const UNIT_ACCENT: Record<string, string> = {
  "unit-1": "#7F77DD",
  "unit-2": "#7F77DD",
  "unit-3": "#D85A30",
  "unit-4": "#1D9E75",
  "unit-5": "#1D9E75",
};

const ModuleLink = ({ moduleId }: ModuleLinkProps) => {
  const mod = modules.find((m) => m.id === moduleId || m.slug === moduleId);
  if (!mod) return null;

  const accent = UNIT_ACCENT[mod.unitId] || "#888";

  return (
    <Link
      to={`/module/${mod.slug}`}
      className="group flex items-center gap-3 border border-gray-200 border-l-4 rounded-lg p-3 hover:bg-gray-50 transition-colors"
      style={{ borderLeftColor: accent }}
    >
      <div className="min-w-0 flex-1">
        <span className="font-display text-sm text-gray-900">{mod.title}</span>
        <span className="block text-xs text-gray-500 mt-0.5 truncate">{mod.hook}</span>
      </div>
      <span className="text-gray-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">→</span>
    </Link>
  );
};

export default ModuleLink;
