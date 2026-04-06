import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ModuleLink from "@/components/ModuleLink";
import Breadcrumb from "@/components/layout/Breadcrumb";

/* ------------------------------------------------------------------ */
/* Interactive: Trust Prior vs Trust Input                             */
/* ------------------------------------------------------------------ */

interface Scenario {
  id: string;
  title: string;
  moduleId: string;
  priorLabel: string;
  inputLabel: string;
  priorHigh: string;
  inputHigh: string;
  balanced: string;
}

const scenarios: Scenario[] = [
  {
    id: "blurry",
    title: "Blurry Object Guess",
    moduleId: "blurry-object-guess",
    priorLabel: "OFC's early guess",
    inputLabel: "Sharpening visual detail",
    priorHigh:
      "Your OFC's contextual guess dominates perception. You 'see' the object before the image is clear — even if the guess is wrong.",
    inputHigh:
      "You wait for the ventral stream to deliver sharp detail. Perception is slower but more accurate — the image overrides any premature guess.",
    balanced:
      "Your brain blends its early guess with incoming detail. The OFC prediction shapes what you expect, but sharp evidence can still correct it.",
  },
  {
    id: "face",
    title: "Face or Not?",
    moduleId: "face-or-not",
    priorLabel: "Top-down face bias",
    inputLabel: "Actual visual evidence",
    priorHigh:
      "The PFC/OFC face-detection bias overwhelms weak evidence. You see faces in clouds, outlets, and toast — classic pareidolia.",
    inputHigh:
      "You rely on what the FFA actually detects. Ambiguous patterns are correctly rejected as non-faces, but you might also be slower to spot real faces.",
    balanced:
      "Your face bias helps you detect real faces quickly, but strong contradictory evidence from the FFA and PFC can override false alarms.",
  },
  {
    id: "load",
    title: "Memory Under Load",
    moduleId: "memory-under-load",
    priorLabel: "dlPFC top-down control",
    inputLabel: "Distractors and noise",
    priorHigh:
      "Your dlPFC successfully maintains the memory set and suppresses distractors. Performance stays high — the control signal is strong enough.",
    inputHigh:
      "Distractors flood in. The dlPFC can't maintain its control signal against the noise, and irrelevant items intrude into working memory.",
    balanced:
      "Your dlPFC holds its own at moderate load, but as demand increases, the balance tips — distractor suppression weakens and errors creep in.",
  },
];

function PrecisionSlider({ scenario }: { scenario: Scenario }) {
  const [value, setValue] = useState(50);

  const zone = value < 35 ? "input" : value > 65 ? "prior" : "balanced";
  const description =
    zone === "prior"
      ? scenario.priorHigh
      : zone === "input"
        ? scenario.inputHigh
        : scenario.balanced;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-foreground">{scenario.title}</h4>
        <ModuleLink moduleId={scenario.moduleId} />
      </div>

      {/* Slider */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-primary h-2 rounded-full cursor-pointer"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-muted-foreground">
            Trust input — <span className="text-foreground font-medium">{scenario.inputLabel}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            Trust prior — <span className="text-foreground font-medium">{scenario.priorLabel}</span>
          </span>
        </div>
      </div>

      {/* Outcome */}
      <div className="mt-4 bg-muted/40 rounded-lg px-4 py-3">
        <p className="text-[13px] text-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Module cross-links                                                  */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const ConceptPrecision = () => {
  const [deeperOpen, setDeeperOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <Breadcrumb />
      {/* ---- 1. Intro ---- */}
      <h1 className="text-3xl font-semibold text-foreground">Precision &amp; Attention</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
        Your brain doesn't trust every signal equally. It assigns a confidence
        level — called <em>precision</em> — to both incoming sensory input and to
        its own prior expectations. Signals the brain treats as high-precision
        dominate perception; signals treated as low-precision get ignored or
        overridden.
      </p>

      {/* ---- 2. The volume knob ---- */}
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

      {/* ---- 3. Interactive block ---- */}
      <h2 id="precision-slider" className="text-xl font-medium text-foreground mt-12 mb-1">
        Try it: trust prior vs. trust input
      </h2>
      <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
        Drag the slider to shift the balance between trusting your brain's prior
        expectation and trusting the incoming sensory evidence. Watch how
        perception and performance change in each scenario.
      </p>
      <div className="space-y-5">
        {scenarios.map((s) => (
          <PrecisionSlider key={s.id} scenario={s} />
        ))}
      </div>

      {/* ---- 4. See it in BrainTrace ---- */}
      <h2 id="precision-modules" className="text-xl font-medium text-foreground mt-12 mb-4">
        See it in BrainTrace
      </h2>
      <div className="space-y-4">
        {crossLinks.map((link) => (
          <div key={link.id} className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">{link.note}</p>
              <div className="mt-1.5">
                <ModuleLink moduleId={link.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- 5. Go Deeper (expandable) ---- */}
      <div className="mt-12 border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setDeeperOpen(!deeperOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-foreground">
              Go deeper: why precision matters for attention
            </span>
          </div>
          {deeperOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
