import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import { modules } from "@/data/modules";

/* ── Static data ── */

const METHOD_STEPS = [
  {
    step: "01",
    name: "Experience",
    description:
      "Each lesson begins with a short interactive demo — you observe a real perceptual or cognitive phenomenon before reading a single word of explanation.",
  },
  {
    step: "02",
    name: "Trace",
    description:
      "A simplified neural pathway diagram shows exactly which brain regions are involved and how signals flow between them.",
  },
  {
    step: "03",
    name: "Explain",
    description:
      "A concise write-up connects the demo to the underlying neuroscience — what your brain did, why it matters, and how the pathway works.",
  },
];

const FEATURED_LESSON_IDS = ["mod-4", "mod-1", "mod-6", "mod-10"];

const WHY_POINTS = [
  {
    title: "First-person before third-person",
    body: "You experience the phenomenon in your own nervous system before studying it on the page. Embodied experience creates stronger, more durable memory traces.",
  },
  {
    title: "Pathway-level understanding",
    body: "Instead of memorizing isolated structures, you learn how signals move through circuits — from sensory input to behavioral output. This is how neuroscience actually works.",
  },
  {
    title: "Active over passive",
    body: "Sorting, classifying, building, and predicting engage your prefrontal cortex in ways that reading alone cannot. Each interaction is a retrieval opportunity.",
  },
  {
    title: "Concise by design",
    body: "Every explanation is written to be precise and complete in a few paragraphs — no filler, no fluff. Dense information, clearly structured.",
  },
];

/* ── Component ── */

const Index = () => {
  const unitIds = getUnitIds();

  const featuredModules = FEATURED_LESSON_IDS
    .map((id) => modules.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m != null);

  return (
    <div>
      {/* ════════════════════════════════════════════════
          1. HERO
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-3xl py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Interactive Neuroscience
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Learn how the brain works
            <br className="hidden sm:block" />
            <span className="text-primary"> by using yours</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            NeuroRoute is an interactive neuroscience platform where you
            experience a phenomenon, trace the neural pathway, and understand
            the mechanism — from perception to stress physiology.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Learning
            </Link>
            <Link
              to="/course-map"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. HOW NEUROROUTE WORKS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Learning Model
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            How NeuroRoute Works
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            Every lesson follows the same three-step structure — designed to move
            you from first-person experience to mechanistic understanding.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {METHOD_STEPS.map((s) => (
              <div key={s.step} className="rounded-lg border border-border bg-card p-5">
                <span className="font-display text-2xl font-bold text-primary/30">
                  {s.step}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold text-foreground">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          3. THE CURRICULUM — 5 UNITS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Curriculum
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Five units. One complete pathway through the brain.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            From how you see the world to how your body responds to chronic
            stress — each unit builds on the last.
          </p>

          <div className="mt-10 space-y-4">
            {unitIds.map((uid) => {
              const content = getUnitContent(uid);
              if (!content) return null;
              const num = uid.replace("unit-", "");
              const lessons = getLessonsByUnit(uid);
              const lessonCount = lessons.length;

              return (
                <Link
                  key={uid}
                  to={`/unit/${uid}`}
                  className="group flex items-start gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {content.meta.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {content.meta.subtitle}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {lessonCount} interactive {lessonCount === 1 ? "lesson" : "lessons"}
                    </p>
                  </div>
                  <span
                    className="mt-1 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          4. FEATURED INTERACTIVE LESSONS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Featured Lessons
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Start with these
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            Four interactive lessons that demonstrate the range of what
            NeuroRoute covers — from visual perception to stress physiology.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {featuredModules.map((mod) => {
              const unitContent = getUnitContent(mod.unitId);
              return (
                <Link
                  key={mod.id}
                  to={`/module/${mod.id}`}
                  className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {unitContent?.meta.title ?? "Lesson"}
                  </p>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {mod.shortDescription}
                  </p>
                  <p className="mt-3 text-xs font-medium text-primary">
                    Try this lesson →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. WHY THIS WORKS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Methodology
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Why interactive pathway learning works
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            NeuroRoute is built on a simple premise: you understand a neural
            circuit better when you've run through it yourself.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {WHY_POINTS.map((pt) => (
              <div key={pt.title}>
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {pt.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {pt.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6. FINAL CTA
         ════════════════════════════════════════════════ */}
      <section>
        <div className="container mx-auto max-w-2xl py-20 text-center md:py-28">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Ready to trace a pathway?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Pick a unit, open a lesson, and experience how the brain processes
            the world — from the first signal to the behavioral output.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start with Unit 1
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
