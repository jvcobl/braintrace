interface SensitivityBadgeProps {
  note?: string;
}

const SensitivityBadge = ({ note }: SensitivityBadgeProps) => (
  <div className="mt-3 sm:mt-4 rounded-lg border border-border bg-muted/50 px-3.5 py-2.5 sm:px-4 sm:py-3">
    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
      Content note
    </p>
    <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-[12px] text-muted-foreground leading-relaxed">
      {note ?? "This item contains sensitive material. It is included for educational purposes."}
    </p>
  </div>
);

export default SensitivityBadge;
