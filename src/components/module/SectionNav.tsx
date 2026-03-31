const sections = ["Intro", "Experience", "Trace", "Explain"] as const;

export type SectionId = (typeof sections)[number];

interface SectionNavProps {
  current: SectionId;
  onSelect: (section: SectionId) => void;
}

const SectionNav = ({ current, onSelect }: SectionNavProps) => (
  <nav
    className="mb-8 flex gap-1 rounded-lg border border-border bg-card p-1"
    aria-label="Module sections"
  >
    {sections.map((s) => (
      <button
        key={s}
        onClick={() => onSelect(s)}
        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          current === s
            ? "bg-primary text-primary-foreground"
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
