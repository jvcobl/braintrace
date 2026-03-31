import { useParams, Link } from "react-router-dom";

const ModulePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container py-16">
      <Link to="/" className="text-sm text-primary hover:underline">
        ← Back to home
      </Link>
      <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
        Module {id}
      </h1>
      <p className="mt-4 text-muted-foreground">
        This module is not yet available. Check back soon.
      </p>
    </div>
  );
};

export default ModulePage;
