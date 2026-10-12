import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";

const steps = [
  { name: "Experience", desc: "A short interactive demo that lets you observe the phenomenon firsthand." },
  { name: "Trace", desc: "A simplified neural pathway showing which brain regions are involved." },
  { name: "Explain", desc: "A focused write-up connecting the demo to the neuroscience behind it." },
];

const About = () => {
  usePageMeta({ title: "About", description: "What BrainTrace is, how its lessons work, and who built it." });

  return (
    <div className="container max-w-3xl px-4 sm:px-6 py-12 [&>p]:max-w-2xl">
      <Breadcrumb />
      <h1 className="font-display text-3xl tracking-tight text-foreground">
        About BrainTrace
      </h1>

      <p className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
        BrainTrace is a free interactive neuroscience site covering perception,
        attention, emotion, learning, and stress. Each lesson is built around
        a real phenomenon you can experience in your browser.
      </p>

      <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
        Every lesson follows the same three steps. You encounter the
        phenomenon first, then trace the neural pathway, then read a focused
        explanation of what your brain was doing.
      </p>

      <div className="mt-7 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.name} className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
            <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary text-[11px] sm:text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <p className="mt-2.5 sm:mt-3 font-display text-[14px] sm:text-[15px] text-foreground">
              {s.name}
            </p>
            <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-7 sm:mt-8 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
        Everything runs in your browser. No accounts, no saved data, no
        tracking. Anyone curious about how the brain works can use it.
      </p>

      <h2 className="mt-10 sm:mt-12 font-display text-xl sm:text-2xl tracking-tight text-foreground">
        What makes it different
      </h2>
      <ul className="mt-3 sm:mt-4 max-w-2xl space-y-2.5 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
        {[
          <>
            <strong className="font-medium text-foreground">One idea throughout.</strong> Every lesson is a case of the
            brain&rsquo;s predict-and-correct loop, explained in{" "}
            <Link
              to="/how-your-brain-predicts"
              className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              three short concept pages
            </Link>
            .
          </>,
          <>
            <strong className="font-medium text-foreground">You go first.</strong> You make a prediction or a choice
            before any explanation, and the feedback responds to what you actually did.
          </>,
          <>
            <strong className="font-medium text-foreground">The circuit, not just the fact.</strong> Each lesson&rsquo;s
            Trace step lays out the brain structures and pathway behind what you just experienced.
          </>,
          <>
            <strong className="font-medium text-foreground">Study guides.</strong> Each topic has a guide with key
            concepts, pathways, distinctions, case notes and review questions.
          </>,
          <>
            <strong className="font-medium text-foreground">Built for everyone.</strong> Every lesson works with a
            keyboard and a screen reader, and respects reduced-motion settings.
          </>,
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 sm:mt-12 font-display text-xl sm:text-2xl tracking-tight text-foreground">
        Who built it
      </h2>
      <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
        BrainTrace was designed and built by Jacob Hyun Lee. The science in every
        lesson comes from course notes for NBB302, Behavioral Neuroscience, at
        Emory University. Lessons that end with an &ldquo;NBB302 connection&rdquo;
        name the lectures they draw on, and the{" "}
        <Link
          to="/course-map"
          className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          course map
        </Link>{" "}
        shows how every lesson lines up with the course.
      </p>
      <p className="mt-3.5 sm:mt-4 text-[13px] sm:text-[14px] text-muted-foreground leading-[1.7]">
        BrainTrace is an independent study project. It is not affiliated with or
        endorsed by Emory University, and it is not medical advice.
      </p>

      {/* Primary CTA */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          to="/module/blurry-object-guess#experience"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-7 py-3 sm:py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Try a Lesson
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          to="/topics"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3 sm:py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Choose a Topic
        </Link>
      </div>
    </div>
  );
};

export default About;
