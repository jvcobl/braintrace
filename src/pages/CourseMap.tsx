import { Link } from "react-router-dom";
import { courseUnits } from "@/data/courseMap";
import { getUnitContent } from "@/data/content/registry";
import { modules } from "@/data/modules";

const CourseMap = () => (
  <div className="container max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
      Classroom Reference
    </p>
    <h1 className="mt-3 font-display text-2xl sm:text-3xl tracking-tight text-foreground md:text-4xl">
      Topic Mapping
    </h1>
    <p className="mt-3.5 sm:mt-4 max-w-xl text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
      This page maps NeuroRoute's lessons to specific neuroscience topics,
      organized by unit. It's designed for students or instructors who want
      to connect each lesson to classroom material.
    </p>
    <p className="mt-2.5 sm:mt-3 max-w-xl text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
      Originally developed alongside Emory University's NBB302 course. The
      lessons themselves are open to anyone —{" "}
      <Link to="/" className="font-medium text-primary hover:underline">
        start from the homepage
      </Link>{" "}
      if you're exploring on your own.
    </p>

    <div className="mt-10 sm:mt-14 space-y-3 sm:space-y-4">
      {courseUnits.map((unit, i) => {
        const content = getUnitContent(unit.id);
        const linkedModules = modules.filter((m) =>
          unit.linkedModuleIds.includes(m.id)
        );

        return (
          <section
            key={unit.id}
            className="rounded-xl border border-border/70 bg-card"
          >
            <Link
              to={`/unit/${unit.id}`}
              className="group block p-4 sm:p-6 pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-xl"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                    {unit.title.replace(/^Unit \d+:\s*/, "")}
                  </h2>
                  {content && (
                    <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                      {content.meta.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Link>

            {/* Key topics */}
            <div className="px-4 sm:px-6 pt-3 sm:pt-4 pl-[3.25rem] sm:pl-[4.5rem]">
              <div className="flex flex-wrap gap-1.5">
                {unit.keyTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-secondary px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Lessons */}
            <div className="p-4 sm:p-6 pt-3 sm:pt-4 pl-[3.25rem] sm:pl-[4.5rem]">
              {linkedModules.length > 0 ? (
                <ul className="space-y-1.5">
                  {linkedModules.map((mod) => (
                    <li key={mod.id}>
                      <Link
                        to={`/module/${mod.id}`}
                        className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                      >
                        <span className="text-[10px] sm:text-xs text-muted-foreground/40" aria-hidden="true">→</span>
                        {mod.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] sm:text-[13px] text-muted-foreground italic">
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
