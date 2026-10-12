import { useEffect } from "react";

const SITE_NAME = "BrainTrace";
const SITE_URL = "https://learnbraintrace.com";
const DEFAULT_TITLE = "BrainTrace: Interactive Neuroscience Lessons";
const DEFAULT_DESCRIPTION =
  "Free interactive neuroscience lessons: experience a phenomenon in your browser, trace the neural pathway, and see what your brain was doing.";

interface PageMeta {
  /** Page name; shown as "<title> | BrainTrace". Omit for the homepage. */
  title?: string;
  description?: string;
  /** Canonical path, e.g. "/module/face-or-not". Defaults to the current path. */
  canonicalPath?: string;
  /** Not-found pages ask search engines not to index them. */
  noindex?: boolean;
}

function setMeta(name: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Sets the document title, description and canonical link for the current page. */
export function usePageMeta({ title, description, canonicalPath, noindex = false }: PageMeta = {}) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    setMeta("description", description ?? DEFAULT_DESCRIPTION);
    setMeta("robots", noindex ? "noindex" : null);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      link?.remove();
      return;
    }
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    // Routes match case-insensitively and with a trailing slash; canonicalise to the plain form.
    link.href = SITE_URL + (canonicalPath ?? (window.location.pathname.replace(/\/+$/, "").toLowerCase() || "/"));
  }, [title, description, canonicalPath, noindex]);
}
