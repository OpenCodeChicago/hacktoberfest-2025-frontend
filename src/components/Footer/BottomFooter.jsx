import React from 'react';
import { Link } from 'react-router-dom';

const BottomFooter = () => {
  const paymentMethods = [
    { 
      name: 'Amazon Pay', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png" 
            alt="Amazon Pay" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'American Express', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/CHCKOUTAMEX.jpg" 
            alt="American Express" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'Apple Pay', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://logos-world.net/wp-content/uploads/2022/03/Apple-Pay-Logo.png" 
            alt="Apple Pay" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'Google Pay', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq_S1I-kRo8EmqBe0MSfTSRdtAflozeeDoBQ&s" 
            alt="Google Pay" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'Mastercard', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo-2016-2020.png" 
            alt="Mastercard" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'PayPal', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://png.pngtree.com/element_our/png/20180723/paypal-logo-icon-png_44635.jpg" 
            alt="PayPal" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'Shop Pay', 
      component: (
        <div className="w-full h-full bg-purple-600 rounded flex items-center justify-center">
          <img 
            src="https://digiteon.com/wp-content/uploads/2025/05/about-shop-pay.jpg" 
            alt="Shop Pay" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
    { 
      name: 'Visa', 
      component: (
        <div className="w-full h-full bg-white rounded flex items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
            alt="Visa" 
            className="w-8 h-6 object-contain"
          />
        </div>
      )
    },
  ];

  const policyLinks = [
    { name: 'Refund Policy', path: '/return-policy' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
  ];

  return (
    <div>
      {/* FDA Disclaimer - Middle Section */}
      <div className="bg-slate-800 px-8 py-5">
        <div className="max-w-full mx-auto">
          <p className="text-lg text-center text-white leading-relaxed tracking-wide">
            **The Food and Drug Administration has not evaluated these statements. This product is not meant to diagnose, treat, cure, or prevent any illness.
          </p>
        </div>
      </div>

      {/* Bottom Footer Content */}
      <div className="bg-gray-800 text-white px-8 py-8">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left Side */}
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-2xl text-white leading-relaxed">
                  © 2025 Core<span class="text-4xl text-red-600">X</span> Nutrition
                  
                </p>
                <p className="text-lg text-white mt-3 leading-relaxed">
                  Powered by: <span className="text-white">Open Code Chicago</span>
                </p>
              </div>
              
              {/* Policy Links */}
              <div className="flex flex-wrap gap-4 text-base leading-relaxed">
                {policyLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Payment Methods */}
            <div className="flex flex-col items-start lg:items-end space-y-3">
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-center w-12 h-8 rounded border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                    title={method.name}
                  >
                    {method.component}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
