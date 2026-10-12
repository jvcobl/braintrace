import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
  /** When this changes (e.g. the route), a caught error is cleared so the new page renders. */
  resetKey: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Keeps an unexpected error in one page from blanking the whole site: the header and
 * footer stay, and the page area shows a short message with a way to recover.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  componentDidUpdate(prev: ErrorBoundaryProps) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="container flex flex-col items-center justify-center px-4 sm:px-6 py-24 sm:py-32 text-center">
        <h1 className="font-display text-3xl tracking-tight text-foreground">Something went wrong</h1>
        <p className="mt-4 text-[14px] sm:text-[15px] text-muted-foreground">
          This page ran into a problem. Reloading usually fixes it.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Reload page
          </button>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
