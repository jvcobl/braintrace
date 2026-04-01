import { Link } from "react-router-dom";
import type { Module } from "@/data/modules";

interface LessonCardProps {
  module: Module;
  /** Optional context label shown above the card content (e.g. unit name) */
  contextLabel?: string;
  /** Visual density: 'full' shows hook + subtitle, 'compact' shows hook only */
  variant?: "full" | "compact";
}

const LessonCard = ({ module, contextLabel, variant = "full" }: LessonCardProps) => (
  <Link
    to={`/module/${module.id}`}
    className="group flex flex-col rounded-xl border border-border bg-card p-4 sm:p-6 transition-all hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    {contextLabel && (
      <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
        {contextLabel}
      </p>
    )}

    {/* Hook — curiosity-first lead */}
    <p className={`${contextLabel ? "mt-2.5 sm:mt-3" : ""} text-[13px] sm:text-[13.5px] text-foreground/60 leading-relaxed italic`}>
      {module.hook}
    </p>

    {/* Title — formal lesson name */}
    <h3 className="mt-2 sm:mt-2.5 font-display text-[0.95rem] sm:text-[1.05rem] text-foreground leading-snug group-hover:text-primary transition-colors">
      {module.title}
    </h3>

    {/* Subtitle — educational clarifier */}
    {variant === "full" && (
      <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[12.5px] text-muted-foreground leading-relaxed">
        {module.shortDescription}
      </p>
    )}

    <p className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] font-medium text-muted-foreground/40 group-hover:text-primary/70 transition-colors">
      Start lesson →
    </p>
  </Link>
);

export default LessonCard;
