import { RotateCcw } from "lucide-react";
import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

const steps = [
  { name: "Predict", badge: "Prediction", color: "#7F77DD", description: "The brain generates an expectation based on prior experience and context." },
  { name: "Receive input", badge: "Input", color: "#378ADD", description: "Sensory signals arrive. This is what actually happened in the world." },
  { name: "Detect mismatch", badge: "Mismatch", color: "#D85A30", description: "Expected ≠ actual creates a prediction error signal." },
  { name: "Update model", badge: "Update", color: "#1D9E75", description: "The brain revises its internal model to reduce future error." },
];

const moduleCallouts = [
  { id: "blurry-object-guess", emphasis: "Prediction → Update", note: "OFC predicts object identity from blurry input; ventral stream corrects when detail arrives." },
  { id: "face-or-not", emphasis: "Prediction → Mismatch", note: "Face-detection prior fires on ambiguous patterns; mismatch when the FFA confirms it's not a face." },
  { id: "sudden-noise-reaction", emphasis: "Input → Mismatch", note: "Sudden sound violates the prediction of silence; brainstem reacts before cortex can evaluate." },
  { id: "fear-cue-and-extinction", emphasis: "Prediction → Update", note: "Amygdala predicts danger from the cue; extinction builds a competing safety prediction via vmPFC." },
  { id: "memory-under-load", emphasis: "Prediction → Mismatch", note: "dlPFC predicts it can maintain the memory set; overload creates a control failure mismatch." },
  { id: "stress-response-builder", emphasis: "Update → Mismatch", note: "Cortisol feedback should update the system to shut down; chronic override prevents the update." },
];

const ConceptLoop = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl font-semibold text-foreground">The Loop</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Your brain runs a constant cycle: predict, receive input, detect mismatch,
      update the model. Every BrainTrace module shows you one version of this loop.
    </p>

    {/* 4-step diagram */}
    <div id="loop-visualization" className="mt-10">
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {steps.map((step, i) => (
          <div key={step.name} className="flex items-center gap-3 flex-1">
            <div className="rounded-xl border border-gray-200 bg-white p-4 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: step.color }}
                >
                  {step.badge}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            {i < steps.length - 1 && (
              <span className="hidden sm:block shrink-0 text-gray-300" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
        <RotateCcw size={14} />
        <span>Then the loop begins again</span>
      </div>
    </div>

    {/* Per-module callouts */}
    <h2 id="loop-modules" className="text-xl font-medium text-foreground mt-14 mb-2">
      The loop in each module
    </h2>
    <p className="text-sm text-gray-400 mb-5">
      Each module emphasizes different steps of the loop. The badges show which roles are most prominent.
    </p>
    <div className="space-y-3">
      {moduleCallouts.map((m) => (
        <div key={m.id} className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="sm:w-56 shrink-0">
            <ModuleLink moduleId={m.id} />
          </div>
          <div className="flex-1 pt-1">
            <span className="text-xs font-medium text-gray-400">{m.emphasis}</span>
            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{m.note}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ConceptLoop;
