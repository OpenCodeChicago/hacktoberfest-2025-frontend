const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* ---------------- POLICY CONTENT ---------------- */}
      <main className="flex justify-center py-7 px-5">
        <div className="max-w-4xl bg-gray-50 px-5 py-7">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Shipping Policy
          </h1>
          {[
            {
              title: 'Customer Service',
              text: 'Thank you for visiting CoreX Nutrition. This is an open-source demo project created by Open Code Chicago. While our website is designed to simulate a real supplements store, please note that we do not process real payments or ship actual products.',
            },
            {
              title: 'Shipping Locations',
              text: 'For demonstration purposes, all orders are considered to “ship” within the United States. In reality, this site is part of a community coding project and no physical shipments are made.',
            },
            {
              title: 'Back Orders',
              text: 'In a real e-commerce scenario, back-ordered items may cause delays or refunds. On CoreX Nutrition, all items are always available for demo purposes — no real inventory or credit card transactions occur.',
            },
            {
              title: 'Damaged, Lost, or Stolen Merchandise',
              text: 'Since no physical products are shipped, there is no risk of damage, loss, or theft. This section is included only to illustrate how a real policy might look on a production store.',
            },
            {
              title: 'Delivery Delays',
              text: 'For realism, we assume orders would typically ship within 48–72 business hours and arrive within 7–12 business days. Again, this is demo content only — no real shipments will take place.',
            },
            {
              title: 'Disclaimer',
              text: '⚠️ CoreX Nutrition is a community open-source project. The site does not sell or deliver products. All content is for demonstration purposes only.',
            },
          ].map((section, idx) => (
            <section key={idx} className="mb-5">
              <h2 className="text-sm font-bold uppercase border-t-2 border-gray-400 pt-3 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShippingPage;
