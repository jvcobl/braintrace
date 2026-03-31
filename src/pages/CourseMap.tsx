import { Link } from "react-router-dom";

const CourseMap = () => (
  <div className="container py-16">
    <h1 className="font-display text-3xl font-bold text-foreground">Course Map</h1>
    <p className="mt-4 text-muted-foreground">
      The full course map will appear here once modules are available.
    </p>
    <Link to="/" className="mt-6 inline-block text-sm text-primary hover:underline">
      ← Back to home
    </Link>
  </div>
);

export default CourseMap;
