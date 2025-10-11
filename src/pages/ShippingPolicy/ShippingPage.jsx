import SEO from '../../components/SEO';

export default function ShippingPage() {
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
        title="Shipping Policy | CoreX Nutrition"
        description="CoreX Nutrition's Shipping Policy for this open-source demo project. Learn about shipping locations, delivery times, and policy guidelines."
        keywords="Shipping Policy, CoreX Nutrition, Open Source, Delivery, E-commerce Demo"
      />

      <main
        id="main-content"
        className="min-h-screen bg-white font-inter py-12 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-labelledby="shipping-policy-title"
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-8">
            <h1
              id="shipping-policy-title"
              className="text-5xl md:text-6xl text-gray-900 mb-4"
            >
              Shipping Policy
            </h1>
          </header>
          <hr className="text-slate-400" />

          {/* Main Content */}
          <article className="prose prose-lg max-w-none space-y-8">
            {/* Customer Service */}
            <section aria-labelledby="customer-service-section">
              <h2
                id="customer-service-section"
                className="text-3xl font-bold text-gray-900 mt-8 mb-8"
              >
                CUSTOMER SERVICE
              </h2>
              <p className="mb-4">
                Thank you for visiting CoreX Nutrition. This is an open-source
                demo project created by Open Code Chicago. While our website is
                designed to simulate a real supplements store, please note that
                we do not process real payments or ship actual products.
              </p>
              <p>If you have any questions about the project or contributions, please contact the team at:info@opencodechicago.org</p>
            </section>
            <hr className="text-slate-400" />

            {/* Shipping Locations */}
            <section aria-labelledby="shipping-locations-section">
              <h2
                id="shipping-locations-section"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                SHIPPING LOCATIONS
              </h2>
              <p className="mb-4">
                For demonstration purposes, all orders are considered to "ship"
                within the United States. In reality, this site is part of a
                community coding project and no physical shipments are made.
              </p>
            </section>
            <hr className="text-slate-400" />

            {/* Back Orders */}
            <section aria-labelledby="back-orders-section">
              <h2
                id="back-orders-section"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                BACK ORDERS
              </h2>
              <p className="mb-4">
                In a real e-commerce scenario, back-ordered items may cause
                delays or refunds. On CoreX Nutrition, all items are always
                available for demo purposes — no real inventory or credit card
                transactions occur.
              </p>
            </section>
            <hr className="text-slate-400" />

            {/* Damaged, Lost, or Stolen Merchandise */}
            <section aria-labelledby="damaged-merchandise-section">
              <h2
                id="damaged-merchandise-section"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                DAMAGED, LOST, OR STOLEN MERCHANDISE
              </h2>
              <p className="mb-4">
                Since no physical products are shipped, there is no risk of
                damage, loss, or theft. This section is included only to
                illustrate how a real policy might look on a production store.
              </p>
            </section>
            <hr className="text-slate-400" />

            {/* Delivery Delays */}
            <section aria-labelledby="delivery-delays-section">
              <h2
                id="delivery-delays-section"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                DELIVERY DELAYS
              </h2>
              <p className="mb-4">
                For realism, we assume orders would typically ship within 48–72
                business hours and arrive within 7–12 business days. Again, this
                is demo content only — no real shipments will take place.
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
                    community open-source project. The site does not sell or
                    deliver products. All content is for demonstration purposes
                    only.
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
