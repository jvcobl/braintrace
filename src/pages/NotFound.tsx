import NotFoundContent from "@/components/NotFoundContent";
import { usePageMeta } from "@/hooks/use-page-meta";

const NotFound = () => {
  usePageMeta({ title: "Page not found", noindex: true });

  return <NotFoundContent title="Page not found" message="This page doesn't exist." />;
};

export default NotFound;
