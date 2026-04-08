import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

/* ── Scenario data (text only, no slider) ── */

const scenarios = [
  {
    title: "Blurry Object Guess",
    moduleId: "blurry-object-guess",
    dominant: "prediction",
    dominantColor: "#7F77DD",
    body: "When an image is blurry, sensory input is low-precision. Your OFC compensates by increasing the weight of its contextual guess — a high-precision prior generated from coarse, low-spatial-frequency information. If the prior is strong enough, you 'see' the object before the image sharpens. If it's wrong, you experience the correction as a prediction error when detailed input from the ventral stream overrides the guess.",
  },
  {
    title: "Face or Not?",
    moduleId: "face-or-not",
    dominant: "prediction",
    dominantColor: "#7F77DD",
    body: "Your brain assigns extremely high precision to the face-detection prior — the PFC/OFC bias that primes the FFA to detect face-like patterns. When sensory input is ambiguous (low precision), this strong prior dominates. The result is pareidolia: seeing faces in clouds, wall outlets, or random shapes. The signal didn't look like a face — but the prior was weighted so heavily that weak evidence was enough to trigger the percept.",
  },
  {
    title: "Memory Under Load",
    moduleId: "memory-under-load",
    dominant: "input",
    dominantColor: "#378ADD",
    body: "The dlPFC maintains working memory by keeping task-relevant signals high-precision and suppressing distractors (low-precision noise). As cognitive load increases, the control signal weakens — the precision gap between targets and distractors narrows. Eventually, distractors leak through because the brain can no longer reliably distinguish what matters from what doesn't. The failure isn't about the stimuli; it's about the precision weights assigned to them.",
  },
];

const crossLinks = [
  {
    id: "blurry-object-guess",
    note: "See how a high-precision prior drives early object identification from blurry input.",
  },
  {
    id: "face-or-not",
    note: "See how a strong face-detection prior creates false positives when input precision is low.",
  },
  {
    id: "memory-under-load",
    note: "See how weakened top-down control lets low-precision distractors break through.",
  },
];

/* ── Page ── */

const ConceptPrecision = () => {
  const [deeperOpen, setDeeperOpen] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <Breadcrumb />

      <h1 className="text-3xl font-semibold text-foreground">Precision &amp; Attention</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
        Your brain doesn't trust every signal equally. It assigns a confidence
        level — called <em>precision</em> — to both incoming sensory input and to
        its own prior expectations. Signals the brain treats as high-precision
        dominate perception; signals treated as low-precision get ignored or
        overridden.
      </p>

      {/* ── The volume knob ── */}
      <h2 className="text-xl font-medium text-foreground mt-12">The volume knob</h2>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
        Think of precision as a volume knob on each signal your brain processes.
        When you pay attention to something, you're turning up the precision on
        that signal — making it louder relative to everything else. When you
        ignore something, you're turning its precision down.
      </p>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
        This works in both directions. Your brain can turn up the volume on
        incoming sensory input (trusting what you see or hear) or on its own
        prior expectations (trusting what it already believes). Perception
        depends on which side wins. In a bright, clear environment, sensory
        input is high-precision and dominates. In fog or darkness, that same
        input becomes unreliable, and your brain leans more heavily on its
        predictions.
      </p>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
        Attention is the mechanism that adjusts these weights: turning up the
        volume on signals that matter and turning it down on noise. It's not a
        spotlight that illuminates one thing — it's a gain control that changes
        how much your brain trusts each source of information.
      </p>

      {/* ── Precision in action ── */}
      <h2 id="precision-slider" className="text-xl font-medium text-foreground mt-12">
        Precision in action
      </h2>
      <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-2xl">
        Each BrainTrace module demonstrates a different balance between
        prior precision and input precision. Here's how the weighting plays out
        in three scenarios.
      </p>

      <div className="space-y-6">
        {scenarios.map((s) => (
          <div key={s.moduleId}>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-foreground">{s.title}</h3>
              <span
                className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full"
                style={{ backgroundColor: s.dominantColor }}
              >
                {s.dominant} dominates
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {s.body}
            </p>
            <div className="mt-3 max-w-sm">
              <ModuleLink moduleId={s.moduleId} />
            </div>
          </div>
        ))}
      </div>

      {/* ── See it in BrainTrace ── */}
      <h2 id="precision-modules" className="text-xl font-medium text-foreground mt-12 mb-4">
        See it in BrainTrace
      </h2>
      <div className="space-y-4">
        {crossLinks.map((link) => (
          <div key={link.id} className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">{link.note}</p>
              <div className="mt-1.5 max-w-sm">
                <ModuleLink moduleId={link.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Go Deeper ── */}
      <div className="mt-12 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setDeeperOpen(!deeperOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-foreground">
              Go deeper: why precision matters for attention
            </span>
          </div>
          {deeperOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {deeperOpen && (
          <div className="px-5 pb-5 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Precision weighting is one influential framework for understanding
              attention. Instead of thinking of attention as a spotlight that
              selects one thing and ignores everything else, precision weighting
              describes attention as the brain adjusting how much confidence it
              places on different signals.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A high-precision signal doesn't just get noticed — it shapes what
              you perceive. When the brain assigns high precision to a prior
              expectation (like the face-detection bias), that expectation can
              override weak sensory evidence and produce false percepts. When
              the brain assigns high precision to sensory input (like sharp
              visual detail in a well-lit scene), the input dominates and
              predictions take a back seat.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This framework helps explain why the same signal can lead to
              different perceptions in different contexts. A faint shape in
              darkness might look like a face (high prior precision, low input
              precision), but the same shape in bright light is immediately
              recognized as a coat hook (high input precision overrides the
              prior). The signal didn't change — the precision weights did.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In BrainTrace modules, you can see precision at work whenever
              the brain's expectation competes with incoming evidence. The
              outcome depends on which side the brain trusts more — and
              attention is the process that tips the balance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptPrecision;
