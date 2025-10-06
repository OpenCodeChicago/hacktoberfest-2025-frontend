import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  User,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';

// Mock navigation data for clean mapping
const navItems = [
  { name: 'Garage Sale', href: '/garage-sale' },
  { name: 'All Products', href: '/products' },
  { name: 'About CoreX', href: '/about' },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  // NEW STATE: Control search bar visibility
  const [searchOpen, setSearchOpen] = useState(false);

  // Helper function for closing both mobile menu and search when necessary
  const closeAll = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setShopOpen(false);
  };

  return (
    // Outer container for the entire header and search bar
    <div className="w-full fixed top-0 left-0 z-50">
      <header className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo (Now Clickable) */}
            <div className="flex-shrink-0">
              <a href="/" onClick={closeAll}>
                <img
                  src="/images/official-logo-core-x.svg"
                  alt="CoreX Logo"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {/* Shop Dropdown */}
              <div
                className="relative group" // Added 'group' class for potential styling
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-black font-medium transition duration-150"
                >
                  Shop <ChevronDown className={`h-4 w-4 transform transition-transform ${shopOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {shopOpen && (
                  
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-screen max-w-lg bg-white rounded-lg shadow-xl p-6 transition-all duration-300 origin-top-left md:max-w-3xl">
                    <div className="grid grid-cols-3 gap-6">
                      <a href="/shop/category-1" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <p className="font-semibold">Category 1</p>
                        <p className="text-sm text-gray-500">View latest deals</p>
                      </a>
                      <a href="/shop/category-2" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <p className="font-semibold">Category 2</p>
                        <p className="text-sm text-gray-500">Best sellers</p>
                      </a>
                      <a href="/shop/category-3" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <p className="font-semibold">Category 3</p>
                        <p className="text-sm text-gray-500">New arrivals</p>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Links */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-black font-medium transition duration-150"
                  onClick={closeAll}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right: Icons (desktop) + Mobile Hamburger */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Desktop Icons */}
              <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700">
                
                {/* Search Button (Now opens search bar) */}
                <button 
                  onClick={() => setSearchOpen(!searchOpen)} 
                  aria-label="Toggle Search"
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Search className="h-5 w-5 hover:text-black" />
                </button>
                
                {/* Account Icons (Now clickable) */}
                <a href="/wishlist" aria-label="Wishlist" className="hidden sm:block">
                  <Heart className="h-5 w-5 hover:text-black" />
                </a>
                <a href="/account" aria-label="User Account" className="hidden sm:block">
                  <User className="h-5 w-5 hover:text-black" />
                </a>
                <a href="/cart" aria-label="Shopping Cart">
                  <ShoppingCart className="h-5 w-5 hover:text-black" />
                </a>
              </div>

              {/* Mobile Hamburger */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    setMobileOpen(!mobileOpen);
                    setSearchOpen(false); // Close search when opening mobile menu
                  }}
                  className="text-gray-700 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NEW: Sliding Search Bar */}
      <div 
        className={`w-full bg-gray-50 shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? 'max-h-20 py-3' : 'max-h-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form className="flex items-center space-x-2">
            <input
              type="search"
              placeholder="Search products, sales, and more..."
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col space-y-2 px-4 pt-2">
            {/* Mobile Shop Dropdown */}
            <div className="border-b border-gray-100">
                <button
                onClick={() => setShopOpen(!shopOpen)}
                className="w-full flex items-center justify-between text-gray-700 hover:text-black py-2"
                >
                Shop <ChevronDown className={`h-4 w-4 transition-transform ${shopOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {shopOpen && (
                <div className="flex flex-col space-y-1 pl-4 pb-2">
                    <a href="/shop/category-1" className="text-gray-600 hover:text-black text-sm py-1" onClick={closeAll}>Category 1</a>
                    <a href="/shop/category-2" className="text-gray-600 hover:text-black text-sm py-1" onClick={closeAll}>Category 2</a>
                    <a href="/shop/category-3" className="text-gray-600 hover:text-black text-sm py-1" onClick={closeAll}>Category 3</a>
                </div>
                )}
            </div>

            {/* Other Mobile Links */}
            {navItems.map((item) => (
                <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-black py-2 border-b border-gray-100"
                onClick={closeAll}
                >
                {item.name}
                </a>
            ))}
            
            {/* Mobile Utility Icons */}
            <div className="flex justify-around pt-4 border-t border-gray-200 mt-4">
                <a href="/wishlist" className="flex items-center space-x-1 text-gray-700 hover:text-black" onClick={closeAll}>
                    <Heart className="h-5 w-5" /> <span>Wishlist</span>
                </a>
                <a href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-black" onClick={closeAll}>
                    <User className="h-5 w-5" /> <span>Account</span>
                </a>
            </div>

          </nav>
        </div>
      )}
    </div>
  );
}
