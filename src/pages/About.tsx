import { Link } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";

const steps = [
  { name: "Experience", desc: "A short interactive demo that lets you observe the phenomenon firsthand." },
  { name: "Trace", desc: "A simplified neural pathway showing which brain regions are involved." },
  { name: "Explain", desc: "A focused write-up connecting the demo to the underlying neuroscience." },
];

const About = () => (
  <div className="container max-w-2xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
    <Breadcrumb />
    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-primary/70">
      About
    </p>
    <h1 className="mt-3 font-display text-2xl sm:text-3xl tracking-tight text-foreground md:text-4xl">
      BrainTrace
    </h1>

    <p className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
      BrainTrace is a free interactive neuroscience site. It covers five
      areas — perception, attention, emotion, learning, and stress — through
      lessons built around real phenomena you can experience in your browser.
    </p>

    <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
      Every lesson follows the same three-step structure: you encounter a
      phenomenon first, then trace the neural pathway, then read a focused
      explanation of what your brain was doing.
    </p>

    <div className="mt-7 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.name} className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
          <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-bold text-primary-foreground">
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
      Everything runs in your browser — no accounts, no saved data,
      no tracking. Anyone curious about how the brain works can use it.
    </p>

    {/* Primary CTA */}
    <div className="mt-8 sm:mt-10">
      <Link
        to="/topics"
        className="inline-flex items-center rounded-lg bg-primary px-7 py-3 sm:py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Choose a Topic
      </Link>
    </div>

  </div>
);

export default About;
