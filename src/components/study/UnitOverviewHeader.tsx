import type { UnitMeta } from "@/data/content/types";

interface UnitOverviewHeaderProps {
  unitNumber: string;
  meta: UnitMeta;
}

const UnitOverviewHeader = ({ unitNumber, meta }: UnitOverviewHeaderProps) => (
  <header>
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      Unit {unitNumber}
    </p>
    <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{meta.title}</h1>
    <p className="mt-2 text-muted-foreground">{meta.subtitle}</p>

    <div className="mt-6">
      <p className="text-sm text-foreground/80 leading-relaxed">{meta.overview}</p>
    </div>

    <div className="mt-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Major Structures
      </h2>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {meta.majorStructures.map((s) => (
          <span
            key={s}
            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </div>

    {meta.lectureTopics.length > 0 && (
      <div className="mt-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Lecture Topics
        </h2>
        <ul className="mt-2 space-y-1">
          {meta.lectureTopics.map((t) => (
            <li key={t} className="text-sm text-foreground/80">{t}</li>
          ))}
        </ul>
      </div>
    )}
  </header>
);

export default UnitOverviewHeader;
