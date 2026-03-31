import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";
import { getUnitContent } from "@/data/content/registry";
import { modules } from "@/data/modules";

const CourseMap = () => (
  <div className="container max-w-4xl py-16 md:py-24">
    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
      Course Map
    </p>
    <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground md:text-4xl">
      All lessons by topic
    </h1>
    <p className="mt-4 max-w-lg text-[15px] text-muted-foreground leading-relaxed">
      Five units from sensory processing through higher cognition to
      neuroendocrine stress systems. Originally developed alongside Emory
      University's NBB302 course.
    </p>

    <div className="mt-12 space-y-4">
      {courseUnits.map((unit, i) => {
        const content = getUnitContent(unit.id);
        const linkedModules = modules.filter((m) =>
          unit.linkedModuleIds.includes(m.id)
        );

        return (
          <section
            key={unit.id}
            className="rounded-xl border border-border bg-card shadow-sm"
          >
            <Link
              to={`/unit/${unit.id}`}
              className="group block p-6 pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-xl"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                    {unit.title.replace(/^Unit \d+:\s*/, "")}
                  </h2>
                  {content && (
                    <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                      {content.meta.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Link>

            {/* Key topics */}
            <div className="px-6 pt-4 pl-[4.5rem]">
              <div className="flex flex-wrap gap-1.5">
                {unit.keyTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Lessons */}
            <div className="p-6 pt-4 pl-[4.5rem]">
              {linkedModules.length > 0 ? (
                <ul className="space-y-1.5">
                  {linkedModules.map((mod) => (
                    <li key={mod.id}>
                      <Link
                        to={`/module/${mod.id}`}
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                      >
                        <span className="text-xs text-muted-foreground/50" aria-hidden="true">→</span>
                        {mod.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-muted-foreground italic">
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
