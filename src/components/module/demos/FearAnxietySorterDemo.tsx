import { useState, useCallback } from "react";

interface Item {
  id: string;
  text: string;
  correct: "fear" | "anxiety";
  explanation: string;
}

const ITEMS: Item[] = [
  {
    id: "fa1",
    text: "A snake appears on the trail directly in front of you.",
    correct: "fear",
    explanation: "An imminent, tangible threat triggers the amygdala's fast defensive response — this is fear.",
  },
  {
    id: "fa2",
    text: "You cannot stop thinking about whether you will fail tomorrow's exam.",
    correct: "anxiety",
    explanation: "The threat is predicted, not present. The PFC generates anticipatory scenarios — this is anxiety.",
  },
  {
    id: "fa3",
    text: "A car swerves into your lane and you slam the brakes.",
    correct: "fear",
    explanation: "An immediate physical danger triggers a reflexive defensive response through the low road.",
  },
  {
    id: "fa4",
    text: "You feel uneasy all evening about a meeting scheduled for next week.",
    correct: "anxiety",
    explanation: "No tangible threat is present. The unease reflects prefrontal prediction about a future event.",
  },
  {
    id: "fa5",
    text: "A loud crash behind you makes you spin around.",
    correct: "fear",
    explanation: "A sudden, present stimulus triggers an immediate orienting and defensive response.",
  },
  {
    id: "fa6",
    text: "You repeatedly imagine worst-case outcomes for a flight you haven't boarded yet.",
    correct: "anxiety",
    explanation: "The threat exists only as a mental simulation. The PFC is generating predicted scenarios the amygdala responds to.",
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

const FearAnxietySorterDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
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
      <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-xl">
        Read each scenario and decide: is this <strong>fear</strong> — a response
        to an imminent, tangible threat — or <strong>anxiety</strong> — the
        anticipation of a future, predicted threat?
      </p>

      <div className="mt-6">
        {phase === "sort" && (
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
            <p className="text-xs text-muted-foreground">
              {current + 1} of {items.length}
            </p>

            {/* Progress */}
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
                onClick={() => handlePick("fear")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Fear
              </button>
              <button
                type="button"
                onClick={() => handlePick("anxiety")}
                className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Anxiety
              </button>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-6">
            {/* Interpretive summary */}
            <div className="rounded-lg bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                {correctCount === items.length
                  ? "You correctly distinguished every scenario. The key differentiator — present threat vs predicted threat — was clear in each case."
                  : correctCount >= items.length / 2
                    ? "The distinction held for most scenarios. The cases that blur are often ones where prediction and presence overlap — a sign that the boundary is real but not always obvious."
                    : "Several scenarios crossed the boundary. This reflects how naturally the brain blurs the line between responding to what is here and anticipating what might come."}
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

            {/* Bridge */}
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("Trace")}
                className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1.5 group"
              >
                <span>See how fear and anxiety use different amygdala circuits in Trace</span>
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

export default FearAnxietySorterDemo;
