import type { UnitMeta } from "@/data/content/types";

interface UnitOverviewHeaderProps {
  unitNumber: string;
  meta: UnitMeta;
}

const UnitOverviewHeader = ({ unitNumber, meta }: UnitOverviewHeaderProps) => (
  <header>
    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary/70">
      Unit {unitNumber}
    </p>
    <h1 className="mt-3 font-display text-[2rem] tracking-tight text-foreground md:text-[2.25rem] leading-[1.15]">
      {meta.title}
    </h1>
    <p className="mt-3 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
      {meta.subtitle}
    </p>

    <p className="mt-8 max-w-2xl text-[14px] text-foreground/80 leading-[1.7]">
      {meta.overview}
    </p>

    <div className="mt-8 flex flex-wrap items-center gap-2">
      {meta.majorStructures.map((s) => (
        <span
          key={s}
          className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground"
        >
          {s}
        </span>
      ))}
    </div>
  </header>
);

export default UnitOverviewHeader;
