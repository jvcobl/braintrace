import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

const failures = [
  {
    id: "failure-prior",
    title: "Too much prior",
    accent: "#7F77DD",
    badge: "Prediction",
    traceNote: "In the Trace diagram, this is a prediction node overwhelming the input signal.",
    explanation:
      "When the brain's internal model is too strong, it overrides incoming evidence. You see what you expect instead of what's there. This is why your brain detects faces in random noise — the face-detection prior overpowers weak sensory input.",
    modules: ["face-or-not"],
  },
  {
    id: "failure-noise",
    title: "Too much noise",
    accent: "#D85A30",
    badge: "Mismatch",
    traceNote: "In the Trace diagram, this is a mismatch signal triggering a response before the update step can evaluate it.",
    explanation:
      "When the brain over-weights incoming sensory signals, it treats everything as urgent. A sudden sound triggers a full defensive response before the cortex has time to evaluate whether the sound was actually threatening. The system reacts to salience, not significance.",
    modules: ["sudden-noise-reaction", "fear-cue-and-extinction"],
  },
  {
    id: "failure-overload",
    title: "Overloaded control",
    accent: "#1D9E75",
    badge: "Update",
    traceNote: "In the Trace diagram, this is the update loop failing — the feedback signal is too weak to maintain the prediction.",
    explanation:
      "When the brain's top-down control system is overwhelmed, it can no longer maintain predictions effectively. Working memory fails under cognitive load because the dlPFC can't sustain its control signal. The HPA axis fails under chronic stress because CeA and PFC override the cortisol feedback loop. In both cases, the shutdown mechanism that should restore balance is overpowered.",
    modules: ["memory-under-load", "stress-response-builder"],
  },
];

const ConceptFailure = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl font-semibold text-foreground">When prediction fails</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Prediction breaks in three ways — each maps to a specific step in the
      prediction loop going wrong.
    </p>

    <div className="mt-10 space-y-6">
      {failures.map((f) => (
        <div
          key={f.id}
          id={f.id}
          className="border border-gray-200 rounded-xl p-6 border-l-4 bg-white"
          style={{ borderLeftColor: f.accent }}
        >
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-medium text-foreground">{f.title}</h2>
            <span
              className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full"
              style={{ backgroundColor: f.accent }}
            >
              {f.badge}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.explanation}</p>
          <p className="mt-2 text-xs text-gray-400 italic">{f.traceNote}</p>
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
