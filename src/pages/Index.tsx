import { Link } from "react-router-dom";

/* ── Static data ── */

const STEPS = [
  { name: "Experience", desc: "Do a short interactive demo — see a phenomenon in your own nervous system." },
  { name: "Trace", desc: "Follow the neural pathway — which structures fired and why." },
  { name: "Explain", desc: "Read the prediction your brain made, the mismatch it detected, and how it updated." },
];

const TOPICS = [
  { slug: "perception", title: "Perception and Object Recognition", accent: "#7F77DD", count: 3, hook: "Your brain identifies objects before the picture is complete." },
  { slug: "attention", title: "Attention, Cognitive Load, and the PFC", accent: "#7F77DD", count: 2, hook: "Focus costs energy — and your prefrontal cortex runs out." },
  { slug: "emotion", title: "Emotion, Limbic System, and Amygdala", accent: "#D85A30", count: 3, hook: "Your body reacts before your cortex knows what happened." },
  { slug: "learning", title: "Learning and Fear Conditioning", accent: "#1D9E75", count: 2, hook: "Fear is learned fast and unlearned differently than you'd expect." },
  { slug: "stress", title: "Stress and Homeostasis", accent: "#1D9E75", count: 2, hook: "The stress response protects you — until it doesn't shut off." },
];

/* ── Component ── */

const Index = () => (
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
          Experience how your brain
          <br className="hidden sm:block" />
          <span className="text-primary/80"> predicts, reacts, and learns.</span>
        </h1>

        <p className="mx-auto mt-5 sm:mt-6 max-w-lg text-[15px] sm:text-[1.05rem] leading-relaxed text-muted-foreground">
          Interactive neuroscience modules where you experience a phenomenon,
          trace the pathway, and understand what your brain is doing.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/topics"
            className="inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Choose a Topic
          </Link>
          <Link
            to="/how-your-brain-predicts"
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            The science behind it →
          </Link>
        </div>
      </div>
    </section>

    {/* ── How it works ── */}
    <section className="border-y border-border">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-16">
        <h2 className="text-center font-display text-xl sm:text-2xl tracking-tight text-foreground">
          Every module follows the same structure
        </h2>
        <p className="text-center mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
          Experience the phenomenon first. Then see the circuit. Then read the explanation.
        </p>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col sm:flex-row items-stretch gap-2">
          {STEPS.map((s, i) => (
            <div key={s.name} className="flex flex-1 items-center gap-2">
              <div className="flex-1 rounded-lg bg-muted/40 px-4 py-4 text-center">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden sm:block text-muted-foreground/30" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Topics ── */}
    <section className="bg-section-alt">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
          Five areas of neuroscience
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Pick a topic. Each one contains interactive modules you can
          complete in under five minutes.
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
                <p className="text-xs text-gray-400 mt-0.5">{t.hook}</p>
              </div>
              <span className="text-xs text-muted-foreground/40 shrink-0">
                {t.count} {t.count === 1 ? "module" : "modules"}
              </span>
              <span
                className="text-gray-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── The framework ── */}
    <section className="border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <div className="rounded-xl border border-gray-200 bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                The shared framework
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Every module demonstrates the same underlying process:
                predict, receive input, detect mismatch, update. The concept
                pages explain why this loop works and how it breaks.
              </p>
            </div>
            <Link
              to="/how-your-brain-predicts"
              className="inline-flex items-center shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Explore →
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
