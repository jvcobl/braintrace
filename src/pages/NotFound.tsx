import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container flex flex-col items-center justify-center py-32 text-center">
    <h1 className="font-display text-5xl text-foreground">404</h1>
    <p className="mt-4 text-[15px] text-muted-foreground">This page doesn't exist.</p>
    <Link
      to="/"
      className="mt-10 inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
