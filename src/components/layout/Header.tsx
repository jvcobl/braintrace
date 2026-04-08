import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/topics", label: "Topics" },
  { to: "/how-your-brain-predicts", label: "How Your Brain Predicts" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) =>
    pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl text-foreground">
          BrainTrace
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative py-5 text-sm font-medium uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isActive(to)
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              aria-current={isActive(to) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <SearchBar />
        </nav>

        {/* Mobile: search + hamburger */}
        <div className="flex sm:hidden items-center gap-1">
          <SearchBar />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-gray-400 hover:bg-gray-100 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-gray-200/60 bg-white px-4 pb-4 pt-2 space-y-1" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block px-3.5 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                isActive(to)
                  ? "text-foreground"
                  : "text-gray-400 hover:text-gray-600"
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
