import { Link } from "react-router-dom";

const steps = [
  { name: "Experience", desc: "A short interactive demo that lets you observe the phenomenon firsthand." },
  { name: "Trace", desc: "A simplified neural pathway showing which brain regions are involved." },
  { name: "Explain", desc: "A focused write-up connecting the demo to the underlying neuroscience." },
];

const About = () => (
  <div className="container max-w-2xl py-16 md:py-24">
    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary/70">
      About
    </p>
    <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground md:text-4xl">
      What is NeuroRoute?
    </h1>

    <p className="mt-6 text-[15px] text-foreground/80 leading-[1.7]">
      NeuroRoute is a free interactive neuroscience site. It covers five
      areas — perception, attention, emotion, learning, and stress — through
      lessons built around real phenomena you can experience in your browser.
    </p>

    <p className="mt-4 text-[15px] text-foreground/80 leading-[1.7]">
      The goal is to give you a concrete, first-person encounter with each
      concept before you study the underlying neuroscience. Every lesson
      follows the same three-step structure:
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.name} className="rounded-xl border border-border/70 bg-card p-5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
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

    <p className="mt-8 text-[15px] text-foreground/80 leading-[1.7]">
      NeuroRoute runs entirely in your browser — no accounts, no saved data,
      no tracking. Anyone curious about how the brain works can use it.
    </p>

    {/* Primary CTA */}
    <div className="mt-10">
      <Link
        to="/"
        className="inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Start Exploring
      </Link>
    </div>

    {/* Secondary: classroom context */}
    <div className="mt-16 border-t border-border/50 pt-8">
      <p className="text-[13px] text-muted-foreground/70 leading-relaxed">
        NeuroRoute was originally developed alongside Emory University's
        NBB302 course. If you're using it in a classroom setting, the{" "}
        <Link to="/course-map" className="font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
          topic mapping page
        </Link>{" "}
        connects each lesson to specific lecture topics.
      </p>
    </div>
  </div>
);

export default About;
