import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent } from "@/data/content/registry";
import { modules } from "@/data/modules";

const Index = () => {
  const unitIds = getUnitIds();

  return (
    <div className="container py-16 md:py-24">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          NeuroRoute
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          An interactive study companion for NBB302 — experience a phenomenon,
          trace the neural pathway, then read the science.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/course-map"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Course Map
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            About
          </Link>
        </div>
      </section>

      {/* ── Units ── */}
      <section className="mx-auto mt-20 max-w-3xl">
        <div className="space-y-4">
          {unitIds.map((uid) => {
            const content = getUnitContent(uid);
            if (!content) return null;
            const num = uid.replace("unit-", "");

            return (
              <Link
                key={uid}
                to={`/unit/${uid}`}
                className="group flex items-start gap-5 rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {num}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-card-foreground leading-snug">
                    {content.meta.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {content.meta.subtitle}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {content.meta.majorStructures.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                    {content.meta.majorStructures.length > 4 && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                        +{content.meta.majorStructures.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Lessons ── */}
      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Lessons
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              to={`/module/${mod.id}`}
              className="rounded-lg border border-border bg-card px-4 py-3 transition-shadow hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <h3 className="text-sm font-medium text-card-foreground leading-snug">
                {mod.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Unit {mod.unitId.replace("unit-", "")}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
