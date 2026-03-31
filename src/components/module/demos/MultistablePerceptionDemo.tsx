import { useState, useCallback } from "react";
import examples from "./gallery/multistableExamples";
import figureRegistry from "./gallery/figures";

type Phase = "choose" | "switch" | "result";

interface ExampleState {
  phase: Phase;
  choice: "a" | "b" | null;
}

const MultistablePerceptionDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [states, setStates] = useState<Record<string, ExampleState>>({});
  const [assist, setAssist] = useState<"none" | "a" | "b">("none");

  const example = examples[currentIdx];
  const state: ExampleState = states[example.id] ?? { phase: "choose", choice: null };

  const setExampleState = (patch: Partial<ExampleState>) => {
    setStates((prev) => ({
      ...prev,
      [example.id]: { ...state, ...patch },
    }));
    setAssist("none");
  };

  const Figure = figureRegistry[example.id];
  const highlighted: "none" | "a" | "b" =
    state.phase === "result" && state.choice ? state.choice : "none";

  const handleChoice = (pick: "a" | "b") => {
    setExampleState({ choice: pick, phase: "switch" });
  };

  const handleConfirmSwitch = () => {
    setExampleState({ phase: "result" });
  };

  const handleReset = () => {
    setExampleState({ phase: "choose", choice: null });
  };

  const goToNext = () => {
    if (currentIdx < examples.length - 1) {
      setCurrentIdx((i) => i + 1);
      setAssist("none");
    }
  };

  const flashAssist = useCallback((target: "a" | "b") => {
    setAssist(target);
    setTimeout(() => setAssist("none"), 1400);
  }, []);

  const completedCount = Object.values(states).filter(
    (s) => s.phase === "result"
  ).length;
  const allDone = completedCount === examples.length;

  const choiceIdx = state.choice === "a" ? 0 : 1;
  const otherIdx = state.choice === "a" ? 1 : 0;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-xl">
        Each figure below is genuinely ambiguous — it supports two valid
        interpretations at once. For each one, report what you see first, then
        try to switch. The image never changes; only your brain's reading of it
        does.
      </p>

      {/* Progress indicator */}
      <div className="mt-5 flex items-center gap-2.5">
        {examples.map((ex, i) => {
          const done = states[ex.id]?.phase === "result";
          const active = i === currentIdx;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => { setCurrentIdx(i); setAssist("none"); }}
              aria-label={`${ex.title}${done ? " (completed)" : active ? " (current)" : ""}`}
              className={`
                flex items-center gap-1.5 rounded-full transition-all px-2.5 py-1
                ${active
                  ? "bg-primary/10 border border-primary/25"
                  : done
                    ? "bg-accent/50 border border-border"
                    : "bg-secondary/50 border border-border/50"
                }
              `}
            >
              <span className={`
                block h-1.5 w-1.5 rounded-full transition-colors
                ${active ? "bg-primary" : done ? "bg-primary/50" : "bg-border"}
              `} />
              <span className={`
                text-[11px] font-medium transition-colors
                ${active ? "text-primary" : done ? "text-muted-foreground" : "text-muted-foreground/60"}
              `}>
                {ex.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery completion summary */}
      {allDone && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 space-y-2">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-medium">Gallery complete.</span>{" "}
            You've experienced two types of multistable perception — figure–ground ambiguity and color constancy. In both cases, the image stayed the same; only your brain's interpretation changed.
          </p>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("Trace")}
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group"
            >
              <span>See the neural pathway in Trace</span>
              <span className="text-primary/40 group-hover:text-primary/60 transition-colors" aria-hidden>→</span>
            </button>
          )}
        </div>
      )}

      {/* Active example card */}
      <div className="mt-5 rounded-xl border border-border bg-card overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3 md:px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/50">
              {example.category}
            </span>
            <span className="text-border" aria-hidden>·</span>
            <h3 className="text-sm font-semibold text-foreground">
              {example.title}
            </h3>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => { setCurrentIdx((i) => i - 1); setAssist("none"); }}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous example"
            >
              ←
            </button>
            <button
              type="button"
              disabled={currentIdx === examples.length - 1}
              onClick={goToNext}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next example"
            >
              →
            </button>
          </div>
        </div>

        <div className="px-5 py-6 md:px-8 md:py-8">
          {/* Figure */}
          <div className="mx-auto" style={{ maxWidth: 220 }}>
            {Figure ? (
              <Figure highlighted={highlighted} assist={assist} />
            ) : (
              <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                Figure not available
              </div>
            )}
          </div>

          {/* Interaction area */}
          <div className="mt-6">
            {/* Phase 1: Choose */}
            {state.phase === "choose" && (
              <div className="text-center space-y-4 max-w-sm mx-auto">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {example.prompt}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleChoice("a")}
                    className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {example.interpretations[0]}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChoice("b")}
                    className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {example.interpretations[1]}
                  </button>
                </div>
              </div>
            )}

            {/* Phase 2: Switch */}
            {state.phase === "switch" && state.choice && (
              <div className="text-center space-y-4 max-w-sm mx-auto">
                <p className="text-sm text-foreground leading-relaxed">
                  {example.switchFeedback[choiceIdx]}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  {example.switchHint[choiceIdx]}
                </p>

                {/* Assist buttons */}
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => flashAssist(state.choice === "a" ? "b" : "a")}
                    className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Show {example.interpretations[otherIdx].toLowerCase()}
                  </button>
                  <button
                    type="button"
                    onClick={() => flashAssist(state.choice!)}
                    className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Show {example.interpretations[choiceIdx].toLowerCase()}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmSwitch}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  I can see both
                </button>
              </div>
            )}

            {/* Phase 3: Result */}
            {state.phase === "result" && state.choice && (
              <div className="space-y-3 max-w-md mx-auto">
                {/* Choice-specific feedback */}
                <div className="rounded-lg border border-border bg-accent/40 px-4 py-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    {example.resultFeedback[choiceIdx]}
                  </p>
                </div>

                {/* What changed / what didn't */}
                <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
                    Same stimulus, different interpretation
                  </p>
                  <p className="text-[13px] text-foreground/80 leading-relaxed">
                    {example.invariant}
                  </p>
                </div>

                {/* Mechanism */}
                <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
                    What's happening
                  </p>
                  <p className="text-[13px] text-foreground/80 leading-relaxed">
                    {example.explanation}
                  </p>
                </div>

                {/* Neuroscience */}
                <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60 mb-1.5">
                    Neuroscience
                  </p>
                  <p className="text-[13px] text-foreground/80 leading-relaxed">
                    {example.neuroscienceNote}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    Try Again
                  </button>
                  {currentIdx < examples.length - 1 && (
                    <button
                      type="button"
                      onClick={goToNext}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Next: {examples[currentIdx + 1].title} →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultistablePerceptionDemo;
