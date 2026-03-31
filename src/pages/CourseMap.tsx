import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";
import { getUnitContent } from "@/data/content/registry";
import { modules } from "@/data/modules";

const CourseMap = () => (
  <div className="container max-w-3xl py-12 md:py-20">
    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
      Course Map
    </h1>
    <p className="mt-2 max-w-lg text-muted-foreground">
      Five units covering perception, attention, emotion, fear conditioning, and
      stress — each with interactive lessons and study material.
    </p>

    <div className="mt-10 space-y-6">
      {courseUnits.map((unit, i) => {
        const content = getUnitContent(unit.id);
        const linkedModules = modules.filter((m) =>
          unit.linkedModuleIds.includes(m.id)
        );

        return (
          <section
            key={unit.id}
            className="rounded-lg border border-border bg-card"
          >
            {/* Unit header — links to the unit hub */}
            <Link
              to={`/unit/${unit.id}`}
              className="block p-5 pb-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-lg"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Unit {i + 1}
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {unit.title.replace(/^Unit \d+:\s*/, "")}
              </h2>
              {content && (
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {content.meta.subtitle}
                </p>
              )}
            </Link>

            {/* Key topics */}
            <div className="px-5 pt-3">
              <div className="flex flex-wrap gap-1.5">
                {unit.keyTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Lessons */}
            <div className="p-5 pt-4">
              {linkedModules.length > 0 ? (
                <ul className="space-y-1">
                  {linkedModules.map((mod) => (
                    <li key={mod.id}>
                      <Link
                        to={`/module/${mod.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                      >
                        <span
                          className="text-xs text-muted-foreground"
                          aria-hidden="true"
                        >
                          →
                        </span>
                        {mod.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No lessons yet
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  </div>
);

export default CourseMap;
