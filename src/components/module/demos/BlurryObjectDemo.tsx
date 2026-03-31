import { useState, useCallback } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback, ExperienceSummary } from "@/components/module/experience";

interface StimulusItem {
  name: string;
  emoji: string;
  options: string[];
}

const stimuli: StimulusItem[] = [
  { name: "Apple", emoji: "🍎", options: ["Apple", "Ball", "Tomato", "Cherry"] },
  { name: "Key", emoji: "🔑", options: ["Spoon", "Key", "Nail", "Pin"] },
  { name: "Cup", emoji: "☕", options: ["Bowl", "Hat", "Cup", "Jar"] },
];

const BLUR_STAGES = [20, 10, 4, 0];

/* ── Feedback states (from pasted spec) ── */

type OutcomeKey = "earlyCorrect" | "lateCorrect" | "earlyIncorrect" | "incorrectAfterReveal";

const trialFeedback: Record<OutcomeKey, ExperienceFeedback> = {
  earlyCorrect: {
    primary: "You identified it before fine detail arrived.",
    secondary:
      "This reflects the OFC shortcut: coarse, low spatial frequency information — broad shapes and contrast — was enough to generate a correct prediction. The guess reached the IT cortex before detailed processing through the ventral stream was complete.",
    bridge: "See how this pathway works in Trace.",
    structure: "LSF → OFC → IT cortex",
  },
  lateCorrect: {
    primary: "You got it right, but needed more detail first.",
    secondary:
      "This fits ventral stream processing rather than the fast OFC shortcut. As finer detail arrived through the ventral stream, the IT cortex built a complete representation and confirmed the identity. The slower route is more accurate but takes longer.",
    bridge: "Compare the OFC shortcut to the full ventral stream path in Trace.",
    structure: "Ventral stream → IT cortex",
  },
  earlyIncorrect: {
    primary: "You guessed early, but the coarse information was misleading.",
    secondary:
      "This mirrors the trade-off of top-down prediction. The OFC generated a fast guess from rough shape and contrast cues, but the low spatial frequency information pointed to the wrong object. Speed costs accuracy — this is the inherent risk of heuristic processing.",
    bridge: "Trace shows where the prediction forms and where it gets corrected.",
    structure: "OFC prediction → IT cortex override",
  },
  incorrectAfterReveal: {
    primary: "The object was hard to identify even with full detail.",
    secondary:
      "When the image is unfamiliar or lacks strong distinguishing features, both the fast OFC shortcut and the detailed ventral stream analysis can struggle. Object constancy depends on prior experience — the brain fills gaps with what it already knows, and unfamiliar objects offer fewer cues to match.",
    bridge: "Explain covers why prior experience shapes recognition.",
    structure: "IT cortex (limited prior representation)",
  },
};

function classifyOutcome(correct: boolean, guessStage: number): OutcomeKey {
  const early = guessStage < BLUR_STAGES.length - 2; // guessed while still blurry
  const fullyRevealed = guessStage >= BLUR_STAGES.length - 1;

  if (correct && early) return "earlyCorrect";
  if (correct) return "lateCorrect";
  if (!correct && !fullyRevealed) return "earlyIncorrect";
  return "incorrectAfterReveal";
}

/* ── Summary tiers (from pasted spec) ── */

function getSummary(correctCount: number, total: number): ExperienceSummary {
  if (correctCount === total) {
    return {
      heading: "What This Shows",
      body: "Low spatial frequency cues — broad shapes, contrast boundaries — were distinctive enough to support correct OFC predictions each time. This reflects efficient top-down processing where the fast route and the detailed route converged on the same answer.",
      bridge: "Trace walks through the full OFC shortcut pathway.",
    };
  }
  if (correctCount === 0) {
    return {
      heading: "What This Shows",
      body: "The images were chosen to be ambiguous at low spatial frequencies. The OFC generated confident guesses from coarse input, and every guess pointed to the wrong identity. This illustrates both the power and the cost of the top-down prediction system: the same mechanism that enables millisecond recognition also produces confident wrong answers.",
      bridge: "Explain covers the cost of heuristics in detail.",
    };
  }
  if (correctCount >= total / 2) {
    return {
      heading: "What This Shows",
      body: "The OFC shortcut works well when coarse cues are distinctive, but misfires when shapes and color profiles overlap between objects. The system trades accuracy for speed, and the trade-off shows up in ambiguous cases.",
      bridge: "Explain breaks down why heuristics are fast but fallible.",
    };
  }
  return {
    heading: "What This Shows",
    body: "The low spatial frequency cues were not distinctive enough to support accurate guesses. This is not a failure of the visual system — it is a demonstration of what happens when heuristic processing encounters genuinely ambiguous input. The OFC shortcut is optimized for speed in typical conditions, not accuracy in unusual ones.",
    bridge: "Trace shows where predictions form and where they get overridden.",
  };
}

/* ── Component ── */

const BlurryObjectDemo = () => {
  const [round, setRound] = useState(0);
  const [blurStage, setBlurStage] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [guessStage, setGuessStage] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = stimuli[round];
  const hasGuessed = guess !== null;
  const blurPx = BLUR_STAGES[blurStage];

  const handleSharpen = useCallback(() => {
    if (blurStage < BLUR_STAGES.length - 1) setBlurStage((s) => s + 1);
  }, [blurStage]);

  const handleGuess = useCallback(
    (option: string) => {
      if (hasGuessed) return;
      setGuess(option);
      setGuessStage(blurStage);
      if (option === current.name) setCorrectCount((c) => c + 1);
    },
    [hasGuessed, blurStage, current.name]
  );

  const handleNext = useCallback(() => {
    if (round + 1 >= stimuli.length) {
      setDone(true);
    } else {
      setRound((r) => r + 1);
      setBlurStage(0);
      setGuess(null);
      setGuessStage(null);
    }
  }, [round]);

  const handleRestart = useCallback(() => {
    setRound(0);
    setBlurStage(0);
    setGuess(null);
    setGuessStage(null);
    setCorrectCount(0);
    setDone(false);
  }, []);

  const outcome =
    hasGuessed
      ? classifyOutcome(guess === current.name, guessStage ?? BLUR_STAGES.length - 1)
      : null;

  return (
    <ExperienceShell
      instructions="Each object starts heavily blurred. Try to identify it as early as you can, or sharpen the image first. Your timing reveals how your brain balances speed against accuracy."
      done={done}
      summary={getSummary(correctCount, stimuli.length)}
      onRestart={handleRestart}
    >
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="mb-4 text-xs text-muted-foreground">
          Object {round + 1} of {stimuli.length}
        </p>

        {/* Stimulus */}
        <div className="flex items-center justify-center rounded-lg bg-secondary py-12">
          <span
            className="text-8xl transition-all duration-500 select-none"
            style={{ filter: `blur(${blurPx}px)` }}
            aria-label={hasGuessed ? current.name : "Blurred object — try to guess"}
          >
            {current.emoji}
          </span>
        </div>

        {/* Sharpen */}
        {!hasGuessed && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSharpen}
              disabled={blurStage >= BLUR_STAGES.length - 1}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Sharpen
            </button>
          </div>
        )}

        {/* Choices */}
        <div className="mt-6">
          <p className="mb-3 text-center text-sm font-medium text-foreground">
            {hasGuessed ? "Your answer:" : "What is this object?"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {current.options.map((option) => {
              let style = "border border-border bg-card text-foreground hover:bg-secondary";
              if (hasGuessed) {
                if (option === current.name) {
                  style = "border-2 border-primary bg-accent text-accent-foreground";
                } else if (option === guess && guess !== current.name) {
                  style = "border-2 border-destructive bg-destructive/10 text-foreground";
                } else {
                  style = "border border-border bg-card text-muted-foreground opacity-50";
                }
              }
              return (
                <button
                  key={option}
                  onClick={() => handleGuess(option)}
                  disabled={hasGuessed}
                  className={`rounded-md px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${style} disabled:cursor-default`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {outcome && (
          <div className="mt-5">
            <FeedbackCard feedback={trialFeedback[outcome]} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNext}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {round < stimuli.length - 1 ? "Next Object" : "Finish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </ExperienceShell>
  );
};

export default BlurryObjectDemo;
