import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-8">
    <div className="container flex flex-col items-center gap-4 text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
      <p className="font-display text-foreground/60">NeuroRoute</p>
      <nav className="flex gap-5">
        <Link to="/course-map" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          Course Map
        </Link>
        <Link to="/about" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          About
        </Link>
      </nav>
    </div>
    <div className="container mt-4 pt-4 border-t border-border/50">
      <p className="text-[11px] text-muted-foreground/50 text-center max-w-lg mx-auto leading-relaxed">
        NeuroRoute was originally developed alongside Emory University's NBB302 course.{" "}
        <Link to="/course-map" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
          Course mapping
        </Link>{" "}
        is available for students who want to connect each lesson to classroom topics.
      </p>
    </div>
  </footer>
);

export default Footer;
