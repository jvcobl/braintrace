import { Link } from "react-router-dom";
import type { Module } from "@/data/modules";
import type { LessonMapping } from "@/data/content/registry";

interface FeaturedLessonCardsProps {
  linkedModules: Module[];
  placeholder?: LessonMapping;
}

const FeaturedLessonCards = ({ linkedModules, placeholder }: FeaturedLessonCardsProps) => (
  <section>
    <h2 className="font-display text-lg font-semibold text-foreground">Lessons</h2>
    {linkedModules.length > 0 ? (
      <div className="mt-3 space-y-3">
        {linkedModules.map((mod) => (
          <Link
            key={mod.id}
            to={`/module/${mod.id}`}
            className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <h3 className="font-display text-base font-semibold text-card-foreground leading-snug">
              {mod.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {mod.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    ) : placeholder ? (
      <div className="mt-3 rounded-lg border border-dashed border-border bg-card p-5 text-center">
        <p className="text-sm font-medium text-muted-foreground">{placeholder.title}</p>
      </div>
    ) : (
      <p className="mt-3 text-sm text-muted-foreground italic">No lessons yet</p>
    )}
  </section>
);

export default FeaturedLessonCards;
