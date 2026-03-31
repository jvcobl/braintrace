/** Feedback state returned by each lesson's outcome logic. */
export interface ExperienceFeedback {
  /** 1 short sentence — what happened (outcome). */
  primary: string;
  /** 1–3 sentences — brain interpretation. */
  secondary: string;
  /** 1 short line — link to Trace or Explain. */
  bridge: string;
  /** Pathway/structure to highlight (optional). */
  structure?: string;
}

/** Props for the summary shown when a lesson's experience is complete. */
export interface ExperienceSummary {
  /** Heading for the summary card. */
  heading: string;
  /** 1–3 sentences summarising what the user experienced. */
  body: string;
  /** Bridge line pointing to the next section. */
  bridge: string;
}
