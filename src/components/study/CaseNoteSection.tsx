import type { CaseNote } from "@/data/content/types";
import SensitivityBadge from "./SensitivityBadge";

interface CaseNoteSectionProps {
  caseNotes: CaseNote[];
}

const CaseNoteSection = ({ caseNotes }: CaseNoteSectionProps) => (
  <section>
    <h3 className="font-display text-lg tracking-tight text-foreground">Clinical &amp; Research Notes</h3>
    <p className="mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
      Cases and findings that connect these ideas to neuroscience research.
    </p>
    <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
      {caseNotes.map((cn) => (
        <article
          key={cn.id}
          className="rounded-xl border border-border/70 bg-card p-4 sm:p-5"
        >
          <h4 className="text-[13px] sm:text-[14px] font-semibold text-card-foreground">{cn.title}</h4>
          <p className="mt-2 sm:mt-2.5 text-[12px] sm:text-[13px] text-foreground/80 leading-relaxed">{cn.content}</p>
          {cn.sensitivity === "high" && <SensitivityBadge note={cn.sensitivityNote} />}
        </article>
      ))}
    </div>
  </section>
);

export default CaseNoteSection;
