import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/layout/ScrollToTop";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import ModulePage from "./pages/ModulePage";
import UnitHub from "./pages/UnitHub";
import CourseMap from "./pages/CourseMap";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ConceptHub from "./pages/ConceptHub";
import ConceptLoop from "./pages/ConceptLoop";
import ConceptPrecision from "./pages/ConceptPrecision";
import ConceptFailure from "./pages/ConceptFailure";
import TopicPage from "./pages/TopicPage";
import TopicsIndex from "./pages/TopicsIndex";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/unit/:unitId" element={<UnitHub />} />
            <Route path="/module/:id" element={<ModulePage />} />
            <Route path="/course-map" element={<CourseMap />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-your-brain-predicts" element={<ConceptHub />} />
            <Route path="/how-your-brain-predicts/loop" element={<ConceptLoop />} />
            <Route path="/how-your-brain-predicts/precision-attention" element={<ConceptPrecision />} />
            <Route path="/how-your-brain-predicts/when-prediction-fails" element={<ConceptFailure />} />
            <Route path="/topics" element={<TopicsIndex />} />
            <Route path="/topics/:slug" element={<TopicPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
