import { useState, useCallback } from "react";

interface Item {
  id: string;
  text: string;
  correct: "classical" | "operant";
  explanation: string;
}

const ITEMS: Item[] = [
  {
    id: "co1",
    text: "A rat hears a tone paired with a mild shock and eventually freezes to the tone alone.",
    correct: "classical",
    explanation: "The tone (CS) is paired with the shock (US) — the freezing response forms automatically without the rat choosing to act.",
  },
  {
    id: "co2",
    text: "A rat presses a lever and receives a food pellet, increasing the rate of lever pressing.",
    correct: "operant",
    explanation: "The rat's voluntary action (lever press) determines the outcome. Behavior is shaped by its consequences.",
  },
  {
    id: "co3",
    text: "A dog salivates when it hears a bell that was previously paired with food.",
    correct: "classical",
    explanation: "Pavlov's paradigm: a neutral stimulus (bell) paired with food produces an automatic learned response. No choice involved.",
  },
  {
    id: "co4",
    text: "A student studies more after receiving praise for a good exam score.",
    correct: "operant",
    explanation: "The student's voluntary behavior (studying) is reinforced by a positive consequence. The action determines the outcome.",
  },
  {
    id: "co5",
    text: "A patient feels nauseous entering a hospital after repeated chemotherapy sessions there.",
    correct: "classical",
    explanation: "The hospital context (CS) was paired with chemotherapy-induced nausea (US) — the response forms automatically through association.",
  },
  {
    id: "co6",
    text: "A child avoids touching a hot stove after being burned, choosing a different behavior next time.",
    correct: "operant",
    explanation: "The child's voluntary behavior changes based on an aversive consequence. The organism learns that its action leads to a specific outcome.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

type Phase = "sort" | "result";

const ClassicalOperantSorterDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("sort");

  const scenario = items[current];

  const handlePick = useCallback(
    (pick: "classical" | "operant") => {
      const next = { ...answers, [scenario.id]: pick };
      setAnswers(next);
      if (current < items.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setPhase("result");
      }
    },
    [answers, current, items.length, scenario],
  );

  const handleReset = useCallback(() => {
    setCurrent(0);
    setAnswers({});
    setPhase("sort");
  }, []);

  const correctCount = items.filter((s) => answers[s.id] === s.correct).length;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-xl">
        For each scenario, decide: is this <strong>classical conditioning</strong> —
        where a neutral stimulus becomes associated with an outcome automatically — or{" "}
        <strong>operant conditioning</strong> — where voluntary behavior is shaped by
        its consequences?
      </p>

      <div className="mt-6">
        {phase === "sort" && (
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
            <p className="text-xs text-muted-foreground">
              {current + 1} of {items.length}
            </p>

            <div className="flex gap-0.5">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < current ? "bg-primary/60" : i === current ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-lg bg-secondary px-5 py-4">
              <p className="text-sm text-foreground leading-relaxed">
                {scenario.text}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handlePick("classical")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Classical
              </button>
              <button
                type="button"
                onClick={() => handlePick("operant")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Operant
              </button>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-6">
            <div className="rounded-lg bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                {correctCount === items.length
                  ? "Every classification was correct. The key differentiator — agency — was clear: classical conditioning happens to the organism, operant conditioning happens because of the organism's action."
                  : correctCount >= items.length / 2
                    ? "The core distinction is agency: does the organism's own behavior determine the outcome? When it does, that is operant. When the association forms automatically regardless of behavior, that is classical."
                    : "This distinction hinges on one question: does the organism's behavior determine the outcome? In classical conditioning, the association forms regardless of what the organism does. In operant, the organism's action is the critical variable."}
              </p>
            </div>

            <ol className="space-y-2">
              {items.map((s) => {
                const picked = answers[s.id];
                const correct = picked === s.correct;
                return (
                  <li
                    key={s.id}
                    className={`rounded-md border px-4 py-2.5 text-sm ${
                      correct
                        ? "border-primary/30 bg-primary/5"
                        : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    <p className="text-foreground leading-relaxed">{s.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.explanation}
                    </p>
                  </li>
                );
              })}
            </ol>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("Explain")}
                className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1.5 group"
              >
                <span>Explain covers why fear conditioning is strictly classical</span>
                <span className="text-primary/40 group-hover:text-primary/60 transition-colors" aria-hidden>→</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassicalOperantSorterDemo;
