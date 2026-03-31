import { useState, useCallback, useRef, useEffect } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback, ExperienceSummary } from "@/components/module/experience";

/* ── Types ── */

type TrialPhase = "ready" | "waiting" | "target" | "reacted";
type ReflectPhase = "expectation" | "priming" | "context";
type DemoPhase =
  | { kind: "trial"; trial: TrialPhase }
  | { kind: "reflect"; step: ReflectPhase }
  | { kind: "done" };

interface TrialResult {
  type: "baseline" | "interrupted";
  reactionMs: number;
}

/* ── Feedback from pasted spec ── */

const expectationFeedback: Record<"didNotExpect" | "didExpect", ExperienceFeedback> = {
  didNotExpect: {
    primary: "You were startled — the reflex fired before conscious awareness.",
    secondary: "This fits the acoustic startle reflex: a 3-synapse loop from cochlear root neurons to the pontine reticular nucleus to spinal motor neurons. The entire circuit completes without cortical involvement, which is why the body reacts before the mind registers what happened.",
    bridge: "Trace shows the full 3-synapse startle loop.",
    structure: "Cochlear root neurons → PNC → spinal cord",
  },
  didExpect: {
    primary: "You expected it — but the reflex likely still fired.",
    secondary: "Conscious prediction cannot fully suppress a 3-synapse brainstem loop. Knowing the stimulus is coming may reduce the magnitude, but the startle reflex itself is involuntary — cortical awareness arrives after the circuit has already completed.",
    bridge: "Trace shows why cortex cannot override a brainstem reflex.",
    structure: "Brainstem reflex (cortex too slow to prevent)",
  },
};

const primingFeedback: Record<"strongerAfterCue" | "sameOrWeaker", ExperienceFeedback> = {
  strongerAfterCue: {
    primary: "The startle response was amplified — this fits fear-potentiated startle.",
    secondary: "When a warning cue primes the system, auditory input routes from the medial geniculate nucleus (MGN) to the basolateral amygdala (BLA). If the BLA is already in a heightened state, the central amygdala (CeA) amplifies the outgoing startle command. This is the mechanism Mike Davis demonstrated in fear-potentiated startle research.",
    bridge: "Trace shows the MGN → BLA → CeA amplification pathway.",
    structure: "MGN → BLA → CeA → amplified startle",
  },
  sameOrWeaker: {
    primary: "The startle did not increase after the cue.",
    secondary: "This could reflect habituation (the brainstem circuit dampening its response to a now-familiar stimulus) or cortical suppression (the high road partially inhibiting the amygdala's priming effect). Both are real mechanisms, and without direct measurement, either could explain the pattern.",
    bridge: "Compare habituation vs cortical suppression in Explain.",
    structure: "Habituation or high road suppression",
  },
};

const contextFeedback: ExperienceFeedback = {
  primary: "Context changes the magnitude of the same reflex.",
  secondary: "The same rustling sound produces a mild orienting response on a busy campus but a full startle in an isolated setting at night. The stimulus is identical — what changes is the amygdala's priming state. Prior context, anxiety level, sleep quality, and learned associations all modulate the reflex before the sound arrives.",
  bridge: "Explain covers how primers change amygdala responsiveness.",
};

const summaryData: ExperienceSummary = {
  heading: "What This Shows",
  body: "The acoustic startle reflex exists because organisms that flinched first survived. It runs on three synapses with no cortical involvement. The amygdala does not create the reflex — it amplifies or suppresses it based on context, priming, and learned associations. That amplification is fear-potentiated startle; that suppression is habituation or cortical override.",
  bridge: "Trace shows both the basic startle loop and the amplification circuit.",
};

/* ── Trial sequence: baseline then interrupted ── */

const TRIAL_SEQUENCE: ("baseline" | "interrupted")[] = ["baseline", "interrupted"];

/* ── Component ── */

const SuddenNoiseDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [phase, setPhase] = useState<DemoPhase>({ kind: "trial", trial: "ready" });
  const [trialIndex, setTrialIndex] = useState(0);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [flashVisible, setFlashVisible] = useState(false);

  // Reflection answers
  const [expectAnswer, setExpectAnswer] = useState<"didNotExpect" | "didExpect" | null>(null);
  const [primingAnswer, setPrimingAnswer] = useState<"strongerAfterCue" | "sameOrWeaker" | null>(null);

  const targetTime = useRef(0);
  const waitTimer = useRef<ReturnType<typeof setTimeout>>();
  const interruptTimer = useRef<ReturnType<typeof setTimeout>>();
  const audioCtx = useRef<AudioContext | null>(null);

  const done = phase.kind === "done";
  const currentTrialType = trialIndex < TRIAL_SEQUENCE.length ? TRIAL_SEQUENCE[trialIndex] : null;

  useEffect(() => {
    return () => {
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (interruptTimer.current) clearTimeout(interruptTimer.current);
    };
  }, []);

  const playTone = useCallback(() => {
    if (muted) return;
    try {
      if (!audioCtx.current) audioCtx.current = new AudioContext();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 200;
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Silent fallback
    }
  }, [muted]);

  const startTrial = useCallback(() => {
    setPhase({ kind: "trial", trial: "waiting" });
    setReactionMs(null);
    setFlashVisible(false);

    const delay = 2000 + Math.random() * 2000;

    if (currentTrialType === "interrupted") {
      const interruptAt = delay - 500;
      interruptTimer.current = setTimeout(() => {
        setFlashVisible(true);
        playTone();
        setTimeout(() => setFlashVisible(false), 120);
      }, Math.max(interruptAt, 1000));
    }

    waitTimer.current = setTimeout(() => {
      targetTime.current = performance.now();
      setPhase({ kind: "trial", trial: "target" });
    }, delay);
  }, [currentTrialType, playTone]);

  const handleClick = useCallback(() => {
    if (phase.kind !== "trial") return;
    if (phase.trial === "target") {
      const ms = Math.round(performance.now() - targetTime.current);
      setReactionMs(ms);
      setResults((prev) => [...prev, { type: currentTrialType!, reactionMs: ms }]);
      setPhase({ kind: "trial", trial: "reacted" });
    } else if (phase.trial === "waiting") {
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (interruptTimer.current) clearTimeout(interruptTimer.current);
      setFlashVisible(false);
      setReactionMs(-1);
      setPhase({ kind: "trial", trial: "reacted" });
    }
  }, [phase, currentTrialType]);

  const handleNextTrial = useCallback(() => {
    const next = trialIndex + 1;
    if (next < TRIAL_SEQUENCE.length) {
      setTrialIndex(next);
      setPhase({ kind: "trial", trial: "ready" });
      setReactionMs(null);
      setFlashVisible(false);
    } else {
      // All trials done → begin reflection
      setPhase({ kind: "reflect", step: "expectation" });
    }
  }, [trialIndex]);

  const handleRestart = useCallback(() => {
    setTrialIndex(0);
    setPhase({ kind: "trial", trial: "ready" });
    setReactionMs(null);
    setResults([]);
    setFlashVisible(false);
    setExpectAnswer(null);
    setPrimingAnswer(null);
  }, []);

  const isTrialActive =
    phase.kind === "trial" && (phase.trial === "waiting" || phase.trial === "target");

  const trialLabel = currentTrialType === "baseline" ? "Baseline" : "With Interruption";

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="You'll complete two reaction-time trials: one calm baseline, one with an unexpected interruption. Afterward, you'll reflect on what you noticed. This is not about speed — it's about what the startle reflex reveals."
      done={done}
      summary={summaryData}
      onRestart={handleRestart}
    >
      {/* ── Trial phase ── */}
      {phase.kind === "trial" && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold uppercase tracking-wide ${
                currentTrialType === "baseline" ? "text-primary" : "text-amber-500"
              }`}>
                {trialLabel}
              </span>
              <span className="text-xs text-muted-foreground">
                Trial {trialIndex + 1} of {TRIAL_SEQUENCE.length}
              </span>
            </div>
            <button
              onClick={() => setMuted((m) => !m)}
              className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={muted ? "Turn sound on" : "Mute sound"}
            >
              {muted ? "🔇 Sound Off" : "🔊 Sound On"}
            </button>
          </div>

          {/* Progress */}
          <div className="mb-4 flex gap-1">
            {TRIAL_SEQUENCE.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < trialIndex ? "bg-primary/60" : i === trialIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          <div
            className={`relative flex min-h-[180px] items-center justify-center rounded-lg transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              flashVisible ? "bg-accent" : phase.trial === "target" ? "bg-primary/10" : "bg-secondary"
            }`}
            onClick={isTrialActive ? handleClick : undefined}
            onKeyDown={isTrialActive ? (e) => { if (e.key === " " || e.key === "Enter") handleClick(); } : undefined}
            role={isTrialActive ? "button" : undefined}
            tabIndex={isTrialActive ? 0 : undefined}
            style={{ cursor: isTrialActive ? "pointer" : "default" }}
          >
            {phase.trial === "ready" && (
              <div className="text-center max-w-sm px-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {currentTrialType === "baseline"
                    ? "First: a calm trial. Click when the circle appears."
                    : "This trial may include an unexpected interruption. Same task — click the circle."}
                </p>
                {currentTrialType === "interrupted" && (
                  <p className="text-xs text-muted-foreground/70 italic mb-3">
                    Notice how your body responds, not just your click speed.
                  </p>
                )}
                <button
                  onClick={startTrial}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Begin
                </button>
              </div>
            )}

            {phase.trial === "waiting" && (
              <p className="text-sm text-muted-foreground select-none">Wait for it…</p>
            )}

            {phase.trial === "target" && (
              <div className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-medium text-foreground">Now!</p>
              </div>
            )}

            {phase.trial === "reacted" && (
              <div className="text-center">
                {reactionMs === -1 ? (
                  <p className="text-sm font-medium text-destructive">Too early — wait for the circle.</p>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-foreground">{reactionMs}ms</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {currentTrialType === "baseline" ? "Baseline reaction time" : "Reaction time with interruption"}
                    </p>
                  </>
                )}
                <button
                  onClick={handleNextTrial}
                  className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {trialIndex < TRIAL_SEQUENCE.length - 1 ? "Next Trial" : "Continue to Reflection"}
                </button>
              </div>
            )}

            {flashVisible && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg pointer-events-none">
                <span className="text-3xl select-none">⚡</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Reflection phase ── */}
      {phase.kind === "reflect" && (
        <div className="space-y-5">
          {/* Reaction time comparison */}
          {results.length >= 2 && (
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Your reaction times
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">Baseline</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {results.find((r) => r.type === "baseline")?.reactionMs ?? "—"}ms
                  </p>
                </div>
                <div className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">Interrupted</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {results.find((r) => r.type === "interrupted")?.reactionMs ?? "—"}ms
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Expectation */}
          {phase.step === "expectation" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground mb-1">
                During the interrupted trial, were you startled by the flash?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Think about your body's reaction, not just whether you expected something to happen.
              </p>
              <div className="flex flex-wrap gap-3">
                {([
                  { key: "didNotExpect" as const, label: "Yes — it caught me off guard" },
                  { key: "didExpect" as const, label: "Not really — I was expecting something" },
                ]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setExpectAnswer(key)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      expectAnswer === key
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {expectAnswer && (
                <div className="mt-5">
                  <FeedbackCard feedback={expectationFeedback[expectAnswer]} />
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setPhase({ kind: "reflect", step: "priming" })}
                      className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Priming */}
          {phase.step === "priming" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground mb-1">
                Did the interruption make the circle-click feel more urgent?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Compare how alert you felt clicking in the baseline trial vs. after the flash.
              </p>
              <div className="flex flex-wrap gap-3">
                {([
                  { key: "strongerAfterCue" as const, label: "Yes — I felt more on edge" },
                  { key: "sameOrWeaker" as const, label: "No — it felt about the same" },
                ]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setPrimingAnswer(key)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      primingAnswer === key
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {primingAnswer && (
                <div className="mt-5">
                  <FeedbackCard feedback={primingFeedback[primingAnswer]} />
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setPhase({ kind: "reflect", step: "context" })}
                      className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Context interpretation */}
          {phase.step === "context" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground mb-3">
                Now consider: would the same interruption feel different in a dark room alone vs. a bright classroom?
              </p>
              <FeedbackCard feedback={contextFeedback} />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setPhase({ kind: "done" })}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  See Summary
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ExperienceShell>
  );
};

export default SuddenNoiseDemo;
