import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchIndex, type SearchItem } from "@/data/searchIndex";
import { scrollBehavior } from "@/lib/utils";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  module: "Lesson",
  concept: "Concept",
  structure: "Structure",
  deeper: "Go Deeper",
};

const GROUP_LABEL: Record<SearchItem["type"], string> = {
  module: "Lessons",
  concept: "Concepts",
  structure: "Structures",
  deeper: "Go deeper",
};

const TYPE_COLOR: Record<SearchItem["type"], string> = {
  module: "bg-primary/10 text-primary",
  concept: "bg-purple-50 text-purple-700",
  structure: "bg-blue-50 text-blue-700",
  deeper: "bg-amber-50 text-amber-800",
};

const GROUP_ORDER: SearchItem["type"][] = ["module", "concept", "structure", "deeper"];

function scrollToHash(hash: string) {
  setTimeout(() => {
    const el = document.getElementById(hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: scrollBehavior() });
    el.classList.add("search-highlight");
    setTimeout(() => el.classList.remove("search-highlight"), 1500);
  }, 100);
}

interface SearchBarProps {
  /**
   * Whether this instance listens for Cmd/Ctrl+K. The header renders one search
   * button for desktop and one for mobile; only one should own the shortcut.
   */
  shortcut?: boolean;
}

export default function SearchBar({ shortcut = false }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const openSearch = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeSearch = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => returnFocusRef.current?.focus?.());
  }, []);

  // Cmd/Ctrl+K toggles search (one instance only); Escape closes it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (shortcut && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) closeSearch();
        else openSearch();
      }
      if (e.key === "Escape" && open) closeSearch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shortcut, openSearch, closeSearch]);

  // Focus the input and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
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
      closeSearch(false);
      // Keep the hash: lesson pages open the right tab and scroll to the target from it.
      navigate(url);
      const hashIdx = url.indexOf("#");
      if (hashIdx !== -1 && !url.startsWith("/module/")) scrollToHash(url.slice(hashIdx + 1));
    },
    [navigate, closeSearch],
  );

  // Keyboard inside the dialog: Enter opens the first result, arrows move between
  // results, and Tab stays within the dialog.
  const handlePanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = [...panel.querySelectorAll<HTMLElement>("input, button")];
    const resultButtons = focusables.filter((el) => el.dataset.result === "true");
    const index = focusables.indexOf(document.activeElement as HTMLElement);

    if (e.key === "Enter" && document.activeElement === inputRef.current && results[0]) {
      e.preventDefault();
      handleSelect(results[0].url);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!resultButtons.length) return;
      e.preventDefault();
      const current = resultButtons.indexOf(document.activeElement as HTMLElement);
      const next =
        e.key === "ArrowDown"
          ? Math.min(current + 1, resultButtons.length - 1)
          : current <= 0
            ? -1
            : current - 1;
      (next === -1 ? inputRef.current : resultButtons[next])?.focus();
    } else if (e.key === "Tab" && focusables.length) {
      const last = focusables.length - 1;
      if (e.shiftKey && index <= 0) {
        e.preventDefault();
        focusables[last].focus();
      } else if (!e.shiftKey && index === last) {
        e.preventDefault();
        focusables[0].focus();
      }
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={openSearch}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search"
        aria-haspopup="dialog"
      >
        <Search size={18} />
      </button>

      {/* Modal overlay (portaled to body so no ancestor can clip or contain it) */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={() => closeSearch()}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search BrainTrace"
            onKeyDown={handlePanelKeyDown}
            className="mx-4 mt-20 max-w-lg rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-3">
              <Search size={16} className="text-gray-500 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons, concepts, structures..."
                aria-label="Search lessons, concepts and brain structures"
                autoComplete="off"
                className="w-full text-sm text-gray-900 placeholder:text-gray-500 outline-none bg-transparent [&::-webkit-search-cancel-button]:hidden"
              />
              <kbd className="hidden sm:inline-flex shrink-0 items-center rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto" aria-live="polite">
              {query.trim().length >= 2 && results.length === 0 && (
                <p className="py-8 text-center text-sm text-gray-500">
                  No results for "{query}"
                </p>
              )}

              {GROUP_ORDER.map((type) => {
                const items = grouped[type];
                if (!items?.length) return null;
                return (
                  <div key={type} className="mb-3 last:mb-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-1.5 px-1">
                      {GROUP_LABEL[type]}
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        data-result="true"
                        onClick={() => handleSelect(item.url)}
                        className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
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
                <p className="py-8 text-center text-sm text-gray-500">
                  Type at least 2 characters to search
                </p>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
