import { Link } from "react-router-dom";
import { getUnitIds } from "@/data/content/registry";

/* ── Static data ── */

const STUDY_METHOD = [
  { name: "Experience", short: "Try an interactive neuroscience demo" },
  { name: "Trace", short: "Follow the signal through your brain" },
  { name: "Explain", short: "Understand the prediction behind the behavior" },
];

const TOPICS = [
  { slug: "perception", title: "Perception and Object Recognition", accent: "#7F77DD", count: 3 },
  { slug: "attention", title: "Attention, Cognitive Load, and the PFC", accent: "#7F77DD", count: 2 },
  { slug: "emotion", title: "Emotion, Limbic System, and Amygdala", accent: "#D85A30", count: 3 },
  { slug: "learning", title: "Learning and Fear Conditioning", accent: "#1D9E75", count: 2 },
  { slug: "stress", title: "Stress and Homeostasis", accent: "#1D9E75", count: 2 },
];

/* ── Component ── */

const Index = () => {
  const unitIds = getUnitIds();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-hero-bg">
        <div
          className="pointer-events-none absolute -top-1/3 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, hsl(162 75% 25%) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center sm:py-24 md:py-32">
          <h1 className="font-display text-[2rem] leading-[1.12] tracking-tight text-foreground sm:text-[2.5rem] md:text-[3.25rem]">
            Your brain is predicting what happens next
            <br className="hidden sm:block" />
            <span className="text-primary/80"> — before you even realize it.</span>
          </h1>

          <p className="mx-auto mt-5 sm:mt-6 max-w-lg text-[15px] sm:text-[1.05rem] leading-relaxed text-muted-foreground">
            Experience a phenomenon. Trace the pathway. Understand what your
            brain was doing.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to={`/unit/${unitIds[0]}`}
              className="inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Exploring
            </Link>
            <Link
              to="/how-your-brain-predicts"
              className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How Your Brain Predicts →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Experience / Trace / Explain ── */}
      <section className="border-y border-border">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-center font-display text-xl sm:text-2xl tracking-tight text-foreground">
            Experience, Trace, Explain
          </h2>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col sm:flex-row items-stretch gap-2">
            {STUDY_METHOD.map((s, i) => (
              <div key={s.name} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-lg bg-muted/40 px-4 py-3 text-center">
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.short}</p>
                </div>
                {i < STUDY_METHOD.length - 1 && (
                  <span className="hidden sm:block text-muted-foreground/30" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore by topic ── */}
      <section className="bg-section-alt">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
            Explore by topic
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Perception, attention, emotion, learning, and stress — each built
            around phenomena you can experience directly.
          </p>

          <div className="mt-8 space-y-2">
            {TOPICS.map((t) => (
              <Link
                key={t.slug}
                to={`/topics/${t.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white border-l-4 p-4 sm:p-5 transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                style={{ borderLeftColor: t.accent }}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base text-foreground group-hover:text-primary transition-colors">
                    {t.title}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground/40 shrink-0">
                  {t.count} {t.count === 1 ? "module" : "modules"}
                </span>
                <span
                  className="text-muted-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shared idea ── */}
      <section className="border-t border-border">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-14">
          <div className="rounded-xl border border-gray-200 bg-muted/30 p-6 sm:p-8 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every module in BrainTrace demonstrates the same underlying process:
              your brain predicts, checks the input, and updates its model.
            </p>
            <Link
              to="/how-your-brain-predicts/loop"
              className="mt-4 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Learn about the prediction loop →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
          <p className="text-lg text-muted-foreground">
            Pick a lesson and see what your brain does.
          </p>
          <Link
            to={`/unit/${unitIds[0]}`}
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
