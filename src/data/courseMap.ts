// ============================================================
// NEUROROUTE — COURSE MAP
// ============================================================
// Derives unit listings from the canonical content layer while
// preserving the CourseUnit shape consumed by existing pages.
// ============================================================

import { getUnitContent, getLessonsByUnit } from "./content/registry";

export interface CourseUnit {
  id: string;
  title: string;
  keyTopics: string[];
  linkedModuleIds: string[];
}

// Key topics per unit — curated pedagogical topics matching the original
// course map display. These are intentionally hand-written rather than
// auto-derived from majorStructures so the Course Map page stays readable.
const unitKeyTopics: Record<string, string[]> = {
  "unit-1": ["Top-down processing", "Object recognition", "Face perception", "Fusiform face area"],
  "unit-2": ["Working memory", "Cognitive load", "Prefrontal cortex", "Capacity limits"],
  "unit-3": ["Startle reflex", "Brainstem circuits", "Auditory processing", "Rapid motor responses"],
  "unit-4": ["Fear conditioning", "Extinction", "Amygdala", "Prefrontal regulation"],
  "unit-5": ["HPA axis", "Cortisol", "Allostatic load", "Resilience"],
};

function buildCourseUnits(): CourseUnit[] {
  const unitIds = ["unit-1", "unit-2", "unit-3", "unit-4", "unit-5"];

  return unitIds.map((uid) => {
    const content = getUnitContent(uid);
    if (!content) {
      return { id: uid, title: uid, keyTopics: [], linkedModuleIds: [] };
    }

    // Link all lesson modules registered for this unit.
    const lessons = getLessonsByUnit(uid);

    return {
      id: uid,
      title: `Unit ${uid.replace("unit-", "")}: ${content.meta.title}`,
      keyTopics: unitKeyTopics[uid] ?? [],
      linkedModuleIds: lessons.map((l) => l.moduleId),
    };
  });
}

export const courseUnits: CourseUnit[] = buildCourseUnits();

export function getUnitById(id: string): CourseUnit | undefined {
  return courseUnits.find((u) => u.id === id);
}
