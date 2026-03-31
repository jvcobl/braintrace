import { useState, useCallback } from "react";

type TrialKind = "face" | "ambiguous" | "non-face";

interface Trial {
  svg: React.ReactNode;
  kind: TrialKind;
  label: string;
}

/* Simple SVG stimuli — face-like arrangements of shapes */
const Circle = ({ cx, cy, r, fill = "currentColor" }: { cx: number; cy: number; r: number; fill?: string }) => (
  <circle cx={cx} cy={cy} r={r} fill={fill} />
);

const stimulusSet: Trial[] = [
  {
    kind: "face",
    label: "Classic face pattern",
    svg: (
      <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
        <Circle cx={35} cy={38} r={5} />
        <Circle cx={65} cy={38} r={5} />
        <path d="M 35 65 Q 50 78 65 65" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    kind: "non-face",
    label: "Scattered dots",
    svg: (
      <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground">
        <Circle cx={20} cy={25} r={6} />
        <Circle cx={75} cy={70} r={4} />
        <Circle cx={50} cy={80} r={5} />
        <Circle cx={80} cy={20} r={3} />
        <Circle cx={40} cy={50} r={4} />
      </svg>
    ),
  },
  {
    kind: "ambiguous",
    label: "Outlet pattern",
    svg: (
      <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground">
        <rect x="15" y="15" width="70" height="70" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="35" cy="42" rx="4" ry="8" fill="currentColor" />
        <ellipse cx="65" cy="42" rx="4" ry="8" fill="currentColor" />
        <Circle cx={50} cy={65} r={6} />
      </svg>
    ),
  },
  {
    kind: "non-face",
    label: "Abstract lines",
    svg: (
      <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground">
        <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="55" x2="90" y2="55" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="80" x2="60" y2="80" stroke="currentColor" strokeWidth="2" />
        <Circle cx={78} cy={80} r={4} />
      </svg>
    ),
  },
  {
    kind: "face",
    label: "Two dots and curve",
    svg: (
      <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground">
        <Circle cx={35} cy={35} r={7} />
        <Circle cx={65} cy={35} r={7} />
        <path d="M 30 62 Q 50 80 70 62" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    kind: "ambiguous",
    label: "Car front",
    svg: (
      <svg viewBox="0 0 100 100" className="h-32 w-32 text-foreground">
        <rect x="10" y="30" width="80" height="45" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <Circle cx={30} cy={48} r={8} />
        <Circle cx={70} cy={48} r={8} />
        <rect x="35" y="60" width="30" height="6" rx="3" fill="currentColor" />
      </svg>
    ),
  },
];

const FaceOrNotDemo = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<("face" | "not-face")[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<"face" | "not-face" | null>(null);

  const done = index >= stimulusSet.length;
  const trial = !done ? stimulusSet[index] : null;

  const handleAnswer = useCallback((answer: "face" | "not-face") => {
    if (currentAnswer) return;
    setCurrentAnswer(answer);
  }, [currentAnswer]);

  const handleNext = useCallback(() => {
    if (!currentAnswer) return;
    setAnswers((prev) => [...prev, currentAnswer]);
    setCurrentAnswer(null);
    setIndex((i) => i + 1);
  }, [currentAnswer]);

  const handleRestart = useCallback(() => {
    setIndex(0);
    setAnswers([]);
    setCurrentAnswer(null);
  }, []);

  if (done) {
    const falseAlarms = answers.filter((a, i) => a === "face" && stimulusSet[i].kind === "non-face").length;
    const ambiguousFaces = answers.filter((a, i) => a === "face" && stimulusSet[i].kind === "ambiguous").length;
    const missedFaces = answers.filter((a, i) => a === "not-face" && stimulusSet[i].kind === "face").length;

    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center">
          <h3 className="font-display text-lg font-semibold text-foreground">Demo Complete</h3>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground max-w-md mx-auto">
            {falseAlarms > 0 && (
              <p>You saw faces in {falseAlarms} non-face image{falseAlarms > 1 ? "s" : ""} — a classic example of pareidolia, driven by your fusiform face area's bias toward face detection.</p>
            )}
            {ambiguousFaces > 0 && (
              <p>You called "face" on {ambiguousFaces} ambiguous image{ambiguousFaces > 1 ? "s" : ""} — your FFA responded to the face-like configuration even though the stimulus wasn't a real face.</p>
            )}
            {missedFaces > 0 && (
              <p>You missed {missedFaces} actual face pattern{missedFaces > 1 ? "s" : ""} — your threshold for face detection was set high.</p>
            )}
            {falseAlarms === 0 && ambiguousFaces === 0 && missedFaces === 0 && (
              <p>You identified all the face patterns correctly with no false alarms — strong face discrimination!</p>
            )}
            <p className="pt-2">
              Continue to the <strong>Trace</strong> tab to see why your brain is wired to over-detect faces.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="mt-6 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const feedbackText = (() => {
    if (!currentAnswer || !trial) return null;
    const calledFace = currentAnswer === "face";
    if (trial.kind === "face") {
      return calledFace
        ? "Correct — this has a clear face-like pattern."
        : "This actually has a face-like arrangement. Your FFA may have been less active for this one.";
    }
    if (trial.kind === "non-face") {
      return calledFace
        ? "This one isn't a face — your FFA responded to the arrangement anyway. That's pareidolia."
        : "Correct — no face here.";
    }
    // ambiguous
    return calledFace
      ? "This is ambiguous, but you saw a face — your FFA picked up on the face-like layout."
      : "This is ambiguous. Many people see a face here because of the face-like arrangement.";
  })();

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <p className="mb-4 text-xs text-muted-foreground">
          Image {index + 1} of {stimulusSet.length}
        </p>

        {/* Stimulus */}
        <div className="flex items-center justify-center rounded-lg bg-secondary py-10">
          {trial?.svg}
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {(["face", "not-face"] as const).map((opt) => {
            let style = "border border-border bg-card text-foreground hover:bg-secondary";
            if (currentAnswer) {
              if (opt === currentAnswer) {
                style = "border-2 border-primary bg-accent text-accent-foreground";
              } else {
                style = "border border-border bg-card text-muted-foreground opacity-50";
              }
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!currentAnswer}
                className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${style} disabled:cursor-default`}
              >
                {opt === "face" ? "Face" : "Not a Face"}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {currentAnswer && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">{feedbackText}</p>
            <button
              onClick={handleNext}
              className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {index < stimulusSet.length - 1 ? "Next Image" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaceOrNotDemo;
