import { useEffect, useRef, useState } from "react";
import { focusIsLost, scrollBehavior } from "@/lib/utils";

/*
 * Double-tap guard. When a click or key press moves a demo to its next step, the control
 * under the finger changes: a quick second tap would land on whatever moved there (the next
 * answer, or a link below the demo) and act on something the learner never saw. For a
 * moment after such a step change, further clicks are ignored. Steps that change on a timer
 * (e.g. the Sudden Noise target appearing) don't arm it, so reaction clicks are unaffected.
 */
const CAUSED_BY_INPUT_MS = 300;
const GUARD_MS = 400;
let lastInputAt = -Infinity;
let lastInputTarget: EventTarget | null = null;
let guardUntil = -Infinity;
let guardInstalled = false;

function installDoubleTapGuard() {
  if (guardInstalled || typeof window === "undefined") return;
  guardInstalled = true;
  const noteInput = (e: Event) => {
    lastInputAt = performance.now();
    lastInputTarget = e.target;
  };
  window.addEventListener("pointerdown", noteInput, true);
  window.addEventListener("keydown", noteInput, true);
  window.addEventListener(
    "click",
    (e) => {
      if (performance.now() < guardUntil) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );
}

/** Called when a step (or lesson tab) changes; arms the guard if the user's input caused it. */
export function armDoubleTapGuard() {
  const now = performance.now();
  if (now - lastInputAt < CAUSED_BY_INPUT_MS) guardUntil = now + GUARD_MS;
}

/**
 * For changes that only sometimes move controls under the pointer (switching lesson tabs):
 * arm the guard only if the control just pressed is gone, as when "Begin Experience" is
 * replaced by the demo. A tab in the tab bar stays put, so double-clicking it is harmless.
 */
export function armDoubleTapGuardIfControlGone() {
  if (lastInputTarget instanceof Node && !lastInputTarget.isConnected) armDoubleTapGuard();
}

// Listen from app start, so the tap that opens a demo (e.g. "Begin Experience") is seen too.
installDoubleTapGuard();

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
    armDoubleTapGuard();
    const root = containerRef.current;
    if (!root) {
      // The step's content is gone (e.g. the summary replaced it); don't leave stale text behind.
      setAnnouncement("");
      return;
    }

    const target = root.querySelector<HTMLElement>("[data-autofocus]");
    if (target && focusIsLost()) {
      let reveal = target.closest<HTMLElement>("[data-reveal]") ?? target;
      let block: ScrollLogicalPosition = reveal.dataset.reveal === "start" ? "start" : "nearest";
      // If the card is too tall to show the focused control along with it (from the card's
      // top, or at all), reveal the control itself, keeping as much above it as fits.
      const room = window.innerHeight - 96; // sticky header and margins
      const span =
        block === "start"
          ? target.getBoundingClientRect().bottom - reveal.getBoundingClientRect().top
          : reveal.getBoundingClientRect().height;
      if (reveal !== target && span > room) {
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
