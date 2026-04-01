import type { Module } from "@/data/modules";
import LessonCard from "./LessonCard";

interface FeaturedLessonCardsProps {
  linkedModules: Module[];
}

const FeaturedLessonCards = ({ linkedModules }: FeaturedLessonCardsProps) => (
  <section>
    <h2 className="font-display text-xl tracking-tight text-foreground md:text-[1.35rem]">
      Interactive Lessons
    </h2>
    <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
      Each lesson starts with something you experience — then explains what your brain was doing.
    </p>
    {linkedModules.length > 0 ? (
      <div className="mt-6 space-y-3">
        {linkedModules.map((mod) => (
          <LessonCard key={mod.id} module={mod} variant="full" />
        ))}
      </div>
    ) : (
      <p className="mt-6 text-[13px] text-muted-foreground/50">
        Lessons coming soon
      </p>
    )}
  </section>
);

export default FeaturedLessonCards;
