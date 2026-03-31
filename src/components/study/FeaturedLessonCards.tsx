import { Link } from "react-router-dom";
import type { Module } from "@/data/modules";
import type { LessonMapping } from "@/data/content/registry";

interface FeaturedLessonCardsProps {
  linkedModules: Module[];
  placeholder?: LessonMapping;
}

const FeaturedLessonCards = ({ linkedModules, placeholder }: FeaturedLessonCardsProps) => (
  <section>
    <h2 className="font-display text-lg tracking-tight text-foreground">Lessons</h2>
    {linkedModules.length > 0 ? (
      <div className="mt-4 space-y-3">
        {linkedModules.map((mod) => (
          <Link
            key={mod.id}
            to={`/module/${mod.id}`}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <h3 className="font-display text-[15px] text-card-foreground leading-snug group-hover:text-primary transition-colors">
              {mod.title}
            </h3>
            <p className="mt-1.5 text-[13px] text-foreground/70 leading-relaxed italic">
              {mod.hook}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
              {mod.shortDescription}
            </p>
            <p className="mt-3 text-xs font-medium text-muted-foreground/50 group-hover:text-primary transition-colors">
              Open lesson →
            </p>
          </Link>
        ))}
      </div>
    ) : placeholder ? (
      <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-5 text-center shadow-sm">
        <p className="text-[13px] font-medium text-muted-foreground">{placeholder.title}</p>
      </div>
    ) : (
      <p className="mt-4 text-[13px] text-muted-foreground italic">No lessons yet</p>
    )}
  </section>
);

export default FeaturedLessonCards;
