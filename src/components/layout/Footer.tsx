import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-gray-200 py-10">
    <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-center sm:text-left">
        <p className="font-display text-base text-foreground">
          BrainTrace. An interactive neuroscience learning experience.
        </p>
      </div>
      <Link to="/about" className="text-sm text-gray-400 hover:text-foreground transition-colors">
        About
      </Link>
    </div>
  </footer>
);

export default Footer;
