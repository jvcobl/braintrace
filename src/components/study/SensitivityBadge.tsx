interface SensitivityBadgeProps {
  note?: string;
}

const SensitivityBadge = ({ note }: SensitivityBadgeProps) => (
  <p className="mt-3 text-xs italic text-muted-foreground leading-relaxed">
    {note ?? "This item contains sensitive material. It is included because it appears in the course notes."}
  </p>
);

export default SensitivityBadge;
