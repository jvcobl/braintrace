import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/how-your-brain-predicts", label: "How Your Brain Predicts" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) =>
    pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight text-foreground">
          BrainTrace
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-colors min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isActive(to)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-border bg-card px-4 pb-4 pt-2 space-y-1" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-3.5 py-3 text-sm font-medium transition-colors ${
                isActive(to)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
