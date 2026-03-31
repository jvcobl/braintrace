import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-8">
    <div className="container flex flex-col items-center gap-3 text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
      <p className="font-display text-foreground/60">NeuroRoute</p>
      <nav className="flex gap-5">
        <Link to="/course-map" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          Curriculum
        </Link>
        <Link to="/about" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          About
        </Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
