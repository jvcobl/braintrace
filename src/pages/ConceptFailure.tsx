import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

const failures = [
  {
    id: "failure-prior",
    title: "Too much prior",
    accent: "#7F77DD",
    explanation:
      "When the brain's internal model is too strong, it overrides incoming evidence. You see what you expect instead of what's there. This is why your brain detects faces in random noise — the face-detection prior overpowers weak sensory input.",
    modules: ["face-or-not"],
  },
  {
    id: "failure-noise",
    title: "Too much noise",
    accent: "#D85A30",
    explanation:
      "When the brain over-weights incoming sensory signals, it treats everything as urgent. A sudden sound triggers a full defensive response before the cortex has time to evaluate whether the sound was actually threatening. The system reacts to salience, not significance.",
    modules: ["sudden-noise-reaction", "fear-cue-and-extinction"],
  },
  {
    id: "failure-overload",
    title: "Overloaded control",
    accent: "#1D9E75",
    explanation:
      "When the brain's top-down control system is overwhelmed, it can no longer maintain predictions effectively. Working memory fails, distractors leak in, and performance breaks down — not from lack of effort, but from exceeding the system's capacity.",
    modules: ["memory-under-load"],
  },
];

const ConceptFailure = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl font-semibold text-foreground">When prediction fails</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Prediction breaks in three ways: the brain trusts its assumptions too much,
      overreacts to noise, or runs out of control capacity.
    </p>

    <div className="mt-10 space-y-6">
      {failures.map((f) => (
        <div
          key={f.id}
          id={f.id}
          className="border border-border rounded-xl p-6 border-l-4 bg-card"
          style={{ borderLeftColor: f.accent }}
        >
          <h2 className="text-lg font-medium text-foreground">{f.title}</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.explanation}</p>
          <div className="mt-4 space-y-2">
            {f.modules.map((id) => (
              <ModuleLink key={id} moduleId={id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ConceptFailure;
