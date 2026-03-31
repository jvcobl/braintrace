import { Link } from "react-router-dom";
import { getUnitIds, getUnitContent, getLessonsByUnit } from "@/data/content/registry";
import { modules } from "@/data/modules";

const unitContentCounts = (unitId: string) => {
  const c = getUnitContent(unitId);
  if (!c) return null;
  return {
    concepts: c.conceptCards.length,
    pathways: c.pathways.length,
    distinctions: c.distinctions.length,
    caseNotes: c.caseNotes.length,
    review: c.review.length,
  };
};

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
          An interactive study companion for NBB302. Five units, six lessons,
          and over 200 study items — all sourced from your lecture notes.
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

      {/* ── Unit Hubs ── */}
      <section className="mx-auto mt-20 max-w-4xl">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
          Units
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unitIds.map((uid) => {
            const content = getUnitContent(uid);
            if (!content) return null;
            const num = uid.replace("unit-", "");
            const counts = unitContentCounts(uid);
            const lessonCount = getLessonsByUnit(uid).length;

            return (
              <Link
                key={uid}
                to={`/unit/${uid}`}
                className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Unit {num}
                </span>
                <h3 className="font-display text-base font-semibold text-card-foreground leading-snug">
                  {content.meta.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {content.meta.subtitle}
                </p>

                {/* Structures preview */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {content.meta.majorStructures.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                  {content.meta.majorStructures.length > 3 && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      +{content.meta.majorStructures.length - 3}
                    </span>
                  )}
                </div>

                {/* Coverage line */}
                {counts && (
                  <p className="mt-3 text-[11px] text-muted-foreground/70">
                    {counts.concepts} concepts · {counts.pathways} pathways · {lessonCount === 1 ? "1 lesson" : `${lessonCount} lessons`}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Featured Lessons ── */}
      <section className="mx-auto mt-16 max-w-4xl">
        <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
          Featured Lessons
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              to={`/module/${mod.id}`}
              className="group flex flex-col rounded-lg border border-border bg-card px-4 py-3.5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                Unit {mod.unitId.replace("unit-", "")}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-card-foreground leading-snug">
                {mod.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {mod.shortGoal}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Study Pattern ── */}
      <section className="mx-auto mt-16 max-w-2xl text-center">
        <h2 className="font-display text-xl font-semibold text-foreground">
          How It Works
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every lesson follows the same three-part pattern.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              1
            </span>
            <span className="font-medium text-foreground">Experience</span>
            <span className="text-xs text-muted-foreground">Try a demo</span>
          </div>
          <span className="text-muted-foreground/40 text-lg" aria-hidden="true">→</span>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              2
            </span>
            <span className="font-medium text-foreground">Trace</span>
            <span className="text-xs text-muted-foreground">Follow the pathway</span>
          </div>
          <span className="text-muted-foreground/40 text-lg" aria-hidden="true">→</span>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              3
            </span>
            <span className="font-medium text-foreground">Explain</span>
            <span className="text-xs text-muted-foreground">Read the science</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
