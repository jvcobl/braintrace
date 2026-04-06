import ModuleLink from "@/components/ModuleLink";

const moduleExamples = [
  {
    id: "blurry-object-guess",
    text: "In Blurry Object Guess, your brain's prior has high precision — it fills in the blurry image with a confident guess. As the image sharpens, incoming sensory precision increases and can override that guess.",
  },
  {
    id: "face-or-not",
    text: "In Face or Not?, the face-detection prior has extremely high precision — so high that it fires even on weak evidence. That's why you see faces in ambiguous patterns.",
  },
  {
    id: "memory-under-load",
    text: "In Memory Under Load, cognitive load reduces the precision of your top-down control signal. As load increases, the system can no longer maintain high-precision suppression of distractors.",
  },
];

const ConceptPrecision = () => (
  <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
    <h1 className="text-3xl font-semibold text-foreground">Precision &amp; attention</h1>
    <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
      Your brain assigns a confidence weight to every signal. Attention is the process
      of turning that weight up or down.
    </p>

    {/* The volume knob */}
    <h2 className="text-xl font-medium text-foreground mt-12">The volume knob</h2>
    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
      Your brain doesn't treat all information equally. In a bright room, visual input
      is high-precision — your brain trusts it. In fog or darkness, that same visual
      input becomes low-precision, and your brain relies more on its prior expectations.
      Attention is the mechanism that adjusts these precision weights: turning up the
      volume on signals that matter and turning it down on noise.
    </p>

    {/* Interactive placeholder */}
    <div className="mt-8 border-2 border-dashed border-border rounded-xl p-8 text-center">
      <p className="text-muted-foreground">Interactive precision slider — coming soon</p>
    </div>
    <p className="text-xs text-muted-foreground mt-2 text-center">
      This interactive will let you adjust how much your brain trusts its prediction vs.
      incoming evidence, and see how that changes perception.
    </p>

    {/* Module examples */}
    <h2 className="text-xl font-medium text-foreground mt-12 mb-4">
      Where precision matters in BrainTrace
    </h2>
    <div className="space-y-6">
      {moduleExamples.map((ex) => (
        <div key={ex.id}>
          <p className="text-sm text-muted-foreground leading-relaxed">{ex.text}</p>
          <div className="mt-2">
            <ModuleLink moduleId={ex.id} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ConceptPrecision;
