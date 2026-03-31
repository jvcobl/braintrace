import { useState } from "react";

/**
 * Multistable Perception Toggle
 *
 * A CSS-only Rubin's vase / two faces ambiguous figure.
 * The user sees the image, chooses which interpretation they perceive,
 * then toggles to see the other. No external assets.
 */

type Interpretation = null | "vase" | "faces";

const MultistablePerceptionDemo = () => {
  const [choice, setChoice] = useState<Interpretation>(null);
  const [revealed, setRevealed] = useState(false);

  const handleChoice = (pick: "vase" | "faces") => {
    setChoice(pick);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleReset = () => {
    setChoice(null);
    setRevealed(false);
  };

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">
        Experience
      </h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Look at the figure below. What do you see first — a vase, or two faces
        in profile? Select your initial perception, then try to switch.
      </p>

      <div className="mt-6 flex flex-col items-center gap-6">
        {/* Ambiguous figure — CSS Rubin's vase */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 220, height: 260 }}
          aria-label="Ambiguous figure: a white vase shape on a dark background, or two dark face profiles facing each other"
        >
          <svg
            viewBox="0 0 220 260"
            width={220}
            height={260}
            role="img"
            aria-hidden="true"
          >
            {/* Background */}
            <rect width="220" height="260" rx="12" className="fill-secondary" />

            {/* Vase / faces shape — the classic Rubin contour */}
            <path
              d="
                M 70 30
                C 70 30, 85 50, 80 80
                C 75 110, 60 130, 60 140
                C 60 160, 75 190, 80 210
                C 85 225, 75 240, 70 240
                L 150 240
                C 145 240, 135 225, 140 210
                C 145 190, 160 160, 160 140
                C 160 130, 145 110, 140 80
                C 135 50, 150 30, 150 30
                Z
              "
              className={
                revealed && choice === "faces"
                  ? "fill-primary/20 stroke-primary stroke-[1.5]"
                  : "fill-card stroke-border stroke-[1]"
              }
              style={{ transition: "fill 0.3s, stroke 0.3s" }}
            />

            {/* Highlight outlines when revealed */}
            {revealed && choice === "vase" && (
              <path
                d="
                  M 70 30
                  C 70 30, 85 50, 80 80
                  C 75 110, 60 130, 60 140
                  C 60 160, 75 190, 80 210
                  C 85 225, 75 240, 70 240
                  L 150 240
                  C 145 240, 135 225, 140 210
                  C 145 190, 160 160, 160 140
                  C 160 130, 145 110, 140 80
                  C 135 50, 150 30, 150 30
                  Z
                "
                fill="none"
                className="stroke-primary stroke-[2]"
              />
            )}
          </svg>
        </div>

        {/* Choice buttons */}
        {choice === null && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChoice("vase")}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              I see a vase
            </button>
            <button
              type="button"
              onClick={() => handleChoice("faces")}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              I see two faces
            </button>
          </div>
        )}

        {/* After choice */}
        {choice !== null && !revealed && (
          <div className="max-w-sm text-center">
            <p className="text-sm text-foreground">
              You saw <span className="font-medium">{choice === "vase" ? "the vase" : "two faces"}</span> first.
              Now try to see <span className="font-medium">{choice === "vase" ? "two faces in profile" : "a vase in the center"}</span>.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              When you've found both, continue.
            </p>
            <button
              type="button"
              onClick={handleReveal}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              I can see both
            </button>
          </div>
        )}

        {/* Revealed explanation */}
        {revealed && (
          <div className="max-w-md space-y-4">
            <div className="rounded-lg border border-border bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">Multistable perception:</span>{" "}
                Your brain toggled between two valid interpretations of the same
                image. The visual cortex communicates differently with the
                prefrontal cortex and ventral stream depending on which
                interpretation is active — even though the stimulus never changed.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-accent/40 px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">Cognitive heuristics:</span>{" "}
                Your brain picked one interpretation instantly — an energetic
                shortcut to jump to a conclusion without conscious thought.
                Multistability proves these heuristics exist: the brain selects
                one reading and runs with it, and it takes effort to override.
              </p>
            </div>

            {/* Trace */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Trace
              </h3>
              <ol className="mt-2 space-y-0" aria-label="Neural pathway steps">
                {[
                  {
                    label: "Ambiguous Visual Input",
                    desc: "The retina sends the same signal regardless of which interpretation you perceive. The image itself never changes.",
                  },
                  {
                    label: "Visual Cortex (V1–V4)",
                    desc: "Early areas extract edges, contours, and figure-ground boundaries. Both interpretations are neurally plausible at this stage.",
                  },
                  {
                    label: "PFC / Ventral Stream Toggle",
                    desc: "The prefrontal cortex and ventral stream shift which interpretation dominates conscious perception. When you 'switch,' this is the circuit changing its bias.",
                  },
                ].map((node, i, arr) => (
                  <li key={node.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-border" aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-5">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {node.label}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MultistablePerceptionDemo;
