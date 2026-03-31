import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";
import { modules } from "@/data/modules";

const CourseMap = () => (
  <div className="container max-w-4xl py-12 md:py-20">
    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
      Course Map
    </h1>
    <p className="mt-2 max-w-lg text-muted-foreground">
      NBB302 units and the NeuroRoute modules that cover them.
    </p>

    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      {courseUnits.map((unit, i) => {
        const linkedModules = modules.filter((m) =>
          unit.linkedModuleIds.includes(m.id)
        );

        return (
          <section
            key={unit.id}
            className="flex flex-col rounded-lg border border-border bg-card p-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Unit {i + 1}
            </p>
            <h2 className="mt-1 font-display text-base font-semibold leading-snug">
              <Link
                to={`/unit/${unit.id}`}
                className="text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
              >
                {unit.title.replace(/^Unit \d+:\s*/, "")}
              </Link>
            </h2>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {unit.keyTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4">
              {linkedModules.length > 0 ? (
                <ul className="space-y-1">
                  {linkedModules.map((mod) => (
                    <li key={mod.id}>
                      <Link
                        to={`/module/${mod.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                      >
                        <span className="text-xs text-muted-foreground" aria-hidden="true">→</span>
                        {mod.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No modules yet
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
