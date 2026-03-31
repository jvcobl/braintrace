import { Link } from "react-router-dom";
import ModuleCard from "@/components/ModuleCard";

const placeholderModules = [
  { title: "Coming Soon", description: "A new module is being prepared." },
  { title: "Coming Soon", description: "A new module is being prepared." },
  { title: "Coming Soon", description: "A new module is being prepared." },
];

const Index = () => (
  <div className="container py-16 md:py-24">
    {/* Hero */}
    <section className="mx-auto max-w-2xl text-center">
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        NeuroRoute
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Experience a phenomenon, trace the neural pathway, and see a concise explanation —
        an interactive way to learn neuroscience.
      </p>
      <Link
        to="/course-map"
        className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        View Course Map
      </Link>
    </section>

    {/* Module Cards */}
    <section className="mx-auto mt-20 max-w-4xl">
      <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">Modules</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderModules.map((mod, i) => (
          <ModuleCard key={i} title={mod.title} description={mod.description} index={i} />
        ))}
      </div>
    </section>
  </div>
);

export default Index;
