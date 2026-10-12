import { Fragment } from "react";
import { RotateCcw } from "lucide-react";
import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { badgeFill } from "@/lib/colors";
import { usePageMeta } from "@/hooks/use-page-meta";
import { conceptPages } from "@/data/conceptPages";
import ConceptPageNav from "@/components/ConceptPageNav";

const steps = [
  { name: "Predict", badge: "Prediction", color: "#7F77DD", description: "The brain generates an expectation based on prior experience and context." },
  { name: "Receive input", badge: "Input", color: "#378ADD", description: "Sensory signals arrive. This is what actually happened in the world." },
  { name: "Detect mismatch", badge: "Mismatch", color: "#D85A30", description: "Expected ≠ actual creates a prediction error signal." },
  { name: "Update model", badge: "Update", color: "#1D9E75", description: "The brain revises its internal model to reduce future error." },
];

const moduleCallouts = [
  { id: "blurry-object-guess", emphasis: "Prediction → Update", note: "OFC predicts object identity from blurry input; ventral stream corrects when detail arrives." },
  { id: "face-or-not", emphasis: "Prediction → Mismatch", note: "Face-detection prior fires on ambiguous patterns; mismatch when the FFA confirms it's not a face." },
  { id: "sudden-noise-reaction", emphasis: "Input → Mismatch", note: "Sudden stimulus violates the prediction of calm; brainstem reacts before cortex can evaluate." },
  { id: "fear-cue-and-extinction", emphasis: "Prediction → Update", note: "Amygdala predicts danger from the cue; extinction builds a competing safety prediction via vmPFC." },
  { id: "memory-under-load", emphasis: "Prediction → Mismatch", note: "dlPFC predicts it can maintain the memory set; overload creates a control failure mismatch." },
  { id: "stress-response-builder", emphasis: "Update → Mismatch", note: "Cortisol feedback should update the system to shut down; chronic override prevents the update." },
];

const ConceptLoop = () => {
  usePageMeta({ title: "The Loop", description: conceptPages.loop.description });

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <Breadcrumb />
      <h1 className="font-display text-3xl tracking-tight text-foreground">The Loop</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        Your brain runs a constant cycle: predict, receive input, detect mismatch,
        update the model. Every BrainTrace lesson shows you one version of this loop.
      </p>

      {/* 4-step diagram */}
      <div id="loop-visualization" className="mt-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-row lg:items-stretch">
          {/* Cards and arrows are siblings so every card gets the same width. */}
          {steps.map((step, i) => (
            <Fragment key={step.name}>
              <div className="rounded-xl border border-gray-200 bg-white p-4 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: badgeFill(step.color) }}
                  >
                    {step.badge}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="hidden lg:block self-center shrink-0 text-gray-300" aria-hidden="true">→</span>
              )}
            </Fragment>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
          <RotateCcw size={14} />
          <span>Then the loop begins again</span>
        </div>
      </div>

      {/* Per-module callouts */}
      <h2 id="loop-modules" className="font-display text-xl tracking-tight text-foreground mt-14 mb-2">
        Where to see the loop
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Each lesson emphasizes different steps of the loop. The labels show which roles are most prominent.
      </p>
      <div className="space-y-3">
        {moduleCallouts.map((m) => (
          <div key={m.id} className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="sm:w-56 shrink-0">
              <ModuleLink moduleId={m.id} />
            </div>
            <div className="flex-1 pt-1">
              <span className="text-xs font-medium text-gray-500">{m.emphasis}</span>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{m.note}</p>
            </div>
          </div>
        ))}
      </div>
      <ConceptPageNav current="loop" />
    </div>
  );
};

export default ConceptLoop;
