import type { DistinctionBlock } from "@/data/content/types";

interface DistinctionSectionProps {
  distinctions: DistinctionBlock[];
}

const DistinctionSection = ({ distinctions }: DistinctionSectionProps) => (
  <section>
    <h3 className="font-display text-lg tracking-tight text-foreground">Key Distinctions</h3>
    <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
      Terms and concepts that are easy to confuse — and why the difference matters.
    </p>
    <div className="mt-6 space-y-4">
      {distinctions.map((d) => (
        <div
          key={d.id}
          className="overflow-hidden rounded-xl border border-border/70 bg-card"
        >
          <div className="grid sm:grid-cols-2">
            <div className="p-5 sm:border-r sm:border-border/50">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60">
                {d.termA}
              </p>
              <p className="mt-2 text-[13px] text-foreground/80 leading-relaxed">
                {d.descriptionA}
              </p>
            </div>
            <div className="border-t border-border/50 p-5 sm:border-t-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60">
                {d.termB}
              </p>
              <p className="mt-2 text-[13px] text-foreground/80 leading-relaxed">
                {d.descriptionB}
              </p>
            </div>
          </div>
          <div className="border-t border-border/50 px-5 py-3.5 bg-section-alt">
            <p className="text-[12.5px] text-foreground/70 leading-relaxed">
              <span className="font-semibold text-foreground/90">Key difference: </span>
              {d.keyDifference}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default DistinctionSection;
