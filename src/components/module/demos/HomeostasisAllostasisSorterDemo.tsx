import { useState, useCallback } from "react";

interface Item {
  id: string;
  text: string;
  correct: "homeostasis" | "allostasis";
  explanation: string;
}

const ITEMS: Item[] = [
  {
    id: "ha1",
    text: "Body temperature drifts above 37 °C and sweating activates to cool it back down.",
    correct: "homeostasis",
    explanation: "A parameter drifts from a fixed set point and negative feedback restores it — this is homeostasis.",
  },
  {
    id: "ha2",
    text: "Before a marathon, your body raises its baseline heart rate and cortisol in anticipation of the demand.",
    correct: "allostasis",
    explanation: "The body predictively shifts its operating parameters ahead of a known stressor — stability through anticipatory change, which is allostasis.",
  },
  {
    id: "ha3",
    text: "Blood glucose drops after fasting, triggering hunger signals that drive food-seeking behavior.",
    correct: "homeostasis",
    explanation: "A deviation from a stable set point triggers a corrective response to restore the parameter — classic negative feedback homeostasis.",
  },
  {
    id: "ha4",
    text: "A student's sleep schedule and cortisol rhythm shift weeks before finals in anticipation of sustained cognitive demand.",
    correct: "allostasis",
    explanation: "The body adjusts multiple set points in advance to meet a predicted future demand — this is allostatic adaptation, not reactive correction.",
  },
  {
    id: "ha5",
    text: "After exercising, your heart rate gradually returns to its resting baseline.",
    correct: "homeostasis",
    explanation: "The body detects a deviation and corrects back to its fixed resting set point through negative feedback.",
  },
  {
    id: "ha6",
    text: "Chronic work stress keeps baseline cortisol elevated for months, shifting the body's operating range upward.",
    correct: "allostasis",
    explanation: "The body maintains stability by shifting its set point rather than returning to the original baseline — allostasis. Sustained allostatic load carries a biological cost.",
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

const HomeostasisAllostasisSorterDemo = () => {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("sort");

  const scenario = items[current];

  const handlePick = useCallback(
    (pick: "homeostasis" | "allostasis") => {
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
        <strong>homeostasis</strong> (negative feedback restoring a fixed set
        point) or <strong>allostasis</strong> (the body predictively shifting
        its operating parameters to meet anticipated demand).
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
                onClick={() => handlePick("homeostasis")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Homeostasis
              </button>
              <button
                type="button"
                onClick={() => handlePick("allostasis")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Allostasis
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
                          {picked === "homeostasis"
                            ? "Homeostasis"
                            : "Allostasis"}{" "}
                          → {s.explanation}
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
                Trace — Homeostasis vs. Allostasis
              </h3>
              <ol
                className="mt-3 space-y-0"
                aria-label="Homeostasis and allostasis distinction"
              >
                {[
                  {
                    label: "Homeostasis: Fixed Set Point + Negative Feedback",
                    desc: "The body maintains a stable parameter (e.g., 37 °C) through negative feedback — when the parameter drifts, corrective mechanisms activate to restore the original set point.",
                  },
                  {
                    label: "Allostasis: Stability Through Predicted Change",
                    desc: "The body anticipates future demand and shifts its operating parameters in advance. Unlike homeostasis, the set point itself changes. This is stability through change rather than stability through constancy.",
                  },
                  {
                    label: "Allostatic Load: The Cost of Adaptation",
                    desc: "When allostatic shifts persist — as in chronic stress — the biological cost accumulates. Sustained cortisol elevation, shifted baselines, and wear on regulatory systems represent allostatic load.",
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
                <span className="font-semibold">NBB302 connection:</span>{" "}
                Homeostasis and allostasis are the two regulatory frameworks
                this unit is built on. Homeostasis is reactive — negative
                feedback correcting deviations from a fixed set point.
                Allostasis is predictive — the body shifting its operating
                parameters to meet anticipated demand. The critical insight is
                that allostasis has a cost: when the body stays in an adapted
                state too long (chronic stress), the accumulated biological
                wear is allostatic load — and this is what damages brain
                structures like the hippocampus and prefrontal cortex over time.
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

export default HomeostasisAllostasisSorterDemo;
