import type { DistinctionBlock } from "@/data/content/types";

interface DistinctionSectionProps {
  distinctions: DistinctionBlock[];
}

const DistinctionSection = ({ distinctions }: DistinctionSectionProps) => (
  <section>
    <h2 className="font-display text-lg font-semibold text-foreground">Distinctions</h2>
    <div className="mt-4 space-y-4">
      {distinctions.map((d) => (
        <div
          key={d.id}
          className="rounded-lg border border-border bg-card overflow-hidden"
        >
          <div className="grid sm:grid-cols-2">
            <div className="p-4 sm:border-r sm:border-border">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                {d.termA}
              </h3>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                {d.descriptionA}
              </p>
            </div>
            <div className="border-t border-border p-4 sm:border-t-0">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                {d.termB}
              </h3>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                {d.descriptionB}
              </p>
            </div>
          </div>
          <div className="border-t border-border bg-secondary/40 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Key Difference
            </p>
            <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
              {d.keyDifference}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DistinctionSection;
