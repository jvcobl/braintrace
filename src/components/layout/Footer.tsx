import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
      <p>BrainTrace — An interactive neuroscience learning experience</p>
      <Link to="/about" className="hover:text-foreground transition-colors">
        About
      </Link>
    </div>
  </footer>
);

export default Footer;
