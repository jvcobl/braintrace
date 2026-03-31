import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container flex flex-col items-center justify-center py-32 text-center">
    <h1 className="font-display text-4xl font-bold text-foreground">404</h1>
    <p className="mt-3 text-muted-foreground">This page doesn't exist.</p>
    <Link
      to="/"
      className="mt-8 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
