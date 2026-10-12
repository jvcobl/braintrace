import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-gray-200 py-10">
    <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-center sm:text-left">
        <p className="font-display text-base text-foreground">
          BrainTrace. An interactive neuroscience learning experience.
        </p>
      </div>
      <nav aria-label="Footer" className="flex items-center gap-1 sm:gap-2">
        {[
          { to: "/topics", label: "Topics" },
          { to: "/course-map", label: "Course map" },
          { to: "/about", label: "About" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="inline-flex min-h-11 items-center rounded-sm px-2 text-sm text-gray-500 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
