interface SensitivityBadgeProps {
  note?: string;
}

const SensitivityBadge = ({ note }: SensitivityBadgeProps) => (
  <div className="mt-3 flex items-start gap-2 rounded-md border border-border bg-secondary/50 px-3 py-2">
    <span
      className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-destructive"
      aria-hidden="true"
    />
    <p className="text-xs text-muted-foreground leading-relaxed">
      {note ?? "This item contains sensitive material. It is included because it appears in the course notes."}
    </p>
  </div>
);

export default SensitivityBadge;
