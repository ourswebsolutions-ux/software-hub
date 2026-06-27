import Navbar from "./components/Navbar";
import TemplateCard from "./components/TemplateCard";
import { templates } from "./data/templates";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800">
              Software Templates
            </h1>
            <p className="mt-4 text-gray-500 text-lg">
              Explore our premium collection of website & software templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}