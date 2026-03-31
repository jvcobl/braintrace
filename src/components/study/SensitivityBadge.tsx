interface SensitivityBadgeProps {
  note?: string;
}

const SensitivityBadge = ({ note }: SensitivityBadgeProps) => (
  <div className="mt-4 rounded-lg border border-border bg-muted/50 px-4 py-3">
    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
      Content note
    </p>
    <p className="mt-1.5 text-[12px] text-muted-foreground leading-relaxed">
      {note ?? "This item contains sensitive material. It is included for educational purposes."}
    </p>
  </div>
);

export default SensitivityBadge;
