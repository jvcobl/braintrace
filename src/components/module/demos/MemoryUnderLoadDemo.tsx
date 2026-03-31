import { useState, useCallback, useRef, useEffect } from "react";

type Phase = "show" | "distractor" | "recall" | "feedback";
type Difficulty = "low" | "high";

interface RoundConfig {
  difficulty: Difficulty;
  sequenceLength: number;
  hasDistractor: boolean;
}

const ROUNDS: RoundConfig[] = [
  { difficulty: "low", sequenceLength: 4, hasDistractor: false },
  { difficulty: "low", sequenceLength: 4, hasDistractor: false },
  { difficulty: "high", sequenceLength: 6, hasDistractor: true },
  { difficulty: "high", sequenceLength: 6, hasDistractor: true },
];

const LETTERS = "BCDFGHJKLMNPQRSTVWXYZ".split("");

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateDistractor(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const MemoryUnderLoadDemo = () => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("show");
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [distractor, setDistractor] = useState<{ question: string; answer: number } | null>(null);
  const [distractorInput, setDistractorInput] = useState("");
  const [results, setResults] = useState<{ difficulty: Difficulty; correct: number; total: number }[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const done = roundIndex >= ROUNDS.length;
  const round = !done ? ROUNDS[roundIndex] : null;

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  // Generate sequence on round start
  useEffect(() => {
    if (done || phase !== "show") return;
    const seq = pickRandom(LETTERS, round!.sequenceLength);
    setSequence(seq);
    setUserInput("");
    setDistractorInput("");
    // Auto-advance after display time
    timer.current = setTimeout(() => {
      if (round!.hasDistractor) {
        setDistractor(generateDistractor());
        setPhase("distractor");
      } else {
        setPhase("recall");
      }
    }, round!.sequenceLength * 600 + 800);
  }, [roundIndex, phase, done, round]);

  const handleDistractorSubmit = useCallback(() => {
    setPhase("recall");
  }, []);

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
    setPhase("show");
    setDistractor(null);
  }, []);

  const handleRestart = useCallback(() => {
    setRoundIndex(0);
    setPhase("show");
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
          <div className="mt-5 grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">Low Load</p>
              <p className="mt-1 text-xl font-bold text-foreground">{lowPct !== null ? `${lowPct}%` : "—"}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">High Load</p>
              <p className="mt-1 text-xl font-bold text-foreground">{highPct !== null ? `${highPct}%` : "—"}</p>
            </div>
          </div>
          <div className="mt-5 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed space-y-2">
            {lowPct !== null && highPct !== null && highPct < lowPct ? (
              <p>Your accuracy dropped under high load — more items plus a distractor task overwhelmed your dlPFC's capacity to maintain the sequence and suppress interference.</p>
            ) : lowPct !== null && highPct !== null && highPct >= lowPct ? (
              <p>You maintained accuracy even under load — your dlPFC managed the extra demand, though it likely felt harder. In more sustained tasks, the energy cost would eventually cause performance to decline.</p>
            ) : (
              <p>Compare your accuracy across conditions to see how cognitive load affected your working memory.</p>
            )}
            <p className="pt-1">Continue to <strong>Trace</strong> to see the dlPFC pathway and why overload causes control failure.</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={handleRestart} className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const diffLabel = round?.difficulty === "low" ? "Low Load" : "High Load";

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">Remember the letters in order, then type them back.</p>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">{diffLabel}</span>
            <span className="ml-2 text-xs text-muted-foreground">Round {roundIndex + 1} of {ROUNDS.length}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {round?.sequenceLength} letters{round?.hasDistractor ? " + distractor" : ""}
          </span>
        </div>

        <div className="flex min-h-[180px] items-center justify-center rounded-lg bg-secondary">
          {phase === "show" && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">Memorize this sequence:</p>
              <div className="flex gap-2 justify-center">
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
              <p className="text-xs text-muted-foreground mb-2">Quick — solve this first:</p>
              <p className="text-2xl font-bold text-foreground mb-4">{distractor.question}</p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  value={distractorInput}
                  onChange={(e) => setDistractorInput(e.target.value)}
                  className="w-20 rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleDistractorSubmit()}
                />
                <button
                  onClick={handleDistractorSubmit}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {phase === "recall" && (
            <div className="text-center w-full max-w-sm px-4">
              <p className="text-sm text-muted-foreground mb-3">
                Type the {sequence.length} letters in order, separated by spaces:
              </p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g. B K M T"
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
              <div className="flex gap-2 justify-center mb-3">
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
              <p className="text-sm text-muted-foreground">
                {round?.difficulty === "high"
                  ? "With more items and a distractor, your dlPFC had to work harder to maintain the sequence."
                  : "A manageable load — your dlPFC could hold these items comfortably."}
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
