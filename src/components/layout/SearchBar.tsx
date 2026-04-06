import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchIndex, type SearchItem } from "@/data/searchIndex";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  module: "Module",
  concept: "Concept",
  structure: "Structure",
  deeper: "Go Deeper",
};

const TYPE_COLOR: Record<SearchItem["type"], string> = {
  module: "bg-primary/10 text-primary",
  concept: "bg-purple-50 text-purple-600",
  structure: "bg-blue-50 text-blue-600",
  deeper: "bg-amber-50 text-amber-600",
};

const GROUP_ORDER: SearchItem["type"][] = ["module", "concept", "structure", "deeper"];

function scrollToHash(hash: string) {
  setTimeout(() => {
    const el = document.getElementById(hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    el.classList.add("search-highlight");
    setTimeout(() => el.classList.remove("search-highlight"), 1500);
  }, 100);
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Global Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Filter results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  // Group results by type
  const grouped = useMemo(() => {
    const map: Partial<Record<SearchItem["type"], SearchItem[]>> = {};
    for (const item of results) {
      (map[item.type] ??= []).push(item);
    }
    return map;
  }, [results]);

  const handleSelect = useCallback(
    (url: string) => {
      setOpen(false);
      const hashIdx = url.indexOf("#");
      if (hashIdx === -1) {
        navigate(url);
        return;
      }
      const path = url.slice(0, hashIdx);
      const hash = url.slice(hashIdx + 1);
      navigate(path);
      scrollToHash(hash);
    },
    [navigate],
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full p-2.5 text-gray-400 hover:bg-gray-100 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search (⌘K)"
      >
        <Search size={18} />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto mt-20 max-w-lg rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, concepts, structures..."
                className="w-full text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <kbd className="hidden sm:inline-flex shrink-0 items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {query.trim().length >= 2 && results.length === 0 && (
                <p className="py-8 text-center text-sm text-gray-400">
                  No results for "{query}"
                </p>
              )}

              {GROUP_ORDER.map((type) => {
                const items = grouped[type];
                if (!items?.length) return null;
                return (
                  <div key={type} className="mb-3 last:mb-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                      {TYPE_LABEL[type]}s
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.url)}
                        className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span
                          className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${TYPE_COLOR[item.type]}`}
                        >
                          {TYPE_LABEL[item.type]}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}

              {query.trim().length < 2 && (
                <p className="py-8 text-center text-sm text-gray-400">
                  Type at least 2 characters to search
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
