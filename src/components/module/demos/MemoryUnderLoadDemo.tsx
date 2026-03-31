import { useState, useCallback, useRef, useEffect } from "react";

type Phase = "intro" | "show" | "distractor" | "recall" | "feedback";
type Difficulty = "low" | "high";

interface RoundConfig {
  difficulty: Difficulty;
  sequenceLength: number;
  hasDistractor: boolean;
}

const ROUNDS: RoundConfig[] = [
  { difficulty: "low", sequenceLength: 3, hasDistractor: false },
  { difficulty: "low", sequenceLength: 3, hasDistractor: false },
  { difficulty: "high", sequenceLength: 7, hasDistractor: true },
  { difficulty: "high", sequenceLength: 7, hasDistractor: true },
];

const LETTERS = "BCDFGHJKLMNPQRSTVWXYZ".split("");

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateDistractor(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  return { question: `${a} × ${b} = ?`, answer: a * b };
}

const MemoryUnderLoadDemo = () => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [distractor, setDistractor] = useState<{ question: string; answer: number } | null>(null);
  const [distractorInput, setDistractorInput] = useState("");
  const [results, setResults] = useState<{ difficulty: Difficulty; correct: number; total: number }[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const done = roundIndex >= ROUNDS.length;
  const round = !done ? ROUNDS[roundIndex] : null;

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const startShow = useCallback(() => {
    const seq = pickRandom(LETTERS, round!.sequenceLength);
    setSequence(seq);
    setUserInput("");
    setDistractorInput("");
    setPhase("show");
    timer.current = setTimeout(() => {
      if (round!.hasDistractor) {
        setDistractor(generateDistractor());
        setPhase("distractor");
      } else {
        setPhase("recall");
      }
    }, round!.sequenceLength * 500 + 1000);
  }, [round]);

  const handleRecallSubmit = useCallback(() => {
    const entered = userInput.toUpperCase().trim().split(/[\s,]+/);
    let correct = 0;
    sequence.forEach((letter, i) => {
      if (entered[i]?.toUpperCase() === letter) correct++;
    });
    setResults((prev) => [...prev, { difficulty: round!.difficulty, correct, total: sequence.length }]);
    setPhase("feedback");
  }, [userInput, sequence, round]);

  const handleNext = useCallback(() => {
    setRoundIndex((i) => i + 1);
    setPhase("intro");
    setDistractor(null);
  }, []);

  const handleRestart = useCallback(() => {
    setRoundIndex(0);
    setPhase("intro");
    setResults([]);
    setDistractor(null);
    setUserInput("");
  }, []);

  if (done) {
    const lowResults = results.filter((r) => r.difficulty === "low");
    const highResults = results.filter((r) => r.difficulty === "high");
    const pct = (arr: typeof results) => {
      if (arr.length === 0) return null;
      const c = arr.reduce((s, r) => s + r.correct, 0);
      const t = arr.reduce((s, r) => s + r.total, 0);
      return Math.round((c / t) * 100);
    };
    const lowPct = pct(lowResults);
    const highPct = pct(highResults);

    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">What This Shows</h3>
          <div className="mt-5 grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">Low Load</p>
              <p className="text-[10px] text-muted-foreground">3 letters, no distraction</p>
              <p className="mt-1 text-xl font-bold text-foreground">{lowPct !== null ? `${lowPct}%` : "—"}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">High Load</p>
              <p className="text-[10px] text-muted-foreground">7 letters + math distractor</p>
              <p className="mt-1 text-xl font-bold text-foreground">{highPct !== null ? `${highPct}%` : "—"}</p>
            </div>
          </div>
          <div className="mt-5 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed space-y-2">
            {lowPct !== null && highPct !== null && highPct < lowPct ? (
              <p>Your accuracy dropped under high load. The same dlPFC was doing the work in both conditions — but with 7 items and a competing math task, its capacity was exceeded. Top-down control weakened, distractor interference increased, and items were lost. This is cognitive overload.</p>
            ) : lowPct !== null && highPct !== null ? (
              <p>You held up under load — but it likely felt harder. Your dlPFC was consuming more energy to maintain 7 items while suppressing the math distractor. In sustained or more complex tasks, this cost accumulates and performance eventually degrades.</p>
            ) : null}
            <p className="pt-1">Continue to <strong>Trace</strong> to see why the dlPFC breaks down under overload.</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={handleRestart} className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const isLow = round?.difficulty === "low";
  const phaseTransition = roundIndex === 2 && phase === "intro";

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Memorize the letters, then recall them in order.
      </p>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wide ${isLow ? "text-primary" : "text-destructive"}`}>
              {isLow ? "Low Load" : "High Load"}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">Round {roundIndex + 1} of {ROUNDS.length}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {round?.sequenceLength} letters{round?.hasDistractor ? " + distractor" : ""}
          </span>
        </div>

        <div className="flex min-h-[180px] items-center justify-center rounded-lg bg-secondary">
          {phase === "intro" && (
            <div className="text-center max-w-sm px-4">
              {phaseTransition ? (
                <>
                  <p className="text-sm font-medium text-foreground mb-2">Now: High Load</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    The sequence is longer (7 letters) and a math problem will interrupt you before recall. This forces your dlPFC to maintain more items while handling a competing task.
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  {isLow
                    ? "You'll see 3 letters briefly, then recall them. A manageable load for your dlPFC."
                    : "7 letters + a math distractor. Same task — much higher demand on working memory."}
                </p>
              )}
              <button
                onClick={startShow}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start
              </button>
            </div>
          )}

          {phase === "show" && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">Memorize:</p>
              <div className="flex gap-1.5 justify-center flex-wrap">
                {sequence.map((letter, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-card border border-border text-lg font-bold text-foreground"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          )}

          {phase === "distractor" && distractor && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Distractor — solve this while holding the letters:</p>
              <p className="text-2xl font-bold text-foreground mb-4">{distractor.question}</p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  value={distractorInput}
                  onChange={(e) => setDistractorInput(e.target.value)}
                  className="w-20 rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && setPhase("recall")}
                />
                <button
                  onClick={() => setPhase("recall")}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {phase === "recall" && (
            <div className="text-center w-full max-w-sm px-4">
              <p className="text-sm text-muted-foreground mb-3">
                Now type the {sequence.length} letters in order (spaces between):
              </p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={isLow ? "e.g. B K M" : "e.g. B K M T P R N"}
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleRecallSubmit()}
              />
              <button
                onClick={handleRecallSubmit}
                className="mt-3 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Submit
              </button>
            </div>
          )}

          {phase === "feedback" && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Correct sequence:</p>
              <div className="flex gap-1.5 justify-center flex-wrap mb-3">
                {sequence.map((letter, i) => {
                  const entered = userInput.toUpperCase().trim().split(/[\s,]+/);
                  const isCorrect = entered[i]?.toUpperCase() === letter;
                  return (
                    <span
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border text-lg font-bold ${
                        isCorrect
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-destructive bg-destructive/10 text-foreground"
                      }`}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {isLow
                  ? "Low load — your dlPFC maintained these items without significant effort."
                  : "High load — your dlPFC had to hold 7 items while suppressing a math distractor. Any errors reflect the cost of cognitive overload on executive control."}
              </p>
              <button
                onClick={handleNext}
                className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {roundIndex < ROUNDS.length - 1 ? "Next" : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemoryUnderLoadDemo;
