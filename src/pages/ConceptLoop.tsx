import { ArrowRight, RotateCcw } from "lucide-react";
import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

const steps = [
  { name: "Predict", border: "border-[#7F77DD]", text: "text-[#7F77DD]", description: "The brain generates an expectation" },
  { name: "Receive input", border: "border-[#378ADD]", text: "text-[#378ADD]", description: "Sensory signals arrive" },
  { name: "Detect mismatch", border: "border-[#D85A30]", text: "text-[#D85A30]", description: "Expected ≠ actual creates prediction error" },
  { name: "Update model", border: "border-[#1D9E75]", text: "text-[#1D9E75]", description: "The brain revises its internal model" },
];

const moduleIds = [
  "blurry-object-guess",
  "face-or-not",
  "sudden-noise-reaction",
  "fear-cue-and-extinction",
  "memory-under-load",
];

const ConceptLoop = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <Breadcrumb />
    <h1 className="text-3xl font-semibold text-foreground">The Loop</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Your brain runs a constant cycle: predict, receive input, detect mismatch,
      update the model. Every BrainTrace module shows you one version of this loop.
    </p>

    <div id="loop-visualization" className="mt-10 flex flex-col sm:flex-row items-stretch gap-3">
      {steps.map((step, i) => (
        <div key={step.name} className="flex items-center gap-3 flex-1">
          <div className={`rounded-xl border-2 ${step.border} bg-card p-4 flex-1`}>
            <span className={`text-sm font-bold ${step.text}`}>{step.name}</span>
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight className="hidden sm:block shrink-0 text-muted-foreground/30" size={20} />
          )}
        </div>
      ))}
    </div>

    <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
      <RotateCcw size={14} />
      <span>Then the loop begins again</span>
    </div>

    <h2 id="loop-modules" className="text-xl font-medium text-foreground mt-14 mb-4">See it in the modules</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {moduleIds.map((id) => (
        <ModuleLink key={id} moduleId={id} />
      ))}
    </div>
  </div>
);

export default ConceptLoop;
