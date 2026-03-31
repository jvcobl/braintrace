import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent, getLessonsByUnit } from "@/data/content/registry";
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

      {/* ── Units with nested lessons ── */}
      <section className="mx-auto mt-20 max-w-3xl space-y-6">
        {unitIds.map((uid) => {
          const content = getUnitContent(uid);
          if (!content) return null;
          const num = uid.replace("unit-", "");
          const lessons = getLessonsByUnit(uid);
          const linkedModules = lessons
            .map((l) => modules.find((m) => m.id === l.moduleId))
            .filter((m): m is NonNullable<typeof m> => m != null);

          return (
            <div
              key={uid}
              className="rounded-lg border border-border bg-card"
            >
              {/* Unit link */}
              <Link
                to={`/unit/${uid}`}
                className="group flex items-start gap-4 p-5 pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-lg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {num}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors">
                    {content.meta.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {content.meta.subtitle}
                  </p>
                </div>
              </Link>

              {/* Lessons nested under this unit */}
              {linkedModules.length > 0 && (
                <div className="px-5 pb-4 sm:pl-[4.25rem]">
                  <ul className="space-y-1">
                    {linkedModules.map((mod) => (
                      <li key={mod.id}>
                        <Link
                          to={`/module/${mod.id}`}
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                        >
                          <span className="text-xs text-muted-foreground" aria-hidden="true">→</span>
                          {mod.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Index;
