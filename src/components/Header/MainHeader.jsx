import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  User,
  ShoppingCart,
} from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg w-full fixed top-8 left-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <img
                src="/images/official-logo-core-x.svg"
                alt="CoreX Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Shop <ChevronDown className="h-4 w-4" />
              </button>
              {shopOpen && (
                <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-xl border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Categories</h3>
                      <div className="space-y-2">
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Pre-Workout</a>
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Protein</a>
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Supplements</a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Popular</h3>
                      <div className="space-y-2">
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Best Sellers</a>
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">New Arrivals</a>
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Sale Items</a>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900">Special Offers</h3>
                      <div className="space-y-2">
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Bundle Deals</a>
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Free Shipping</a>
                        <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Loyalty Program</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              All Products
            </Link>
            <Link to="/about-corex" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              About CoreX
            </Link>
            <Link to="/accessibility" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Accessibility
            </Link>
          </nav>

          {/* Right: Icons (desktop) + Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4 text-gray-700">
              <button aria-label="Search" className="p-2 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>
              <button aria-label="Wishlist" className="p-2 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </button>
              <button aria-label="User Account" className="p-2 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <User className="h-5 w-5" />
              </button>
              <button aria-label="Shopping Cart" className="p-2 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Toggle mobile menu"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <nav className="flex flex-col space-y-1 p-4">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
            >
              Shop <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
            </button>
            {shopOpen && (
              <div className="flex flex-col space-y-1 pl-4 bg-gray-50 rounded-lg p-3">
                <a href="#" className="text-gray-600 hover:text-blue-600 p-2 rounded transition-colors duration-200">
                  Pre-Workout
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 p-2 rounded transition-colors duration-200">
                  Protein
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 p-2 rounded transition-colors duration-200">
                  Supplements
                </a>
              </div>
            )}
            <Link to="/products" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              All Products
            </Link>
            <Link to="/about-corex" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              About CoreX
            </Link>
            <Link to="/accessibility" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              Accessibility
            </Link>
            
            {/* Mobile Icons */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
              <button aria-label="Search" className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>
              <button aria-label="Wishlist" className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </button>
              <button aria-label="User Account" className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <User className="h-5 w-5" />
              </button>
              <button aria-label="Shopping Cart" className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
