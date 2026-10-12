import type { UnitMeta } from "@/data/content/types";

interface UnitOverviewHeaderProps {
  unitNumber: string;
  meta: UnitMeta;
}

const UnitOverviewHeader = ({ unitNumber, meta }: UnitOverviewHeaderProps) => (
  <header>
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
      Study guide
    </p>
    <h1 className="mt-2 font-display text-3xl tracking-tight text-foreground">
      {meta.title}
    </h1>
    <p className="mt-2.5 sm:mt-3 max-w-xl text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">
      {meta.subtitle}
    </p>

    <p className="mt-6 sm:mt-8 max-w-2xl text-[13px] sm:text-[14px] text-foreground/80 leading-[1.7]">
      {meta.overview}
    </p>

    <p className="mt-6 sm:mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
      Key structures
    </p>
    <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
      {meta.majorStructures.map((s) => (
        <span
          key={s}
          className="rounded-md border border-border bg-secondary px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] font-medium text-muted-foreground"
        >
          {s}
        </span>
      ))}
    </div>
  </header>
);

export default UnitOverviewHeader;
