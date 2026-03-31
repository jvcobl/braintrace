import { useState, useCallback, useEffect, useRef } from "react";

type ExperimentPhase = "acquisition" | "extinction" | "pause" | "recovery" | "done";

interface Trial {
  phase: ExperimentPhase;
  hasCue: boolean;
  hasUS: boolean;
  label: string;
}

const TRIALS: Trial[] = [
  // Acquisition: CS + US pairings
  { phase: "acquisition", hasCue: true, hasUS: true, label: "Acquisition 1" },
  { phase: "acquisition", hasCue: true, hasUS: true, label: "Acquisition 2" },
  { phase: "acquisition", hasCue: true, hasUS: true, label: "Acquisition 3" },
  // Extinction: CS alone
  { phase: "extinction", hasCue: true, hasUS: false, label: "Extinction 1" },
  { phase: "extinction", hasCue: true, hasUS: false, label: "Extinction 2" },
  { phase: "extinction", hasCue: true, hasUS: false, label: "Extinction 3" },
  // Pause screen (not a trial)
  { phase: "pause", hasCue: false, hasUS: false, label: "Time passes…" },
  // Recovery test
  { phase: "recovery", hasCue: true, hasUS: false, label: "Recovery Test" },
];

const FearCueDemo = () => {
  const [trialIndex, setTrialIndex] = useState(0);
  const [step, setStep] = useState<"cue" | "outcome" | "feedback">("cue");
  const [prediction, setPrediction] = useState<"danger" | "safe" | null>(null);
  const [fearLevel, setFearLevel] = useState(0);
  const animTimer = useRef<ReturnType<typeof setTimeout>>();

  const done = trialIndex >= TRIALS.length;
  const trial = !done ? TRIALS[trialIndex] : null;

  useEffect(() => {
    return () => { if (animTimer.current) clearTimeout(animTimer.current); };
  }, []);

  // Update fear meter based on conditioning
  useEffect(() => {
    if (!trial) return;
    if (step !== "feedback") return;

    if (trial.phase === "acquisition") {
      setFearLevel((f) => Math.min(f + 30, 90));
    } else if (trial.phase === "extinction") {
      setFearLevel((f) => Math.max(f - 25, 10));
    } else if (trial.phase === "recovery") {
      setFearLevel((f) => Math.min(f + 20, 60));
    }
  }, [step, trial]);

  const handlePredict = useCallback((p: "danger" | "safe") => {
    setPrediction(p);
    // Show outcome after a beat
    animTimer.current = setTimeout(() => setStep("outcome"), 600);
  }, []);

  const handleRevealFeedback = useCallback(() => {
    setStep("feedback");
  }, []);

  const handleNext = useCallback(() => {
    setTrialIndex((i) => i + 1);
    setStep("cue");
    setPrediction(null);
  }, []);

  const handleRestart = useCallback(() => {
    setTrialIndex(0);
    setStep("cue");
    setPrediction(null);
    setFearLevel(0);
  }, []);

  if (done) {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">What This Shows</h3>
          <div className="mt-4 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>During <strong>acquisition</strong>, the cue (🔷) was paired with an aversive outcome (⚡). Your brain learned to associate the two — the cue became a predictor of danger.</p>
            <p>During <strong>extinction</strong>, the cue appeared alone. The fear response faded — but the original memory wasn't erased. Instead, your vmPFC activated inhibitory brake cells (ITCs) to suppress the amygdala's fear output.</p>
            <p>After a pause, the cue returned in the <strong>recovery test</strong> — and the fear response partially came back. This is <strong>spontaneous recovery</strong>: proof that extinction is new learning layered on top of the old fear memory, not erasure of it.</p>
            <p className="pt-1">Continue to <strong>Trace</strong> to see how the amygdala, vmPFC, and ITCs interact.</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={handleRestart} className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Pause screen
  if (trial?.phase === "pause") {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-lg font-display font-semibold text-foreground">⏳ Time passes…</p>
          <p className="mt-3 text-sm text-muted-foreground">
            In a real experiment, hours or days would pass before the next test.
            This gap allows the extinction memory to weaken — setting the stage for spontaneous recovery.
          </p>
          <button
            onClick={handleNext}
            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue to Recovery Test
          </button>
        </div>
      </section>
    );
  }

  const phaseLabel = trial?.phase === "acquisition" ? "Acquisition" : trial?.phase === "extinction" ? "Extinction" : "Recovery Test";
  const phaseColor = trial?.phase === "acquisition" ? "text-destructive" : trial?.phase === "extinction" ? "text-primary" : "text-accent-foreground";

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wide ${phaseColor}`}>{phaseLabel}</span>
            <span className="ml-2 text-xs text-muted-foreground">{trial?.label}</span>
          </div>
          {/* Fear meter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Fear</span>
            <div className="h-2 w-20 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-destructive/70 transition-all duration-500"
                style={{ width: `${fearLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stimulus area */}
        <div className="flex min-h-[180px] items-center justify-center rounded-lg bg-secondary">
          {step === "cue" && (
            <div className="text-center">
              {trial?.hasCue && (
                <div className="text-6xl mb-4 select-none">🔷</div>
              )}
              <p className="text-sm text-muted-foreground mb-4">
                The cue appears. What do you expect?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handlePredict("danger")}
                  className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-destructive/10"
                >
                  ⚡ Danger
                </button>
                <button
                  onClick={() => handlePredict("safe")}
                  className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
                >
                  ✓ Safe
                </button>
              </div>
            </div>
          )}

          {step === "outcome" && (
            <div className="text-center">
              <div className="text-6xl mb-3 select-none flex items-center justify-center gap-4">
                <span>🔷</span>
                {trial?.hasUS && <span className="animate-pulse">⚡</span>}
              </div>
              <p className="text-sm font-medium text-foreground">
                {trial?.hasUS
                  ? "The aversive stimulus (US) follows the cue."
                  : "Nothing happens. The cue appears alone."}
              </p>
              <button
                onClick={handleRevealFeedback}
                className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Continue
              </button>
            </div>
          )}

          {step === "feedback" && (
            <div className="text-center max-w-sm">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {trial?.phase === "acquisition" && (
                  prediction === "danger"
                    ? "Correct — the cue predicted the aversive outcome. Your amygdala is learning this CS-US association."
                    : "The aversive outcome followed the cue. With more pairings, your amygdala will learn to expect danger when it sees this cue."
                )}
                {trial?.phase === "extinction" && (
                  prediction === "danger"
                    ? "You expected danger, but nothing happened. Your vmPFC is beginning to activate ITCs — inhibitory brake cells that suppress the amygdala's fear output."
                    : "You predicted safety — your extinction learning is taking hold. The vmPFC → ITC pathway is suppressing the original fear response."
                )}
                {trial?.phase === "recovery" && (
                  prediction === "danger"
                    ? "The fear came back — even though the cue wasn't paired with the US recently. This is spontaneous recovery: the original fear memory resurfaced because the extinction memory weakened over time."
                    : "You predicted safety, but many people feel the fear return here. Spontaneous recovery shows the original CS-US memory was never erased — it was only suppressed by extinction."
                )}
              </p>
              <button
                onClick={handleNext}
                className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {trialIndex < TRIALS.length - 1 ? "Next" : "See Summary"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FearCueDemo;
