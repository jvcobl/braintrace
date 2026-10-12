import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-gray-200 py-10">
    <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-center sm:text-left">
        <p className="font-display text-base text-foreground">
          BrainTrace. An interactive neuroscience learning experience.
        </p>
      </div>
      <Link to="/about" className="inline-flex min-h-11 items-center rounded-sm px-2 text-sm text-gray-500 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        About
      </Link>
    </div>
  </footer>
);

export default Footer;
