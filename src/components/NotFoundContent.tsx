import { Link } from "react-router-dom";

interface NotFoundContentProps {
  title: string;
  message: string;
}

/** Shared not-found state for unknown pages, lessons and study guides. */
const NotFoundContent = ({ title, message }: NotFoundContentProps) => (
  <div className="container flex flex-col items-center justify-center px-4 sm:px-6 py-24 sm:py-32 text-center">
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">404</p>
    <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground">{title}</h1>
    <p className="mt-4 text-[14px] sm:text-[15px] text-muted-foreground">{message}</p>
    <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
      <Link
        to="/topics"
        className="inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Browse topics
      </Link>
      <Link
        to="/"
        className="inline-flex items-center rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFoundContent;
