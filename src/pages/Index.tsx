import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import { modules } from "@/data/modules";

/* ── Static data ── */

const STUDY_METHOD = [
  {
    step: "1",
    name: "Experience",
    description:
      "Each lesson opens with an interactive demo. You observe or participate in a perceptual, cognitive, or physiological phenomenon before encountering any explanation.",
  },
  {
    step: "2",
    name: "Trace",
    description:
      "A pathway diagram maps the brain regions and circuits involved — showing how the signal moves from input to output.",
  },
  {
    step: "3",
    name: "Explain",
    description:
      "A focused write-up connects the demo to the neuroscience: what your brain did, which structures were active, and why the pathway matters.",
  },
];

const FEATURED_LESSON_IDS = ["mod-4", "mod-1", "mod-6", "mod-10"];

const APPROACH_POINTS = [
  {
    title: "Experience before explanation",
    body: "You encounter the phenomenon in your own nervous system first. This creates a concrete reference point that makes the subsequent neuroscience easier to encode and recall.",
  },
  {
    title: "Circuits, not flash cards",
    body: "Each lesson traces a complete pathway — from sensory input through processing regions to behavioral output. Understanding flows, not isolated labels, is how neuroscience is actually practiced.",
  },
  {
    title: "Active retrieval built in",
    body: "Sorting, classifying, and predicting during lessons engage the same prefrontal mechanisms you're studying. Each interaction doubles as a retrieval opportunity.",
  },
  {
    title: "Dense and precise",
    body: "Explanations are written to be complete in a few paragraphs. No filler, no repetition — the kind of writing you'd want the night before an exam.",
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
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Interactive neuroscience —
            <br className="hidden sm:block" />
            perception, cognition, emotion,
            <br className="hidden sm:block" />
            conditioning, and stress
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
            NeuroRoute is a study platform organized into five units. Each
            lesson lets you experience a neural phenomenon, trace the pathway
            involved, and read a concise explanation of the mechanism.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Begin with Unit 1
            </Link>
            <Link
              to="/course-map"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Browse All Units
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. STUDY METHOD
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Study Method
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Each lesson follows three steps
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            The same structure repeats across every lesson — first-person
            experience, then pathway anatomy, then written explanation.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STUDY_METHOD.map((s) => (
              <div key={s.step} className="rounded-lg border border-border bg-card p-5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">
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
          3. UNITS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Units
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Five units covering core neuroscience
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            The curriculum moves from sensory processing through higher
            cognition to neuroendocrine stress systems. Each unit contains
            study material and interactive lessons.
          </p>

          <div className="mt-10 space-y-3">
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
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
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
                      {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                    </p>
                  </div>
                  <span
                    className="mt-1 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
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
          4. RECOMMENDED STARTING POINTS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Where to Start
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Recommended lessons
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            These four lessons span different units and demonstrate the range
            of topics and interaction types available across the platform.
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
                  <p className="mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    Open lesson →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. APPROACH
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto max-w-4xl py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Approach
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Why this format works for neuroscience
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            Neuroscience is best understood through pathways, not definitions.
            Each lesson is structured to build that kind of understanding.
          </p>

          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {APPROACH_POINTS.map((pt) => (
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
          6. CLOSING
         ════════════════════════════════════════════════ */}
      <section>
        <div className="container mx-auto max-w-2xl py-16 text-center md:py-24">
          <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
            Start with any unit or pick a lesson that interests you
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            The units are sequential but each lesson is self-contained — you
            can work through them in order or jump to a specific topic.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Begin with Unit 1
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              About NeuroRoute
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
