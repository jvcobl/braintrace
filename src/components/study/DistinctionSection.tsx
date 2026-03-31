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
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {d.termA}
              </p>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                {d.descriptionA}
              </p>
            </div>
            <div className="border-t border-border p-4 sm:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {d.termB}
              </p>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                {d.descriptionB}
              </p>
            </div>
          </div>
          <div className="border-t border-border px-4 py-3">
            <p className="text-sm text-foreground/80 leading-relaxed">
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
