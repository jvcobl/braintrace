export interface CourseUnit {
  id: string;
  title: string;
  keyTopics: string[];
  linkedModuleIds: string[];
}

export const courseUnits: CourseUnit[] = [
  {
    id: "unit-1",
    title: "Unit 1: Visual Perception",
    keyTopics: ["Top-down processing", "Object recognition", "Face perception", "Fusiform face area"],
    linkedModuleIds: ["mod-1", "mod-2"],
  },
  {
    id: "unit-2",
    title: "Unit 2: Memory Systems",
    keyTopics: ["Working memory", "Cognitive load", "Prefrontal cortex", "Capacity limits"],
    linkedModuleIds: ["mod-5"],
  },
  {
    id: "unit-3",
    title: "Unit 3: Sensory Reflexes",
    keyTopics: ["Startle reflex", "Brainstem circuits", "Auditory processing", "Rapid motor responses"],
    linkedModuleIds: ["mod-3"],
  },
  {
    id: "unit-4",
    title: "Unit 4: Emotion and Learning",
    keyTopics: ["Fear conditioning", "Extinction", "Amygdala", "Prefrontal regulation"],
    linkedModuleIds: ["mod-4"],
  },
];

export function getUnitById(id: string): CourseUnit | undefined {
  return courseUnits.find((u) => u.id === id);
}
