import { Link } from "react-router-dom";
import { modules } from "@/data/modules";
import Breadcrumb from "@/components/layout/Breadcrumb";

/* ------------------------------------------------------------------ */
/* Course-topic → BrainTrace module mapping                           */
/* ------------------------------------------------------------------ */

interface TopicArea {
  title: string;
  subtitle: string;
  keyTopics: string[];
  moduleIds: string[];
}

const topicAreas: TopicArea[] = [
  {
    title: "Sensation, Perception, and Inklings of Awareness + Object Recognition and Decision-making",
    subtitle: "How raw sensory input becomes conscious perception — and how the brain predicts identity before the picture is complete.",
    keyTopics: ["Top-down processing", "Object recognition", "Face perception", "Fusiform face area", "Working memory", "Cognitive load", "Prefrontal cortex"],
    moduleIds: ["mod-1", "mod-2", "mod-5"],
  },
  {
    title: "States that Prime Behavior",
    subtitle: "Arousal, emotion, and the rapid subcortical circuits that shape automatic responses before conscious evaluation.",
    keyTopics: ["Emotion vs. arousal", "Amygdala", "Startle reflex", "Fear-potentiated startle"],
    moduleIds: ["mod-3"],
  },
  {
    title: "Learning 101 + The Push & Pull",
    subtitle: "How cues become predictions, how fear is acquired through conditioning, and why extinction is new learning — not forgetting.",
    keyTopics: ["Fear conditioning", "Extinction", "CS-US pairing", "vmPFC circuitry", "Spontaneous recovery"],
    moduleIds: ["mod-4"],
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const CourseMap = () => (
  <div className="container max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
    <Breadcrumb />
    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
      Classroom Reference
    </p>
    <h1 className="mt-3 font-display text-2xl sm:text-3xl tracking-tight text-foreground md:text-4xl">
      Topic Mapping
    </h1>
    <p className="mt-3.5 sm:mt-4 max-w-xl text-[14px] sm:text-[15px] text-foreground/80 leading-[1.7]">
      This page maps BrainTrace's interactive lessons to the course topics they
      cover. Use it to connect each lesson to classroom material.
    </p>

    <div className="mt-10 sm:mt-14 space-y-3 sm:space-y-4">
      {topicAreas.map((area) => {
        const linkedModules = modules.filter((m) =>
          area.moduleIds.includes(m.id)
        );

        return (
          <section
            key={area.title}
            className="rounded-xl border border-border/70 bg-card"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 pb-0">
              <div className="min-w-0">
                <h2 className="font-display text-base sm:text-lg text-foreground leading-snug">
                  {area.title}
                </h2>
                <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                  {area.subtitle}
                </p>
              </div>
            </div>

            {/* Key topics */}
            <div className="px-4 sm:px-6 pt-3 sm:pt-4">
              <div className="flex flex-wrap gap-1.5">
                {area.keyTopics.map((topic) => (
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
            <div className="p-4 sm:p-6 pt-3 sm:pt-4">
              {linkedModules.length > 0 ? (
                <ul className="space-y-1.5">
                  {linkedModules.map((mod) => (
                    <li key={mod.id}>
                      <Link
                        to={`/module/${mod.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                      >
                        <span className="text-[10px] sm:text-xs text-muted-foreground/40" aria-hidden="true">→</span>
                        {mod.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] sm:text-[13px] text-muted-foreground/50">
                  Lessons coming soon
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
