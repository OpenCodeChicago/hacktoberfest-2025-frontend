export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility
          </h1>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Commitment to Accessibility
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At CoreX Nutrition, we are committed to ensuring digital accessibility 
              for people with disabilities. We are continually improving the user 
              experience for everyone and applying the relevant accessibility standards.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Accessibility Standards
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 
              Level AA standards. These guidelines explain how to make web content more 
              accessible to people with disabilities.
            </p>
            
            <article className="mt-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Key Features We Implement
              </h3>
              <ul className="space-y-2 text-gray-700" role="list">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
                  <span>Alternative text for images and graphics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
                  <span>Keyboard navigation support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
                  <span>High color contrast ratios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
                  <span>Screen reader compatibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
                  <span>Clear and consistent navigation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2" aria-hidden="true">✓</span>
                  <span>Responsive design for various devices</span>
                </li>
              </ul>
            </article>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Assistive Technology Support
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website is designed to work with a variety of assistive technologies, 
              including but not limited to:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <article className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Screen Readers</h3>
                <p className="text-sm text-gray-600">
                  Compatible with JAWS, NVDA, VoiceOver, and other screen reading software.
                </p>
              </article>
              
              <article className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Voice Recognition</h3>
                <p className="text-sm text-gray-600">
                  Supports Dragon NaturallySpeaking and other voice control software.
                </p>
              </article>
              
              <article className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Keyboard Navigation</h3>
                <p className="text-sm text-gray-600">
                  Full functionality available through keyboard-only navigation.
                </p>
              </article>
              
              <article className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Magnification Software</h3>
                <p className="text-sm text-gray-600">
                  Compatible with ZoomText and other screen magnification tools.
                </p>
              </article>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Feedback and Contact
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We welcome your feedback on the accessibility of our website. 
              If you encounter any barriers or have suggestions for improvement, 
              please don't hesitate to contact us.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong>{' '}
                  <a 
                    href="mailto:accessibility@corexnutrition.com" 
                    className="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    aria-label="Email accessibility team at accessibility@corexnutrition.com"
                  >
                    accessibility@corexnutrition.com
                  </a>
                </p>
                <p>
                  <strong>Response Time:</strong> We aim to respond to accessibility 
                  inquiries within 2 business days.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Continuous Improvement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Accessibility is an ongoing effort. We regularly review and update 
              our website to ensure it remains accessible to all users. We also 
              conduct periodic accessibility audits and user testing to identify 
              areas for improvement and implement necessary changes.
            </p>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Last Updated:</strong> This accessibility statement was last 
                reviewed and updated on {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}