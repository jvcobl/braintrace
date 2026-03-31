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
    explanation: "Negative valence with a specific avoid motivation — this is emotion.",
  },
  {
    id: "ea2",
    text: "Your heart pounds and your palms sweat before a job interview.",
    correct: "arousal",
    explanation: "High physiological activation without inherent positive or negative direction — this is arousal.",
  },
  {
    id: "ea3",
    text: "You feel drawn toward a friend you haven't seen in months.",
    correct: "emotion",
    explanation: "Positive valence with a specific approach motivation — this is emotion.",
  },
  {
    id: "ea4",
    text: "A sudden loud noise makes your body jolt and your cortisol spike.",
    correct: "arousal",
    explanation: "Intense physiological activation without valence — the jolt itself is neither positive nor negative.",
  },
  {
    id: "ea5",
    text: "You feel a strong negative reaction and want to leave a conversation.",
    correct: "emotion",
    explanation: "Negative valence with avoid behavior — transient, directional, and motivating action.",
  },
  {
    id: "ea6",
    text: "You are equally activated physiologically during a terrifying moment and an exhilarating one.",
    correct: "arousal",
    explanation: "Same intensity accompanies opposite experiences — arousal is magnitude without direction.",
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

const EmotionArousalSorterDemo = () => {
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
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Read each scenario and classify it as <strong>emotion</strong> (a
        transient state with specific valence that motivates approach or
        avoidance) or <strong>arousal</strong> (physiological intensity without
        inherent positive or negative direction).
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
                onClick={() => handlePick("emotion")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Emotion
              </button>
              <button
                type="button"
                onClick={() => handlePick("arousal")}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                Arousal
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
                          {picked === "emotion" ? "Emotion" : "Arousal"} →{" "}
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
                Trace — Emotion vs. Arousal
              </h3>
              <ol
                className="mt-3 space-y-0"
                aria-label="Emotion and arousal distinction"
              >
                {[
                  {
                    label: "Arousal: Intensity Without Direction",
                    desc: "Arousal is the magnitude of physiological activation — cortisol release, heart rate increase, pupil dilation. It has no valence. High arousal accompanies both terror and excitement equally.",
                  },
                  {
                    label: "Valence: The Directional Quality",
                    desc: "Valence is what gives an experience its positive (approach) or negative (avoid) character. Valence is what distinguishes emotion from arousal — it adds direction to intensity.",
                  },
                  {
                    label: "Emotion: Arousal + Valence → Motivated Behavior",
                    desc: "An emotion is a transient state — not a trait — that combines physiological activation with specific valence, motivating approach or avoidance. It is a brief episode with a clear direction.",
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
                <span className="font-semibold">NBB302 connection:</span> The
                emotion–arousal distinction is foundational to this unit.
                Arousal is physiological intensity without direction — it tells
                you how activated the body is, not whether the experience is
                good or bad. Valence adds the directional quality. Emotion
                combines both: a transient state with specific valence that
                motivates approach or avoidance. Confusing arousal with emotion
                is one of the most common errors in everyday reasoning about
                how the brain works.
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

export default EmotionArousalSorterDemo;
