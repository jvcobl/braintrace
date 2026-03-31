import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";
import { modules } from "@/data/modules";

const unitAccents: Record<string, string> = {
  "unit-1": "border-l-primary",
  "unit-2": "border-l-accent-foreground",
  "unit-3": "border-l-destructive",
  "unit-4": "border-l-ring",
};

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
        const accent = unitAccents[unit.id] ?? "border-l-border";

        return (
          <section
            key={unit.id}
            className={`rounded-lg border border-border border-l-4 ${accent} bg-card p-5 flex flex-col`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Unit {i + 1}
            </p>
            <h2 className="mt-1 font-display text-base font-semibold text-foreground leading-snug">
              {unit.title.replace(/^Unit \d+:\s*/, "")}
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
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        <span className="text-xs text-muted-foreground">→</span>
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
