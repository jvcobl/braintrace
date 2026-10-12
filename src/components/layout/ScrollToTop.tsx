import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * On every route change: scroll to the top and move keyboard/screen-reader focus to
 * the new page's main content (skipped on first load, when focus starts at the top).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const firstLoad = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
