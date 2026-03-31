import { useState, useCallback, useRef, useEffect } from "react";

type Stage = "acquisition" | "extinction" | "pause" | "test";

interface Trial {
  stage: Stage;
  hasUS: boolean;
}

const TRIALS: Trial[] = [
  { stage: "acquisition", hasUS: true },
  { stage: "acquisition", hasUS: true },
  { stage: "extinction", hasUS: false },
  { stage: "extinction", hasUS: false },
  { stage: "pause", hasUS: false },
  { stage: "test", hasUS: false },
];

const stageLabels: Record<Stage, string> = {
  acquisition: "Acquisition",
  extinction: "Extinction",
  pause: "Pause",
  test: "Test",
};

const FearCueDemo = () => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"predict" | "outcome" | "note">("predict");
  const [prediction, setPrediction] = useState<"expect-us" | "expect-nothing" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const done = index >= TRIALS.length;
  const trial = !done ? TRIALS[index] : null;

  const handlePredict = useCallback((p: "expect-us" | "expect-nothing") => {
    setPrediction(p);
    timer.current = setTimeout(() => setStep("outcome"), 500);
  }, []);

  const advance = useCallback(() => {
    setIndex((i) => i + 1);
    setStep("predict");
    setPrediction(null);
  }, []);

  const restart = useCallback(() => {
    setIndex(0);
    setStep("predict");
    setPrediction(null);
  }, []);

  // Summary
  if (done) {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">What This Shows</h3>
          <div className="mt-4 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed space-y-3">
            <p><strong>Acquisition:</strong> The cue (◆) was paired with an unpleasant outcome (✕). Your amygdala learned to associate the two — the cue became a danger signal.</p>
            <p><strong>Extinction:</strong> The cue appeared alone, repeatedly. Fear faded — but the original memory was not erased. Instead, your vmPFC activated inhibitory cells (ITCs) to suppress the amygdala's output. This is new learning: "the cue is now safe."</p>
            <p><strong>Test:</strong> After a delay, the cue returned. If you felt the fear come back, that's <strong>spontaneous recovery</strong> — proof the original fear memory still exists underneath the newer extinction memory.</p>
            <p className="pt-1">Continue to <strong>Trace</strong> to see the circuit.</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={restart} className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Pause interlude
  if (trial?.stage === "pause") {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center">
          <p className="font-display text-lg font-semibold text-foreground">Time passes…</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
            In a real experiment, hours or days pass. The extinction memory — "the cue is safe" — can weaken during this gap, allowing the original fear memory to re-emerge.
          </p>
          <button onClick={advance} className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Continue to Test
          </button>
        </div>
      </section>
    );
  }

  const stageColor = trial?.stage === "acquisition" ? "text-foreground" : trial?.stage === "extinction" ? "text-primary" : "text-accent-foreground";

  const noteText = (() => {
    if (!trial || !prediction) return "";
    if (trial.stage === "acquisition") {
      return trial.hasUS
        ? "The cue was followed by the unpleasant outcome. Your amygdala is forming the CS–US association — learning that this cue predicts something bad."
        : "";
    }
    if (trial.stage === "extinction") {
      return prediction === "expect-us"
        ? "You expected the outcome, but it didn't come. Your vmPFC is building a new memory — activating ITCs to inhibit the amygdala. This isn't forgetting; it's new learning that competes with the original fear memory."
        : "You predicted nothing would happen — extinction learning is taking hold. Your vmPFC → ITC pathway is actively suppressing the old fear response, but the original memory remains intact underneath.";
    }
    // test
    return prediction === "expect-us"
      ? "The fear returned — this is spontaneous recovery. The original CS–US memory resurfaced because the extinction memory weakened over time. Extinction didn't erase the fear; it only suppressed it."
      : "You predicted safety, but many people feel the fear return here. That return — spontaneous recovery — proves extinction is a new competing memory, not erasure of the old one.";
  })();

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">Step through a simplified conditioning experiment.</p>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <div className="mb-4">
          <span className={`text-xs font-semibold uppercase tracking-wide ${stageColor}`}>
            {stageLabels[trial!.stage]}
          </span>
        </div>

        <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-secondary">
          {step === "predict" && (
            <div className="text-center">
              <div className="text-5xl mb-4 select-none">◆</div>
              <p className="text-sm text-muted-foreground mb-4">The cue appears. What do you expect?</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handlePredict("expect-us")}
                  className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Something bad
                </button>
                <button
                  onClick={() => handlePredict("expect-nothing")}
                  className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Nothing
                </button>
              </div>
            </div>
          )}

          {step === "outcome" && (
            <div className="text-center">
              <div className="text-5xl mb-3 select-none flex items-center justify-center gap-3">
                <span>◆</span>
                {trial?.hasUS && <span className="text-destructive">✕</span>}
              </div>
              <p className="text-sm text-foreground">
                {trial?.hasUS ? "An unpleasant outcome follows the cue." : "Nothing happens. The cue appears alone."}
              </p>
              <button onClick={() => setStep("note")} className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                Continue
              </button>
            </div>
          )}

          {step === "note" && (
            <div className="text-center max-w-sm px-2">
              <p className="text-sm text-muted-foreground leading-relaxed">{noteText}</p>
              <button onClick={advance} className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                {index < TRIALS.length - 1 ? "Next" : "See Summary"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FearCueDemo;
