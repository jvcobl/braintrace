import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ModuleLink from "@/components/ModuleLink";
import ConceptLink from "@/components/ConceptLink";

/* ── Topic area data ── */

interface TopicArea {
  title: string;
  accent: string;
  courseTopics: string[];
  temporal: string;
  moduleIds: string[];
}

const topicAreas: TopicArea[] = [
  {
    title: "Sensation, Perception, and Object Recognition",
    accent: "#7F77DD",
    courseTopics: [
      "Sensation, Perception, and Inklings of Awareness",
      "Object Recognition and Decision-making",
      "Top-down and Bottom-up Integrations",
    ],
    temporal: "Milliseconds Before → One Second Before",
    moduleIds: ["blurry-object-guess", "face-or-not", "memory-under-load"],
  },
  {
    title: "Emotion, Arousal, and Salience",
    accent: "#D85A30",
    courseTopics: ["States that Prime Behavior — Arousal, Emotions"],
    temporal: "Seconds to Minutes",
    moduleIds: ["sudden-noise-reaction"],
  },
  {
    title: "Learning, Fear, and Stress",
    accent: "#1D9E75",
    courseTopics: [
      "Learning 101 — Behaviorism and Plasticity",
      "The Push & Pull — Fear and Anxiety",
      "Stress & Survival — HPA Axis",
    ],
    temporal: "Minutes to Days → Days to Months",
    moduleIds: ["fear-cue-and-extinction", "stress-response-builder"],
  },
];

/* ── Course timeline data ── */

interface TimelineEntry {
  week: string;
  topic: string;
  temporal?: string;
  modules?: string[];
}

const timeline: TimelineEntry[] = [
  { week: "1–2", topic: "Framing Behavior & Its Origins", temporal: "Intro" },
  { week: "3–4", topic: "What and Where is Behavior / Bases of Behavior", temporal: "Nuts & Bolts" },
  { week: "5", topic: "The Behavior — Reflexive and Goal-Directed", temporal: "The Act Itself" },
  { week: "6", topic: "EXAM 1" },
  { week: "7", topic: "Sensation, Perception, and Inklings of Awareness", temporal: "Milliseconds Before", modules: ["Blurry Object Guess", "Face or Not?"] },
  { week: "8", topic: "Object Recognition and Decision-making", temporal: "One Second Before", modules: ["Memory Under Load"] },
  { week: "9", topic: "States that Prime Behavior", temporal: "Seconds to Minutes", modules: ["Sudden Noise Reaction"] },
  { week: "—", topic: "SPRING BREAK" },
  { week: "10", topic: "Learning 101", temporal: "Minutes to Days" },
  { week: "11", topic: "The Push & Pull — Fear and Anxiety", temporal: "Minutes to Days", modules: ["Fear Cue and Extinction"] },
  { week: "12", topic: "Stress & Survival — HPA/HPG Axis", temporal: "Days to Months", modules: ["Stress Response Builder"] },
  { week: "13", topic: "Social Life & Memory", temporal: "Days to Years" },
  { week: "14–15", topic: "Neurodevelopment", temporal: "Years to Decades" },
  { week: "16", topic: "Lineage & Culture", temporal: "Centuries to Millennia" },
  { week: "17", topic: "EXAM 2" },
  { week: "18", topic: "Consciousness, Identity, Self & Free Will", temporal: "Millennia" },
  { week: "—", topic: "FINAL EXAM" },
];

/* ── Page ── */

const CourseMap = () => {
  const [timelineOpen, setTimelineOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <Breadcrumb />

      {/* Hero */}
      <h1 className="text-3xl font-semibold text-foreground">Course map</h1>
      <p className="mt-3 text-lg text-gray-500 max-w-2xl">
        How BrainTrace connects to NBB302. Each module maps to specific course
        topics.
      </p>

      {/* Topic area cards */}
      <div className="mt-10 space-y-6">
        {topicAreas.map((area) => (
          <div
            key={area.title}
            className="bg-white border border-gray-200 border-l-4 rounded-xl p-6"
            style={{ borderLeftColor: area.accent }}
          >
            <h2 className="text-lg font-medium text-gray-900">{area.title}</h2>

            <div className="mt-2 space-y-1">
              {area.courseTopics.map((t) => (
                <p key={t} className="text-sm text-gray-500">{t}</p>
              ))}
            </div>

            <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              {area.temporal}
            </span>

            <div className="border-t border-gray-100 my-4" />

            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
              BrainTrace modules
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {area.moduleIds.map((id) => (
                <ModuleLink key={id} moduleId={id} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Shared framework */}
      <div className="mt-12">
        <h2 className="text-lg font-medium text-foreground mb-2">The shared framework</h2>
        <p className="text-sm text-gray-500 max-w-2xl mb-4">
          Every module above demonstrates the same underlying process. Your brain
          predicts, receives input, detects mismatch, and updates its model.
        </p>
        <div className="space-y-2 max-w-md">
          <ConceptLink conceptPageId="loop" />
          <ConceptLink conceptPageId="precision-attention" />
          <ConceptLink conceptPageId="failure" />
        </div>
      </div>

      {/* Course timeline accordion */}
      <div className="mt-12 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setTimelineOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-foreground">
            View full course timeline
          </span>
          {timelineOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {timelineOpen && (
          <div className="px-5 pb-5">
            <div className="ml-3 border-l-2 border-gray-200">
              {timeline.map((entry, i) => {
                const hasModules = !!entry.modules?.length;
                const isExam = entry.topic.includes("EXAM") || entry.topic === "SPRING BREAK";

                return (
                  <div key={i} className="relative pl-6 pb-4 last:pb-0">
                    {/* Dot */}
                    <div
                      className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${
                        hasModules ? "bg-[#1D9E75]" : isExam ? "bg-gray-300" : "bg-gray-200"
                      }`}
                    />

                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xs text-gray-400 font-medium shrink-0">
                        {entry.week === "—" ? "" : `Week ${entry.week}`}
                      </span>
                      <span className={`text-sm ${isExam ? "text-gray-400 font-medium" : "text-gray-700"}`}>
                        {entry.topic}
                      </span>
                      {entry.temporal && (
                        <span className="text-[10px] text-gray-400">
                          ({entry.temporal})
                        </span>
                      )}
                    </div>

                    {hasModules && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {entry.modules!.map((name) => (
                          <span
                            key={name}
                            className="text-[10px] font-medium bg-[#1D9E75]/10 text-[#1D9E75] px-2 py-0.5 rounded"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMap;
