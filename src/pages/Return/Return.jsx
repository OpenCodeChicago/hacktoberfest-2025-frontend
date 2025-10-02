export default function Return() {
  return (
    <main
      className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-labelledby="return-policy-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1
            id="return-policy-title"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Return Policy
          </h1>
        </header>
        <hr />

        {/* Main Content - Using article for the policy document */}
        <article className="prose prose-lg max-w-none text-gray-700 space-y-8">
          {/* Our Approach Section */}
          <section aria-labelledby="our-approach-section">
            <h2
              id="our-approach-section"
              className="text-2xl font-semibold text-gray-900 mb-4"
            >
              OUR APPROACH
            </h2>
            <p className="mb-4">
              At CoreX Nutrition, we value trust, quality, and transparency.
              This website is an open-source demo project built by Open Code
              Chicago to simulate the experience of a real supplements store.
              While no real purchases or shipments are made here, we've included
              this Return Policy to demonstrate how such a policy would look in
              a production e-commerce environment.
            </p>
          </section>
          <hr />

          {/* Refunds & Returns Section */}
          <section aria-labelledby="refunds-returns-section">
            <h2
              id="refunds-returns-section"
              className="text-2xl font-semibold text-gray-900 mb-4"
            >
              REFUNDS & RETURNS
            </h2>
            <p className="mb-4">
              In a real business scenario, we believe every customer should feel
              confident about their order. A standard policy would allow
              customers to request a return or refund within 30 days of
              receiving the product, provided the majority of the item remains
              unused and in good condition.
            </p>
          </section>
          <hr />

          {/* Damaged or Defective Products Section */}
          <section aria-labelledby="damaged-defective-section">
            <h2
              id="damaged-defective-section"
              className="text-2xl font-semibold text-gray-900 mb-4"
            >
              DAMAGED OR DEFECTIVE PRODUCTS
            </h2>
            <p className="mb-4">
              If this were a live store, customers would be able to report any
              damaged, defective, or incorrect items with photo evidence, and a
              replacement or refund would be issued accordingly.
            </p>
          </section>
          <hr />

          {/* Important Note Section */}
          <section aria-labelledby="important-note-section">
            <h2
              id="important-note-section"
              className="text-2xl font-semibold text-gray-900 mb-4"
            >
              IMPORTANT NOTE
            </h2>
            <p className="mb-4">
              Since CoreX Nutrition is not a real company and does not process
              payments or ship products, we cannot offer refunds or accept
              returns. This policy exists only for demonstration purposes and to
              showcase what a professional supplement store might include.
            </p>
          </section>
          <hr />

          {/* Disclaimer Section - Highlighted for demo purposes */}
          <section aria-labelledby="disclaimer-section">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* Warning Icon - accessible with aria-hidden since it's decorative */}
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
                <h2
                  id="disclaimer-section"
                  className="text-lg font-semibold mb-2"
                >
                  DISCLAIMER
                </h2>
                <p className="text-yellow-700">
                  CoreX Nutrition is a community-driven, open-source project. No
                  real transactions, shipments, or returns are processed. This
                  content is for educational and portfolio purposes only.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
