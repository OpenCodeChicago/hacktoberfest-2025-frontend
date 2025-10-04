import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: January 2025
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Shipping Information</h2>
          <p className="text-gray-700 mb-6">
            CoreX Nutrition ships to all 50 states within the United States. We currently do not ship internationally.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Processing Time</h2>
          <p className="text-gray-700 mb-6">
            Orders are typically processed within 1-2 business days. Processing time may be longer during peak seasons or holidays.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Shipping Methods</h2>
          <ul className="text-gray-700 mb-6 list-disc pl-6">
            <li>Standard Shipping (5-7 business days)</li>
            <li>Expedited Shipping (2-3 business days)</li>
            <li>Overnight Shipping (1 business day)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Shipping Costs</h2>
          <p className="text-gray-700 mb-6">
            Shipping costs are calculated at checkout based on your location and selected shipping method. Free shipping is available on orders over $75.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery</h2>
          <p className="text-gray-700 mb-6">
            Once your order ships, you will receive a tracking number via email. Please ensure someone is available to receive the package at the delivery address.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about our shipping policy, please contact us at info@opencodechicago.org
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
