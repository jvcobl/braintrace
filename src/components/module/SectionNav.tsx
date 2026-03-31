const sections = ["Intro", "Experience", "Trace", "Explain"] as const;

export type SectionId = (typeof sections)[number];

interface SectionNavProps {
  current: SectionId;
  onSelect: (section: SectionId) => void;
}

const SectionNav = ({ current, onSelect }: SectionNavProps) => (
  <nav
    className="flex gap-1 rounded-xl border border-border bg-card p-1 shadow-sm"
    aria-label="Lesson sections"
  >
    {sections.map((s) => (
      <button
        key={s}
        onClick={() => onSelect(s)}
        className={`flex-1 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
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
