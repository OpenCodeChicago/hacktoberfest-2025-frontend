export default function PrivacyPolicyPage() {
  return (
    <main
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
        {/* Main Content - Using article for the policy document */}
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
              Please note: no real transactions, payments, or sensitive personal
              data are processed on this site.
            </p>
          </section>
          <hr />

          {/* Information Collection Section */}
          <section aria-labelledby="information-collection-section">
            <h2
              id="information-collection-section"
              className="text-2xl font-semibold text-gray-900 mb-4"
            >
              WHAT INFORMATION DO WE COLLECT?
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Basic usage data:</strong> When you visit our site, we
                may collect general information such as browser type, device
                type, and pages visited.
              </li>
              <li>
                <strong>Account data (demo only):</strong> If you create an
                account, we may store your name, email, or other information you
                provide. This data is for demonstration purposes only.
              </li>
              <li>
                <strong>No financial information:</strong> We do not process or
                store payment details (e.g., credit cards, bank accounts).
              </li>
            </ul>
          </section>
          <hr />

          {/* Information Usage Section */}
          <section aria-labelledby="information-usage-section">
            <h2
              id="information-usage-section"
              className="text-2xl font-semibold mb-4"
            >
              HOW DO WE USE THIS INFORMATION?
            </h2>
            <p className="mb-3">
              In a real e-commerce platform, data may be used to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personalize your shopping experience</li>
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

          {/* Information Sharing Section */}
          <section aria-labelledby="information-sharing-section">
            <h2
              id="information-sharing-section"
              className="text-2xl font-semibold mb-4"
            >
              DO WE SHARE INFORMATION?
            </h2>
            <p>
              No. We do not sell, trade, or share your personal data with third
              parties. Since this project is not a live store, all collected
              data remains internal to the demo.
            </p>
          </section>
          <hr />

          {/* Cookies and Tracking Section */}
          <section aria-labelledby="cookies-tracking-section">
            <h2
              id="cookies-tracking-section"
              className="text-2xl font-semibold mb-4"
            >
              COOKIES & TRACKING
            </h2>
            <p>
              Our site may use cookies to simulate cart functionality and user
              sessions. These cookies do not track you beyond this demo website.
              You can disable cookies in your browser, but some demo features
              may stop working.
            </p>
          </section>
          <hr />

          {/* Children's Privacy Section */}
          <section aria-labelledby="childrens-privacy-section">
            <h2
              id="childrens-privacy-section"
              className="text-2xl font-semibold mb-4"
            >
              CHILDREN'S PRIVACY
            </h2>
            <p>
              This project is not directed at children under the age of 13, and
              we do not knowingly collect data from minors.
            </p>
          </section>
          <hr />

          {/* Security Section */}
          <section aria-labelledby="security-section">
            <h2
              id="security-section"
              className="text-2xl font-semibold mb-4"
            >
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

          {/* Disclaimer Section - Highlighted for demo purposes */}
          <section aria-labelledby="disclaimer-section">
            <div className="flex">
              <div className="flex-shrink-0"></div>
              <div className="ml-3">
                <h2
                  id="disclaimer-section"
                  className="text-2xl font-semibold mb-2"
                >
                  DISCLAIMER
                </h2>
                <p>
                  CoreX Nutrition is not a real company. This Privacy Policy is
                  for educational and demonstration purposes only. No actual
                  personal, payment, or shipping data is collected, processed,
                  or shared.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}