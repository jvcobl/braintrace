import { useState, useCallback, useRef, useEffect } from "react";

type Phase = "intro" | "waiting" | "target" | "result";
type TrialType = "baseline" | "interrupted";

interface TrialResult {
  type: TrialType;
  reactionMs: number;
}

const TRIALS: TrialType[] = ["baseline", "baseline", "interrupted", "baseline", "interrupted"];

const SuddenNoiseDemo = () => {
  const [trialIndex, setTrialIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [muted, setMuted] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);

  const targetTime = useRef(0);
  const waitTimer = useRef<ReturnType<typeof setTimeout>>();
  const interruptTimer = useRef<ReturnType<typeof setTimeout>>();
  const audioCtx = useRef<AudioContext | null>(null);

  const done = trialIndex >= TRIALS.length;
  const currentType = !done ? TRIALS[trialIndex] : null;

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (interruptTimer.current) clearTimeout(interruptTimer.current);
    };
  }, []);

  const playBeep = useCallback(() => {
    if (muted) return;
    try {
      if (!audioCtx.current) audioCtx.current = new AudioContext();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 220;
      gain.gain.value = 0.08; // very soft
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not available — visual-only fallback
    }
  }, [muted]);

  const startTrial = useCallback(() => {
    setPhase("waiting");
    setReactionMs(null);
    setFlashVisible(false);

    const delay = 1500 + Math.random() * 2500; // 1.5–4s wait

    if (currentType === "interrupted") {
      // Fire interrupt ~400ms before target
      const interruptAt = delay - 400;
      interruptTimer.current = setTimeout(() => {
        setFlashVisible(true);
        playBeep();
        setTimeout(() => setFlashVisible(false), 150);
      }, Math.max(interruptAt, 800));
    }

    waitTimer.current = setTimeout(() => {
      targetTime.current = performance.now();
      setPhase("target");
    }, delay);
  }, [currentType, playBeep]);

  const handleClick = useCallback(() => {
    if (phase === "target") {
      const ms = Math.round(performance.now() - targetTime.current);
      setReactionMs(ms);
      setPhase("result");
    } else if (phase === "waiting") {
      // Too early — reset this trial
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (interruptTimer.current) clearTimeout(interruptTimer.current);
      setFlashVisible(false);
      setReactionMs(-1); // indicates too early
      setPhase("result");
    }
  }, [phase]);

  const handleNext = useCallback(() => {
    if (reactionMs !== null && reactionMs > 0 && currentType) {
      setResults((prev) => [...prev, { type: currentType, reactionMs }]);
    }
    setTrialIndex((i) => i + 1);
    setPhase("intro");
    setReactionMs(null);
    setFlashVisible(false);
  }, [reactionMs, currentType]);

  const handleRestart = useCallback(() => {
    setTrialIndex(0);
    setPhase("intro");
    setReactionMs(null);
    setResults([]);
    setFlashVisible(false);
  }, []);

  if (done) {
    const baselineResults = results.filter((r) => r.type === "baseline");
    const interruptedResults = results.filter((r) => r.type === "interrupted");
    const avgBaseline = baselineResults.length > 0
      ? Math.round(baselineResults.reduce((s, r) => s + r.reactionMs, 0) / baselineResults.length)
      : null;
    const avgInterrupted = interruptedResults.length > 0
      ? Math.round(interruptedResults.reduce((s, r) => s + r.reactionMs, 0) / interruptedResults.length)
      : null;

    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">What This Shows</h3>
          <div className="mt-5 grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">Baseline Avg</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {avgBaseline !== null ? `${avgBaseline}ms` : "—"}
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">After Interruption</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {avgInterrupted !== null ? `${avgInterrupted}ms` : "—"}
              </p>
            </div>
          </div>
          <div className="mt-5 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed space-y-2">
            {avgBaseline !== null && avgInterrupted !== null ? (
              avgInterrupted < avgBaseline ? (
                <p>Your reaction was <strong>faster</strong> after the interruption. The sudden stimulus primed your motor system — your brainstem startle circuit was already activated, making you ready to respond more quickly.</p>
              ) : avgInterrupted > avgBaseline + 30 ? (
                <p>Your reaction was <strong>slower</strong> after the interruption. The unexpected stimulus disrupted your attention — your amygdala flagged it as salient, momentarily pulling resources away from the task.</p>
              ) : (
                <p>Your reaction times were <strong>similar</strong> across conditions. The interruption may have both primed your motor system and briefly captured attention, balancing out.</p>
              )
            ) : (
              <p>Not enough valid trials to compare. Try again for a clearer result.</p>
            )}
            <p className="pt-1">
              Continue to <strong>Trace</strong> to see the brainstem startle circuit and how the amygdala modulates it.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRestart}
              className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A simple reaction-time task. Click as fast as you can when the target appears.
      </p>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        {/* Header row */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Trial {trialIndex + 1} of {TRIALS.length}
            {currentType === "interrupted" ? "" : ""}
          </p>
          <button
            onClick={() => setMuted((m) => !m)}
            className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? "🔇 Muted" : "🔊 Sound On"}
          </button>
        </div>

        {/* Stimulus area */}
        <div
          className={`relative flex min-h-[200px] items-center justify-center rounded-lg transition-colors duration-100 ${
            flashVisible
              ? "bg-destructive/20"
              : phase === "target"
              ? "bg-primary/15"
              : "bg-secondary"
          }`}
          onClick={phase === "waiting" || phase === "target" ? handleClick : undefined}
          role={phase === "waiting" || phase === "target" ? "button" : undefined}
          tabIndex={phase === "waiting" || phase === "target" ? 0 : undefined}
          style={{ cursor: phase === "waiting" || phase === "target" ? "pointer" : "default" }}
        >
          {phase === "intro" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {currentType === "interrupted"
                  ? "This trial may include a sudden interruption."
                  : "Calm trial — click when the green target appears."}
              </p>
              <button
                onClick={startTrial}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Trial
              </button>
            </div>
          )}

          {phase === "waiting" && (
            <p className="text-sm text-muted-foreground select-none">
              Wait for the target…
            </p>
          )}

          {phase === "target" && (
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="h-16 w-16 rounded-full bg-primary" />
              <p className="text-sm font-medium text-foreground">Click now!</p>
            </div>
          )}

          {phase === "result" && (
            <div className="text-center">
              {reactionMs === -1 ? (
                <p className="text-sm text-destructive font-medium">Too early! Wait for the target to appear.</p>
              ) : (
                <>
                  <p className="text-3xl font-bold text-foreground">{reactionMs}ms</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {currentType === "interrupted"
                      ? "This trial had a sudden interruption before the target."
                      : "Baseline trial — no interruption."}
                  </p>
                </>
              )}
              <button
                onClick={handleNext}
                className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {trialIndex < TRIALS.length - 1 ? "Next Trial" : "See Results"}
              </button>
            </div>
          )}

          {/* Flash overlay */}
          {flashVisible && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-destructive/10 pointer-events-none">
              <span className="text-4xl select-none">⚡</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuddenNoiseDemo;
