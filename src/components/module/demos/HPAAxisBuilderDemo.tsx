import { useState, useCallback } from "react";
import { ExperienceShell } from "@/components/module/experience";

/* ── Correct HPA axis sequence ── */

const CORRECT_ORDER = [
  {
    id: "hypothalamus",
    structure: "Hypothalamus",
    action: "releases CRH",
    detail: "Corticotropin-releasing hormone initiates the stress cascade.",
  },
  {
    id: "pituitary",
    structure: "Anterior Pituitary",
    action: "releases ACTH",
    detail: "Adrenocorticotropic hormone travels via the bloodstream to the adrenal glands.",
  },
  {
    id: "adrenal",
    structure: "Adrenal Cortex",
    action: "releases Cortisol",
    detail: "Glucocorticoids mobilize energy and modulate immune and brain function.",
  },
  {
    id: "feedback",
    structure: "Negative Feedback",
    action: "Cortisol → Hypothalamus & Pituitary",
    detail: "Cortisol inhibits further CRH and ACTH release, shutting down the axis.",
  },
  {
    id: "override",
    structure: "CeA / PFC Override",
    action: "blocks negative feedback",
    detail: "Under extreme stress, the central amygdala and PFC prevent shutdown — cortisol keeps rising.",
  },
];

type Phase = "build" | "result";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const HPAAxisBuilderDemo = () => {
  const [phase, setPhase] = useState<Phase>("build");
  const [available, setAvailable] = useState(() => shuffle(CORRECT_ORDER));
  const [placed, setPlaced] = useState<typeof CORRECT_ORDER>([]);

  const handlePlace = useCallback(
    (item: (typeof CORRECT_ORDER)[number]) => {
      setPlaced((prev) => [...prev, item]);
      setAvailable((prev) => prev.filter((a) => a.id !== item.id));
    },
    [],
  );

  const handleRemove = useCallback(
    (item: (typeof CORRECT_ORDER)[number]) => {
      setPlaced((prev) => prev.filter((p) => p.id !== item.id));
      setAvailable((prev) => [...prev, item]);
    },
    [],
  );

  const handleCheck = useCallback(() => setPhase("result"), []);

  const handleReset = useCallback(() => {
    setPhase("build");
    setPlaced([]);
    setAvailable(shuffle(CORRECT_ORDER));
  }, []);

  const isCorrect =
    placed.length === CORRECT_ORDER.length &&
    placed.every((p, i) => p.id === CORRECT_ORDER[i].id);

  return (
    <ExperienceShell
      instructions="Build the HPA axis in order. Select each step from the pool and place it into the sequence. Then check whether your order matches the actual neuroendocrine cascade."
      done={phase === "result" && isCorrect}
      summary={{
        heading: "What This Shows",
        body: "You traced the full HPA axis: Hypothalamus → CRH → Pituitary → ACTH → Adrenal cortex → Cortisol → Negative feedback → and the override mechanism under extreme stress. This is the same neuroendocrine cascade that activates during any significant stressor.",
        bridge: "Continue to Trace to see each structure's role in the pathway.",
      }}
      onRestart={handleReset}
    >
      <div className="space-y-6">
        {/* Placed sequence */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Your Sequence
          </p>
          <div className="min-h-[56px] rounded-lg border border-border bg-card p-3">
            {placed.length === 0 ? (
              <p className="text-sm text-muted-foreground/60 italic">
                Select steps from the pool below…
              </p>
            ) : (
              <ol className="space-y-2">
                {placed.map((item, i) => {
                  const correctAtPosition =
                    phase === "result" && item.id === CORRECT_ORDER[i]?.id;
                  const wrongAtPosition =
                    phase === "result" && item.id !== CORRECT_ORDER[i]?.id;

                  return (
                    <li
                      key={item.id}
                      className={`flex items-start gap-3 rounded-md border px-3 py-2 text-sm transition-colors ${
                        correctAtPosition
                          ? "border-primary/30 bg-primary/5"
                          : wrongAtPosition
                            ? "border-destructive/30 bg-destructive/5"
                            : "border-border bg-secondary/40"
                      }`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <span className="font-medium text-foreground">
                          {item.structure}
                        </span>
                        <span className="text-muted-foreground">
                          {" "}— {item.action}
                        </span>
                        {phase === "result" && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                        )}
                      </div>
                      {phase === "build" && (
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
        {phase === "build" && available.length > 0 && (
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

        {/* Actions */}
        <div className="flex gap-3">
          {phase === "build" && placed.length === CORRECT_ORDER.length && (
            <button
              type="button"
              onClick={handleCheck}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Check Order
            </button>
          )}
          {phase === "result" && !isCorrect && (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Try Again
              </button>
              <div className="rounded-lg border border-border bg-accent/40 px-4 py-3 text-sm flex-1">
                <p className="font-medium text-foreground">Not quite — compare your order to the correct sequence above.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Each step's detail is now visible. The cascade flows from CRH through cortisol, then feeds back to shut itself down — unless extreme stress overrides that feedback.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </ExperienceShell>
  );
};

export default HPAAxisBuilderDemo;
