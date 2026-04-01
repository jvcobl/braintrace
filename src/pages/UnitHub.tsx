import { useParams, Link } from "react-router-dom";
import { getUnitContent, getLessonsByUnit, getUnitIds } from "@/data/content/registry";
import { modules } from "@/data/modules";
import UnitOverviewHeader from "@/components/study/UnitOverviewHeader";
import FeaturedLessonCards from "@/components/study/FeaturedLessonCards";
import ConceptCardGrid from "@/components/study/ConceptCardGrid";
import PathwaySection from "@/components/study/PathwaySection";
import DistinctionSection from "@/components/study/DistinctionSection";
import CaseNoteSection from "@/components/study/CaseNoteSection";
import ReviewSection from "@/components/study/ReviewSection";

const UnitHub = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const content = unitId ? getUnitContent(unitId) : undefined;

  if (!content || !unitId) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground">Unit Not Found</h1>
        <p className="mt-4 text-[14px] sm:text-[15px] text-muted-foreground">
          The unit you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Browse Lessons
        </Link>
      </div>
    );
  }

  const unitNumber = unitId.replace("unit-", "");
  const lessons = getLessonsByUnit(unitId);
  const isUnit5 = unitId === "unit-5";

  const linkedModules = lessons
    .map((l) => modules.find((m) => m.id === l.moduleId))
    .filter((m): m is NonNullable<typeof m> => m != null);

  const allIds = getUnitIds();
  const idx = allIds.indexOf(unitId);
  const prevUnit = idx > 0 ? allIds[idx - 1] : null;
  const nextUnit = idx < allIds.length - 1 ? allIds[idx + 1] : null;

  return (
    <div className="container max-w-3xl px-4 sm:px-6 py-10 md:py-20">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      >
        <span aria-hidden="true">←</span> All Units
      </Link>

      {/* ── Hero: Unit intro ── */}
      <div className="mt-6 sm:mt-8">
        <UnitOverviewHeader unitNumber={unitNumber} meta={content.meta} />
      </div>

      {/* ── Interactive lessons — primary call to action ── */}
      <div className="mt-14 sm:mt-16">
        <FeaturedLessonCards
          linkedModules={linkedModules}
          placeholder={isUnit5 ? unit5AnchorLesson : undefined}
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
