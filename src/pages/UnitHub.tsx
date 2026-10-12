import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getUnitContent, getLessonsByUnit, getUnitIds } from "@/data/content/registry";
import { modules } from "@/data/modules";
import UnitOverviewHeader from "@/components/study/UnitOverviewHeader";
import FeaturedLessonCards from "@/components/study/FeaturedLessonCards";
import ConceptCardGrid from "@/components/study/ConceptCardGrid";
import PathwaySection from "@/components/study/PathwaySection";
import DistinctionSection from "@/components/study/DistinctionSection";
import CaseNoteSection from "@/components/study/CaseNoteSection";
import ReviewSection from "@/components/study/ReviewSection";
import { usePageMeta } from "@/hooks/use-page-meta";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NotFoundContent from "@/components/NotFoundContent";
import { scrollBehavior } from "@/lib/utils";

/** Item anchors (from search results or shared links) get a brief highlight; section anchors don't. */
const ITEM_ANCHOR = /^(concept|pathway|distinction|case)-/;

const UnitHub = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const content = unitId ? getUnitContent(unitId) : undefined;
  usePageMeta(
    content && unitId
      ? { title: `${content.meta.title}: Study Guide`, description: content.meta.overview, canonicalPath: `/unit/${unitId}` }
      : { title: "Page not found", noindex: true },
  );

  // Scroll to a linked section or item once the page (and any expanded list) has rendered.
  const location = useLocation();
  useEffect(() => {
    const target = decodeURIComponent(location.hash.slice(1));
    if (!target) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      el.scrollIntoView({ block: "start", behavior: scrollBehavior() });
      if (ITEM_ANCHOR.test(target)) {
        el.classList.add("search-highlight");
        setTimeout(() => el.classList.remove("search-highlight"), 1500);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash, location.key]);

  if (!content || !unitId) {
    return <NotFoundContent title="Study guide not found" message="The study guide you're looking for doesn't exist." />;
  }

  const unitNumber = unitId.replace("unit-", "");
  const lessons = getLessonsByUnit(unitId);

  const linkedModules = lessons
    .map((l) => modules.find((m) => m.id === l.moduleId))
    .filter((m): m is NonNullable<typeof m> => m != null);

  const allIds = getUnitIds();
  const idx = allIds.indexOf(unitId);
  const prevUnit = idx > 0 ? allIds[idx - 1] : null;
  const nextUnit = idx < allIds.length - 1 ? allIds[idx + 1] : null;

  return (
    <div className="container max-w-3xl px-4 sm:px-6 py-10 md:py-20">
      <Breadcrumb />

      {/* ── Hero: Unit intro ── */}
      <div className="mt-6 sm:mt-8">
        <UnitOverviewHeader unitNumber={unitNumber} meta={content.meta} />
      </div>

      {/* On-this-page links for a long study guide */}
      <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
        {[
          ["#lessons", "Lessons"],
          ["#key-concepts", "Key concepts"],
          ["#pathways", "Pathways"],
          ["#distinctions", "Distinctions"],
          ["#case-notes", "Case notes"],
          ["#review", "Review"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* ── Interactive lessons — primary call to action ── */}
      <div className="mt-14 sm:mt-16">
        <FeaturedLessonCards
          linkedModules={linkedModules}
        />
      </div>

      {/* ── Reference sections ── */}
      <div className="mt-16 sm:mt-20 space-y-12 sm:space-y-16">
        <ConceptCardGrid cards={content.conceptCards} />

        <PathwaySection pathways={content.pathways} />

        <DistinctionSection distinctions={content.distinctions} />

        <CaseNoteSection caseNotes={content.caseNotes} />
      </div>

      {/* ── Review — end of page ── */}
      <div className="mt-16 sm:mt-20">
        <ReviewSection questions={content.review} />
      </div>

      {/* Prev / Next */}
      <nav className="mt-12 sm:mt-16 flex items-center justify-between border-t border-border pt-6 sm:pt-8">
        {prevUnit ? (
          <Link
            to={`/unit/${prevUnit}`}
            className="group inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            {(() => {
              const pc = getUnitContent(prevUnit);
              return pc ? pc.meta.title : `Unit ${prevUnit.replace("unit-", "")}`;
            })()}
          </Link>
        ) : (
          <span />
        )}
        {nextUnit ? (
          <Link
            to={`/unit/${nextUnit}`}
            className="group inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {(() => {
              const nc = getUnitContent(nextUnit);
              return nc ? nc.meta.title : `Unit ${nextUnit.replace("unit-", "")}`;
            })()}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};

export default UnitHub;
