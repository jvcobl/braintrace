import { useState, useCallback, useRef, useEffect } from "react";

type Phase = "ready" | "waiting" | "target" | "result";
type TrialType = "baseline" | "interrupted";

interface TrialResult {
  type: TrialType;
  reactionMs: number;
}

const TRIALS: TrialType[] = ["baseline", "interrupted", "baseline", "interrupted"];

const SuddenNoiseDemo = () => {
  const [trialIndex, setTrialIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [muted, setMuted] = useState(true);
  const [flashVisible, setFlashVisible] = useState(false);

  const targetTime = useRef(0);
  const waitTimer = useRef<ReturnType<typeof setTimeout>>();
  const interruptTimer = useRef<ReturnType<typeof setTimeout>>();
  const audioCtx = useRef<AudioContext | null>(null);

  const done = trialIndex >= TRIALS.length;
  const currentType = !done ? TRIALS[trialIndex] : null;

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
    setPhase("waiting");
    setReactionMs(null);
    setFlashVisible(false);

    const delay = 2000 + Math.random() * 2000;

    if (currentType === "interrupted") {
      const interruptAt = delay - 500;
      interruptTimer.current = setTimeout(() => {
        setFlashVisible(true);
        playTone();
        setTimeout(() => setFlashVisible(false), 120);
      }, Math.max(interruptAt, 1000));
    }

    waitTimer.current = setTimeout(() => {
      targetTime.current = performance.now();
      setPhase("target");
    }, delay);
  }, [currentType, playTone]);

  const handleClick = useCallback(() => {
    if (phase === "target") {
      const ms = Math.round(performance.now() - targetTime.current);
      setReactionMs(ms);
      setPhase("result");
    } else if (phase === "waiting") {
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (interruptTimer.current) clearTimeout(interruptTimer.current);
      setFlashVisible(false);
      setReactionMs(-1);
      setPhase("result");
    }
  }, [phase]);

  const handleNext = useCallback(() => {
    if (reactionMs !== null && reactionMs > 0 && currentType) {
      setResults((prev) => [...prev, { type: currentType, reactionMs }]);
    }
    setTrialIndex((i) => i + 1);
    setPhase("ready");
    setReactionMs(null);
    setFlashVisible(false);
  }, [reactionMs, currentType]);

  const handleRestart = useCallback(() => {
    setTrialIndex(0);
    setPhase("ready");
    setReactionMs(null);
    setResults([]);
    setFlashVisible(false);
  }, []);

  if (done) {
    const baselineResults = results.filter((r) => r.type === "baseline");
    const interruptedResults = results.filter((r) => r.type === "interrupted");
    const avg = (arr: TrialResult[]) =>
      arr.length > 0 ? Math.round(arr.reduce((s, r) => s + r.reactionMs, 0) / arr.length) : null;
    const avgB = avg(baselineResults);
    const avgI = avg(interruptedResults);

    return (
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
        <div className="mt-4 rounded-lg border border-border bg-card p-8">
          <h3 className="font-display text-lg font-semibold text-foreground text-center">What This Shows</h3>
          <div className="mt-5 grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">Calm Trials</p>
              <p className="mt-1 text-xl font-bold text-foreground">{avgB !== null ? `${avgB}ms` : "—"}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground">Interrupted</p>
              <p className="mt-1 text-xl font-bold text-foreground">{avgI !== null ? `${avgI}ms` : "—"}</p>
            </div>
          </div>
          <div className="mt-5 max-w-md mx-auto text-sm text-muted-foreground leading-relaxed space-y-2">
            {avgB !== null && avgI !== null ? (
              avgI < avgB ? (
                <p>Your reaction was faster after the interruption — the sudden stimulus primed your brainstem startle circuit, putting your motor system on alert.</p>
              ) : avgI > avgB + 20 ? (
                <p>Your reaction was slower after the interruption — the unexpected stimulus captured your attention, momentarily competing with the task.</p>
              ) : (
                <p>Your reaction times were similar. The interruption may have both primed your motor system and briefly captured attention.</p>
              )
            ) : (
              <p>Not enough valid trials to compare — try again.</p>
            )}
            <p className="pt-1">Continue to <strong>Trace</strong> to see the reflex circuit and how the amygdala modulates it.</p>
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

  const isActive = phase === "waiting" || phase === "target";

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">Click as fast as you can when the circle appears.</p>

      <div className="mt-4 rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Trial {trialIndex + 1} of {TRIALS.length}</p>
          <button
            onClick={() => setMuted((m) => !m)}
            className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
            aria-label={muted ? "Turn sound on" : "Mute sound"}
          >
            {muted ? "🔇 Sound Off" : "🔊 Sound On"}
          </button>
        </div>

        <div
          className={`relative flex min-h-[180px] items-center justify-center rounded-lg transition-colors duration-100 ${
            flashVisible ? "bg-accent" : phase === "target" ? "bg-primary/10" : "bg-secondary"
          }`}
          onClick={isActive ? handleClick : undefined}
          onKeyDown={isActive ? (e) => { if (e.key === " " || e.key === "Enter") handleClick(); } : undefined}
          role={isActive ? "button" : undefined}
          tabIndex={isActive ? 0 : undefined}
          style={{ cursor: isActive ? "pointer" : "default" }}
        >
          {phase === "ready" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Get ready — click when the circle appears.</p>
              <button
                onClick={startTrial}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Begin
              </button>
            </div>
          )}

          {phase === "waiting" && (
            <p className="text-sm text-muted-foreground select-none">Wait for it…</p>
          )}

          {phase === "target" && (
            <div className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full bg-primary animate-pulse" />
              <p className="text-sm font-medium text-foreground">Now!</p>
            </div>
          )}

          {phase === "result" && (
            <div className="text-center">
              {reactionMs === -1 ? (
                <p className="text-sm font-medium text-destructive">Too early — wait for the circle.</p>
              ) : (
                <p className="text-3xl font-bold text-foreground">{reactionMs}ms</p>
              )}
              <button
                onClick={handleNext}
                className="mt-4 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {trialIndex < TRIALS.length - 1 ? "Next" : "See Results"}
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
    </section>
  );
};

export default SuddenNoiseDemo;
