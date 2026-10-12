import { useEffect, useRef, useState } from "react";
import { focusIsLost, scrollBehavior } from "@/lib/utils";

/**
 * Keeps keyboard and screen-reader users oriented as a demo moves from step to step.
 *
 * Whenever `stepKey` changes (not on first render), inside `containerRef`:
 * - if the control the user just used has gone (unmounted or disabled), focus moves to the
 *   element marked `data-autofocus`, and that element (or its closest `data-reveal`
 *   ancestor) is scrolled into view. `data-reveal="start"` aligns it to the top.
 * - the text of every `data-announce` element is read out through `announcement`, which the
 *   caller renders in a polite live region.
 */
export function useStepFocus<T extends HTMLElement = HTMLDivElement>(stepKey: string | number) {
  const containerRef = useRef<T>(null);
  const previousKey = useRef(stepKey);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (previousKey.current === stepKey) return;
    previousKey.current = stepKey;
    const root = containerRef.current;
    if (!root) return;

    const target = root.querySelector<HTMLElement>("[data-autofocus]");
    if (target && focusIsLost()) {
      let reveal = target.closest<HTMLElement>("[data-reveal]") ?? target;
      let block: ScrollLogicalPosition = reveal.dataset.reveal === "start" ? "start" : "nearest";
      // A tall card revealed from its top could leave the focused control below the fold;
      // then bring the control itself up from the bottom instead (keeping what's above it).
      const HEADER_CLEARANCE = 96;
      if (block === "start" && target.getBoundingClientRect().bottom - reveal.getBoundingClientRect().top + HEADER_CLEARANCE > window.innerHeight) {
        reveal = target;
        block = "end";
      }
      reveal.scrollIntoView({ block, behavior: scrollBehavior() });
      target.focus({ preventScroll: true });
    }

    const text = [...root.querySelectorAll<HTMLElement>("[data-announce]")]
      // Read paragraph by paragraph (textContent alone would run "…load.What this reflects" together).
      .flatMap((el) => {
        const paragraphs = el.querySelectorAll("p");
        return paragraphs.length ? [...paragraphs] : [el];
      })
      .map((el) => el.textContent?.trim() ?? "")
      .filter(Boolean)
      // Separate the pieces with a pause, so "Round 3 of 6" and "Increasing to…" aren't run together.
      .map((part) => (/[.!?:…]$/.test(part) ? part : `${part}.`))
      .join(" ");
    // Clear first so a message identical to the last one is still read out.
    setAnnouncement("");
    if (!text) return;
    const timer = setTimeout(() => setAnnouncement(text), 120);
    return () => clearTimeout(timer);
  }, [stepKey]);

  return { containerRef, announcement };
}
