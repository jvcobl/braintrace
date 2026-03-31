import type { PathwayBlock } from "@/data/content/types";

interface PathwaySectionProps {
  pathways: PathwayBlock[];
}

const PathwaySection = ({ pathways }: PathwaySectionProps) => (
  <section>
    <h2 className="font-display text-lg font-semibold text-foreground">Pathways</h2>
    <div className="mt-4 space-y-8">
      {pathways.map((pw) => (
        <div key={pw.id}>
          <h3 className="text-sm font-semibold text-foreground">{pw.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{pw.description}</p>

          <ol className="mt-4 space-y-0" aria-label={`${pw.title} steps`}>
            {pw.steps.map((step, i) => (
              <li key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  {i < pw.steps.length - 1 && (
                    <div className="w-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {step.structure}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
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
