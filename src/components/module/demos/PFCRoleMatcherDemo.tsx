import { useState, useCallback } from "react";

interface Scenario {
  id: string;
  text: string;
  correctRegion: "dlPFC" | "vmPFC" | "OFC";
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    text: "Holding a sequence of numbers in mind while solving a math problem",
    correctRegion: "dlPFC",
    explanation: "Active maintenance of task-relevant information is the dlPFC's core function — working memory and abstract reasoning.",
  },
  {
    id: "s2",
    text: "Suppressing an impulse to avoid something after the amygdala flags it as threatening",
    correctRegion: "vmPFC",
    explanation: "The vmPFC regulates subcortical emotional input — here it overrides the amygdala's avoidance signal.",
  },
  {
    id: "s3",
    text: "Generating a prediction about what object you're about to see based on context",
    correctRegion: "OFC",
    explanation: "The OFC sets contextual expectations and generates predictions about upcoming stimuli based on prior experience.",
  },
  {
    id: "s4",
    text: "Making an unsentimental cost-benefit calculation about two options",
    correctRegion: "dlPFC",
    explanation: "Cold analytical reasoning without emotional weighting is a dlPFC function — logic over feeling.",
  },
  {
    id: "s5",
    text: "Balancing a reward signal from the nucleus accumbens against a risk assessment",
    correctRegion: "vmPFC",
    explanation: "The vmPFC integrates reward and risk signals from subcortical structures to guide balanced decisions.",
  },
  {
    id: "s6",
    text: "Setting expectations about what should happen next in a familiar sequence",
    correctRegion: "OFC",
    explanation: "Pattern prediction and expectation-setting in familiar contexts is the OFC's specialization.",
  },
];

const REGIONS = ["dlPFC", "vmPFC", "OFC"] as const;

const REGION_LABELS: Record<string, { full: string; short: string }> = {
  dlPFC: { full: "Dorsolateral PFC", short: "Logic & Working Memory" },
  vmPFC: { full: "Ventromedial PFC", short: "Emotion Regulation" },
  OFC: { full: "Orbitofrontal Cortex", short: "Prediction & Categorization" },
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

const PFCRoleMatcherDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
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
      <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-xl">
        Each scenario describes something the prefrontal cortex does. Match it
        to the correct PFC region: <strong>dlPFC</strong> (logic & working memory),{" "}
        <strong>vmPFC</strong> (emotion regulation), or <strong>OFC</strong> (prediction
        & categorization).
      </p>

      <div className="mt-6">
        {phase === "match" && (
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

            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handlePick(r)}
                  className="flex-1 min-w-[100px] rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  <span className="block font-semibold">{r}</span>
                  <span className="block text-[11px] text-muted-foreground">{REGION_LABELS[r].short}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-6">
            <div className="rounded-lg bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                {correctCount === items.length
                  ? "Every match was correct. The three PFC regions handle distinct functions, though they collaborate constantly and compete for the same finite metabolic resources."
                  : correctCount >= items.length / 2
                    ? "The functional boundaries are real but the overlap is genuine — these regions collaborate constantly, and many cognitive tasks engage more than one. The mismatches here reflect that complexity."
                    : "The PFC regions share resources and collaborate, making their boundaries harder to see from the outside. Each has a distinct specialization, but in practice they rarely work in isolation."}
              </p>
            </div>

            <ol className="space-y-2">
              {items.map((s) => {
                const picked = answers[s.id];
                const correct = picked === s.correctRegion;
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
                      {correct ? (
                        <>✓ {REGION_LABELS[s.correctRegion].full} — {s.explanation}</>
                      ) : (
                        <>{REGION_LABELS[s.correctRegion].full} — {s.explanation}</>
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("Trace")}
                className="w-full text-center text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1.5 group"
              >
                <span>Trace shows the PFC functional map and how these regions connect</span>
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

export default PFCRoleMatcherDemo;
