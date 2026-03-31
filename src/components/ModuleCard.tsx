import type { ModuleStatus } from "@/data/modules";

interface ModuleCardProps {
  title: string;
  description: string;
  status: ModuleStatus;
  index: number;
}

const statusLabel: Record<ModuleStatus, string> = {
  available: "Available",
  "coming-soon": "Coming Soon",
  locked: "Locked",
};

const statusStyle: Record<ModuleStatus, string> = {
  available: "bg-accent text-accent-foreground",
  "coming-soon": "bg-secondary text-muted-foreground",
  locked: "bg-muted text-muted-foreground",
};

const ModuleCard = ({ title, description, status, index }: ModuleCardProps) => (
  <div className="group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
    <div className="mb-2 flex items-center gap-2">
      <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
        Module {index + 1}
      </span>
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[status]}`}>
        {statusLabel[status]}
      </span>
    </div>
    <h3 className="mb-1 font-display text-lg font-semibold text-card-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default ModuleCard;
