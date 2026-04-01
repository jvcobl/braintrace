import type { PathwayBlock } from "@/data/content/types";

interface PathwaySectionProps {
  pathways: PathwayBlock[];
}

const PathwaySection = ({ pathways }: PathwaySectionProps) => (
  <section>
    <h3 className="font-display text-lg tracking-tight text-foreground">Neural Pathways</h3>
    <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
      Step-by-step signal flow through the structures involved.
    </p>
    <div className="mt-6 space-y-6">
      {pathways.map((pw) => (
        <div
          key={pw.id}
          className="rounded-xl border border-border/70 bg-card p-6"
        >
          <h4 className="text-[14px] font-semibold text-card-foreground">{pw.title}</h4>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{pw.description}</p>

          <ol className="mt-6 space-y-0" aria-label={`${pw.title} steps`}>
            {pw.steps.map((step, i) => (
              <li key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  {i < pw.steps.length - 1 && (
                    <div className="w-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-[13px] font-semibold text-foreground leading-snug">
                    {step.structure}
                  </p>
                  <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </section>
);

export default PathwaySection;
