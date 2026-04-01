import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import { modules } from "@/data/modules";
import LessonCard from "@/components/study/LessonCard";

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
      <section className="relative overflow-hidden bg-hero-bg">
        {/* decorative gradient wash */}
        <div
          className="pointer-events-none absolute -top-1/3 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, hsl(174 55% 32%) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center sm:py-28 md:py-40">
          <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-primary/70">
            Interactive Neuroscience
          </p>
          <h1 className="mt-4 sm:mt-5 font-display text-[2rem] leading-[1.12] tracking-tight text-foreground sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem]">
            Your brain is predicting what happens next
            <br className="hidden sm:block" />
            <span className="text-primary/80"> — before you even realize it.</span>
          </h1>

          <p className="mx-auto mt-6 sm:mt-8 max-w-lg text-[15px] sm:text-[1.05rem] leading-relaxed text-muted-foreground">
            Experience a phenomenon, trace the neural pathway, and understand
            what your brain was actually doing.
          </p>

          <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-lg bg-primary px-7 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. HOW IT WORKS
         ════════════════════════════════════════════════ */}
      <section className="border-y border-border">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              How Each Lesson Works
            </p>
            <h2 className="mt-3 font-display text-xl sm:text-2xl tracking-tight text-foreground md:text-[1.75rem]">
              Experience, Trace, Explain
            </h2>
          </div>

          <div className="mx-auto mt-10 sm:mt-14 grid max-w-4xl gap-4 sm:gap-5 sm:grid-cols-3">
            {STUDY_METHOD.map((s) => (
              <div
                key={s.step}
                className="relative rounded-xl border border-border/70 bg-card p-5 sm:p-6"
              >
                <span className="font-display text-2xl text-primary/25">{s.step}</span>
                <h3 className="mt-2 text-[13px] sm:text-[14px] font-semibold text-foreground">
                  {s.name}
                </h3>
                <p className="mt-2 sm:mt-2.5 text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          3. UNITS — primary structure
         ════════════════════════════════════════════════ */}
      <section className="bg-section-alt">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24 md:py-28">
          <div className="max-w-2xl">
            <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Five Areas of Neuroscience
            </p>
            <h2 className="mt-3 font-display text-xl sm:text-2xl tracking-tight text-foreground md:text-[1.75rem]">
              Explore by topic
            </h2>
            <p className="mt-2.5 sm:mt-3 max-w-lg text-[13px] sm:text-sm text-muted-foreground leading-relaxed">
              Perception, attention, emotion, learning, and stress — each built
              around phenomena you can experience directly.
            </p>
          </div>

          <div className="mt-10 sm:mt-14 space-y-3">
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
                  className="group flex items-start gap-4 sm:gap-5 rounded-xl border border-border bg-card p-5 sm:p-7 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-bold text-primary-foreground shadow-sm">
                    {num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1rem] sm:text-[1.1rem] text-foreground leading-snug group-hover:text-primary transition-colors">
                      {content.meta.title}
                    </h3>
                    <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                      {content.meta.subtitle}
                    </p>
                    <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-medium text-muted-foreground/50">
                      {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                    </p>
                  </div>
                  <span
                    className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
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
          4. FEATURED LESSONS — secondary entry points
         ════════════════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Recommended
            </p>
            <h2 className="mt-3 font-display text-xl tracking-tight text-foreground md:text-2xl">
              Try one of these lessons
            </h2>
            <p className="mt-2 max-w-lg text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
              Each one is self-contained. Pick whatever sounds interesting.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2">
            {featuredModules.map((mod) => {
              const unitContent = getUnitContent(mod.unitId);
              return (
                <LessonCard
                  key={mod.id}
                  module={mod}
                  contextLabel={unitContent?.meta.title}
                  variant="compact"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. APPROACH
         ════════════════════════════════════════════════ */}
      <section className="border-t border-border bg-section-alt">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Approach
            </p>
            <h2 className="mt-3 font-display text-xl tracking-tight text-foreground md:text-2xl">
              Why this format works for neuroscience
            </h2>
          </div>

          <div className="mx-auto mt-10 sm:mt-12 grid max-w-4xl gap-x-8 sm:gap-x-10 gap-y-6 sm:gap-y-7 sm:grid-cols-2">
            {APPROACH_POINTS.map((pt) => (
              <div key={pt.title} className="border-l-2 border-primary/10 pl-4 sm:pl-5">
                <h3 className="text-[13px] font-semibold text-foreground">
                  {pt.title}
                </h3>
                <p className="mt-1.5 text-[12px] sm:text-[12.5px] leading-relaxed text-muted-foreground">
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
      <section className="border-t border-border">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center sm:py-20 md:py-24">
          <h2 className="font-display text-xl tracking-tight text-foreground md:text-2xl">
            Pick a lesson and see what your brain does
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
            Start anywhere, or work through the units in order.
          </p>
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Exploring
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              About BrainTrace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
