import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight text-foreground">
          NeuroRoute
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => {
            const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
