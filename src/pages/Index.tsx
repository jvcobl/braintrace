import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import { modules } from "@/data/modules";

/* ── Static data ── */

const STUDY_METHOD = [
  {
    step: "01",
    name: "Experience",
    description:
      "Each lesson starts with something you do — a blurry image, a sudden sound, a memory task. You encounter the phenomenon before any explanation.",
  },
  {
    step: "02",
    name: "Trace",
    description:
      "Then you see what your brain predicted, what actually happened, and which neural pathways were involved.",
  },
  {
    step: "03",
    name: "Explain",
    description:
      "A focused write-up connects the experience to the neuroscience — what your brain did, which structures were active, and why the pathway matters.",
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
    body: "Sorting, classifying, and predicting during lessons engage the same prefrontal mechanisms you're learning about. Each interaction doubles as a retrieval opportunity.",
  },
  {
    title: "Dense and precise",
    body: "Explanations are written to be complete in a few paragraphs. No filler, no repetition — the kind of clarity you'd want when you actually want to understand something.",
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
      <section className="relative overflow-hidden border-b border-border bg-hero-bg">
        {/* subtle decorative gradient wash */}
        <div
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, hsl(174 55% 32%) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-3xl py-24 text-center md:py-36">
          <h1 className="font-display text-[2.5rem] leading-[1.15] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Your brain is predicting what happens next
            <br className="hidden sm:block" />
            — before you even realize it.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            NeuroRoute is a free interactive neuroscience site. Experience a
            phenomenon, trace the neural pathway, and understand what your brain
            was actually doing.
          </p>

          <div className="mt-11 flex items-center justify-center gap-4">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Exploring
            </Link>
            <Link
              to="/course-map"
              className="inline-flex items-center rounded-lg border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Browse All Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. STUDY METHOD
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-5xl py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-[1.75rem]">
              Every lesson follows the same loop
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
              You experience something — a blurry image, a sudden sound, a
              memory task. Then you see what your brain predicted, what actually
              happened, and which pathways were involved. Experience first, then
              explanation.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {STUDY_METHOD.map((s) => (
              <div
                key={s.step}
                className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="font-display text-3xl text-primary/20">{s.step}</span>
                <h3 className="mt-2 text-[15px] font-semibold text-foreground">
                  {s.name}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
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
      <section className="border-b border-border bg-section-alt">
        <div className="container mx-auto max-w-5xl py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              What You'll Explore
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-[1.75rem]">
              Six interactive lessons across five areas
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
              Perception, attention, emotion, learning, and stress. Each lesson
              is built around a real phenomenon you can feel, not just read
              about.
            </p>
          </div>

          <div className="mt-12 space-y-3">
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
                  className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                    {num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.05rem] text-foreground leading-snug group-hover:text-primary transition-colors">
                      {content.meta.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                      {content.meta.subtitle}
                    </p>
                    <p className="mt-2.5 text-xs font-medium text-muted-foreground/70">
                      {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                    </p>
                  </div>
                  <span
                    className="mt-2 text-lg text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
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
          4. RECOMMENDED LESSONS
         ════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-5xl py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Where to Start
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-[1.75rem]">
              Try one of these
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
              These four lessons span different topics and show the range of
              phenomena and interactions across the site.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {featuredModules.map((mod) => {
              const unitContent = getUnitContent(mod.unitId);
              return (
                <Link
                  key={mod.id}
                  to={`/module/${mod.id}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60">
                    {unitContent?.meta.title ?? "Lesson"}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-foreground group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] text-muted-foreground leading-relaxed">
                    {mod.shortDescription}
                  </p>
                  <p className="mt-4 text-xs font-medium text-muted-foreground/60 group-hover:text-primary transition-colors">
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
      <section className="border-b border-border bg-section-alt">
        <div className="container mx-auto max-w-5xl py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Approach
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-[1.75rem]">
              Why this format works for neuroscience
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
              Neuroscience is best understood through pathways, not definitions.
              Each lesson is structured to build that kind of understanding.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-8 sm:grid-cols-2">
            {APPROACH_POINTS.map((pt) => (
              <div key={pt.title} className="border-l-2 border-primary/15 pl-5">
                <h3 className="text-[14px] font-semibold text-foreground">
                  {pt.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
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
        <div className="container mx-auto max-w-2xl py-20 text-center md:py-28">
          <h2 className="font-display text-2xl tracking-tight text-foreground md:text-[1.75rem]">
            Start with any unit or pick a lesson
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            The units are sequential but each lesson is self-contained — work
            through them in order or jump to a specific topic.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Begin with Unit 1
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-lg border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
