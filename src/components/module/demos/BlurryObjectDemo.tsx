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
  { name: "Star", emoji: "⭐", options: ["Sun", "Flower", "Star", "Diamond"] },
  { name: "Shoe", emoji: "👟", options: ["Shoe", "Boat", "Iron", "Sock"] },
];

const BLUR_STAGES = [20, 12, 6, 2, 0];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const BlurryObjectDemo = () => {
  const [round, setRound] = useState(0);
  const [blurStage, setBlurStage] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [guessStage, setGuessStage] = useState<number | null>(null);
  const [results, setResults] = useState<{ correct: boolean; early: boolean }[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    shuffleArray(stimuli[0].options)
  );

  const current = stimuli[round];
  const isFinished = round >= stimuli.length;
  const hasGuessed = guess !== null;
  const isRevealed = hasGuessed || blurStage >= BLUR_STAGES.length - 1;

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
    const correct = guess === current.name;
    const early = (guessStage ?? BLUR_STAGES.length - 1) < BLUR_STAGES.length - 2;
    setResults((prev) => [...prev, { correct, early }]);

    const nextRound = round + 1;
    setRound(nextRound);
    setBlurStage(0);
    setGuess(null);
    setGuessStage(null);
    if (nextRound < stimuli.length) {
      setShuffledOptions(shuffleArray(stimuli[nextRound].options));
    }
  }, [guess, guessStage, current.name, round]);

  const handleRestart = useCallback(() => {
    setRound(0);
    setBlurStage(0);
    setGuess(null);
    setGuessStage(null);
    setResults([]);
    setShuffledOptions(shuffleArray(stimuli[0].options));
  }, []);

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const earlyCount = results.filter((r) => r.early && r.correct).length;
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center">
          <h3 className="font-display text-xl font-semibold text-foreground">Results</h3>
          <p className="mt-3 text-3xl font-bold text-primary">
            {correctCount}/{stimuli.length} correct
          </p>
          {earlyCount > 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              You correctly guessed {earlyCount} object{earlyCount > 1 ? "s" : ""} before full clarity —
              your brain's top-down prediction was at work.
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              You waited for more detail before guessing — your brain relied on bottom-up processing.
            </p>
          )}
          <button
            onClick={handleRestart}
            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const blurPx = BLUR_STAGES[blurStage];

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        {/* Progress indicator */}
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Round {round + 1} of {stimuli.length}</span>
          <span>Clarity: {Math.round(((BLUR_STAGES.length - 1 - blurStage) / (BLUR_STAGES.length - 1)) * -100 + 100)}%</span>
        </div>

        {/* Stimulus display */}
        <div className="flex items-center justify-center rounded-lg bg-secondary py-12">
          <span
            className="text-8xl transition-all duration-500 select-none"
            style={{ filter: `blur(${blurPx}px)` }}
            aria-label={hasGuessed ? current.name : "Blurred object — try to guess"}
          >
            {current.emoji}
          </span>
        </div>

        {/* Controls */}
        {!hasGuessed && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSharpen}
              disabled={blurStage >= BLUR_STAGES.length - 1}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sharpen Image
            </button>
          </div>
        )}

        {/* Multiple choice */}
        <div className="mt-6">
          <p className="mb-3 text-center text-sm font-medium text-foreground">
            {hasGuessed ? "Your answer:" : "What is this object?"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {shuffledOptions.map((option) => {
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
                  className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${style} disabled:cursor-default`}
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
              {guess === current.name ? "✓ Correct!" : `✗ The answer was ${current.name}.`}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {(guessStage ?? BLUR_STAGES.length - 1) < BLUR_STAGES.length - 2
                ? "You guessed before full clarity — your OFC made a top-down prediction."
                : "You waited for more detail — your ventral stream needed clearer input."}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Next Object
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlurryObjectDemo;
