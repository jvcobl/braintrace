import { useState, useCallback } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback, ExperienceSummary } from "@/components/module/experience";
import PredictionOutcome from "@/components/module/PredictionOutcome";
import { predictionOutcomeContent } from "@/data/content/predictionOutcomeContent";

/* ── Step 1: Sequence data ── */

interface CascadeStep {
  id: string;
  structure: string;
  action: string;
  detail: string;
}

const CORRECT_SEQUENCE: CascadeStep[] = [
  { id: "hypothalamus", structure: "Hypothalamus", action: "releases CRH", detail: "Corticotropin-releasing hormone initiates the stress cascade." },
  { id: "pituitary", structure: "Anterior Pituitary", action: "releases ACTH", detail: "Adrenocorticotropic hormone travels via the bloodstream to the adrenal glands." },
  { id: "adrenal", structure: "Adrenal Cortex", action: "releases Cortisol", detail: "Glucocorticoids mobilize energy and modulate immune and brain function." },
];

/* ── Feedback from pasted spec ── */

const sequenceFeedback: Record<"correct" | "orderError" | "hormoneError", ExperienceFeedback> = {
  correct: {
    primary: "Correct sequence: hypothalamus → pituitary → adrenal cortex.",
    secondary: "The HPA axis follows a strict three-step cascade: the hypothalamus releases CRH, the anterior pituitary responds with ACTH, and the adrenal cortex produces glucocorticoids (cortisol). Each step depends on the previous one — the order is fixed.",
    bridge: "Trace walks through the full HPA cascade.",
    structure: "Hypothalamus → Pituitary → Adrenal cortex",
  },
  orderError: {
    primary: "The order was not quite right.",
    secondary: "The HPA axis is a strict cascade: CRH from the hypothalamus must reach the pituitary before ACTH can be released, and ACTH must reach the adrenal cortex before cortisol is produced. Each hormone acts as the trigger for the next step — they cannot fire out of sequence.",
    bridge: "Trace shows why the order matters.",
    structure: "HPA cascade (sequence-dependent)",
  },
  hormoneError: {
    primary: "The structures were right, but the hormones were mismatched.",
    secondary: "Each structure in the HPA axis releases a specific hormone: hypothalamus → CRH, anterior pituitary → ACTH, adrenal cortex → glucocorticoids (cortisol). The hormones are the chemical signals that connect the three structures into a cascade.",
    bridge: "Trace labels each structure with its hormone.",
    structure: "CRH → ACTH → cortisol",
  },
};

const feedbackLoopFeedback: Record<"correct" | "missing", ExperienceFeedback> = {
  correct: {
    primary: "Correct — cortisol feeds back to shut the system down.",
    secondary: "Under normal conditions, cortisol travels back to the hypothalamus and pituitary, inhibiting further CRH and ACTH release. This negative feedback loop is what turns the stress response off after the stressor passes. Without it, cortisol would continue accumulating.",
    bridge: "Trace shows the feedback loop closing the cascade.",
    structure: "Cortisol → hypothalamus/pituitary (inhibition)",
  },
  missing: {
    primary: "The feedback loop was missed — this is the key regulatory mechanism.",
    secondary: "Negative feedback is what prevents the stress response from running indefinitely. Cortisol circulates back to the hypothalamus and pituitary to suppress further hormone release. Without this step, the HPA axis would continue producing cortisol long after the stressor is gone — which is exactly what happens under chronic stress when the loop is overridden.",
    bridge: "Trace shows what happens when feedback fails.",
    structure: "Missing negative feedback → chronic cortisol",
  },
};

const overrideFeedback: Record<"understood" | "misunderstood", ExperienceFeedback> = {
  understood: {
    primary: "Correct — extreme stress can override the shutdown.",
    secondary: "Under extreme or chronic stress, the central amygdala (CeA) and PFC send signals that prevent the negative feedback loop from working. The HPA axis stays active despite high cortisol levels. This is the mechanism that leads to chronic stress damage: hippocampal atrophy, PFC dendritic shrinkage, immune suppression, and sleep disruption.",
    bridge: "Trace shows the CeA/PFC override and its downstream effects.",
    structure: "CeA + PFC override → sustained cortisol",
  },
  misunderstood: {
    primary: "The override mechanism was not identified correctly.",
    secondary: "Normally, high cortisol inhibits the hypothalamus and pituitary (negative feedback). But under extreme stress, the CeA and PFC can override this feedback, keeping the HPA axis active. This is not a failure of cortisol — it is a failure of the shutdown mechanism. The distinction matters because it explains why chronic stress causes cumulative brain damage even though the feedback loop exists.",
    bridge: "Compare normal shutdown vs override in Trace.",
    structure: "Negative feedback vs CeA/PFC override",
  },
};

function getSummary(seqCorrect: boolean, fbCorrect: boolean, ovCorrect: boolean): ExperienceSummary {
  if (seqCorrect && fbCorrect && ovCorrect) {
    return {
      heading: "What This Shows",
      body: "The full system runs: hypothalamus (CRH) → pituitary (ACTH) → adrenal cortex (cortisol) → negative feedback to hypothalamus/pituitary. Under extreme stress, the CeA and PFC override this feedback. The result is sustained cortisol exposure, which causes hippocampal and PFC atrophy — the structures needed to manage stress are damaged by the stress itself.",
      bridge: "Review covers the consequences of chronic overload.",
    };
  }
  return {
    heading: "What This Shows",
    body: "The most commonly missed elements are the negative feedback loop (cortisol shutting down its own production) and the override mechanism (CeA/PFC preventing shutdown under extreme stress). These two mechanisms are what separate normal stress recovery from chronic allostatic overload.",
    bridge: "Trace walks through each step including feedback and override.",
  };
}

/* ── Shuffle helper ── */

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ── Component ── */

type DemoPhase = "sequence" | "sequence-result" | "feedback-loop" | "feedback-loop-result" | "override" | "override-result" | "done";

const HPAAxisBuilderDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [phase, setPhase] = useState<DemoPhase>("sequence");
  const [available, setAvailable] = useState(() => shuffle(CORRECT_SEQUENCE));
  const [placed, setPlaced] = useState<CascadeStep[]>([]);

  // Results tracking
  const [seqResult, setSeqResult] = useState<"correct" | "orderError" | "hormoneError" | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [fbResult, setFbResult] = useState<"correct" | "missing" | null>(null);
  const [ovResult, setOvResult] = useState<"understood" | "misunderstood" | null>(null);

  // Feedback loop answer
  const [fbAnswer, setFbAnswer] = useState<string | null>(null);
  // Override answer
  const [ovAnswer, setOvAnswer] = useState<string | null>(null);

  const handlePlace = useCallback((item: CascadeStep) => {
    setPlaced((prev) => [...prev, item]);
    setAvailable((prev) => prev.filter((a) => a.id !== item.id));
  }, []);

  const handleRemove = useCallback((item: CascadeStep) => {
    setPlaced((prev) => prev.filter((p) => p.id !== item.id));
    setAvailable((prev) => [...prev, item]);
  }, []);

  const handleCheckSequence = useCallback(() => {
    const isCorrect = placed.every((p, i) => p.id === CORRECT_SEQUENCE[i].id);
    setSeqResult(isCorrect ? "correct" : "orderError");
    setPhase("sequence-result");
    if (!hasInteracted) setHasInteracted(true);
  }, [placed]);

  const handleContinueToFeedback = useCallback(() => {
    setPhase("feedback-loop");
  }, []);

  const handleCheckFeedbackLoop = useCallback((answer: string) => {
    setFbAnswer(answer);
    const correct = answer === "inhibits-hypothalamus-pituitary";
    setFbResult(correct ? "correct" : "missing");
    setPhase("feedback-loop-result");
  }, []);

  const handleContinueToOverride = useCallback(() => {
    setPhase("override");
  }, []);

  const handleCheckOverride = useCallback((answer: string) => {
    setOvAnswer(answer);
    const correct = answer === "cea-pfc-override";
    setOvResult(correct ? "understood" : "misunderstood");
    setPhase("override-result");
  }, []);

  const handleFinish = useCallback(() => {
    setPhase("done");
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("sequence");
    setPlaced([]);
    setAvailable(shuffle(CORRECT_SEQUENCE));
    setSeqResult(null);
    setFbResult(null);
    setOvResult(null);
    setFbAnswer(null);
    setOvAnswer(null);
  }, []);

  const done = phase === "done";
  const phaseIndex = ["sequence", "sequence-result"].includes(phase) ? 0
    : ["feedback-loop", "feedback-loop-result"].includes(phase) ? 1
    : ["override", "override-result"].includes(phase) ? 2 : 3;

  const phaseLabels = [
    { label: "HPA Cascade", color: "text-primary" },
    { label: "Negative Feedback", color: "text-amber-500" },
    { label: "Override", color: "text-destructive" },
  ];

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="Build the HPA stress response in three parts: the cascade order, the shutdown mechanism, and what happens when shutdown fails under extreme stress."
      done={done}
      summary={getSummary(seqResult === "correct", fbResult === "correct", ovResult === "understood")}
      onRestart={handleRestart}
    >
      {/* Phase indicator */}
      <div className="flex items-center gap-4 mb-5">
        {phaseLabels.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`block h-2 w-2 rounded-full transition-colors ${
              i < phaseIndex ? "bg-primary/60"
              : i === phaseIndex ? "bg-primary"
              : "bg-border"
            }`} />
            <span className={`text-[11px] font-medium transition-colors ${
              i === phaseIndex ? p.color : i < phaseIndex ? "text-muted-foreground" : "text-muted-foreground/50"
            }`}>
              {p.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Phase 1: Sequence building ── */}
      {(phase === "sequence" || phase === "sequence-result") && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary mb-1">
              Part 1 — HPA Cascade
            </p>
            <p className="text-sm text-muted-foreground">
              Place the three structures in the correct order of the stress response cascade.
            </p>
          </div>

          {/* Placed sequence */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Your Sequence
            </p>
            <div className="min-h-[56px] rounded-lg border border-border bg-secondary/20 p-3">
              {placed.length === 0 ? (
                <p className="text-sm text-muted-foreground/60 italic">Select steps from below…</p>
              ) : (
                <ol className="space-y-2">
                  {placed.map((item, i) => {
                    const correct = phase === "sequence-result" && item.id === CORRECT_SEQUENCE[i]?.id;
                    const wrong = phase === "sequence-result" && item.id !== CORRECT_SEQUENCE[i]?.id;
                    return (
                      <li
                        key={item.id}
                        className={`flex items-start gap-3 rounded-md border px-3 py-2 text-sm transition-colors ${
                          correct ? "border-primary/30 bg-primary/5"
                          : wrong ? "border-destructive/30 bg-destructive/5"
                          : "border-border bg-card"
                        }`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <span className="font-medium text-foreground">{item.structure}</span>
                          <span className="text-muted-foreground"> — {item.action}</span>
                          {phase === "sequence-result" && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                          )}
                        </div>
                        {phase === "sequence" && (
                          <button
                            type="button"
                            onClick={() => handleRemove(item)}
                            className="shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`Remove ${item.structure}`}
                          >
                            ✕
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>

          {/* Available pool */}
          {phase === "sequence" && available.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Available Steps
              </p>
              <div className="flex flex-wrap gap-2">
                {available.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePlace(item)}
                    className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  >
                    {item.structure}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Check button */}
          {phase === "sequence" && placed.length === CORRECT_SEQUENCE.length && (
            <button
              type="button"
              onClick={handleCheckSequence}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Check Order
            </button>
          )}

          {/* Sequence feedback */}
          {phase === "sequence-result" && seqResult && (
            <div>
              <FeedbackCard onNavigate={onNavigate} feedback={sequenceFeedback[seqResult]} />
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleContinueToFeedback}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue to Negative Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Phase 2: Feedback loop ── */}
      {(phase === "feedback-loop" || phase === "feedback-loop-result") && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-500 mb-1">
              Part 2 — Negative Feedback
            </p>
            <p className="text-sm text-muted-foreground">
              The cascade produced cortisol. What happens next under <em>normal</em> conditions?
            </p>
          </div>

          {/* Cascade reminder */}
          <div className="rounded-lg bg-secondary/30 border border-border px-4 py-3">
            <p className="text-xs font-mono text-muted-foreground">
              Hypothalamus → CRH → Pituitary → ACTH → Adrenal cortex → <span className="text-foreground font-semibold">Cortisol</span> → ???
            </p>
          </div>

          {phase === "feedback-loop" && (
            <div className="flex flex-wrap gap-3">
              {[
                { id: "inhibits-hypothalamus-pituitary", label: "Cortisol inhibits the hypothalamus and pituitary" },
                { id: "cortisol-keeps-rising", label: "Cortisol continues to rise indefinitely" },
                { id: "cortisol-resets-adrenal", label: "Cortisol resets the adrenal cortex directly" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleCheckFeedbackLoop(opt.id)}
                  className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {phase === "feedback-loop-result" && fbResult && (
            <div>
              <FeedbackCard onNavigate={onNavigate} feedback={feedbackLoopFeedback[fbResult]} />
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleContinueToOverride}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue to Override
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Phase 3: Override ── */}
      {(phase === "override" || phase === "override-result") && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6 space-y-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-destructive mb-1">
              Part 3 — Override Under Extreme Stress
            </p>
            <p className="text-sm text-muted-foreground">
              Negative feedback normally shuts the axis down. But under extreme or chronic stress, something prevents shutdown. What overrides the feedback loop?
            </p>
          </div>

          {/* Cascade reminder with feedback */}
          <div className="rounded-lg bg-secondary/30 border border-border px-4 py-3">
            <p className="text-xs font-mono text-muted-foreground">
              Hypothalamus → CRH → Pituitary → ACTH → Adrenal cortex → Cortisol → <span className="text-foreground font-semibold">Negative feedback</span> → <span className="text-destructive font-semibold">???</span>
            </p>
          </div>

          {phase === "override" && (
            <div className="flex flex-wrap gap-3">
              {[
                { id: "cea-pfc-override", label: "CeA and PFC override negative feedback" },
                { id: "cortisol-depleted", label: "Cortisol is depleted and cannot feed back" },
                { id: "hippocampus-blocks", label: "The hippocampus blocks cortisol receptors" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleCheckOverride(opt.id)}
                  className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {phase === "override-result" && ovResult && (
            <div>
              <FeedbackCard onNavigate={onNavigate} feedback={overrideFeedback[ovResult]} />
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  See Summary
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prediction & Outcome bridge */}
      <div className="mt-3">
        <PredictionOutcome
          visible={hasInteracted}
          {...predictionOutcomeContent["hpa-axis-builder"]}
          onNavigateTrace={onNavigate ? () => onNavigate("Trace") : undefined}
        />
      </div>
    </ExperienceShell>
  );
};

export default HPAAxisBuilderDemo;
