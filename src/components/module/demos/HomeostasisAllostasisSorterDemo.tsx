import { useState, useCallback } from "react";
import { AnswerLine, useStepFocus } from "@/components/module/experience";

const capitalize = (w: string | undefined) => (w ? w[0].toUpperCase() + w.slice(1) : "");

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
    explanation: "A parameter drifts from a fixed set point and negative feedback restores it — reactive correction.",
  },
  {
    id: "ha2",
    text: "Before a marathon, your body raises its baseline heart rate and cortisol in anticipation of the demand.",
    correct: "allostasis",
    explanation: "The body predictively shifts its operating parameters ahead of a known stressor — stability through anticipatory change.",
  },
  {
    id: "ha3",
    text: "Blood glucose drops after fasting, triggering hunger signals that drive food-seeking behavior.",
    correct: "homeostasis",
    explanation: "A deviation from a stable set point triggers a corrective response — classic negative feedback.",
  },
  {
    id: "ha4",
    text: "A student's sleep schedule and cortisol rhythm shift weeks before finals in anticipation of sustained cognitive demand.",
    correct: "allostasis",
    explanation: "Multiple set points shift in advance to meet predicted future demand — not reactive correction but anticipatory adaptation.",
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
    explanation: "The body maintains stability by shifting its set point rather than returning to baseline. Sustained allostatic load carries a biological cost.",
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

const HomeostasisAllostasisSorterDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [items, setItems] = useState(() => shuffle(ITEMS));
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
    setItems(shuffle(ITEMS));
    setCurrent(0);
    setAnswers({});
    setPhase("sort");
  }, []);

  const correctCount = items.filter((s) => answers[s.id] === s.correct).length;

  // Keep keyboard focus and screen readers with the current scenario (see useStepFocus).
  const { containerRef, announcement } = useStepFocus<HTMLElement>(`${phase}-${current}`);

  return (
    <section ref={containerRef}>
      <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-xl">
        Is each scenario <strong>homeostasis</strong> — negative feedback restoring
        a fixed set point — or <strong>allostasis</strong> — the body predictively
        shifting its parameters to meet anticipated demand?
      </p>

      <div className="mt-6">
        {phase === "sort" && (
          <div data-reveal className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
            <p data-announce className="text-xs text-muted-foreground">
              Scenario {current + 1} of {items.length}
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
              <p data-announce className="text-sm text-foreground leading-relaxed">
                {scenario.text}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                data-autofocus
                onClick={() => handlePick("homeostasis")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Homeostasis
              </button>
              <button
                type="button"
                onClick={() => handlePick("allostasis")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Allostasis
              </button>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div data-reveal="start" className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-6">
            <div data-autofocus tabIndex={-1} className="rounded-lg bg-accent/40 px-4 py-3 focus:outline-none">
              <p className="text-sm text-foreground leading-relaxed">
                {correctCount === items.length
                  ? "Every classification was correct. The core distinction — reactive correction vs. anticipatory shift — was clear throughout."
                  : correctCount > items.length / 2
                    ? "The distinction held for most cases. The hardest calls are chronic scenarios where the body shifts its baseline — that shift is allostasis, and its cost over time is allostatic load."
                    : "This distinction is subtle. Both systems maintain stability, but through different mechanisms: homeostasis corrects deviations reactively, while allostasis shifts the set point itself to meet predicted demand."}
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
                    <AnswerLine correct={correct} picked={capitalize(picked)} answer={capitalize(s.correct)} />
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
                className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1.5 group rounded-sm py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span>Explain covers why allostatic load damages brain structures over time</span>
                <span className="text-primary/40 group-hover:text-primary/60 transition-colors" aria-hidden>→</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="mx-auto block rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </section>
  );
};

export default HomeostasisAllostasisSorterDemo;
