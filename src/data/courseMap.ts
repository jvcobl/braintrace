import { unitContent, lessonMappings, unit5AnchorLesson, getUnitContent, getLessonsByUnit } from "./content/registry";
import type { UnitContent } from "./content/types";

export interface CourseUnit {
  id: string;
  title: string;
  keyTopics: string[];
  linkedModuleIds: string[];
}

/**
 * Build the course units list from the canonical content layer.
 * Lesson mappings come from the registry; key topics from unit meta.
 */
function buildCourseUnits(): CourseUnit[] {
  const unitIds = ["unit-1", "unit-2", "unit-3", "unit-4", "unit-5"];

  return unitIds.map((uid) => {
    const content = getUnitContent(uid);
    if (!content) {
      return { id: uid, title: uid, keyTopics: [], linkedModuleIds: [] };
    }

    const lessons = getLessonsByUnit(uid);
    // Include Unit 5 placeholder
    const allLessons =
      uid === "unit-5"
        ? [...lessons, unit5AnchorLesson]
        : lessons;

    return {
      id: uid,
      title: `Unit ${uid.replace("unit-", "")}: ${content.meta.title}`,
      keyTopics: content.meta.majorStructures.slice(0, 4),
      linkedModuleIds: allLessons.map((l) => l.moduleId),
    };
  });
}

export const courseUnits: CourseUnit[] = buildCourseUnits();

export function getUnitById(id: string): CourseUnit | undefined {
  return courseUnits.find((u) => u.id === id);
}

// Re-export content layer for convenience
export { unitContent, getUnitContent, getLessonsByUnit } from "./content/registry";
export type { UnitContent } from "./content/types";
