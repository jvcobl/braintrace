import type { UnitMeta } from "@/data/content/types";

interface UnitOverviewHeaderProps {
  unitNumber: string;
  meta: UnitMeta;
}

const UnitOverviewHeader = ({ unitNumber, meta }: UnitOverviewHeaderProps) => (
  <header>
    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
      Unit {unitNumber}
    </p>
    <h1 className="mt-2 font-display text-3xl tracking-tight text-foreground md:text-[2rem]">
      {meta.title}
    </h1>
    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{meta.subtitle}</p>

    <div className="mt-7">
      <p className="text-[14px] text-foreground/80 leading-relaxed">{meta.overview}</p>
    </div>

    <div className="mt-7">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        Major Structures
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {meta.majorStructures.map((s) => (
          <span
            key={s}
            className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </div>

  </header>
);

export default UnitOverviewHeader;
