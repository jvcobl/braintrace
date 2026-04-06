import { useState } from "react";
import type { GoDeeperCard as GoDeeperCardData } from "@/data/types";
import { brainStructures, type BrainStructureId } from "@/data/brainStructures";

interface GoDeeperCardProps {
  data: GoDeeperCardData;
  autoExpand?: boolean;
}

const GoDeeperCard = ({ data, autoExpand = false }: GoDeeperCardProps) => {
  const [open, setOpen] = useState(autoExpand);

  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-colors ${open ? "border-l-2 border-l-primary" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3.5 px-5 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900 text-left">{data.title}</span>
        <span className="text-gray-400 text-lg leading-none select-none">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-4">
          <p className="text-[13px] text-gray-700 leading-relaxed">{data.explanation}</p>

          {data.keyStructures.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {data.keyStructures.map((id) => {
                const structure = brainStructures[id as BrainStructureId];
                const label = structure?.name ?? id;
                return (
                  <span
                    key={id}
                    className="bg-blue-50 text-blue-700 text-[11px] font-medium px-2 py-0.5 rounded"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}

          {data.clinicalNote && (
            <div className="bg-gray-50 rounded-lg p-3 mt-3">
              <p className="text-xs font-medium text-gray-400 mb-1">Clinical note</p>
              <p className="text-[13px] text-gray-600 italic leading-relaxed">
                {data.clinicalNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoDeeperCard;
