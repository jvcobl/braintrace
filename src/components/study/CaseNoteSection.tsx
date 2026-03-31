import type { CaseNote } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface CaseNoteSectionProps {
  caseNotes: CaseNote[];
}

const CaseNoteSection = ({ caseNotes }: CaseNoteSectionProps) => (
  <section>
    <h2 className="font-display text-lg tracking-tight text-foreground">Case Notes</h2>
    <div className="mt-5 space-y-4">
      {caseNotes.map((cn) => (
        <article
          key={cn.id}
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-[14px] font-semibold text-card-foreground">{cn.title}</h3>
          <p className="mt-2.5 text-[13px] text-foreground/80 leading-relaxed">{cn.content}</p>
          {cn.sensitivity === "high" && <SensitivityBadge note={cn.sensitivityNote} />}
        </article>
      ))}
    </div>
  </section>
);

export default CaseNoteSection;
