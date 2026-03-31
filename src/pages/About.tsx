import { Link } from "react-router-dom";

const About = () => (
  <div className="container max-w-2xl py-12 md:py-20">
    <Link to="/" className="text-sm text-primary hover:underline">
      ← Back to home
    </Link>

    <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
      About NeuroRoute
    </h1>

    <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
      <p>
        NeuroRoute is an interactive neuroscience learning app built for NBB302.
        Each module focuses on a single perceptual or cognitive phenomenon and
        walks you through it in three steps:
      </p>

      <ol className="list-decimal pl-5 space-y-2 text-foreground">
        <li>
          <strong>Experience</strong> — a short interactive demo that lets you
          observe the phenomenon firsthand.
        </li>
        <li>
          <strong>Trace</strong> — a simplified neural pathway showing which
          brain regions are involved and what each one contributes.
        </li>
        <li>
          <strong>Explain</strong> — a concise write-up covering what happened,
          what your brain did, the key pathway, and how it connects to NBB302
          course material.
        </li>
      </ol>

      <p>
        The goal is not to replace lectures or textbooks, but to give you a
        concrete, first-person experience of each concept before you study
        the underlying neuroscience.
      </p>

      <p>
        NeuroRoute is a client-side educational app. It runs entirely in your
        browser — no accounts, no saved data, no tracking. Just modules you
        can explore at your own pace.
      </p>
    </div>

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
        View Course Map
      </Link>
    </div>
  </div>
);

export default About;
