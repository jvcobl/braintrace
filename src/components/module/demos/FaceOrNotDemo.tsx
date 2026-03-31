import { useState, useCallback } from "react";

type TrialKind = "face" | "ambiguous" | "non-face";

interface Trial {
  svg: React.ReactNode;
  kind: TrialKind;
}

const S = "h-36 w-36 text-foreground";

const stimulusSet: Trial[] = [
  // 1 — Ambiguous: power outlet (two vertical slots + circle = classic pareidolia trigger)
  {
    kind: "ambiguous",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <rect x="18" y="18" width="64" height="64" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="36" cy="40" rx="3.5" ry="9" fill="currentColor" />
        <ellipse cx="64" cy="40" rx="3.5" ry="9" fill="currentColor" />
        <circle cx="50" cy="62" r="5" fill="currentColor" />
      </svg>
    ),
  },
  // 2 — Non-face: concentric rings
  {
    kind: "non-face",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
      </svg>
    ),
  },
  // 3 — Face: minimal smiley (two dots + arc, no outline — pure face config)
  {
    kind: "face",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <circle cx="36" cy="38" r="6" fill="currentColor" />
        <circle cx="64" cy="38" r="6" fill="currentColor" />
        <path d="M 32 62 Q 50 80 68 62" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // 4 — Ambiguous: three circles in a triangle (inverted triangle = eyes + mouth position)
  {
    kind: "ambiguous",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <circle cx="34" cy="36" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="66" cy="36" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="66" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  // 5 — Non-face: diagonal slash marks
  {
    kind: "non-face",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <line x1="20" y1="80" x2="40" y2="20" stroke="currentColor" strokeWidth="2.5" />
        <line x1="40" y1="80" x2="60" y2="20" stroke="currentColor" strokeWidth="2.5" />
        <line x1="60" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  // 6 — Ambiguous: house front (two square windows + door = face-like)
  {
    kind: "ambiguous",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <polygon points="50,12 10,50 90,50" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="10" y="50" width="80" height="42" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="24" y="56" width="14" height="12" rx="2" fill="currentColor" />
        <rect x="62" y="56" width="14" height="12" rx="2" fill="currentColor" />
        <rect x="42" y="68" width="16" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  // 7 — Non-face: random polygons
  {
    kind: "non-face",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <polygon points="15,70 35,20 55,70" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="58" y="40" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="72" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  // 8 — Face: tilted face in oval
  {
    kind: "face",
    svg: (
      <svg viewBox="0 0 100 100" className={S}>
        <ellipse cx="50" cy="50" rx="32" ry="40" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-5 50 50)" />
        <circle cx="38" cy="40" r="4" fill="currentColor" />
        <circle cx="60" cy="38" r="4" fill="currentColor" />
        <line x1="44" y1="54" x2="54" y2="53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M 38 66 Q 50 74 62 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    const faceOnNonFace = answers.filter((a, i) => a === "face" && stimulusSet[i].kind === "non-face").length;
    const faceOnAmbiguous = answers.filter((a, i) => a === "face" && stimulusSet[i].kind === "ambiguous").length;
    const totalAmbiguous = stimulusSet.filter((t) => t.kind === "ambiguous").length;

    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">What This Shows</h3>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {faceOnNonFace > 0 && (
              <p>
                You detected a face in {faceOnNonFace} image{faceOnNonFace > 1 ? "s" : ""} that contained no face-like arrangement at all.
                This is <strong>pareidolia</strong> — your fusiform face area firing for a non-face stimulus.
              </p>
            )}
            {faceOnAmbiguous > 0 && (
              <p>
                You saw faces in {faceOnAmbiguous} of {totalAmbiguous} ambiguous image{totalAmbiguous > 1 ? "s" : ""}.
                These had face-like spatial layouts (two elements above one element) but weren't actual faces.
                Your FFA's bias toward the basic face configuration — two eyes above a nose/mouth — made them look face-like.
              </p>
            )}
            {faceOnNonFace === 0 && faceOnAmbiguous === 0 && (
              <p>
                You were cautious — you didn't call "face" on any non-face or ambiguous image.
                Most people do see faces in at least some of the ambiguous images, because the FFA is biased to detect face configurations even when they aren't real faces.
              </p>
            )}
            <p className="pt-1">
              Continue to <strong>Trace</strong> to see the neural pathway behind this face-detection bias.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRestart}
              className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const feedbackText = (() => {
    if (!currentAnswer || !trial) return null;
    const calledFace = currentAnswer === "face";
    if (trial.kind === "face") {
      return calledFace
        ? "This one has a genuine face-like pattern — your FFA correctly detected the face configuration."
        : "Look again — there's a face-like arrangement here (eyes-above-mouth). Your FFA may not have responded strongly to this particular layout.";
    }
    if (trial.kind === "non-face") {
      return calledFace
        ? "There's no face-like arrangement here. Your FFA may have responded to a vague pattern — that's pareidolia in action."
        : "Right — no face configuration in this one.";
    }
    return calledFace
      ? "This is ambiguous. The spatial layout resembles a face (two elements above one), so your FFA activated — but it's not an actual face. This is the pareidolia effect."
      : "This is ambiguous — many people do see a face here because the layout loosely matches the eyes-nose-mouth configuration your FFA is tuned to detect.";
  })();

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        For each image, decide: does it look like a face?
      </p>
      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <p className="mb-4 text-xs text-muted-foreground">
          {index + 1} of {stimulusSet.length}
        </p>

        <div className="flex items-center justify-center rounded-lg bg-secondary py-12">
          {trial?.svg}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {(["face", "not-face"] as const).map((opt) => {
            let style = "border border-border bg-card text-foreground hover:bg-secondary";
            if (currentAnswer) {
              style = opt === currentAnswer
                ? "border-2 border-primary bg-accent text-accent-foreground"
                : "border border-border bg-card text-muted-foreground opacity-50";
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

        {currentAnswer && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">{feedbackText}</p>
            <button
              onClick={handleNext}
              className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {index < stimulusSet.length - 1 ? "Next" : "See Results"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaceOrNotDemo;
