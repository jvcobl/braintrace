import { useState, useCallback } from "react";
import examples from "./gallery/multistableExamples";
import figureRegistry from "./gallery/figures";

type Phase = "choose" | "switch" | "result";

interface ExampleState {
  phase: Phase;
  choice: "a" | "b" | null;
}

const MultistablePerceptionDemo = () => {
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

  const flashAssist = useCallback((target: "a" | "b") => {
    setAssist(target);
    setTimeout(() => setAssist("none"), 1200);
  }, []);

  const completedCount = Object.values(states).filter(
    (s) => s.phase === "result"
  ).length;

  const choiceIdx = state.choice === "a" ? 0 : 1;
  const otherIdx = state.choice === "a" ? 1 : 0;

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
        Each figure below is genuinely ambiguous — the image never changes, but
        your brain can read it in two different ways. Work through the gallery
        and notice the moment of perceptual switch.
      </p>

      {/* Progress dots */}
      <div className="mt-5 flex items-center gap-2">
        {examples.map((ex, i) => {
          const done = states[ex.id]?.phase === "result";
          const active = i === currentIdx;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => { setCurrentIdx(i); setAssist("none"); }}
              aria-label={`Go to ${ex.title}${done ? " (completed)" : ""}`}
              className={`
                h-2 rounded-full transition-all
                ${active ? "w-6 bg-primary" : done ? "w-2 bg-primary/40" : "w-2 bg-border"}
              `}
            />
          );
        })}
        <span className="ml-2 text-[11px] text-muted-foreground">
          {completedCount} / {examples.length}
        </span>
      </div>

      {/* Active example */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6 md:p-8">
        {/* Title + nav */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-foreground">
            {example.title}
          </h3>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => { setCurrentIdx((i) => i - 1); setAssist("none"); }}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous example"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={currentIdx === examples.length - 1}
              onClick={() => { setCurrentIdx((i) => i + 1); setAssist("none"); }}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next example"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Figure */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 240 }}>
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
            <div className="text-center space-y-4">
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
              <p className="text-xs text-muted-foreground leading-relaxed">
                {example.switchHint[choiceIdx]}
              </p>

              {/* Assist buttons */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => flashAssist(state.choice === "a" ? "b" : "a")}
                  className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Highlight {example.interpretations[otherIdx].toLowerCase()}
                </button>
                <button
                  type="button"
                  onClick={() => flashAssist(state.choice!)}
                  className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Highlight {example.interpretations[choiceIdx].toLowerCase()}
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
            <div className="space-y-4 max-w-md mx-auto">
              {/* Choice-specific feedback */}
              <div className="rounded-lg border border-border bg-accent/40 px-4 py-3">
                <p className="text-sm text-foreground leading-relaxed">
                  {example.resultFeedback[choiceIdx]}
                </p>
              </div>

              {/* General explanation */}
              <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  What's happening
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {example.explanation}
                </p>
              </div>

              {/* Neuroscience note */}
              <div className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60 mb-1">
                  Neuroscience
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {example.neuroscienceNote}
                </p>
              </div>

              <div className="flex justify-center gap-3">
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
                    onClick={() => { setCurrentIdx((i) => i + 1); setAssist("none"); }}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Next Example →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MultistablePerceptionDemo;
