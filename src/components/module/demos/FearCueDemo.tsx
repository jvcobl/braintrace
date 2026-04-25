import { useState, useCallback, useRef, useEffect } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback, ExperienceSummary } from "@/components/module/experience";
import PredictionOutcome from "@/components/module/PredictionOutcome";
import { predictionOutcomeContent } from "@/data/content/predictionOutcomeContent";
import { fearCueContent } from "@/data/content/fearCueContent";

/* ── Trial structure ── */

type Stage = "acquisition-early" | "acquisition-late" | "extinction-early" | "extinction-late" | "pause" | "test";
type Prediction = "bad" | "nothing";

interface Trial {
  stage: Stage;
  hasUS: boolean;
}

const TRIALS: Trial[] = [
  { stage: "acquisition-early", hasUS: true },
  { stage: "acquisition-early", hasUS: true },
  { stage: "acquisition-late", hasUS: true },
  { stage: "acquisition-late", hasUS: true },
  { stage: "extinction-early", hasUS: false },
  { stage: "extinction-early", hasUS: false },
  { stage: "extinction-late", hasUS: false },
  { stage: "extinction-late", hasUS: false },
];

/* ── Phase display metadata ── */

const phaseInfo: Record<Exclude<Stage, "pause">, { label: string; color: string; description: string }> = {
  "acquisition-early": {
    label: "Acquisition — Early",
    color: "text-foreground",
    description: "The cue is being paired with an aversive outcome.",
  },
  "acquisition-late": {
    label: "Acquisition — Late",
    color: "text-foreground",
    description: "Repeated pairings. The association should be forming.",
  },
  "extinction-early": {
    label: "Extinction — Early",
    color: "text-primary",
    description: "The cue appears alone — no aversive outcome follows.",
  },
  "extinction-late": {
    label: "Extinction — Late",
    color: "text-primary",
    description: "Repeated safe presentations. New learning is competing with the old.",
  },
  test: {
    label: "Test — After Delay",
    color: "text-amber-500",
    description: "Time has passed. Does the fear return?",
  },
};

/* ── Feedback from pasted spec ── */

type FeedbackKey = `${Stage}-${Prediction}`;

const phaseFeedback: Record<string, ExperienceFeedback> = {
  "acquisition-early-nothing": {
    primary: "Correct — the cue has no association yet.",
    secondary: "Before pairing, the conditioned stimulus is neutral. No CS-US association has formed in the BLA, so there is no reason for a fear response.",
    bridge: "Trace shows how the association forms during pairing.",
    structure: "No BLA activation",
  },
  "acquisition-early-bad": {
    primary: "The cue has not been paired with anything aversive yet.",
    secondary: "Any unease at this point reflects contextual expectation — the cortex predicting what the experiment might do — rather than a learned CS-US association in the amygdala. True conditioned fear requires repeated pairing.",
    bridge: "Compare cortical prediction vs amygdala conditioning in Explain.",
    structure: "Cortical expectation (not conditioning)",
  },
  "acquisition-late-bad": {
    primary: "Correct — the association has formed.",
    secondary: "After repeated CS-US pairings, the BLA encodes the association. The infralimbic cortex (IL) strengthened the connection with excitatory glutamatergic signals. The CeA now triggers anticipatory fear — freezing behavior — when the cue appears alone. This is classical conditioning.",
    bridge: "Trace shows the IL → BLA → CeA fear acquisition pathway.",
    structure: "IL → BLA → CeA",
  },
  "acquisition-late-nothing": {
    primary: "Most people expect something aversive by this point.",
    secondary: "The BLA typically forms a strong CS-US association after repeated pairing. If the association feels weak here, it may be because the simulated pairing lacks the physical salience of a real unconditioned stimulus, or because cortical reasoning is overriding the emotional prediction.",
    bridge: "Explain covers why real conditioning is stronger than simulated.",
    structure: "BLA association (weak or suppressed)",
  },
  "extinction-early-bad": {
    primary: "The fear persists — extinction has not occurred yet.",
    secondary: "The BLA still holds the original association. Extinction requires repeated CS-alone presentations so the prelimbic cortex (PL) can activate intercalated cells (ITCs) to inhibit amygdala output. That process takes time.",
    bridge: "Trace shows the PL → ITC → BLA inhibition pathway.",
    structure: "BLA association still active",
  },
  "extinction-early-nothing": {
    primary: "You are already updating — faster than typical.",
    secondary: "This may reflect cortical reasoning overriding the amygdala's prediction. In full extinction, the PL gradually activates ITCs to suppress BLA output. Here, conscious evaluation may be running ahead of the subcortical learning process.",
    bridge: "Compare cortical override vs ITC-mediated extinction in Explain.",
    structure: "Cortical reasoning ahead of extinction circuit",
  },
  "extinction-late-nothing": {
    primary: "Extinction learning has formed.",
    secondary: "The PL activated the ITCs, which suppressed BLA output. A new safety association now competes with the original fear memory. Critically, the original memory still exists — it has been suppressed, not erased. Extinction is new learning layered on top of old learning.",
    bridge: "Trace shows the full extinction circuit: PL → ITCs → BLA inhibition.",
    structure: "PL → ITCs → BLA inhibition",
  },
  "extinction-late-bad": {
    primary: "The fear association is persisting despite repeated safe exposures.",
    secondary: "This can occur when the original CS-US association was strong or when amygdala primers (anxiety, fatigue, context) keep the BLA reactive. Extinction is not guaranteed to be fast or complete — it depends on the balance between the original association and the vmPFC-ITC inhibition system.",
    bridge: "Explain covers why extinction varies and can be incomplete.",
    structure: "BLA resisting ITC inhibition",
  },
  "test-bad": {
    primary: "The fear returned — this is spontaneous recovery.",
    secondary: "The original fear memory was never erased. During extinction, ITCs suppressed the BLA's output, creating a competing safety memory. After a delay, the suppression weakened and the original association resurfaced. This is proof that extinction is suppression, not erasure.",
    bridge: "Explain covers why this matters for phobia and PTSD treatment.",
    structure: "Original BLA memory resurfaces",
  },
  "test-nothing": {
    primary: "The extinction held — but the original memory persists.",
    secondary: "The safety memory is currently dominant. However, spontaneous recovery can occur later — after more time, a context change, or stress that re-primes the amygdala. The original CS-US association in the BLA was suppressed, not deleted.",
    bridge: "Explain covers why fear can always potentially return.",
    structure: "Safety memory dominant (suppression holding)",
  },
};

function getFeedback(stage: Stage, prediction: Prediction): ExperienceFeedback {
  const key = `${stage}-${prediction}`;
  return phaseFeedback[key] ?? {
    primary: "Response noted.",
    secondary: "",
    bridge: "Continue to the next trial.",
  };
}

/* ── Summary tiers ── */

function getSummary(recoveryPrediction: "extinguished" | "returns" | null): ExperienceSummary {
  if (recoveryPrediction === "returns") {
    return {
      heading: "What This Shows",
      body: "You called it. You experienced the full cycle: acquisition, extinction, and spontaneous recovery. This demonstrates the unit's central principle: extinction is new learning, not forgetting. The vmPFC-ITC circuit suppressed the amygdala's fear output, but the original memory persisted. When the fear returned, it proved the original association was intact all along. This dual-memory architecture is why treating phobias and PTSD is difficult. The old fear always exists underneath.",
      bridge: "Review covers why suppression of output is not erasure of memory.",
    };
  }
  return {
    heading: "What This Shows",
    body: "Most people predict that extinction = erasure. It doesn't. The fear came back at reduced strength because the original CS-US association in the BLA was suppressed, not deleted. The vmPFC-ITC inhibition weakened overnight and the underlying fear memory resurfaced. Spontaneous recovery is the proof that extinction is new learning layered on top of old learning, not a rewrite.",
    bridge: "Explain covers why the original memory is never truly erased.",
  };
}

/* ── Component ── */

const FearCueDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"predict" | "outcome" | "feedback">("predict");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [predictions, setPredictions] = useState<{ stage: Stage; prediction: Prediction }[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [recoveryPhase, setRecoveryPhase] = useState<"prediction" | "timepass" | "replay" | "result" | "finished" | null>(null);
  const [recoveryPrediction, setRecoveryPrediction] = useState<"extinguished" | "returns" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  // Recovery flow auto-advances
  useEffect(() => {
    if (recoveryPhase === "timepass") {
      const t = setTimeout(() => setRecoveryPhase("replay"), 1800);
      return () => clearTimeout(t);
    }
    if (recoveryPhase === "replay") {
      const t = setTimeout(() => setRecoveryPhase("result"), 1500);
      return () => clearTimeout(t);
    }
  }, [recoveryPhase]);

  const done = recoveryPhase === "finished";
  const inRecovery = recoveryPhase !== null;
  const trial = index < TRIALS.length && !inRecovery ? TRIALS[index] : null;

  const handlePredict = useCallback((p: Prediction) => {
    setPrediction(p);
    if (!hasInteracted) setHasInteracted(true);
    timer.current = setTimeout(() => setStep("outcome"), 500);
  }, [hasInteracted]);

  const handleShowFeedback = useCallback(() => {
    if (prediction && trial) {
      setPredictions((prev) => [...prev, { stage: trial.stage, prediction }]);
    }
    setStep("feedback");
  }, [prediction, trial]);

  const advance = useCallback(() => {
    setIndex((i) => {
      const next = i + 1;
      if (next >= TRIALS.length) {
        setRecoveryPhase("prediction");
      }
      return next;
    });
    setStep("predict");
    setPrediction(null);
  }, []);

  const restart = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setIndex(0);
    setStep("predict");
    setPrediction(null);
    setPredictions([]);
    setRecoveryPhase(null);
    setRecoveryPrediction(null);
  }, []);

  // Detect phase transitions for visual emphasis
  const prevStage = index > 0 ? TRIALS[index - 1]?.stage : null;
  const isPhaseTransition = trial && prevStage && trial.stage !== prevStage && trial.stage !== "pause";

  // Non-trial index for progress (skip pause)
  const trialCount = TRIALS.filter((t) => t.stage !== "pause").length;
  const trialProgress = TRIALS.slice(0, index).filter((t) => t.stage !== "pause").length;

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="Step through a simplified conditioning experiment. At each trial, the cue (◆) appears and you predict what follows. Your predictions track how the association forms, is suppressed, and potentially returns."
      done={done}
      summary={getSummary(recoveryPrediction)}
      onRestart={restart}
    >
      {/* Pause interlude */}
      {trial?.stage === "pause" && (
        <div className="rounded-lg border border-border bg-card p-5 sm:p-8 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Time Passes
          </p>
          <p className="font-display text-lg font-semibold text-foreground">
            In a real experiment, hours or days would pass here.
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            The extinction memory — "the cue is safe" — can weaken during this gap, allowing the original fear memory to re-emerge. This is the setup for testing spontaneous recovery.
          </p>
          <button
            onClick={advance}
            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Continue to Test
          </button>
        </div>
      )}

      {/* Active trial */}
      {trial && trial.stage !== "pause" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          {/* Phase header */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold uppercase tracking-wide ${phaseInfo[trial.stage].color}`}>
                  {phaseInfo[trial.stage].label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {trialProgress + 1} of {trialCount}
                </span>
              </div>
            </div>
            {isPhaseTransition && (
              <p className="mt-1.5 text-xs text-muted-foreground italic">
                {phaseInfo[trial.stage].description}
              </p>
            )}
          </div>

          {/* Progress bar */}
          <div className="mb-4 flex gap-0.5">
            {TRIALS.filter((t) => t.stage !== "pause").map((t, i) => {
              // Color by phase
              const baseStage = t.stage;
              const bg =
                i < trialProgress
                  ? baseStage.startsWith("acquisition")
                    ? "bg-foreground/40"
                    : baseStage.startsWith("extinction")
                      ? "bg-primary/50"
                      : "bg-amber-500/50"
                  : i === trialProgress
                    ? "bg-primary"
                    : "bg-border";
              return <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${bg}`} />;
            })}
          </div>

          <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-secondary">
            {step === "predict" && (
              <div className="text-center">
                <div className="text-5xl mb-4 select-none animate-[fadeIn_400ms_ease-out]">◆</div>
                <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}`}</style>
                <p className="text-sm text-muted-foreground mb-4">
                  The cue appears. What do you expect will follow?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handlePredict("bad")}
                    className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Something bad
                  </button>
                  <button
                    onClick={() => handlePredict("nothing")}
                    className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Nothing
                  </button>
                </div>
              </div>
            )}

            {step === "outcome" && (
              <div className="text-center animate-[fadeIn_300ms_ease-out]">
                <div className="text-5xl mb-3 select-none flex items-center justify-center gap-3">
                  <span>◆</span>
                  {trial.hasUS && <span className="text-destructive animate-[fadeIn_200ms_ease-out]">✕</span>}
                </div>
                <p className="text-sm text-foreground">
                  {trial.hasUS
                    ? "An unpleasant outcome follows the cue."
                    : "Nothing happens. The cue appears alone."}
                </p>
                <button
                  onClick={handleShowFeedback}
                  className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {/* FeedbackCard below interaction area */}
          {step === "feedback" && prediction && (
            <div className="mt-5">
              <FeedbackCard onNavigate={onNavigate} feedback={getFeedback(trial.stage, prediction)} />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={advance}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {index < TRIALS.length - 1 ? "Next Trial" : "Continue"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recovery: prediction commit */}
      {recoveryPhase === "prediction" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-500 mb-3">
            After Extinction
          </p>
          <p className="text-sm font-medium text-foreground mb-4">
            {fearCueContent.recoveryPredictionPrompt}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => {
                setRecoveryPrediction("extinguished");
                setRecoveryPhase("timepass");
              }}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.97]"
            >
              {fearCueContent.recoveryOptionExtinguished}
            </button>
            <button
              onClick={() => {
                setRecoveryPrediction("returns");
                setRecoveryPhase("timepass");
              }}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.97]"
            >
              {fearCueContent.recoveryOptionReturns}
            </button>
          </div>
        </div>
      )}

      {/* Recovery: time advance */}
      {recoveryPhase === "timepass" && (
        <div className="rounded-lg border border-border bg-card p-5 sm:p-8 text-center animate-[fadeIn_400ms_ease-out]">
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Time Passes
          </p>
          <p className="font-display text-lg font-semibold text-foreground">
            {fearCueContent.timeAdvanceLabel}
          </p>
        </div>
      )}

      {/* Recovery: CS replay (reuses existing trial-card pattern) */}
      {recoveryPhase === "replay" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-500 mb-3">
            Test — CS Alone
          </p>
          <div className="flex min-h-[160px] items-center justify-center rounded-lg bg-secondary">
            <div className="text-center animate-[fadeIn_400ms_ease-out]">
              <div className="text-5xl mb-3 select-none">◆</div>
              <p className="text-xs text-muted-foreground mb-3">
                {fearCueContent.replayCueLabel}
              </p>
              <div className="mx-auto w-40 h-2 rounded-full bg-background overflow-hidden">
                <div
                  className="h-full bg-destructive transition-all duration-1000 ease-out"
                  style={{ width: "65%" }}
                />
              </div>
              <p className="mt-2 text-xs text-destructive font-medium">
                {fearCueContent.replayResponseLabel}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recovery: result */}
      {recoveryPhase === "result" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6 animate-[fadeIn_400ms_ease-out]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-500 mb-3">
            Spontaneous Recovery
          </p>
          <div className="flex min-h-[120px] items-center justify-center rounded-lg bg-secondary mb-4">
            <div className="text-center">
              <div className="text-5xl mb-3 select-none">◆</div>
              <div className="mx-auto w-40 h-2 rounded-full bg-background overflow-hidden">
                <div className="h-full bg-destructive" style={{ width: "65%" }} />
              </div>
              <p className="mt-2 text-xs text-destructive font-medium">
                {fearCueContent.replayResponseLabel}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-foreground mb-3">
            {recoveryPrediction === "extinguished"
              ? fearCueContent.resultIfExtinguished
              : fearCueContent.resultIfReturns}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {fearCueContent.resultBridge}
          </p>
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setRecoveryPhase("finished")}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              See Summary
            </button>
          </div>
        </div>
      )}

      {/* Prediction & Outcome bridge */}
      <div className="mt-3">
        <PredictionOutcome
          visible={hasInteracted}
          {...predictionOutcomeContent["fear-cue"]}
          onNavigateTrace={onNavigate ? () => onNavigate("Trace") : undefined}
        />
      </div>
    </ExperienceShell>
  );
};

export default FearCueDemo;
