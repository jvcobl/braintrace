import { useState, useCallback } from "react";

interface Item {
  id: string;
  text: string;
  correct: "fear" | "anxiety";
}

const ITEMS: Item[] = [
  {
    id: "fa1",
    text: "A snake appears on the trail directly in front of you.",
    correct: "fear",
  },
  {
    id: "fa2",
    text: "You cannot stop thinking about whether you will fail tomorrow's exam.",
    correct: "anxiety",
  },
  {
    id: "fa3",
    text: "A car swerves into your lane and you slam the brakes.",
    correct: "fear",
  },
  {
    id: "fa4",
    text: "You feel uneasy all evening about a meeting scheduled for next week.",
    correct: "anxiety",
  },
  {
    id: "fa5",
    text: "A loud crash behind you makes you spin around.",
    correct: "fear",
  },
  {
    id: "fa6",
    text: "You repeatedly imagine worst-case outcomes for a flight you haven't boarded yet.",
    correct: "anxiety",
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

const FearAnxietySorterDemo = () => {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("sort");

  const scenario = items[current];

  const handlePick = useCallback(
    (pick: "fear" | "anxiety") => {
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

  const correctCount = items.filter(
    (s) => answers[s.id] === s.correct,
  ).length;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Read each scenario and classify it as <strong>fear</strong> (a response
        to an imminent, tangible threat) or <strong>anxiety</strong> (the
        anticipation of a future, predicted threat).
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
                onClick={() => handlePick("fear")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Fear
              </button>
              <button
                type="button"
                onClick={() => handlePick("anxiety")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Anxiety
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
                        <>✓ {s.correct === "fear" ? "Fear" : "Anxiety"}</>
                      ) : (
                        <>
                          Your answer: {picked === "fear" ? "Fear" : "Anxiety"}{" "}
                          → Correct: {s.correct === "fear" ? "Fear" : "Anxiety"}
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
                Trace — Fear vs. Anxiety Circuits
              </h3>
              <ol className="mt-3 space-y-0" aria-label="Neural pathway steps">
                {[
                  {
                    label: "Fear: Tangible Threat → Amygdala → Immediate Response",
                    desc: "Fear is the emotional appraisal of an imminent threat that is present and identifiable. Sensory input reaches the amygdala via the fast subcortical low road, driving an immediate defensive response before conscious evaluation.",
                  },
                  {
                    label: "Anxiety: Predicted Threat → PFC + Amygdala → Anticipatory State",
                    desc: "Anxiety is the anticipation of a future threat. It does not require a tangible stimulus — the PFC generates predictions about what might happen, and the amygdala responds to those predictions as if the threat were real.",
                  },
                  {
                    label: "The Distinction",
                    desc: "Fear responds to what is in front of you. Anxiety responds to what your brain predicts might happen. Both engage the amygdala, but anxiety additionally requires prefrontal prediction and can become pathological when overgeneralized.",
                  },
                ].map((node, i, arr) => (
                  <li key={node.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-border" aria-hidden="true" />
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
                <span className="font-semibold">NBB302 connection:</span> The
                fear–anxiety distinction is central to understanding amygdala
                function. The amygdala is not simply a "fear center" — it is a
                salience center that stamps importance onto events. Fear and
                anxiety both engage the amygdala, but through different
                circuits: fear via direct sensory input (the low road), anxiety
                via prefrontal prediction pathways. This distinction matters
                clinically because anxiety disorders involve overgeneralized
                threat prediction, not an overactive fear response.
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

export default FearAnxietySorterDemo;
