import type { MouseEvent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

/** Skip link target: focus <main> without touching the URL hash (lesson tabs read it). */
const skipToContent = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById("main")?.focus();
};

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <a
        href="#main"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <ErrorBoundary resetKey={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
