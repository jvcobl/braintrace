import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/topics", label: "Topics" },
  { to: "/how-your-brain-predicts", label: "How Your Brain Predicts" },
  { to: "/about", label: "About" },
];

const topicItems = [
  { slug: "perception", label: "Perception and Object Recognition" },
  { slug: "attention", label: "Attention, Cognitive Load, and the PFC" },
  { slug: "emotion", label: "Emotion, Limbic System, and Amygdala" },
  { slug: "learning", label: "Learning and Fear Conditioning" },
  { slug: "stress", label: "Stress and Homeostasis" },
];

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes (by any link, not just its own).
  useEffect(() => setMenuOpen(false), [pathname]);

  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Lessons and study guides live under Topics, so highlight it there too.
  const isActive = (to: string) =>
    pathname === to ||
    (to !== "/" && pathname.startsWith(to)) ||
    (to === "/topics" && /^\/(module|unit)\//.test(pathname));

  const linkClass = (to: string) =>
    `relative py-5 text-sm font-medium uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
      isActive(to)
        ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="rounded-sm font-display text-xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          BrainTrace
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(({ to, label }) =>
            to === "/topics" ? (
              <div key={to} className="group relative">
                <Link
                  to={to}
                  className={linkClass(to)}
                  aria-current={isActive(to) ? "page" : undefined}
                >
                  {label}
                </Link>

                {/* Dropdown: opens on hover, and on keyboard focus so its links are never focusable while hidden */}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-1 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-64 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                    {topicItems.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/topics/${item.slug}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-foreground transition-colors normal-case tracking-normal focus-visible:outline-none focus-visible:bg-gray-50 focus-visible:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={to}
                to={to}
                className={linkClass(to)}
                aria-current={isActive(to) ? "page" : undefined}
              >
                {label}
              </Link>
            ),
          )}
          <SearchBar shortcut />
        </nav>

        {/* Mobile: search + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <SearchBar />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-gray-200/60 bg-white px-4 pb-4 pt-2 space-y-1" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-sm px-3.5 py-3 text-sm font-medium uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                isActive(to)
                  ? "text-foreground"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-current={isActive(to) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
