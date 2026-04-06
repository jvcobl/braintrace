import PredictionLens from "@/components/PredictionLens";
import GoDeeperCard from "@/components/GoDeeperCard";
import ConceptLink from "@/components/ConceptLink";
import ModuleLink from "@/components/ModuleLink";
import { moduleDefinitions } from "@/data/moduleDefinitions";

const ComponentTest = () => {
  const mod = moduleDefinitions["blurry-object-guess"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-xl font-bold">Component Test Page</h1>

      <section>
        <h2 className="text-sm font-medium text-gray-500 mb-3">PredictionLens</h2>
        <PredictionLens data={mod.predictionLens} />
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-500 mb-3">GoDeeperCards</h2>
        <div className="space-y-2">
          {mod.goDeeper.map((card) => (
            <GoDeeperCard key={card.id} data={card} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-500 mb-3">ConceptLinks</h2>
        <div className="space-y-2">
          {mod.conceptLinks.map((id) => (
            <ConceptLink key={id} conceptPageId={id} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-500 mb-3">ModuleLinks</h2>
        <div className="space-y-2">
          <ModuleLink moduleId="mod-1" />
          <ModuleLink moduleId="mod-2" />
        </div>
      </section>
    </div>
  );
};

export default ComponentTest;
