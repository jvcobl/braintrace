import type { PathwayBlock } from "@/data/content/types";

interface PathwaySectionProps {
  pathways: PathwayBlock[];
}

const PathwaySection = ({ pathways }: PathwaySectionProps) => (
  <section>
    <h2 className="font-display text-lg tracking-tight text-foreground">Pathways</h2>
    <div className="mt-5 space-y-6">
      {pathways.map((pw) => (
        <div
          key={pw.id}
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-[14px] font-semibold text-card-foreground">{pw.title}</h3>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{pw.description}</p>

          <ol className="mt-6 space-y-0" aria-label={`${pw.title} steps`}>
            {pw.steps.map((step, i) => (
              <li key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                    {step.number}
                  </div>
                  {i < pw.steps.length - 1 && (
                    <div className="w-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-[14px] font-semibold text-foreground leading-snug">
                    {step.structure}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
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
