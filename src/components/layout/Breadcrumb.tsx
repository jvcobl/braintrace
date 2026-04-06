import { Link, useLocation } from "react-router-dom";
import { modules } from "@/data/modules";
import { conceptPages } from "@/data/conceptPages";

interface Crumb {
  label: string;
  to?: string;
}

const conceptSlugToTitle = Object.fromEntries(
  Object.values(conceptPages).map((p) => [p.slug, p.title]),
);

export default function Breadcrumb() {
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: "Home", to: "/" }];

  if (segments[0] === "module" && segments[1]) {
    const mod = modules.find((m) => m.id === segments[1] || m.slug === segments[1]);
    crumbs.push({ label: "Modules", to: "/course-map" });
    crumbs.push({ label: mod?.title ?? segments[1] });
  } else if (segments[0] === "how-your-brain-predicts") {
    crumbs.push(
      segments.length === 1
        ? { label: "How Your Brain Predicts" }
        : { label: "How Your Brain Predicts", to: "/how-your-brain-predicts" },
    );
    if (segments[1]) {
      crumbs.push({ label: conceptSlugToTitle[segments[1]] ?? segments[1] });
    }
  } else if (segments[0] === "course-map") {
    crumbs.push({ label: "Course Map" });
  } else if (segments[0] === "about") {
    crumbs.push({ label: "About" });
  }

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-gray-300" aria-hidden="true">
                /
              </span>
            )}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
