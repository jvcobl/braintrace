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
    explanation: "The rat's voluntary action (lever press) is associated with a reward. The organism's own behavior determines the outcome.",
  },
  {
    id: "co3",
    text: "A dog salivates when it hears a bell that was previously paired with food.",
    correct: "classical",
    explanation: "Pavlov's classic paradigm: a neutral stimulus (bell) paired with an unconditioned stimulus (food) produces a learned salivary response.",
  },
  {
    id: "co4",
    text: "A student studies more after receiving praise for a good exam score.",
    correct: "operant",
    explanation: "The student's voluntary behavior (studying) is reinforced by a positive consequence (praise). The action determines the outcome.",
  },
  {
    id: "co5",
    text: "A patient feels nauseous entering a hospital after repeated chemotherapy sessions there.",
    correct: "classical",
    explanation: "The hospital context (CS) was paired with chemotherapy-induced nausea (US) — the nauseous response forms automatically through association.",
  },
  {
    id: "co6",
    text: "A child avoids touching a hot stove after being burned, choosing a different behavior next time.",
    correct: "operant",
    explanation: "The child's voluntary behavior changes based on an aversive consequence. The organism learns that its own action leads to a negative outcome.",
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

const ClassicalOperantSorterDemo = () => {
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
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Read each scenario and classify it as{" "}
        <strong>classical conditioning</strong> (a neutral stimulus is paired
        with an unconditioned stimulus to produce an automatic learned response)
        or <strong>operant conditioning</strong> (a voluntary behavior is
        associated with a consequence or reward).
      </p>

      <div className="mt-6">
        {phase === "sort" && (
          <div className="space-y-5">
            <p className="text-xs text-muted-foreground">
              {current + 1} of {items.length}
            </p>

            <div className="rounded-lg border border-border bg-card px-5 py-4">
              <p className="text-sm text-foreground leading-relaxed">
                {scenario.text}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handlePick("classical")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Classical
              </button>
              <button
                type="button"
                onClick={() => handlePick("operant")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Operant
              </button>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="space-y-6">
            <p className="text-sm text-foreground">
              You classified{" "}
              <span className="font-semibold">
                {correctCount} of {items.length}
              </span>{" "}
              correctly.
            </p>

            <ol className="space-y-2">
              {items.map((s) => {
                const picked = answers[s.id];
                const correct = picked === s.correct;
                return (
                  <li
                    key={s.id}
                    className={`rounded-md border px-4 py-2.5 text-sm ${
                      correct
                        ? "border-green-600/30 bg-green-50/50 dark:bg-green-950/20"
                        : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    <p className="text-foreground leading-relaxed">{s.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {correct ? (
                        <>✓ {s.explanation}</>
                      ) : (
                        <>
                          Your answer:{" "}
                          {picked === "classical" ? "Classical" : "Operant"} →{" "}
                          {s.explanation}
                        </>
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>

            {/* Trace */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Trace — Classical vs. Operant Conditioning
              </h3>
              <ol
                className="mt-3 space-y-0"
                aria-label="Conditioning paradigm distinction"
              >
                {[
                  {
                    label: "Classical: Automatic Association",
                    desc: "A neutral stimulus (CS) is paired with an unconditioned stimulus (US). The response forms automatically — the organism does not choose to respond. This relies on amygdala circuitry, particularly the BLA for CS-US association.",
                  },
                  {
                    label: "Operant: Voluntary Action → Consequence",
                    desc: "The organism's own behavior determines the outcome. A voluntary action is reinforced or punished, changing future behavior. This relies heavily on the nucleus accumbens and dopamine signaling.",
                  },
                  {
                    label: "Key Differentiator: Agency",
                    desc: "In classical conditioning, the organism is passive — the association forms regardless of what it does. In operant conditioning, the organism's action is the critical variable that determines the outcome.",
                  },
                ].map((node, i, arr) => (
                  <li key={node.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      {i < arr.length - 1 && (
                        <div
                          className="w-px flex-1 bg-border"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="pb-5">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {node.label}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Explain */}
            <div className="rounded-lg border border-border bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">NBB302 connection:</span> This
                unit distinguishes the two major learning paradigms. Classical
                conditioning — the basis of fear conditioning — involves
                automatic CS-US association through amygdala circuitry. Operant
                conditioning involves voluntary behavior shaped by consequences,
                relying on nucleus accumbens and dopamine. Understanding this
                distinction is essential because fear conditioning (the core of
                Unit 4) is strictly classical: the organism does not choose to
                become afraid — the association forms automatically through
                repeated CS-US pairing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
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
