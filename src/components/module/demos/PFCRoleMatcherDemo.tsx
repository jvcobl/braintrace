import { useState, useCallback } from "react";

interface Scenario {
  id: string;
  text: string;
  correctRegion: "dlPFC" | "vmPFC" | "OFC";
}

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    text: "Holding a sequence of numbers in mind while solving a math problem",
    correctRegion: "dlPFC",
  },
  {
    id: "s2",
    text: "Suppressing an impulse to avoid something after the amygdala flags it as threatening",
    correctRegion: "vmPFC",
  },
  {
    id: "s3",
    text: "Generating a prediction about what object you're about to see based on context",
    correctRegion: "OFC",
  },
  {
    id: "s4",
    text: "Making an unsentimental cost-benefit calculation about two options",
    correctRegion: "dlPFC",
  },
  {
    id: "s5",
    text: "Balancing a reward signal from the nucleus accumbens against a risk assessment",
    correctRegion: "vmPFC",
  },
  {
    id: "s6",
    text: "Setting expectations about what should happen next in a familiar sequence",
    correctRegion: "OFC",
  },
];

const REGIONS = ["dlPFC", "vmPFC", "OFC"] as const;

const REGION_LABELS: Record<string, string> = {
  dlPFC: "Dorsolateral PFC",
  vmPFC: "Ventromedial PFC",
  OFC: "Orbitofrontal Cortex",
};

function shuffle<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

type Phase = "match" | "result";

const PFCRoleMatcherDemo = () => {
  const [items] = useState(() => shuffle(SCENARIOS));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("match");

  const scenario = items[current];

  const handlePick = useCallback(
    (region: string) => {
      const next = { ...answers, [scenario.id]: region };
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
    setPhase("match");
  }, []);

  const correctCount = items.filter(
    (s) => answers[s.id] === s.correctRegion,
  ).length;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Each scenario describes something the prefrontal cortex does. Match it
        to the correct PFC region: dlPFC (logic), vmPFC (emotion regulation),
        or OFC (categorization and expectations).
      </p>

      <div className="mt-6">
        {phase === "match" && (
          <div className="space-y-5">
            {/* Progress */}
            <p className="text-xs text-muted-foreground">
              {current + 1} of {items.length}
            </p>

            {/* Scenario card */}
            <div className="rounded-lg border border-border bg-card px-5 py-4">
              <p className="text-sm text-foreground leading-relaxed">
                {scenario.text}
              </p>
            </div>

            {/* Region buttons */}
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handlePick(r)}
                  className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="space-y-6">
            {/* Summary */}
            <p className="text-sm text-foreground">
              You matched{" "}
              <span className="font-semibold">
                {correctCount} of {items.length}
              </span>{" "}
              correctly.
            </p>

            {/* Per-item feedback */}
            <ol className="space-y-2">
              {items.map((s) => {
                const picked = answers[s.id];
                const correct = picked === s.correctRegion;
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
                        <>✓ {REGION_LABELS[s.correctRegion]}</>
                      ) : (
                        <>
                          Your answer: {REGION_LABELS[picked]} → Correct:{" "}
                          {REGION_LABELS[s.correctRegion]}
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
                Trace — PFC Functional Map
              </h3>
              <ol
                className="mt-3 space-y-0"
                aria-label="PFC functional regions"
              >
                {[
                  {
                    label: "dlPFC — Logic and Working Memory",
                    desc: "Handles unsentimental calculations, abstract reasoning, and active maintenance of task-relevant information. The rational analysis center.",
                  },
                  {
                    label: "vmPFC — Emotion Regulation",
                    desc: "Regulates subcortical emotional input — avoidance signals from the amygdala and reward signals from the nucleus accumbens. Balances emotion with executive judgment.",
                  },
                  {
                    label: "OFC — Categorization and Expectations",
                    desc: "Sets predictions about what should happen next, categorizes stimuli, and generates contextual expectations that guide perception and decision-making.",
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
                <span className="font-semibold">Why this matters:</span> These
                three regions generally collaborate, but they can compete for
                control. When the PFC is depleted by cognitive load, fatigue,
                hunger, or illness, all three lose capacity — top-down control
                fails not because of a moral failing, but because the executive
                system has finite metabolic resources.
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

export default PFCRoleMatcherDemo;
