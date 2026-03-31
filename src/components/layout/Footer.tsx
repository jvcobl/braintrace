import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-6">
    <div className="container flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
      <p>NeuroRoute — Interactive neuroscience for NBB302</p>
      <nav className="flex gap-4">
        <Link to="/course-map" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          Course Map
        </Link>
        <Link to="/about" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm">
          About
        </Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
