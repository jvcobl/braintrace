import { useState, useCallback } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback, ExperienceSummary } from "@/components/module/experience";

/* ── Stimulus data ── */

type TrialKind = "face" | "ambiguous" | "non-face";

interface Trial {
  svg: React.ReactNode;
  kind: TrialKind;
}

const S = "h-36 w-36 text-foreground";

const stimulusSet: Trial[] = [
  // 1 — Ambiguous: power outlet
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
  // 3 — Face: minimal smiley
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
  // 4 — Ambiguous: three circles in triangle
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
  // 5 — Non-face: diagonal slashes
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
  // 6 — Ambiguous: house front
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

/* ── Signal-detection feedback (from pasted spec) ── */

type SignalKey = "hit" | "correctReject" | "falseAlarm" | "miss";

const signalFeedback: Record<SignalKey, ExperienceFeedback> = {
  hit: {
    primary: "Correct — this was a real face.",
    secondary:
      "This reflects FFA activation recognizing the arrangement of features. Recognition relies on cell ensembles — distributed groups encoding eyes, nose, and mouth — not a single dedicated neuron per identity.",
    bridge: "Explain covers ensemble theory and why 'grandmother cells' are flawed.",
    structure: "FFA (fusiform gyrus)",
  },
  correctReject: {
    primary: "Correct — this was not a face.",
    secondary:
      "The FFA likely activated briefly for the face-like pattern, but higher-order processing overrode the initial detection signal. This mirrors the cortex checking the fast system's output before committing to a judgment.",
    bridge: "Compare this to how the high road overrides the low road in Unit 3.",
    structure: "FFA → cortical override",
  },
  falseAlarm: {
    primary: "That was not a face — this is pareidolia.",
    secondary:
      "The FFA is biased toward detecting face-like patterns even when none exist. Evolutionarily, missing a real face (predator, social partner) was more costly than falsely detecting one. This detection bias produces false positives — seeing faces in wall plugs, clouds, or random shapes.",
    bridge: "Trace shows how the FFA fits into the ventral stream.",
    structure: "FFA (false positive / pareidolia)",
  },
  miss: {
    primary: "That was actually a face — detection missed it.",
    secondary:
      "Misses are rarer than false alarms because the FFA is tuned for sensitivity over specificity. This result fits cases where the face was at an unusual angle, partially obscured, or lacking the typical feature arrangement that ensemble-coded neurons respond to most strongly.",
    bridge: "Explain covers why the FFA favors false positives over misses.",
    structure: "FFA (detection miss)",
  },
};

function classifySignal(
  answer: "face" | "not-face",
  kind: TrialKind
): SignalKey {
  const calledFace = answer === "face";
  const isFace = kind === "face";
  // Ambiguous items are treated as non-face for signal-detection purposes
  if (calledFace && isFace) return "hit";
  if (!calledFace && !isFace) return "correctReject";
  if (calledFace && !isFace) return "falseAlarm";
  return "miss";
}

/* ── Summary tiers (from pasted spec) ── */

function getSummary(
  answers: ("face" | "not-face")[],
  trials: Trial[]
): ExperienceSummary {
  const falseAlarms = answers.filter(
    (a, i) => a === "face" && trials[i].kind !== "face"
  ).length;
  const totalNonFace = trials.filter((t) => t.kind !== "face").length;
  const faRate = totalNonFace > 0 ? falseAlarms / totalNonFace : 0;

  if (faRate >= 0.5) {
    return {
      heading: "What This Shows",
      body: "A high false-alarm rate reflects strong FFA detection bias — the system fires readily for anything resembling the face template. This is the same mechanism that produces pareidolia in everyday life and was likely protective in evolutionary contexts.",
      bridge: "Explain covers pareidolia and evolutionary detection trade-offs.",
    };
  }
  if (falseAlarms === 0) {
    return {
      heading: "What This Shows",
      body: "A low false-alarm rate suggests that higher cortical processing effectively checked the FFA's initial detection signals for non-face patterns before they became conscious judgments.",
      bridge: "Compare this to top-down override in the Blurry Object lesson.",
    };
  }
  return {
    heading: "What This Shows",
    body: "Your detection pattern balanced hits and false alarms. This reflects the typical FFA trade-off: sensitive enough to catch real faces, but that sensitivity comes with occasional false positives. The system is optimized for not missing real faces, not for perfect accuracy.",
    bridge: "Trace shows how the FFA connects to the ventral stream.",
  };
}

/* ── Component ── */

const FaceOrNotDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<("face" | "not-face")[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<"face" | "not-face" | null>(null);

  const done = index >= stimulusSet.length;
  const trial = !done ? stimulusSet[index] : null;

  const handleAnswer = useCallback(
    (answer: "face" | "not-face") => {
      if (currentAnswer) return;
      setCurrentAnswer(answer);
    },
    [currentAnswer]
  );

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

  const signalKey =
    currentAnswer && trial
      ? classifySignal(currentAnswer, trial.kind)
      : null;

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="For each pattern, decide quickly: does it look like a face? Some are real faces, some are not, and some are deliberately ambiguous. Your responses reveal how your fusiform face area balances detection sensitivity against false alarms."
      done={done}
      summary={getSummary(answers, stimulusSet)}
      onRestart={handleRestart}
    >
      <div className="rounded-lg border border-border bg-card p-6">
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
              style =
                opt === currentAnswer
                  ? "border-2 border-primary bg-accent text-accent-foreground"
                  : "border border-border bg-card text-muted-foreground opacity-50";
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!currentAnswer}
                className={`rounded-md px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${style} disabled:cursor-default`}
              >
                {opt === "face" ? "Face" : "Not a Face"}
              </button>
            );
          })}
        </div>

        {signalKey && (
          <div className="mt-5">
            <FeedbackCard onNavigate={onNavigate} feedback={signalFeedback[signalKey]} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNext}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {index < stimulusSet.length - 1 ? "Next" : "See Results"}
              </button>
            </div>
          </div>
        )}
      </div>
    </ExperienceShell>
  );
};

export default FaceOrNotDemo;
