import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
);

export default App;
