import { Link } from "react-router-dom";
import { modules } from "@/data/modules";
import { usePageMeta } from "@/hooks/use-page-meta";

/* ── Static data ── */

const STEPS = [
  { name: "Experience", desc: "Try a short interactive demo. You feel the phenomenon yourself before any explanation." },
  { name: "Trace", desc: "Follow the neural pathway. See which structures fired and why." },
  { name: "Explain", desc: "Read the prediction your brain made, the mismatch it detected, and how it updated." },
];

const TOPICS = [
  { slug: "perception", title: "Perception and Object Recognition", accent: "#7F77DD", count: 3, hook: "Your brain identifies objects before the picture is complete." },
  { slug: "attention", title: "Attention, Cognitive Load, and the PFC", accent: "#7F77DD", count: 2, hook: "Focus costs energy. Your prefrontal cortex runs out of it." },
  { slug: "emotion", title: "Emotion, Limbic System, and Amygdala", accent: "#D85A30", count: 3, hook: "Your body reacts before your cortex knows what happened." },
  { slug: "learning", title: "Learning and Fear Conditioning", accent: "#1D9E75", count: 2, hook: "Fear is learned fast, and unlearned differently than you'd expect." },
  { slug: "stress", title: "Stress and Homeostasis", accent: "#1D9E75", count: 2, hook: "The stress response protects you, until it can't shut off." },
];

/* ── Component ── */

const Index = () => {
  usePageMeta();

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

        <div className="container relative mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center sm:py-24">
          <h1 className="font-display text-[2rem] leading-[1.12] tracking-tight text-foreground sm:text-[2.5rem] md:text-[3.25rem]">
            Experience how your brain
            <br className="hidden sm:block" />
            <span className="text-primary/80"> predicts, reacts, and learns.</span>
          </h1>

          <p className="mx-auto mt-5 sm:mt-6 max-w-lg text-balance text-[15px] sm:text-[1.05rem] leading-relaxed text-muted-foreground">
            Guess a blurry object before it sharpens. Watch a vase turn into two
            faces. Learn a fear, then see whether it comes back. Each short lesson
            lets you feel it first, then shows the circuit behind it.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* The quickest way in: straight into a one-minute demo. */}
            <Link
              to="/module/blurry-object-guess#experience"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Try a Lesson
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Choose a Topic
            </Link>
          </div>

          <p className="mt-8 sm:mt-10 text-balance text-[13px] text-muted-foreground">
            {modules.length} interactive lessons · {TOPICS.length} topics
            <span className="hidden sm:inline"> · </span>
            <Link
              to="/about"
              className="mt-1 block sm:mt-0 sm:inline whitespace-nowrap underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              Built from Emory NBB302 course notes
            </Link>
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-y border-border">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-center font-display text-xl sm:text-2xl tracking-tight text-foreground">
            Every lesson follows the same structure
          </h2>
          <p className="text-center text-balance mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Experience the phenomenon first. Then see the circuit. Then read the explanation.
          </p>

          <ol className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3 sm:gap-4">
            {STEPS.map((s, i) => (
              <li key={s.name} className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
                <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary text-[11px] sm:text-xs font-bold text-primary-foreground" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-2.5 sm:mt-3 font-display text-[15px] sm:text-base text-foreground">{s.name}</h3>
                <p className="mt-1 sm:mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>

          {/* The idea that ties every lesson together */}
          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">One idea behind every lesson</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Every lesson runs the same loop: predict, receive input,
                  detect mismatch, update. The concept pages explain how the
                  loop works and where it breaks.
                </p>
              </div>
              <Link
                to="/how-your-brain-predicts"
                className="-my-3 inline-flex min-h-11 items-center shrink-0 rounded-sm text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                How your brain predicts →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="bg-section-alt">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
            Five areas of neuroscience
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Pick a topic. Each has two or three short interactive lessons.
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
                  <p className="text-xs text-gray-500 mt-0.5">{t.hook}</p>
                </div>
                <span className="hidden sm:inline text-xs text-muted-foreground shrink-0">
                  {t.count} {t.count === 1 ? "lesson" : "lessons"}
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
    </div>
  );
};

export default Index;
