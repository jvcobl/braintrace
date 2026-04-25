import { useEffect, useRef, useState } from "react";

interface CortisolGraphProps {
  mode: "runaway" | "recovery" | "weakened";
  onComplete: () => void;
  className?: string;
}

const DURATION_MS = 3000;
const STEPS = 60;
const W = 320;
const H = 160;
const PAD_X = 8;
const PAD_Y = 12;
const BASELINE_Y = H - PAD_Y - 10;
const THRESHOLD_Y = PAD_Y + 30;

function curveY(mode: CortisolGraphProps["mode"], t: number): number {
  const range = BASELINE_Y - PAD_Y;

  if (mode === "runaway") {
    return BASELINE_Y - range * 0.9 * (1 - Math.exp(-3 * t));
  }

  if (mode === "recovery") {
    const rise = Math.sin(Math.PI * t);
    return BASELINE_Y - range * 0.75 * rise;
  }

  // weakened: rises, partially recovers, plateaus above baseline
  if (t < 0.4) {
    const rise = t / 0.4;
    return BASELINE_Y - range * 0.7 * rise;
  }
  const decay = (t - 0.4) / 0.6;
  const plateau = 0.35;
  const level = 0.7 - (0.7 - plateau) * (1 - Math.exp(-3 * decay));
  return BASELINE_Y - range * level;
}

function buildPoints(mode: CortisolGraphProps["mode"], progress: number): string {
  const count = Math.max(1, Math.round(STEPS * progress));
  const pts: string[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / STEPS;
    const x = PAD_X + t * (W - PAD_X * 2);
    const y = curveY(mode, t);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

export default function CortisolGraph({ mode, onComplete, className }: CortisolGraphProps) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    completedRef.current = false;
    setProgress(0);
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / DURATION_MS);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mode, onComplete]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className ?? "w-full max-w-xs mx-auto"}
      role="img"
      aria-label="Cortisol level over time"
    >
      {/* Baseline */}
      <line
        x1={PAD_X} y1={BASELINE_Y}
        x2={W - PAD_X} y2={BASELINE_Y}
        stroke="#ccc" strokeWidth={1}
      />
      <text x={W - PAD_X} y={BASELINE_Y + 10} textAnchor="end" fontSize={9} fill="#bbb">
        baseline
      </text>

      {/* Danger threshold */}
      <line
        x1={PAD_X} y1={THRESHOLD_Y}
        x2={W - PAD_X} y2={THRESHOLD_Y}
        stroke="#ccc" strokeWidth={1} strokeDasharray="4 3"
      />
      <text x={W - PAD_X} y={THRESHOLD_Y - 4} textAnchor="end" fontSize={9} fill="#bbb">
        danger threshold
      </text>

      {/* Cortisol curve */}
      <polyline
        points={buildPoints(mode, progress)}
        fill="none"
        stroke="#D85A30"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
