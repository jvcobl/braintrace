interface SensitivityBadgeProps {
  note?: string;
}

const SensitivityBadge = ({ note }: SensitivityBadgeProps) => (
  <div className="mt-3 rounded-md border border-border bg-muted/50 px-3 py-2.5">
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      Content note
    </p>
    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
      {note ?? "This item contains sensitive material. It is included because it appears in the course notes."}
    </p>
  </div>
);

export default SensitivityBadge;
