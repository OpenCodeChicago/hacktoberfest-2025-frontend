import CollectionSection from '../../components/CollectionSection';
import SEO from '../../components/SEO';
import WhyChoose from '../../components/WhyChoose';
import LogoCarousel from '../../components/LogoCarousel';

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
        className="min-h-screen"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hacktoberfest 2025
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join CoreX Nutrition's open source community! Contribute to projects, 
              showcase your skills, and be part of the global developer movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                Start Contributing
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200">
                View Projects
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              About Our Hacktoberfest Initiative
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  CoreX Nutrition is proud to host Hacktoberfest 2025, encouraging 
                  open source contributions from developers worldwide. This is your 
                  opportunity to make a meaningful impact while building your portfolio.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Contribute to real-world projects
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Learn from experienced developers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Build your open source portfolio
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Join our supportive community
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-700">Open Source Projects</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhyChoose />
      <LogoCarousel />
      {/* Shop Collection Component */}
      <CollectionSection />
    </>
  );
}
