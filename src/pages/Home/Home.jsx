import CollectionSection from "../../components/CollectionSection";
import SEO from "../../components/SEO";

export default function Home() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-2 bg-blue-600 text-white z-50"
      >
        Skip to main content
      </a>

      <SEO
        title="Hacktoberfest 2025 | CoreX Nutrition"
        description="Join CoreX Nutrition's Hacktoberfest 2025! Explore contributions, projects, and participate in the event."
        keywords="Hacktoberfest 2025, CoreX Nutrition, Open Source, Contributions"
      />

      <main
        id="main-content"
        className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      >
        <header className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hacktoberfest 2025
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to the Hacktoberfest 2025 Page! Explore contributions,
            projects, and participate in the event.
          </p>
        </header>

        <section className="max-w-4xl mx-auto">
          <p className="text-gray-700">
            CoreX Nutrition is hosting Hacktoberfest 2025 to encourage open
            source contributions. Participate in projects, showcase your
            contributions, and engage with the community.
          </p>
        </section>
      </main>
      {/* Shop Collection Component */}
      <CollectionSection />
    </>
  );
}
