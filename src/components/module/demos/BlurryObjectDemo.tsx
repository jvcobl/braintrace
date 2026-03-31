import { useState, useCallback } from "react";

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
    if (blurStage < BLUR_STAGES.length - 1) {
      setBlurStage((s) => s + 1);
    }
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
    const nextRound = round + 1;
    if (nextRound >= stimuli.length) {
      setDone(true);
    } else {
      setRound(nextRound);
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

  if (done) {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center">
          <h3 className="font-display text-lg font-semibold text-foreground">What This Shows</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Notice how your brain tried to identify each object before the image was fully clear.
            That early guess came from your orbitofrontal cortex using low spatial frequency cues —
            coarse shapes and contrast — to generate a top-down prediction.
          </p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Continue to <strong>Trace</strong> to see the neural pathway involved.
          </p>
          <button
            onClick={handleRestart}
            className="mt-6 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
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

        {/* Sharpen button */}
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
        {hasGuessed && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-foreground">
              {guess === current.name ? "✓ Correct!" : `✗ It was ${current.name}.`}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {(guessStage ?? BLUR_STAGES.length - 1) < BLUR_STAGES.length - 2
                ? "You identified it while still blurry — your OFC made a top-down prediction from low spatial frequency cues."
                : "You needed more detail — your ventral stream and IT cortex required higher spatial frequency input to confirm the object."}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {round < stimuli.length - 1 ? "Next Object" : "Finish"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlurryObjectDemo;
