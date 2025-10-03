import React, { useState } from "react";

const ShippingPage = () => {
  const [activeLink, setActiveLink] = useState("ABOUT CORE");
  const navLinks = ["SHOP", "GARAGE SALE", "ALL PRODUCTS", "ABOUT CORE"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

      {/* ---------------- TOP BAR ---------------- */}
      <div className="bg-gray-900 text-white text-sm font-semibold py-1 border-b border-white/10">
        <div className="max-w-full mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 relative">
          <div></div>
          <div className="text-center tracking-wide">BUY 1 GET 1 50% OFF</div>
           <div className="flex justify-end items-center gap-2.5">
            {/* YouTube */}
            <a href="#" className="socbtn youtube" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                style={{ fill: "#ffffff" }}
              >
                <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" className="socbtn linkedin" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                style={{ fill: "#ffffff" }}
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>

            {/* X/Twitter */}
            <a href="#" className="socbtn x-twitter" aria-label="X/Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
                width={20}
                height={20}
                fill="#ffffff"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="socbtn facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50">
                <ellipse cx="25" cy="25" rx="15" ry="17" fill="#fff" />
                <path
                  d="M26.237,34.025h-5.06v-9.522h-3.359v-4.144h3.359v-2.738c0-3.328,1.968-5.16,4.922-5.16h3.633v4.067h-2.428c-1.168,0-1.242,0.473-1.242,1.26v2.57h3.766l-0.603,4.144h-3.163v9.522Z"
                  fill="#0f1724"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-full mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-4 h-16">
          <div>
            <a href="#" className="text-xl font-bold">logo</a>
          </div>

          {/* Center nav */}
          <div className="hidden md:flex justify-center items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveLink(link); }}
                className={`px-3 py-2 rounded-full  text-gray-700 flex items-center gap-1.5 transition-colors ${
                  activeLink === link ? 'bg-gray-900 text-white ' : 'hover:bg-gray-50 hover:text-blue-900'
                }`}
              >
                {link}
                {link === "SHOP" && (
                  <svg className="w-2.5 h-2.5 opacity-90 translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
                {activeLink === link && <span className="text-red-500 font-extrabold text-[0.95em] ml-1.5">X</span>}
              </a>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex justify-end items-center gap-1.5">
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full text-gray-900 hover:text-gray-900 hover:-translate-y-0.5 transition-transform">{/* Search SVG */}</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full text-gray-900 hover:text-gray-900 hover:-translate-y-0.5 transition-transform">{/* Wishlist SVG */}</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full text-gray-900 hover:text-gray-900 hover:-translate-y-0.5 transition-transform">{/* Account SVG */}</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full text-gray-900 hover:text-gray-900 hover:-translate-y-0.5 transition-transform">{/* Cart SVG */}</a>
          </div>
        </div>
      </nav>

      {/* ---------------- POLICY CONTENT ---------------- */}
      <main className="flex justify-center py-7 px-5">
        <div className="max-w-4xl bg-gray-50 px-5 py-7">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Shipping Policy</h1>
          {[
            { title: "Customer Service", text: "Thank you for visiting CoreX Nutrition. This is an open-source demo project created by Open Code Chicago. While our website is designed to simulate a real supplements store, please note that we do not process real payments or ship actual products." },
            { title: "Shipping Locations", text: "For demonstration purposes, all orders are considered to “ship” within the United States. In reality, this site is part of a community coding project and no physical shipments are made." },
            { title: "Back Orders", text: "In a real e-commerce scenario, back-ordered items may cause delays or refunds. On CoreX Nutrition, all items are always available for demo purposes — no real inventory or credit card transactions occur." },
            { title: "Damaged, Lost, or Stolen Merchandise", text: "Since no physical products are shipped, there is no risk of damage, loss, or theft. This section is included only to illustrate how a real policy might look on a production store." },
            { title: "Delivery Delays", text: "For realism, we assume orders would typically ship within 48–72 business hours and arrive within 7–12 business days. Again, this is demo content only — no real shipments will take place." },
            { title: "Disclaimer", text: "⚠️ CoreX Nutrition is a community open-source project. The site does not sell or deliver products. All content is for demonstration purposes only." }
          ].map((section, idx) => (
            <section key={idx} className="mb-5">
              <h2 className="text-sm font-bold uppercase border-t-2 border-gray-400 pt-3 mb-2">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-10">
          <div>
            <h2 className="text-xl font-bold mb-3">logo</h2>
            <div className="flex gap-3 mb-2">
              {/* social icons */}
            </div>
            <p className="text-gray-400 text-sm">1234 N Main St,<br/>Chicago, IL 60607</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase mb-2">Customer Care</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">My Account</a></li>
              <li><a href="#" className="hover:text-white">My Orders</a></li>
              <li><a href="#" className="hover:text-white">Email Support</a></li>
              <li><a href="#" className="hover:text-white">Call Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase mb-2">Information</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Returns Policy</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Accessibility</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-2">GET OUR LATEST DEALS AND DISCOUNTS!</h4>
            <div className="relative max-w-xs">
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 pr-12 rounded-md bg-gray-800 text-white text-sm" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-black text-xs">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-1">Become A CoreX Insider!</p>
          </div>
        </div>

        <div className="bg-gray-800 py-5 text-center text-gray-400 text-xs border-t border-white/10">
          <p className="mb-2 max-w-2xl mx-auto">**The Food and Drug Administration has not evaluated these statements. This product is not meant to diagnose, treat, cure, or prevent any illness.</p>
          <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mt-2 gap-2">
            <p>© 2025 CoreX Nutrition | Powered by Open Code Chicago</p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <span>Amazon</span>
              <span>Amex</span>
              <span>Apple Pay</span>
              <span>Google Pay</span>
              <span>MasterCard</span>
              <span>PayPal</span>
              <span>Shop</span>
              <span>VISA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShippingPage;
