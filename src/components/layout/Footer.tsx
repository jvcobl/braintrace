import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-8">
    <div className="container flex flex-col items-center gap-4 text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
      <p className="font-display text-foreground/60">NeuroRoute</p>
      <nav className="flex gap-5">
        <Link to="/about" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          About
        </Link>
        <Link to="/course-map" className="text-muted-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          Classroom Mapping
        </Link>
      </nav>
    </div>
    <div className="container mt-5 pt-4 border-t border-border/40">
      <p className="text-[11px] text-muted-foreground/40 text-center max-w-md mx-auto leading-relaxed">
        Originally developed alongside Emory University's NBB302 course.{" "}
        <Link to="/course-map" className="underline underline-offset-2 hover:text-muted-foreground/60 transition-colors">
          Topic mapping
        </Link>{" "}
        is available for classroom use.
      </p>
    </div>
  </footer>
);

export default Footer;
