import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  unitId: string;
  index: number;
}

const ModuleCard = ({ id, title, description, unitId, index }: ModuleCardProps) => {
  const unit = courseUnits.find((u) => u.id === unitId);

  return (
    <Link
      to={`/module/${id}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          Module {index + 1}
        </span>
        {unit && (
          <span className="text-[10px] text-muted-foreground">
            {unit.title.replace(/^Unit \d+:\s*/, "")}
          </span>
        )}
      </div>
      <h3 className="mb-1 font-display text-lg font-semibold text-card-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

export default ModuleCard;
