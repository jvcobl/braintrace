import { useState, useCallback, useRef, useEffect } from "react";
import { ExperienceShell, FeedbackCard } from "@/components/module/experience";
import type { ExperienceFeedback, ExperienceSummary } from "@/components/module/experience";
import PredictionOutcome from "@/components/module/PredictionOutcome";
import { predictionOutcomeContent } from "@/data/content/predictionOutcomeContent";

/* ── Types ── */

type Phase = "intro" | "show" | "distractor" | "recall" | "feedback";
type LoadLevel = "low" | "medium" | "high";

interface RoundConfig {
  load: LoadLevel;
  sequenceLength: number;
  hasDistractor: boolean;
  label: string;
  description: string;
}

interface RoundResult {
  load: LoadLevel;
  correct: number;
  total: number;
}

/* ── Round configs: 2 per load level ── */

const ROUNDS: RoundConfig[] = [
  { load: "low", sequenceLength: 3, hasDistractor: false, label: "Low Load", description: "3 letters, no distraction" },
  { load: "low", sequenceLength: 3, hasDistractor: false, label: "Low Load", description: "3 letters, no distraction" },
  { load: "medium", sequenceLength: 5, hasDistractor: true, label: "Medium Load", description: "5 letters + math distractor" },
  { load: "medium", sequenceLength: 5, hasDistractor: true, label: "Medium Load", description: "5 letters + math distractor" },
  { load: "high", sequenceLength: 7, hasDistractor: true, label: "High Load", description: "7 letters + math distractor" },
  { load: "high", sequenceLength: 7, hasDistractor: true, label: "High Load", description: "7 letters + math distractor" },
];

const LETTERS = "BCDFGHJKLMNPQRSTVWXYZ".split("");

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateDistractor(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  return { question: `${a} × ${b} = ?`, answer: a * b };
}

/* ── Trial feedback (from pasted spec) ── */

type FeedbackKey =
  | "lowCorrect" | "lowIncorrect"
  | "mediumCorrect" | "mediumIncorrect"
  | "highCorrect" | "highIncorrect";

const trialFeedback: Record<FeedbackKey, ExperienceFeedback> = {
  lowCorrect: {
    primary: "You held the information at low load.",
    secondary: "At this level, working memory and distractor suppression can both run without competing for resources. The dlPFC has surplus capacity.",
    bridge: "Trace shows the PFC role map.",
    structure: "dlPFC (working memory)",
  },
  lowIncorrect: {
    primary: "Even at low load, the task was challenging.",
    secondary: "Baseline working memory capacity varies by individual and by state — fatigue, hunger, stress, and time of day all affect available dlPFC resources at any given moment.",
    bridge: "Explain covers why PFC capacity is not fixed.",
    structure: "dlPFC (baseline variation)",
  },
  mediumCorrect: {
    primary: "You maintained accuracy under moderate load.",
    secondary: "The PFC is working harder here. The shared resource pool is being split between holding information and suppressing distractors, but still has enough capacity for both.",
    bridge: "Trace shows how overload disrupts this balance.",
    structure: "dlPFC (shared resource pool)",
  },
  mediumIncorrect: {
    primary: "Performance dropped as load increased.",
    secondary: "This fits the cognitive load pattern: working memory and distractor suppression draw from the same finite PFC pool. At medium load, that pool is strained and errors begin to appear — not from lack of effort, but from resource competition.",
    bridge: "Trace shows the overload → control failure pathway.",
    structure: "dlPFC (resource competition)",
  },
  highCorrect: {
    primary: "You held accuracy under heavy load.",
    secondary: "At this level, most people show significant decline. Maintaining performance here reflects strong momentary PFC capacity, though the same person under different conditions (tired, hungry, stressed) might fail at this load.",
    bridge: "Explain covers why the same system fails under depletion.",
    structure: "dlPFC (sustained under strain)",
  },
  highIncorrect: {
    primary: "The load exceeded available capacity.",
    secondary: "This is where nearly everyone fails. The PFC's finite metabolic resources are exhausted — working memory, distractor suppression, and self-regulation all compete for the same pool, and at high load there is simply not enough to go around.",
    bridge: "Explain connects this to real-world depletion effects.",
    structure: "dlPFC (capacity exceeded)",
  },
};

function classifyTrial(load: LoadLevel, correct: boolean): FeedbackKey {
  if (load === "low") return correct ? "lowCorrect" : "lowIncorrect";
  if (load === "medium") return correct ? "mediumCorrect" : "mediumIncorrect";
  return correct ? "highCorrect" : "highIncorrect";
}

/* ── Summary tiers (from pasted spec) ── */

function getSummary(results: RoundResult[]): ExperienceSummary {
  const totalCorrect = results.reduce((s, r) => s + r.correct, 0);
  const totalItems = results.reduce((s, r) => s + r.total, 0);
  const overallPct = totalItems > 0 ? totalCorrect / totalItems : 0;

  const lowResults = results.filter((r) => r.load === "low");
  const lowPct = lowResults.length > 0
    ? lowResults.reduce((s, r) => s + r.correct, 0) / lowResults.reduce((s, r) => s + r.total, 0)
    : 1;

  // Struggled early: low-load accuracy < 50%
  if (lowPct < 0.5) {
    return {
      heading: "What This Shows",
      body: "Working memory capacity at any moment depends on current state: fatigue, hunger, stress, illness, and time of day all affect available PFC resources. One snapshot does not define baseline capacity — the same system performs differently under different metabolic conditions.",
      bridge: "Explain covers state-dependent PFC performance.",
    };
  }

  // Performed well: overall accuracy >= 75%
  if (overallPct >= 0.75) {
    return {
      heading: "What This Shows",
      body: "Performance held longer than typical, but notice the pattern: even strong performance degrades as load increases. This demonstrates the fundamental capacity limit of the PFC. The same mechanism explains why judges make worse parole decisions before lunch and why illness impairs cognition — it is all the same resource pool.",
      bridge: "Explain covers the full range of depletion effects from the course.",
    };
  }

  // Degraded normally: the default/typical pattern
  return {
    heading: "What This Shows",
    body: "Early trials are easy because the PFC has surplus capacity. As load grows, working memory and distractor suppression compete for the same finite resources, and errors appear. This is not a personal limitation — it is a structural constraint of the prefrontal cortex that affects everyone from students to judges to chess grandmasters.",
    bridge: "Trace shows the PFC overload pathway.",
  };
}

/* ── Load-level label styling ── */

const loadColors: Record<LoadLevel, string> = {
  low: "text-primary",
  medium: "text-amber-500",
  high: "text-destructive",
};

/* ── Component ── */

const MemoryUnderLoadDemo = ({ onNavigate }: { onNavigate?: (target: "Trace" | "Explain") => void }) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [distractor, setDistractor] = useState<{ question: string; answer: number } | null>(null);
  const [distractorInput, setDistractorInput] = useState("");
  const [results, setResults] = useState<RoundResult[]>([]);
  const [lastCorrectCount, setLastCorrectCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const done = roundIndex >= ROUNDS.length;
  const round = !done ? ROUNDS[roundIndex] : null;

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const startShow = useCallback(() => {
    const seq = pickRandom(LETTERS, round!.sequenceLength);
    setSequence(seq);
    setUserInput("");
    setDistractorInput("");
    setPhase("show");
    timer.current = setTimeout(() => {
      if (round!.hasDistractor) {
        setDistractor(generateDistractor());
        setPhase("distractor");
      } else {
        setPhase("recall");
      }
    }, round!.sequenceLength * 500 + 1000);
  }, [round]);

  const handleRecallSubmit = useCallback(() => {
    const entered = userInput.toUpperCase().trim().split(/[\s,]+/);
    let correct = 0;
    sequence.forEach((letter, i) => {
      if (entered[i]?.toUpperCase() === letter) correct++;
    });
    setLastCorrectCount(correct);
    setResults((prev) => [...prev, { load: round!.load, correct, total: sequence.length }]);
    setPhase("feedback");
    if (!hasInteracted) setHasInteracted(true);
  }, [userInput, sequence, round]);

  const handleNext = useCallback(() => {
    setRoundIndex((i) => i + 1);
    setPhase("intro");
    setDistractor(null);
    setUserInput("");
  }, []);

  const handleRestart = useCallback(() => {
    setRoundIndex(0);
    setPhase("intro");
    setResults([]);
    setDistractor(null);
    setUserInput("");
    setLastCorrectCount(0);
  }, []);

  // Is this the first round of a new load level?
  const isLoadTransition =
    roundIndex > 0 && round && ROUNDS[roundIndex - 1].load !== round.load && phase === "intro";

  const feedbackKey =
    phase === "feedback" && round
      ? classifyTrial(round.load, lastCorrectCount === sequence.length)
      : null;

  return (
    <ExperienceShell
      onNavigate={onNavigate}
      instructions="You'll memorize letter sequences at three difficulty levels. As load increases, a math distractor competes for the same PFC resources. Watch how your accuracy changes — that pattern reveals the capacity limit."
      done={done}
      summary={getSummary(results)}
      onRestart={handleRestart}
    >
      <div className="rounded-lg border border-border bg-card p-6">
        {/* Header */}
        {round && (
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold uppercase tracking-wide ${loadColors[round.load]}`}>
                {round.label}
              </span>
              <span className="text-xs text-muted-foreground">
                Round {roundIndex + 1} of {ROUNDS.length}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{round.description}</span>
          </div>
        )}

        {/* Load progress bar */}
        {round && (
          <div className="mb-4 flex gap-1">
            {ROUNDS.map((r, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < roundIndex
                    ? "bg-primary/60"
                    : i === roundIndex
                      ? "bg-primary"
                      : "bg-border"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-secondary">
          {/* Intro */}
          {phase === "intro" && round && (
            <div className="text-center max-w-sm px-4">
              {isLoadTransition ? (
                <>
                  <p className={`text-sm font-semibold mb-2 ${loadColors[round.load]}`}>
                    Increasing to {round.label}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {round.load === "medium"
                      ? "Now: 5 letters plus a math distractor. Your dlPFC must hold more items while handling a competing task."
                      : "Now: 7 letters plus a math distractor. This pushes the PFC's shared resource pool to its limit."}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  {round.load === "low"
                    ? "You'll see 3 letters briefly, then recall them. A manageable load for your dlPFC."
                    : round.load === "medium"
                      ? "5 letters + a math distractor. Same task — more demand on working memory."
                      : "7 letters + a math distractor. Maximum demand on the same PFC resource pool."}
                </p>
              )}
              <button
                onClick={startShow}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start
              </button>
            </div>
          )}

          {/* Show sequence */}
          {phase === "show" && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">Memorize:</p>
              <div className="flex gap-1.5 justify-center flex-wrap">
                {sequence.map((letter, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-card border border-border text-lg font-bold text-foreground"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Distractor */}
          {phase === "distractor" && distractor && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Distractor — solve this while holding the letters:</p>
              <p className="text-2xl font-bold text-foreground mb-4">{distractor.question}</p>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  value={distractorInput}
                  onChange={(e) => setDistractorInput(e.target.value)}
                  className="w-20 rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && setPhase("recall")}
                />
                <button
                  onClick={() => setPhase("recall")}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Recall */}
          {phase === "recall" && (
            <div className="text-center w-full max-w-sm px-4">
              <p className="text-sm text-muted-foreground mb-3">
                Type the {sequence.length} letters in order (spaces between):
              </p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  round?.load === "low" ? "e.g. B K M" :
                  round?.load === "medium" ? "e.g. B K M T P" :
                  "e.g. B K M T P R N"
                }
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleRecallSubmit()}
              />
              <button
                onClick={handleRecallSubmit}
                className="mt-3 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Submit
              </button>
            </div>
          )}

          {/* Feedback — letter grid only */}
          {phase === "feedback" && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Correct sequence:</p>
              <div className="flex gap-1.5 justify-center flex-wrap">
                {sequence.map((letter, i) => {
                  const entered = userInput.toUpperCase().trim().split(/[\s,]+/);
                  const isCorrect = entered[i]?.toUpperCase() === letter;
                  return (
                    <span
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border text-lg font-bold ${
                        isCorrect
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-destructive bg-destructive/10 text-foreground"
                      }`}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* FeedbackCard below the interaction area */}
        {feedbackKey && (
          <div className="mt-5">
            <FeedbackCard onNavigate={onNavigate} feedback={trialFeedback[feedbackKey]} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNext}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {roundIndex < ROUNDS.length - 1 ? "Next" : "See Results"}
              </button>
            </div>
          </div>
        )}
        {/* Prediction & Outcome bridge */}
        <div className="mt-6">
          <PredictionOutcome
            visible={hasInteracted}
            {...predictionOutcomeContent["memory-under-load"]}
            onNavigateTrace={onNavigate ? () => onNavigate("Trace") : undefined}
          />
        </div>
      </div>
    </ExperienceShell>
  );
};

export default MemoryUnderLoadDemo;
