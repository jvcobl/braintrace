import type { DistinctionBlock } from "@/data/content/types";

interface DistinctionSectionProps {
  distinctions: DistinctionBlock[];
}

const DistinctionSection = ({ distinctions }: DistinctionSectionProps) => (
  <section>
    <h2 className="font-display text-lg tracking-tight text-foreground">Distinctions</h2>
    <div className="mt-5 space-y-4">
      {distinctions.map((d) => (
        <div
          key={d.id}
          className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <div className="grid sm:grid-cols-2">
            <div className="p-5 sm:border-r sm:border-border">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {d.termA}
              </p>
              <p className="mt-2.5 text-[13px] text-foreground/80 leading-relaxed">
                {d.descriptionA}
              </p>
            </div>
            <div className="border-t border-border p-5 sm:border-t-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {d.termB}
              </p>
              <p className="mt-2.5 text-[13px] text-foreground/80 leading-relaxed">
                {d.descriptionB}
              </p>
            </div>
          </div>
          <div className="border-t border-border px-5 py-4 bg-section-alt">
            <p className="text-[13px] text-foreground/80 leading-relaxed">
              <span className="font-semibold text-foreground">Key difference: </span>
              {d.keyDifference}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DistinctionSection;
