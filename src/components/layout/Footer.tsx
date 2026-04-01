import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-6 sm:py-8">
    <div className="container px-4 sm:px-6 flex flex-col items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
      <p className="font-display text-foreground/60">NeuroRoute</p>
      <nav className="flex gap-4 sm:gap-5">
        <Link to="/about" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          About
        </Link>
        <Link to="/course-map" className="text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          Classroom Mapping
        </Link>
      </nav>
    </div>
    <div className="container px-4 sm:px-6 mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-border/40">
      <p className="text-[10px] sm:text-[11px] text-muted-foreground/35 text-center max-w-md mx-auto leading-relaxed">
        Originally developed alongside Emory University's NBB302 course.{" "}
        <Link to="/course-map" className="underline underline-offset-2 hover:text-muted-foreground/50 transition-colors">
          Topic mapping
        </Link>{" "}
        is available for classroom use.
      </p>
    </div>
  </footer>
);

export default Footer;
