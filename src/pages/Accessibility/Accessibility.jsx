import SEO from '../../components/SEO';

export default function AccessibilityPage() {
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
        title="Accessibility | CoreX Nutrition"
        description="Learn about CoreX Nutrition's commitment to web accessibility, assistive technology support, and inclusive digital experiences."
        keywords="Accessibility, CoreX Nutrition, WCAG, Screen Readers, Keyboard Navigation, Inclusive Design"
      />

      <main
        id="main-content"
        className="min-h-screen bg-white font-inter py-12 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-labelledby="accessibility-title"
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-8">
            <h1 id="accessibility-title" className="text-5xl mb-4">
              Accessibility
            </h1>
          </header>
          <hr className="text-slate-400" />

          {/* Main Content */}
          <article className="prose prose-lg max-w-none space-y-8">
            {/* Our Commitment to Accessibility */}
            <section aria-labelledby="commitment-section">
              <h2
                id="commitment-section"
                className="text-3xl font-bold mt-8 mb-8"
              >
                OUR COMMITMENT
              </h2>
              <p className="mb-4">
                At CoreX Nutrition, we are committed to ensuring digital
                accessibility for people with disabilities. We are continually
                improving the user experience for everyone and applying the
                relevant accessibility standards.
              </p>
              <p className="mb-4">
                This project, developed by Open Code Chicago, is an open-source
                educational initiative. While it is not a live commercial store,
                accessibility remains a core value in our design and development
                process.
              </p>
            </section>
            <hr className="text-slate-400" />

            {/* Accessibility Standards */}
            <section aria-labelledby="standards-section">
              <h2 id="standards-section" className="text-3xl font-bold mb-8">
                WHAT WE AIM FOR
              </h2>
              <p className="mb-4">We strive to follow best practices with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4" role="list">
                <li>
                  WCAG (Web Content Accessibility Guidelines) 2.1 Level AA
                </li>
                <li>Semantic HTML for screen reader support</li>
                <li>Sufficient color contrast for text and UI elements</li>
                <li>Keyboard navigation for interactive components</li>
                <li>Clear and descriptive alt text for images</li>
              </ul>
            </section>
            <hr className="text-slate-400" />

            {/* Current Project Status */}
            <section aria-labelledby="current-project-status">
              <h2
                id="improvement-section"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                CURRENT PORJECT STATUS
              </h2>
              <p className="mb-4">
                This is a work-in-progress demo project. While we make every
                effort to ensure accessibility, some areas may still be under
                development or not fully compliant. Contributors are encouraged
                to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use semantic and accessible HTML</li>
                <li>Follow ARIA guidelines where appropriate</li>
                <li>
                  Test features with screen readers and keyboard navigation
                </li>
                <li>
                  Report or fix accessibility issues via GitHub discussions or
                  pull requests
                </li>
              </ul>
            </section>
            <hr className="text-slate-400" />

            {/* Feedback */}
            <section aria-labelledby="feedback-section">
              <h2
                id="improvement-section"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                FEEDBACK AND CONTACT
              </h2>
              <p className="mb-4">
                Accessibility is an ongoing effort. We regularly review and
                update our website to ensure it remains accessible to all users.
                We also conduct periodic accessibility audits and user testing
                to identify areas for improvement and implement necessary
                changes.
              </p>
              <p>
                If you encounter accessibility issues, please let us know
                through our GitHub repository discussions or issues tab.
                Together, we can improve accessibility for everyone.
              </p>
            </section>
            <hr className="text-slate-400" />

            {/* Disclaimer */}
            <section aria-labelledby="disclaimer-section">
              <h2
                id="disclaimer-section"
                className="text-3xl font-bold text-gray-900 mb-8"
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
                    Core<span className="text-red-600">X</span> Nutrition is a
                    community open-source project. This accessibility statement
                    demonstrates best practices for real e-commerce sites. All
                    content is for demonstration purposes only.
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
