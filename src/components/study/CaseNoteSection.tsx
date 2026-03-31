import type { CaseNote } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface CaseNoteSectionProps {
  caseNotes: CaseNote[];
}

const CaseNoteSection = ({ caseNotes }: CaseNoteSectionProps) => (
  <section>
    <h2 className="font-display text-lg font-semibold text-foreground">Case Notes</h2>
    <div className="mt-4 space-y-4">
      {caseNotes.map((cn) => {
        const isHigh = cn.sensitivity === "high";

        return (
          <article
            key={cn.id}
            className={`rounded-lg border bg-card p-5 ${
              isHigh ? "border-destructive/30" : "border-border"
            }`}
          >
            <h3 className="text-sm font-semibold text-card-foreground">{cn.title}</h3>
            <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{cn.content}</p>
            {isHigh && <SensitivityBadge note={cn.sensitivityNote} />}
          </article>
        );
      })}
    </div>
  </section>
);

export default CaseNoteSection;
