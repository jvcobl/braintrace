import { Link } from "react-router-dom";

const steps = [
  { name: "Experience", desc: "A short interactive demo that lets you observe the phenomenon firsthand." },
  { name: "Trace", desc: "A simplified neural pathway showing which brain regions are involved." },
  { name: "Explain", desc: "A focused write-up connecting the demo to the underlying neuroscience." },
];

const About = () => (
  <div className="container max-w-2xl py-16 md:py-24">
    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
      About
    </p>
    <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground md:text-4xl">
      About NeuroRoute
    </h1>

    <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed">
      NeuroRoute is a free interactive neuroscience site covering five
      areas — perception, attention, emotion, learning, and stress.
      Each topic includes interactive lessons that follow a consistent
      three-step structure:
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.name} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
            {i + 1}
          </span>
          <p className="mt-3 font-display text-[15px] text-foreground">
            {s.name}
          </p>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
            {s.desc}
          </p>
        </div>
      ))}
    </div>

    <p className="mt-8 text-[15px] text-muted-foreground leading-relaxed">
      The goal is to give you a concrete, first-person experience of each
      concept before you study the underlying neuroscience. NeuroRoute runs
      entirely in your browser — no accounts, no saved data, no tracking.
    </p>

    <div className="mt-10 flex gap-4">
      <Link
        to="/"
        className="inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Browse Units
      </Link>
      <Link
        to="/course-map"
        className="inline-flex items-center rounded-lg border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Course Map
      </Link>
    </div>
  </div>
);

export default About;
