interface ModuleCardProps {
  title: string;
  description: string;
  index: number;
}

const ModuleCard = ({ title, description, index }: ModuleCardProps) => (
  <div className="group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
    <span className="mb-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
      Module {index + 1}
    </span>
    <h3 className="mb-1 font-display text-lg font-semibold text-card-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default ModuleCard;
