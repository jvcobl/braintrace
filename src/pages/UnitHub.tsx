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
        <h1 className="font-display text-4xl font-bold text-foreground">Unit Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          The unit you're looking for doesn't exist.
        </p>
        <Link
          to="/course-map"
          className="mt-8 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Course Map
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
    <div className="container max-w-3xl py-12">
      <Link
        to="/course-map"
        className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
      >
        ← Course Map
      </Link>

      <div className="mt-6 space-y-12">
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
      <nav className="mt-12 flex items-center justify-between border-t border-border pt-6">
        {prevUnit ? (
          <Link
            to={`/unit/${prevUnit}`}
            className="group text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
          >
            <span className="text-muted-foreground group-hover:text-primary transition-colors">←</span>{" "}
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
            className="group text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
          >
            {(() => {
              const nc = getUnitContent(nextUnit);
              return nc ? nc.meta.title : `Unit ${nextUnit.replace("unit-", "")}`;
            })()}{" "}
            <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};

export default UnitHub;
