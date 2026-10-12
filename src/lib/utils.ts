import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "smooth" scrolling, unless the visitor has asked their OS for reduced motion. */
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined" || !window.matchMedia) return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

const FOCUSABLE =
  "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]";

/** True when keyboard focus has nowhere useful to be (its control was removed or disabled). */
export function focusIsLost(): boolean {
  if (typeof document === "undefined") return false;
  const active = document.activeElement as HTMLElement | null;
  return !active || active === document.body || !active.isConnected || !active.matches(FOCUSABLE);
}

/**
 * After navigating to an in-page target (a search result or deep link), move keyboard focus
 * there too, but only if focus is lost or still on <main> from the route change.
 */
export function focusTarget(el: HTMLElement | null) {
  if (!el || typeof document === "undefined") return;
  if (!focusIsLost() && document.activeElement?.id !== "main") return;
  if (!el.matches(FOCUSABLE)) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
