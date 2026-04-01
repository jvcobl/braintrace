import { useState, useCallback } from "react";

interface Item {
  id: string;
  text: string;
  correct: "emotion" | "arousal";
  explanation: string;
}

const ITEMS: Item[] = [
  {
    id: "ea1",
    text: "You feel a clear urge to avoid a person who insulted you.",
    correct: "emotion",
    explanation: "Negative valence with a specific avoid motivation — this is emotion: intensity plus direction.",
  },
  {
    id: "ea2",
    text: "Your heart pounds and your palms sweat before a job interview.",
    correct: "arousal",
    explanation: "High physiological activation without inherent direction. The pounding heart could accompany excitement or dread equally.",
  },
  {
    id: "ea3",
    text: "You feel drawn toward a friend you haven't seen in months.",
    correct: "emotion",
    explanation: "Positive valence with approach motivation. The experience has a clear direction, not just intensity.",
  },
  {
    id: "ea4",
    text: "A sudden loud noise makes your body jolt and your cortisol spike.",
    correct: "arousal",
    explanation: "The physiological activation itself is neither positive nor negative — it is magnitude without valence.",
  },
  {
    id: "ea5",
    text: "You feel a strong negative reaction and want to leave a conversation.",
    correct: "emotion",
    explanation: "Negative valence with avoid behavior — transient, directional, and motivating specific action.",
  },
  {
    id: "ea6",
    text: "You are equally activated physiologically during a terrifying moment and an exhilarating one.",
    correct: "arousal",
    explanation: "Same intensity accompanies opposite experiences. This demonstrates that arousal is magnitude without direction.",
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

const EmotionArousalSorterDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [items] = useState(() => shuffle(ITEMS));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("sort");

  const scenario = items[current];

  const handlePick = useCallback(
    (pick: "emotion" | "arousal") => {
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
        Is each scenario describing <strong>emotion</strong> — a transient state
        with specific valence that motivates approach or avoidance — or{" "}
        <strong>arousal</strong> — physiological intensity without inherent
        direction?
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
                onClick={() => handlePick("emotion")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Emotion
              </button>
              <button
                type="button"
                onClick={() => handlePick("arousal")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Arousal
              </button>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-6">
            <div className="rounded-lg bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                {correctCount === items.length
                  ? "Every classification was correct. The core distinction — direction vs intensity — was clear throughout."
                  : correctCount >= items.length / 2
                    ? "The distinction held for most cases. The overlap is real: high arousal often accompanies strong emotion, making them feel inseparable in the moment."
                    : "This distinction is genuinely difficult. Arousal and emotion co-occur so frequently that separating them requires focusing on whether the experience has direction, not just intensity."}
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
                <span>Explain covers why this distinction is foundational to the unit</span>
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

export default EmotionArousalSorterDemo;
