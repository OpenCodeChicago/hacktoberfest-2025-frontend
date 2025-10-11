import SEO from '../../components/SEO';

export default function PrivacyPolicyPage() {
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
        title="Privacy Policy | CoreX Nutrition"
        description="Learn about CoreX Nutrition's privacy practices for this open-source demo project, including data collection, usage, and security."
        keywords="Privacy Policy, CoreX Nutrition, Open Source, Data Privacy, Security"
      />

      <main
        id="main-content"
        className="min-h-screen bg-white font-inter py-12 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-labelledby="privacy-policy-title"
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-8">
            <h1
              id="privacy-policy-title"
              className="text-5xl text-gray-900 mb-4"
            >
              Privacy Policy
            </h1>
          </header>

          <hr />

          {/* Main Content */}
          <article className="prose prose-lg max-w-none space-y-8">
            {/* Introduction Section */}
            <section aria-labelledby="introduction-section">
              <h2
                id="introduction-section"
                className="text-2xl font-bold text-gray-900 my-8"
              >
                INTRODUCTION
              </h2>
              <p className="mb-4">
                At CoreX Nutrition, we care about your privacy and are committed
                to transparency. This project is an open-source demo, built by
                Open Code Chicago, designed to simulate the experience of a real
                e-commerce supplements store. Please note: no real transactions,
                payments, or sensitive personal data are processed on this site.
              </p>
            </section>
            <hr />

            {/* Information Collection */}
            <section aria-labelledby="information-collection-section">
              <h2
                id="information-collection-section"
                className="text-2xl font-semibold text-gray-900 mb-4"
              >
                WHAT INFORMATION DO WE COLLECT?
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Basic usage data: When you visit our site, we may collect
                  general information such as browser type, device type, and
                  pages visited.
                </li>
                <li>
                  Account data (demo only): If you create an account, we may
                  store your name, email, or other information you provide. This
                  data is for demonstration purposes only
                </li>
                <li>
                  No financial information: We do not process or store payment
                  details (e.g., credit cards, bank accounts).
                </li>
              </ul>
            </section>
            <hr />

            {/* Information Usage */}
            <section aria-labelledby="information-usage-section">
              <h2
                id="information-usage-section"
                className="text-2xl font-semibold mb-4"
              >
                HOW DO WE USE THIS INFORMATION?
              </h2>
              <p className="mb-3">In a real platform, data may be used to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personalize shopping experience</li>
                <li>Improve site functionality</li>
                <li>Support customer service</li>
                <li>Send promotional emails</li>
              </ul>
              <p className="mt-4">
                Here at CoreX Nutrition (demo project), any data is used only to
                showcase how a real store might function.
              </p>
            </section>
            <hr />

            {/* Information Sharing */}
            <section aria-labelledby="information-sharing-section">
              <h2
                id="information-sharing-section"
                className="text-2xl font-semibold mb-4"
              >
                DO WE SHARE INFORMATION?
              </h2>
              <p>
                No. We do not sell, trade, or share your personal data with
                third parties. Since this project is not a live store, all
                collected data remains internal to the demo.
              </p>
            </section>
            <hr />

            {/* Cookies */}
            <section aria-labelledby="cookies-tracking-section">
              <h2
                id="cookies-tracking-section"
                className="text-2xl font-semibold mb-4"
              >
                COOKIES & TRACKING
              </h2>
              <p>
                Our site may use cookies to simulate cart functionality and user
                sessions. These cookies do not track you beyond this demo
                website. You can disable cookies in your browser, but some demo
                features may stop working.
              </p>
            </section>
            <hr />

            {/* Children's Privacy */}
            <section aria-labelledby="childrens-privacy-section">
              <h2
                id="childrens-privacy-section"
                className="text-2xl font-semibold mb-4"
              >
                CHILDREN'S PRIVACY
              </h2>
              <p>
                This project is not directed at children under the age of 13,
                and we do not knowingly collect data from minors.
              </p>
            </section>
            <hr />

            {/* Security */}
            <section aria-labelledby="security-section">
              <h2 id="security-section" className="text-2xl font-semibold mb-4">
                SECURITY
              </h2>
              <p>
                As an open-source demo, no financial transactions or sensitive
                personal data are stored. However, if you fork or deploy this
                project, we recommend implementing SSL encryption and modern
                security best practices for production use.
              </p>
            </section>
            <hr />

            {/* Disclaimer */}
            <section aria-labelledby="disclaimer-section">
              <h2
                id="disclaimer-section"
                className="text-2xl font-extrabold mb-2"
              >
                DISCLAIMER
              </h2>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p>
                    CoreX Nutrition is a community-driven, open-source project.
                    No real transactions, shipments, or returns are processed.
                    This content is for educational and portfolio purposes only.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
