/** Each topic page (/topics/:slug) has a matching unit study guide (/unit/:unitId). */
export const TOPIC_TO_UNIT: Record<string, string> = {
  perception: "unit-1",
  attention: "unit-2",
  emotion: "unit-3",
  learning: "unit-4",
  stress: "unit-5",
};

export const UNIT_TO_TOPIC: Record<string, string> = Object.fromEntries(
  Object.entries(TOPIC_TO_UNIT).map(([topic, unit]) => [unit, topic]),
);
