interface AnswerLineProps {
  correct: boolean;
  /** What the learner chose, as shown to them (e.g. "Fear"). */
  picked: string;
  /** The expected answer, shown only when it differs. */
  answer: string;
}

/** One calm line on a result item: what you chose and, if it differs, the answer. No score. */
const AnswerLine = ({ correct, picked, answer }: AnswerLineProps) => (
  <p className={`mb-1 flex items-center gap-1.5 text-xs font-medium ${correct ? "text-primary" : "text-destructive"}`}>
    <span aria-hidden="true">{correct ? "✓" : "✗"}</span>
    <span className="sr-only">{correct ? "Matched." : "Did not match."}</span>
    <span>{correct ? `You chose ${picked}` : `You chose ${picked} · Answer: ${answer}`}</span>
  </p>
);

export default AnswerLine;
