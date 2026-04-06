import { useState, useCallback } from "react";
import { ExperienceShell } from "@/components/module/experience";
import type { ExperienceSummary } from "@/components/module/experience";
import PredictionOutcome from "@/components/module/PredictionOutcome";
import { predictionOutcomeContent } from "@/data/content/predictionOutcomeContent";

/* ── Phase types ── */

type Phase = "build" | "override" | "consequences" | "done";

/* ── Build phase data ── */

interface Slot {
  label: string;
  correctAnswer: string;
}

const SLOTS: Slot[] = [
  { label: "Step 1: Detection", correctAnswer: "Hypothalamus releases CRH" },
  { label: "Step 2: Signal", correctAnswer: "Anterior Pituitary releases ACTH" },
  { label: "Step 3: Release", correctAnswer: "Adrenal Cortex releases cortisol" },
  { label: "Step 4: Shutdown", correctAnswer: "Cortisol feeds back to shut down" },
];

const CHIPS = [
  "Hypothalamus releases CRH",
  "Adrenal Cortex releases cortisol",
  "Amygdala detects threat",
  "Anterior Pituitary releases ACTH",
  "Cortisol feeds back to shut down",
  "Hippocampus encodes memory",
];

/* ── Override phase ── */

const OVERRIDE_OPTIONS = [
  { text: "CeA and PFC override the feedback", correct: true },
  { text: "Cortisol stops being produced", correct: false },
  { text: "The adrenal cortex shuts down", correct: false },
];

/* ── Consequences phase ── */

const CONSEQUENCES = [
  { text: "Hippocampal atrophy", correct: true, explanation: "Sustained cortisol damages CA3 and dentate gyrus neurons in the hippocampus." },
  { text: "PFC dendritic shrinkage", correct: true, explanation: "Chronic cortisol causes dendritic retraction in the prefrontal cortex, impairing top-down control." },
  { text: "Immune suppression", correct: true, explanation: "Cortisol suppresses inflammatory responses, weakening immune function over time." },
  { text: "Enhanced long-term memory", correct: false, explanation: "Chronic cortisol impairs memory — it doesn't enhance it. Hippocampal damage disrupts consolidation." },
];

/* ── Summary ── */

function getSummary(buildErrors: number, overrideCorrect: boolean, consequenceScore: number): ExperienceSummary {
  const total = buildErrors + (overrideCorrect ? 0 : 1) + (4 - consequenceScore);
  if (total === 0) {
    return {
      heading: "What This Shows",
      body: "You traced the entire HPA axis — from CRH release through cortisol feedback — and correctly identified what happens when the shutdown fails. The stress response is adaptive in the short term but destructive when the feedback loop is overridden by chronic amygdala and PFC activation.",
      bridge: "Trace shows the full HPA cascade and the override pathway.",
    };
  }
  return {
    heading: "What This Shows",
    body: "The HPA axis is a three-step hormonal cascade with a built-in shutdown mechanism. Under chronic stress, the central amygdala and PFC override that shutdown, keeping cortisol elevated. The consequences — hippocampal atrophy, PFC shrinkage, immune suppression — explain why chronic stress is structurally different from acute stress.",
    bridge: "Trace shows both the normal cascade and the chronic stress override.",
  };
}

/* ── Component ── */

const StressResponseDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [phase, setPhase] = useState<Phase>("build");
  const [filledSlots, setFilledSlots] = useState<string[]>([]);
  const [usedChips, setUsedChips] = useState<Set<string>>(new Set());
  const [shakeSlot, setShakeSlot] = useState<number | null>(null);
  const [buildErrors, setBuildErrors] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Override phase
  const [overrideAnswer, setOverrideAnswer] = useState<number | null>(null);

  // Consequences phase
  const [checkedConsequences, setCheckedConsequences] = useState<Set<number>>(new Set());
  const [consequencesSubmitted, setConsequencesSubmitted] = useState(false);

  const currentSlotIndex = filledSlots.length;
  const buildComplete = filledSlots.length === SLOTS.length;
  const overrideCorrect = overrideAnswer !== null && OVERRIDE_OPTIONS[overrideAnswer].correct;
  const consequenceScore = consequencesSubmitted
    ? CONSEQUENCES.filter((c, i) => c.correct === checkedConsequences.has(i)).length
    : 0;

  const handleChipClick = useCallback(
    (chip: string) => {
      if (buildComplete || usedChips.has(chip)) return;
      if (!hasInteracted) setHasInteracted(true);

      const slot = SLOTS[currentSlotIndex];
      if (chip === slot.correctAnswer) {
        setFilledSlots((prev) => [...prev, chip]);
        setUsedChips((prev) => new Set(prev).add(chip));
      } else {
        setBuildErrors((e) => e + 1);
        setShakeSlot(currentSlotIndex);
        setTimeout(() => setShakeSlot(null), 500);
      }
    },
    [buildComplete, usedChips, currentSlotIndex, hasInteracted],
  );

  const handleOverrideAnswer = useCallback((idx: number) => {
    if (overrideAnswer !== null) return;
    setOverrideAnswer(idx);
  }, [overrideAnswer]);

  const handleConsequenceToggle = useCallback((idx: number) => {
    if (consequencesSubmitted) return;
    setCheckedConsequences((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }, [consequencesSubmitted]);

  const handleRestart = useCallback(() => {
    setPhase("build");
    setFilledSlots([]);
    setUsedChips(new Set());
    setShakeSlot(null);
    setBuildErrors(0);
    setOverrideAnswer(null);
    setCheckedConsequences(new Set());
    setConsequencesSubmitted(false);
  }, []);

  const done = phase === "done";

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="Build the HPA axis step by step. Place each component in the correct order, then explore what happens when the system fails to shut down."
      done={done}
      summary={getSummary(buildErrors, overrideCorrect, consequenceScore)}
      onRestart={handleRestart}
    >
      {/* ── Phase 1: Build the cascade ── */}
      {phase === "build" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-4">
            Build the HPA Axis
          </p>

          {/* Cascade slots */}
          <div className="space-y-2 mb-6">
            {SLOTS.map((slot, i) => {
              const filled = filledSlots[i];
              const isCurrent = i === currentSlotIndex && !buildComplete;
              const isShaking = shakeSlot === i;

              return (
                <div key={i} className="flex items-center gap-3">
                  {/* Arrow connector */}
                  {i > 0 && (
                    <div className="w-6 flex justify-center -my-1">
                      <div className="text-gray-300 text-lg leading-none">↓</div>
                    </div>
                  )}
                  {i === 0 && <div className="w-6" />}
                  <div
                    className={`flex-1 rounded-lg border-2 px-4 py-3 transition-all ${
                      filled
                        ? "border-primary/40 bg-primary/5"
                        : isCurrent
                          ? `border-primary/30 bg-white ${isShaking ? "animate-[shake_0.3s_ease-in-out]" : ""}`
                          : "border-dashed border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-0.5">
                      {slot.label}
                    </p>
                    {filled ? (
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm">✓</span>
                        <span className="text-sm font-medium text-gray-900">{filled}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        {isCurrent ? "Select from below..." : "—"}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chip pool */}
          {!buildComplete && (
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => {
                const used = usedChips.has(chip);
                return (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    disabled={used}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                      used
                        ? "border-gray-100 bg-gray-50 text-gray-300 cursor-default"
                        : "border-gray-200 bg-white text-gray-800 hover:border-primary/40 hover:bg-primary/5 active:scale-[0.97] cursor-pointer"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          )}

          {/* Build success */}
          {buildComplete && (
            <div className="text-center mt-2">
              <p className="text-sm font-medium text-primary mb-1">
                You built the HPA axis.
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Now let's see what happens when the shutdown fails.
              </p>
              <button
                onClick={() => setPhase("override")}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Phase 2: Override question ── */}
      {phase === "override" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-500 mb-4">
            Feedback Override
          </p>

          {/* Completed cascade with feedback highlighted */}
          <div className="rounded-lg bg-gray-50 p-4 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Hypothalamus</span>
              <span className="text-gray-300">→</span>
              <span>Pituitary</span>
              <span className="text-gray-300">→</span>
              <span>Adrenal Cortex</span>
              <span className="text-gray-300">→</span>
              <span className="font-medium">Cortisol</span>
            </div>
            <div className={`mt-2 text-xs px-2 py-1 rounded inline-block ${
              overrideAnswer !== null && overrideCorrect
                ? "bg-destructive/10 text-destructive line-through"
                : "bg-primary/10 text-primary"
            }`}>
              ↩ Negative feedback → Hypothalamus
            </div>
          </div>

          <p className="text-sm font-medium text-foreground mb-3">
            Under extreme or chronic stress, what prevents the feedback loop from working?
          </p>

          <div className="space-y-2">
            {OVERRIDE_OPTIONS.map((opt, i) => {
              const selected = overrideAnswer === i;
              let style = "border-gray-200 bg-white text-gray-800 hover:border-gray-300";
              if (overrideAnswer !== null) {
                if (opt.correct) {
                  style = "border-primary bg-primary/5 text-gray-900";
                } else if (selected) {
                  style = "border-destructive bg-destructive/5 text-gray-900";
                } else {
                  style = "border-gray-100 bg-gray-50 text-gray-400";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleOverrideAnswer(i)}
                  disabled={overrideAnswer !== null}
                  className={`w-full text-left rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${style} disabled:cursor-default`}
                >
                  {opt.text}
                  {overrideAnswer !== null && opt.correct && (
                    <span className="ml-2 text-primary">✓</span>
                  )}
                  {selected && !opt.correct && (
                    <span className="ml-2 text-destructive">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {overrideAnswer !== null && (
            <div className="mt-5">
              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                {overrideCorrect
                  ? "Correct — the central amygdala (CeA) and PFC send override signals that prevent cortisol from shutting the axis down. The cascade keeps running despite elevated cortisol."
                  : "The correct answer is: CeA and PFC override the feedback. Under chronic stress, these structures actively prevent the negative feedback loop from shutting the cascade down."}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setPhase("consequences")}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Phase 3: Consequences ── */}
      {phase === "consequences" && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-4">
            Chronic Stress Consequences
          </p>

          <p className="text-sm font-medium text-foreground mb-4">
            What does sustained cortisol do to the brain? Select all that apply.
          </p>

          <div className="space-y-2">
            {CONSEQUENCES.map((c, i) => {
              const checked = checkedConsequences.has(i);
              let style = "border-gray-200 bg-white";
              if (consequencesSubmitted) {
                if (c.correct && checked) style = "border-primary bg-primary/5";
                else if (!c.correct && checked) style = "border-destructive bg-destructive/5";
                else if (c.correct && !checked) style = "border-amber-400 bg-amber-50";
                else style = "border-gray-100 bg-gray-50";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleConsequenceToggle(i)}
                  disabled={consequencesSubmitted}
                  className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${style} disabled:cursor-default`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${
                      checked ? "bg-primary border-primary" : "border-gray-300"
                    }`}>
                      {checked && <span className="text-white text-[10px] font-bold">✓</span>}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{c.text}</span>
                  </div>
                  {consequencesSubmitted && (
                    <p className="mt-1.5 ml-7 text-xs text-gray-500 leading-relaxed">{c.explanation}</p>
                  )}
                </button>
              );
            })}
          </div>

          {!consequencesSubmitted ? (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setConsequencesSubmitted(true)}
                disabled={checkedConsequences.size === 0}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Check Answers
              </button>
            </div>
          ) : (
            <div className="mt-5 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {consequenceScore === 4
                  ? "All correct — you identified every consequence of sustained cortisol."
                  : `${consequenceScore} of 4 correct. The highlighted items show what you missed.`}
              </p>
              <button
                onClick={() => setPhase("done")}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                See Summary
              </button>
            </div>
          )}
        </div>
      )}

      {/* Prediction & Outcome bridge */}
      <div className="mt-3">
        <PredictionOutcome
          visible={hasInteracted}
          {...predictionOutcomeContent["stress-response-builder"]}
          onNavigateTrace={onNavigate ? () => onNavigate("Trace") : undefined}
        />
      </div>
    </ExperienceShell>
  );
};

export default StressResponseDemo;
