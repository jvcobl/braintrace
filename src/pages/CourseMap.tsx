import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";
import { modules } from "@/data/modules";

const CourseMap = () => (
  <div className="container max-w-3xl py-12 md:py-20">
    <Link to="/" className="text-sm text-primary hover:underline">
      ← Back to home
    </Link>

    <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
      Course Map
    </h1>
    <p className="mt-2 text-muted-foreground">
      NeuroRoute modules mapped to NBB302 course units.
    </p>

    <div className="mt-10 space-y-8">
      {courseUnits.map((unit) => {
        const linkedModules = modules.filter((m) =>
          unit.linkedModuleIds.includes(m.id)
        );

        return (
          <section
            key={unit.id}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">
              {unit.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {unit.keyTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>

            {linkedModules.length > 0 ? (
              <ul className="mt-4 space-y-1.5">
                {linkedModules.map((mod) => (
                  <li key={mod.id}>
                    <Link
                      to={`/module/${mod.id}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <span className="text-muted-foreground">→</span>
                      {mod.title}
                    </Link>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {mod.shortGoal}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-xs text-muted-foreground italic">
                No modules linked yet.
              </p>
            )}
          </section>
        );
      })}
    </div>
  </div>
);

export default CourseMap;
