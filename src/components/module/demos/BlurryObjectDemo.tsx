import { useState, useCallback } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback } from "@/components/module/experience";

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

/** Derive feedback from the outcome using the shared schema. */
function getFeedback(
  correct: boolean,
  guessStage: number
): ExperienceFeedback {
  const early = guessStage < BLUR_STAGES.length - 2;

  if (correct && early) {
    return {
      primary: "You identified it before fine detail arrived.",
      secondary:
        "This reflects the OFC shortcut: coarse, low spatial frequency information — broad shapes and contrast — was enough to generate a correct prediction. The guess reached the IT cortex before detailed processing through the ventral stream was complete.",
      bridge: "See how this pathway works in Trace.",
      structure: "LSF → OFC → IT cortex",
    };
  }
  if (!correct && early) {
    return {
      primary: "You guessed early, but the coarse information was misleading.",
      secondary:
        "This mirrors the trade-off of top-down prediction. The OFC generated a fast guess from rough shape and contrast cues, but the low spatial frequency information pointed to the wrong object. Speed costs accuracy — this is the inherent risk of heuristic processing.",
      bridge: "Trace shows where the prediction forms and where it gets corrected.",
      structure: "OFC prediction → IT cortex override",
    };
  }
  if (correct) {
    return {
      primary: "You waited for enough detail to confirm the object.",
      secondary:
        "This fits the standard ventral-stream pathway. Higher spatial frequency information built up through V1 → V2 → V4 → IT cortex, giving the visual system enough detail for a confident match.",
      bridge: "Trace shows the full recognition pathway.",
      structure: "V1 → V2 → V4 → IT cortex",
    };
  }
  return {
    primary: "Even with more detail, the object was ambiguous enough to mislead.",
    secondary:
      "This reflects how expectation shapes perception. Prior guesses or contextual assumptions can bias IT cortex matching even when spatial frequency information is available.",
    bridge: "Explain discusses how expectations interact with bottom-up signals.",
    structure: "V1 → V4 → IT cortex (expectation bias)",
  };
}

const BlurryObjectDemo = () => {
  const [round, setRound] = useState(0);
  const [blurStage, setBlurStage] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [guessStage, setGuessStage] = useState<number | null>(null);
  const [done, setDone] = useState(false);

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
    },
    [hasGuessed, blurStage]
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
    setDone(false);
  }, []);

  return (
    <ExperienceShell
      instructions="Each object starts heavily blurred. Try to identify it as early as you can — or sharpen the image first. Your timing reveals how your brain balances speed against accuracy."
      done={done}
      summary={{
        heading: "What This Shows",
        body: "Your brain tried to identify each object before the image was fully clear. That early guess came from your orbitofrontal cortex using low spatial frequency cues — coarse shapes and contrast — to generate a top-down prediction.",
        bridge: "Continue to Trace to see the neural pathway involved.",
      }}
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

        {/* Feedback — using shared FeedbackCard */}
        {hasGuessed && (
          <div className="mt-5">
            <FeedbackCard
              feedback={getFeedback(
                guess === current.name,
                guessStage ?? BLUR_STAGES.length - 1
              )}
            />
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
