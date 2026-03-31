import { Link } from "react-router-dom";

const steps = [
  { name: "Experience", desc: "A short interactive demo that lets you observe the phenomenon firsthand." },
  { name: "Trace", desc: "A simplified neural pathway showing which brain regions are involved." },
  { name: "Explain", desc: "A concise write-up connecting the demo to NBB302 course material." },
];

const About = () => (
  <div className="container max-w-2xl py-12 md:py-20">
    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
      About NeuroRoute
    </h1>

    <p className="mt-4 text-muted-foreground leading-relaxed">
      NeuroRoute is an interactive neuroscience learning app built for NBB302.
      Each module focuses on a single perceptual or cognitive phenomenon and
      walks you through it in three steps:
    </p>

    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.name} className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Step {i + 1}
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-foreground">
            {s.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {s.desc}
          </p>
        </div>
      ))}
    </div>

    <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
      The goal is not to replace lectures or textbooks, but to give you a
      concrete, first-person experience of each concept before you study
      the underlying neuroscience. NeuroRoute runs entirely in your browser —
      no accounts, no saved data, no tracking.
    </p>

    <div className="mt-8 flex gap-3">
      <Link
        to="/"
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Browse Modules
      </Link>
      <Link
        to="/course-map"
        className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
      >
        Course Map
      </Link>
    </div>
  </div>
);

export default About;
