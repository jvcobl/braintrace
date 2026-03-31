import { useParams, Link } from "react-router-dom";
import { getUnitContent, getLessonsByUnit, getUnitIds, unit5AnchorLesson } from "@/data/content/registry";
import { modules } from "@/data/modules";
import UnitOverviewHeader from "@/components/study/UnitOverviewHeader";
import FeaturedLessonCards from "@/components/study/FeaturedLessonCards";
import ConceptCardGrid from "@/components/study/ConceptCardGrid";
import PathwaySection from "@/components/study/PathwaySection";
import DistinctionSection from "@/components/study/DistinctionSection";
import CaseNoteSection from "@/components/study/CaseNoteSection";
import ReviewSection from "@/components/study/ReviewSection";

const SectionDivider = () => (
  <div className="border-t border-border" aria-hidden="true" />
);

const UnitHub = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const content = unitId ? getUnitContent(unitId) : undefined;

  if (!content || !unitId) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-4xl text-foreground">Unit Not Found</h1>
        <p className="mt-4 text-[15px] text-muted-foreground">
          The unit you're looking for doesn't exist.
        </p>
        <Link
          to="/course-map"
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
    <div className="container max-w-3xl py-14 md:py-16">
      {/* Breadcrumb */}
      <Link
        to="/course-map"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
      >
        <span aria-hidden="true">←</span> Curriculum
      </Link>

      <div className="mt-7 space-y-14">
        {/* 1. Unit overview */}
        <UnitOverviewHeader unitNumber={unitNumber} meta={content.meta} />

        {/* 2. Featured lessons */}
        <FeaturedLessonCards
          linkedModules={linkedModules}
          placeholder={isUnit5 ? unit5AnchorLesson : undefined}
        />

        <SectionDivider />

        {/* 3. Key concepts */}
        <ConceptCardGrid cards={content.conceptCards} />

        <SectionDivider />

        {/* 4. Pathways */}
        <PathwaySection pathways={content.pathways} />

        <SectionDivider />

        {/* 5. Distinctions */}
        <DistinctionSection distinctions={content.distinctions} />

        <SectionDivider />

        {/* 6. Case notes */}
        <CaseNoteSection caseNotes={content.caseNotes} />

        <SectionDivider />

        {/* 7. Review */}
        <ReviewSection questions={content.review} />
      </div>

      {/* Prev / Next */}
      <nav className="mt-14 flex items-center justify-between border-t border-border pt-8">
        {prevUnit ? (
          <Link
            to={`/unit/${prevUnit}`}
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
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
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
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
