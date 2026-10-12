import { useState, useCallback, useEffect, useRef } from "react";
import { ExperienceShell } from "@/components/module/experience";
import type { ExperienceSummary } from "@/components/module/experience";
import PredictionOutcome from "@/components/module/PredictionOutcome";
import { predictionOutcomeContent } from "@/data/content/predictionOutcomeContent";
import { stressResponseContent } from "@/data/content/stressResponseContent";
import CortisolGraph from "@/components/module/stress-response/CortisolGraph";

/* ── Phase types ── */

type Phase = "build" | "override" | "consequences" | "done";

/* ── Build phase data ── */

interface Slot {
  label: string;
  correctAnswer: string;
}

const CASCADE_SLOTS: Slot[] = [
  { label: "Step 1: Initiation", correctAnswer: "Hypothalamus releases CRH" },
  { label: "Step 2: Signal", correctAnswer: "Anterior Pituitary releases ACTH" },
  { label: "Step 3: Release", correctAnswer: "Adrenal Cortex releases cortisol" },
];

const FEEDBACK_SLOT: Slot = { label: "Step 4: Shutdown", correctAnswer: "Cortisol feeds back to shut down" };

const SLOTS: Slot[] = [...CASCADE_SLOTS, FEEDBACK_SLOT];

const CASCADE_CHIPS = [
  "Hypothalamus releases CRH",
  "Adrenal Cortex releases cortisol",
  "Amygdala detects threat",
  "Anterior Pituitary releases ACTH",
  "Hippocampus encodes memory",
];

const FEEDBACK_CHIP = "Cortisol feeds back to shut down";

const CHIPS = [...CASCADE_CHIPS, FEEDBACK_CHIP];

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
  const shakeTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(shakeTimer.current), []);
  const [buildErrors, setBuildErrors] = useState(0);

  // Build sub-steps
  const [buildStep, setBuildStep] = useState<"placing-A" | "running-A" | "result-A" | "placing-B" | "running-B" | "result-B">("placing-A");

  // Consequences prediction
  const [consequencesPrediction, setConsequencesPrediction] = useState<"works" | "weakens" | null>(null);

  // Override phase
  const [overrideAnswer, setOverrideAnswer] = useState<number | null>(null);

  // Consequences phase
  const [checkedConsequences, setCheckedConsequences] = useState<Set<number>>(new Set());
  const [consequencesSubmitted, setConsequencesSubmitted] = useState(false);

  const inStepB = buildStep === "placing-B" || buildStep === "running-B" || buildStep === "result-B";
  const visibleSlots = inStepB ? SLOTS : CASCADE_SLOTS;
  const visibleChips = inStepB ? CHIPS : CASCADE_CHIPS;
  const currentSlotIndex = filledSlots.length;
  const cascadeFilled = filledSlots.length >= CASCADE_SLOTS.length;
  const buildComplete = filledSlots.length === SLOTS.length;
  const overrideCorrect = overrideAnswer !== null && OVERRIDE_OPTIONS[overrideAnswer].correct;
  const consequenceScore = consequencesSubmitted
    ? CONSEQUENCES.filter((c, i) => c.correct === checkedConsequences.has(i)).length
    : 0;

  const handleChipClick = useCallback(
    (chip: string) => {
      if (buildComplete || usedChips.has(chip)) return;

      const slot = SLOTS[currentSlotIndex];
      clearTimeout(shakeTimer.current);
      if (chip === slot.correctAnswer) {
        setShakeSlot(null);
        setFilledSlots((prev) => [...prev, chip]);
        setUsedChips((prev) => new Set(prev).add(chip));
      } else {
        setBuildErrors((e) => e + 1);
        setShakeSlot(currentSlotIndex);
        shakeTimer.current = setTimeout(() => setShakeSlot(null), 500);
      }
    },
    [buildComplete, usedChips, currentSlotIndex],
  );

  const handleOverrideAnswer = useCallback((idx: number) => {
    if (overrideAnswer !== null) return;
    setOverrideAnswer(idx);
  }, [overrideAnswer]);

  const handleConsequenceToggle = useCallback((idx: number) => {
    if (consequencesSubmitted) return;
    setCheckedConsequences((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, [consequencesSubmitted]);

  const handleRestart = useCallback(() => {
    clearTimeout(shakeTimer.current);
    setPhase("build");
    setBuildStep("placing-A");
    setConsequencesPrediction(null);
    setFilledSlots([]);
    setUsedChips(new Set());
    setShakeSlot(null);
    setBuildErrors(0);
    setOverrideAnswer(null);
    setCheckedConsequences(new Set());
    setConsequencesSubmitted(false);
  }, []);

  const done = phase === "done";
  const firstOpenChip = visibleChips.find((chip) => !usedChips.has(chip));
  const lastPlacedIndex = filledSlots.length - 1;
  const nextSlot = currentSlotIndex < visibleSlots.length ? visibleSlots[currentSlotIndex] : null;
  const stepKey = [
    phase,
    buildStep,
    filledSlots.length,
    buildErrors,
    overrideAnswer ?? "",
    consequencesPrediction ?? "",
    consequencesSubmitted ? "checked" : "",
  ].join("-");

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="Build the HPA axis step by step. Place each component in the correct order, then explore what happens when the system fails to shut down."
      done={done}
      summary={getSummary(buildErrors, overrideCorrect, consequenceScore)}
      onRestart={handleRestart}
      stepKey={stepKey}
      footer={
        <PredictionOutcome
          visible
          {...predictionOutcomeContent["stress-response-builder"]}
          onNavigateTrace={onNavigate ? () => onNavigate("Trace") : undefined}
        />
      }
    >
      {/* ── Phase 1: Build the cascade ── */}
      {phase === "build" && (
        <div data-reveal className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-4">
            {inStepB ? "Add Negative Feedback" : "Build the Cascade"}
          </p>

          {inStepB && buildStep === "placing-B" && (
            <p data-announce={(filledSlots.length === CASCADE_SLOTS.length && shakeSlot === null) || undefined} className="text-sm text-muted-foreground mb-4">
              A new component is available. Place it in the shutdown slot, then run the cascade again.
            </p>
          )}

          {/* Placement results for screen readers (the slots below show them visually). */}
          {(buildStep === "placing-A" || buildStep === "placing-B") && (
            <p data-announce className="sr-only">
              {shakeSlot !== null
                ? `That doesn't belong in ${SLOTS[shakeSlot]?.label ?? "this step"}. Try another component.`
                : lastPlacedIndex >= 0 && !(buildStep === "placing-B" && lastPlacedIndex < CASCADE_SLOTS.length)
                  ? `Placed in ${SLOTS[lastPlacedIndex].label}: ${filledSlots[lastPlacedIndex]}.`
                  : ""}
              {nextSlot && shakeSlot === null ? ` Next: ${nextSlot.label}.` : ""}
            </p>
          )}

          {/* Cascade slots — visible slots depend on sub-step */}
          {(buildStep === "placing-A" || buildStep === "placing-B") && (
            <div className="mb-6">
              {visibleSlots.map((slot, i) => {
                const filled = filledSlots[i];
                const slotsToFill = inStepB ? SLOTS.length : CASCADE_SLOTS.length;
                const isCurrent = i === currentSlotIndex && filledSlots.length < slotsToFill;
                const isShaking = shakeSlot === i;

                return (
                  <div key={i}>
                    {i > 0 && (
                      <div className="flex justify-center py-1">
                        <div className={`w-px h-4 ${filledSlots[i - 1] ? "bg-primary/30" : "bg-gray-200"}`} />
                      </div>
                    )}
                    <div
                      className={`rounded-lg border-2 px-4 py-3 transition-all duration-200 ${
                        filled
                          ? "border-primary/40 bg-primary/5"
                          : isCurrent
                            ? `border-primary/30 bg-white ${isShaking ? "animate-[shake_0.3s_ease-in-out]" : ""}`
                            : "border-dashed border-gray-200 bg-gray-50/50"
                      }`}
                    >
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-0.5">
                        {slot.label}
                      </p>
                      {filled ? (
                        <div className="flex items-center gap-2">
                          <span className="text-primary text-sm">✓</span>
                          <span className="text-sm font-medium text-gray-900">{filled}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          {isCurrent ? "Select from below..." : "—"}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Chip pool — feedback chip hidden in step A */}
          {buildStep === "placing-A" && !cascadeFilled && (
            <div className="flex flex-wrap gap-2">
              {visibleChips.map((chip) => {
                const used = usedChips.has(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    disabled={used}
                    data-autofocus={chip === firstOpenChip || undefined}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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

          {buildStep === "placing-B" && !buildComplete && (
            <div className="flex flex-wrap gap-2">
              {visibleChips.map((chip) => {
                const used = usedChips.has(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    disabled={used}
                    data-autofocus={chip === firstOpenChip || undefined}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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

          {/* Step A: cascade filled → Run button */}
          {buildStep === "placing-A" && cascadeFilled && (
            <div className="text-center mt-4 pt-4 border-t border-gray-100">
              <button
                data-autofocus
                onClick={() => setBuildStep("running-A")}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Run the cascade
              </button>
            </div>
          )}

          {/* Step A: running simulation */}
          {buildStep === "running-A" && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <CortisolGraph mode="runaway" onComplete={() => setBuildStep("result-A")} />
            </div>
          )}

          {/* Step A: result */}
          {buildStep === "result-A" && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <CortisolGraph mode="runaway" instant className="w-full max-w-xs mx-auto opacity-80" />
              <p data-announce className="mt-4 text-sm text-muted-foreground leading-relaxed text-center">
                {stressResponseContent.buildStepARunningCaption}
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  data-autofocus
                  onClick={() => setBuildStep("placing-B")}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Add the missing piece
                </button>
              </div>
            </div>
          )}

          {/* Step B: build complete → Run button */}
          {buildStep === "placing-B" && buildComplete && (
            <div className="text-center mt-4 pt-4 border-t border-gray-100">
              <button
                data-autofocus
                onClick={() => setBuildStep("running-B")}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Run with feedback
              </button>
            </div>
          )}

          {/* Step B: running simulation */}
          {buildStep === "running-B" && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <CortisolGraph mode="recovery" onComplete={() => setBuildStep("result-B")} />
            </div>
          )}

          {/* Step B: result → advance to Override */}
          {buildStep === "result-B" && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <CortisolGraph mode="recovery" instant className="w-full max-w-xs mx-auto opacity-80" />
              <p data-announce className="mt-4 text-sm text-muted-foreground leading-relaxed text-center">
                {stressResponseContent.buildStepBRunningCaption}
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  data-autofocus
                  onClick={() => setPhase("override")}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Phase 2: Override question ── */}
      {phase === "override" && (
        <div data-reveal className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-4">
            Feedback Override
          </p>

          {/* Completed cascade with feedback highlighted */}
          <div className="rounded-lg bg-gray-50 p-4 mb-5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-700">
              <span>Hypothalamus</span>
              <span className="text-gray-400" aria-hidden="true">→</span>
              <span>Anterior Pituitary</span>
              <span className="text-gray-400" aria-hidden="true">→</span>
              <span>Adrenal Cortex</span>
              <span className="text-gray-400" aria-hidden="true">→</span>
              <span className="font-medium">Cortisol</span>
            </div>
            <div className={`mt-2 text-xs px-2 py-1 rounded inline-block ${
              overrideAnswer !== null
                ? "bg-destructive/10 text-destructive line-through"
                : "bg-primary/10 text-primary"
            }`}>
              ↩ Negative feedback → Hypothalamus
            </div>
          </div>

          <p data-announce={overrideAnswer === null || undefined} className="text-sm font-medium text-foreground mb-3">
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
                  style = "border-gray-100 bg-gray-50 text-gray-500";
                }
              }
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleOverrideAnswer(i)}
                  disabled={overrideAnswer !== null}
                  data-autofocus={(overrideAnswer === null && i === 0) || undefined}
                  className={`w-full text-left rounded-lg border px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${style} disabled:cursor-default`}
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
              <div data-announce className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                {overrideCorrect
                  ? "Correct — the central amygdala (CeA) and PFC send override signals that prevent cortisol from shutting the axis down. The cascade keeps running despite elevated cortisol."
                  : "The correct answer is: CeA and PFC override the feedback. Under chronic stress, these structures actively prevent the negative feedback loop from shutting the cascade down."}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  data-autofocus
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
        <div data-reveal className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-4">
            Chronic Stress Consequences
          </p>

          {consequencesPrediction === null && (
            <div>
              <p data-announce className="text-sm font-medium text-foreground mb-4">
                {stressResponseContent.consequencesPredictionPrompt}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setConsequencesPrediction("works")}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {stressResponseContent.consequencesPredictionOptions.works}
                </button>
                <button
                  type="button"
                  onClick={() => setConsequencesPrediction("weakens")}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {stressResponseContent.consequencesPredictionOptions.weakens}
                </button>
              </div>
            </div>
          )}

          {consequencesPrediction !== null && (
            <>
              <p data-announce={!consequencesSubmitted || undefined} className="text-sm font-medium text-foreground mb-4">
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
                  type="button"
                  onClick={() => handleConsequenceToggle(i)}
                  disabled={consequencesSubmitted}
                  aria-pressed={checked}
                  data-autofocus={(!consequencesSubmitted && i === 0) || undefined}
                  className={`w-full text-left rounded-lg border px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${style} disabled:cursor-default`}
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
            <div data-announce className="mt-5 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {consequenceScore === 4
                  ? "All correct — you identified every consequence of sustained cortisol."
                  : `${consequenceScore} of 4 correct. The highlighted items show what to review.`}
              </p>
              <p className="text-sm text-foreground mb-4 leading-relaxed">
                {consequencesPrediction === "works"
                  ? stressResponseContent.consequencesResultIfWorks
                  : stressResponseContent.consequencesResultIfWeakens}
              </p>
              <button
                data-autofocus
                onClick={() => setPhase("done")}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                See Summary
              </button>
            </div>
          )}
            </>
          )}
        </div>
      )}

    </ExperienceShell>
  );
};

export default StressResponseDemo;
