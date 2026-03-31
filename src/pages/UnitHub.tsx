import { useParams, Link } from "react-router-dom";
import { getUnitContent, getLessonsByUnit, getUnitIds, unit5AnchorLesson } from "@/data/content/registry";
import { modules } from "@/data/modules";

const UnitHub = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const content = unitId ? getUnitContent(unitId) : undefined;

  if (!content || !unitId) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">Unit Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          The unit you're looking for doesn't exist.
        </p>
        <Link
          to="/course-map"
          className="mt-8 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Course Map
        </Link>
      </div>
    );
  }

  const { meta } = content;
  const unitNumber = unitId.replace("unit-", "");
  const lessons = getLessonsByUnit(unitId);
  const isUnit5 = unitId === "unit-5";

  const linkedModules = lessons
    .map((l) => modules.find((m) => m.id === l.moduleId))
    .filter(Boolean);

  const allIds = getUnitIds();
  const idx = allIds.indexOf(unitId);
  const prevUnit = idx > 0 ? allIds[idx - 1] : null;
  const nextUnit = idx < allIds.length - 1 ? allIds[idx + 1] : null;

  return (
    <div className="container max-w-3xl py-12">
      <Link
        to="/course-map"
        className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
      >
        ← Course Map
      </Link>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Unit {unitNumber}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{meta.title}</h1>
        <p className="mt-2 text-muted-foreground">{meta.subtitle}</p>
      </div>

      <section className="mt-8">
        <p className="text-sm text-foreground/80 leading-relaxed">{meta.overview}</p>
      </section>

      {/* Structures */}
      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Major Structures
        </h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {meta.majorStructures.map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Lectures */}
      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Lecture Topics
        </h2>
        <ul className="mt-2 space-y-1">
          {meta.lectureTopics.map((t) => (
            <li key={t} className="text-sm text-foreground/80">{t}</li>
          ))}
        </ul>
      </section>

      {/* Lessons */}
      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-foreground">Lessons</h2>
        {linkedModules.length > 0 ? (
          <div className="mt-3 space-y-3">
            {linkedModules.map((mod) =>
              mod ? (
                <Link
                  key={mod.id}
                  to={`/module/${mod.id}`}
                  className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <h3 className="font-display text-base font-semibold text-card-foreground leading-snug">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {mod.shortDescription}
                  </p>
                </Link>
              ) : null,
            )}
          </div>
        ) : isUnit5 ? (
          <div className="mt-3 rounded-lg border border-dashed border-border bg-card p-5 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {unit5AnchorLesson.title}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground italic">No lessons yet</p>
        )}
      </section>

      {/* Prev / Next */}
      <nav className="mt-12 flex items-center justify-between border-t border-border pt-6">
        {prevUnit ? (
          <Link
            to={`/unit/${prevUnit}`}
            className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
          >
            ← Unit {prevUnit.replace("unit-", "")}
          </Link>
        ) : (
          <span />
        )}
        {nextUnit ? (
          <Link
            to={`/unit/${nextUnit}`}
            className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
          >
            Unit {nextUnit.replace("unit-", "")} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};

export default UnitHub;
