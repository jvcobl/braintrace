const sections = ["Intro", "Experience", "Trace", "Explain"] as const;

export type SectionId = (typeof sections)[number];

interface SectionNavProps {
  current: SectionId;
  onSelect: (section: SectionId) => void;
}

const SectionNav = ({ current, onSelect }: SectionNavProps) => (
  <nav
    className="flex gap-0.5 sm:gap-1 rounded-xl border border-border bg-card p-0.5 sm:p-1 shadow-sm"
    aria-label="Lesson sections"
  >
    {sections.map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onSelect(s)}
        className={`flex-1 rounded-lg px-2 py-2.5 sm:px-3 sm:py-2.5 text-[12px] sm:text-[13px] font-medium transition-all min-h-[44px] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          current === s
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
        aria-current={current === s ? "step" : undefined}
      >
        {s}
      </button>
    ))}
  </nav>
);

export default SectionNav;
