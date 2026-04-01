import { Link } from "react-router-dom";
import type { Module } from "@/data/modules";
import type { LessonMapping } from "@/data/content/registry";

interface FeaturedLessonCardsProps {
  linkedModules: Module[];
  placeholder?: LessonMapping;
}

const FeaturedLessonCards = ({ linkedModules, placeholder }: FeaturedLessonCardsProps) => (
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
          <Link
            key={mod.id}
            to={`/module/${mod.id}`}
            className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[1rem] text-card-foreground leading-snug group-hover:text-primary transition-colors">
                {mod.title}
              </h3>
              <p className="mt-1.5 text-[13px] text-foreground/60 leading-relaxed italic">
                {mod.hook}
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                {mod.shortDescription}
              </p>
            </div>
            <span
              className="mt-1 shrink-0 text-lg text-muted-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    ) : placeholder ? (
      <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-6 text-center">
        <p className="text-[13px] font-medium text-muted-foreground">{placeholder.title}</p>
      </div>
    ) : (
      <p className="mt-6 text-[13px] text-muted-foreground italic">No lessons yet</p>
    )}
  </section>
);

export default FeaturedLessonCards;
