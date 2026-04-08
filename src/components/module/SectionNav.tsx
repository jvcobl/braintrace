const sections = ["Intro", "Experience", "Trace", "Explain"] as const;

export type SectionId = (typeof sections)[number];

interface SectionNavProps {
  current: SectionId;
  onSelect: (section: SectionId) => void;
}

const SectionNav = ({ current, onSelect }: SectionNavProps) => (
  <nav
    className="flex gap-6 border-b border-gray-200"
    aria-label="Lesson sections"
  >
    {sections.map((s, i) => (
      <button
        key={s}
        type="button"
        onClick={() => onSelect(s)}
        className={`relative pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          current === s
            ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
            : "text-gray-400 hover:text-gray-600"
        }`}
        aria-current={current === s ? "step" : undefined}
      >
        <span className="text-[10px] text-gray-300 mr-1">{i + 1}</span>
        {s}
      </button>
    ))}
  </nav>
);

export default SectionNav;
