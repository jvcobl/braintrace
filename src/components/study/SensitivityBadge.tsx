interface SensitivityBadgeProps {
  note?: string;
}

const SensitivityBadge = ({ note }: SensitivityBadgeProps) => (
  <div className="mt-3 sm:mt-4 rounded-lg border border-border bg-muted/50 px-3.5 py-2.5 sm:px-4 sm:py-3">
    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
      Content note
    </p>
    <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed">
      {note ?? "This item contains sensitive material. It is included for educational purposes."}
    </p>
    {note?.includes("988") && (
      <p className="mt-1.5 text-[12px] sm:text-[13px] text-foreground/80">
        <a href="tel:988" className="rounded-sm font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Call 988
        </a>
        {" · "}
        <a href="sms:988" className="rounded-sm font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Text 988
        </a>{" "}
        <span className="text-muted-foreground">(US)</span>
      </p>
    )}
  </div>
);

export default SensitivityBadge;
