import type { PredictionLens as PredictionLensData } from "@/data/types";

interface PredictionLensProps {
  data: PredictionLensData;
}

function DotLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
      <span className="text-xs font-medium text-gray-500">{children}</span>
    </span>
  );
}

/** Split on " → " only where it isn't inside parentheses, e.g. "Amygdala (BLA → CeA)" stays whole. */
function splitTopLevelArrows(sentence: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < sentence.length; i++) {
    const ch = sentence[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0 && sentence.startsWith(" → ", i)) {
      parts.push(sentence.slice(start, i));
      start = i + 3;
      i += 2;
    }
  }
  parts.push(sentence.slice(start));
  return parts.map((p) => p.trim()).filter(Boolean);
}

/** Capitalize a pill's first word unless it is an abbreviation like "dlPFC". */
const capitalize = (s: string) => (/^[a-z]+\b/.test(s) ? s[0].toUpperCase() + s.slice(1) : s);

/** Each sentence becomes a row: arrow chains render as pills, plain sentences as text. */
function PathwayPills({ text }: { text: string }) {
  const sentences = text
    .split(/\.\s+/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);

  return (
    <div className="space-y-2">
      {sentences.map((sentence, si) => {
        const segments = splitTopLevelArrows(sentence);
        if (segments.length < 2) {
          return (
            <p key={si} className="text-[13px] text-gray-900 leading-relaxed">
              {sentence}.
            </p>
          );
        }
        return (
          <div key={si} className="flex flex-wrap items-center gap-1.5">
            {segments.map((segment, i) => (
              <span key={i} className="contents">
                <span className="bg-gray-100 text-xs text-gray-900 px-2 py-0.5 rounded">
                  {capitalize(segment)}
                </span>
                {i < segments.length - 1 && (
                  <span className="text-gray-500 text-xs" aria-hidden="true">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

const PredictionLens = ({ data }: PredictionLensProps) => {
  return (
    <div className="bg-white border border-gray-200 border-l-2 border-l-blue-400 rounded-xl px-6 py-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-[11px] uppercase tracking-widest font-medium text-gray-500">
          Prediction Lens
        </span>
      </div>

      {/* What happened */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-1">What happened</p>
        <p className="text-[13px] text-gray-900 leading-relaxed">{data.whatHappened}</p>
      </div>

      <hr className="border-t border-gray-100 mb-4" />

      {/* Predicted + Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <DotLabel color="bg-purple-400">What your brain predicted</DotLabel>
          <p className="text-[13px] text-gray-900 leading-relaxed mt-1">{data.whatBrainPredicted}</p>
        </div>
        <div>
          <DotLabel color="bg-blue-400">What input arrived</DotLabel>
          <p className="text-[13px] text-gray-900 leading-relaxed mt-1">{data.whatInputArrived}</p>
        </div>
      </div>

      {/* Mismatch + Update */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <DotLabel color="bg-orange-500">What mismatch mattered</DotLabel>
          <p className="text-[13px] text-gray-900 leading-relaxed mt-1">{data.whatMismatchMattered}</p>
        </div>
        <div>
          <DotLabel color="bg-teal-500">How the brain updated</DotLabel>
          <p className="text-[13px] text-gray-900 leading-relaxed mt-1">{data.howBrainUpdated}</p>
        </div>
      </div>

      <hr className="border-t border-gray-100 mb-4" />

      {/* Pathway */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 mb-1.5">Pathway</p>
        <PathwayPills text={data.whatPathwayHandledIt} />
      </div>

      {/* NBB302 connection */}
      <div className="bg-gray-50 rounded-lg px-4 py-3">
        <p className="text-xs font-medium text-gray-500 mb-1">NBB302 connection</p>
        <p className="text-[13px] text-gray-900 leading-relaxed">{data.nbb302Connection}</p>
      </div>
    </div>
  );
};

export default PredictionLens;
