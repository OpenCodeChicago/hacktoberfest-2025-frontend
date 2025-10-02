import SEO from "../../components/SEO";

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
        className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-labelledby="privacy-policy-title"
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-8">
            <h1
              id="privacy-policy-title"
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Privacy Policy
            </h1>
          </header>

          <hr />

          {/* Main Content */}
          <article className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Introduction Section */}
            <section aria-labelledby="introduction-section">
              <h2
                id="introduction-section"
                className="text-2xl font-semibold text-gray-900 mb-4"
              >
                INTRODUCTION
              </h2>
              <p className="mb-4">
                At CoreX Nutrition, we care about your privacy and are committed
                to transparency. This project is an open-source demo, but to
                simulate the experience of a real e-commerce supplement store.
                Please note: no real transactions, payments, or sensitive
                personal data are processed on this site.
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
                  <strong>Basic usage data:</strong> Browser type, device type,
                  and pages visited.
                </li>
                <li>
                  <strong>Account data (demo only):</strong> Name, email, or
                  other info provided. Demo purposes only.
                </li>
                <li>
                  <strong>No financial information:</strong> Payment details are
                  not stored.
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
                For this demo, any data is used only to showcase functionality.
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
                No. Data remains internal. We do not sell, trade, or share your
                personal data with third parties.
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
                sessions. Disabling cookies may affect demo features.
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
                Not directed at children under 13; no data knowingly collected
                from minors.
              </p>
            </section>
            <hr />

            {/* Security */}
            <section aria-labelledby="security-section">
              <h2
                id="security-section"
                className="text-2xl font-semibold mb-4"
              >
                SECURITY
              </h2>
              <p>
                No financial transactions or sensitive data stored. For
                production, implement SSL and modern security best practices.
              </p>
            </section>
            <hr />

            {/* Disclaimer */}
            <section aria-labelledby="disclaimer-section">
              <h2
                id="disclaimer-section"
                className="text-2xl font-semibold mb-4"
              >
                DISCLAIMER
              </h2>
              <p>
                CoreX Nutrition is not a real company. This Privacy Policy is for
                educational/demo purposes only. No actual personal, payment, or
                shipping data is collected or shared.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
