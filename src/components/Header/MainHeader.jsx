import React, { useState } from 'react';
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
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/official-logo-core-x.svg"
              alt="CoreX Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-black"
              >
                Shop <ChevronDown className="h-4 w-4" />
              </button>
              {shopOpen && (
                <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-lg p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded">Category 1</div>
                    <div className="p-4 bg-gray-100 rounded">Category 2</div>
                    <div className="p-4 bg-gray-100 rounded">Category 3</div>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="text-gray-700 hover:text-black">
              Garage Sale
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              All Products
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              About CoreX
            </a>
          </nav>

          {/* Right: Icons (desktop) + Mobile Hamburger */}
          <div className="flex items-center space-x-6">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6 text-gray-700">
              <a href="#" aria-label="Search">
                <Search className="h-5 w-5 hover:text-black" />
              </a>
              <a href="#" aria-label="Wishlist">
                <Heart className="h-5 w-5 hover:text-black" />
              </a>
              <a href="#" aria-label="User Account">
                <User className="h-5 w-5 hover:text-black" />
              </a>
              <a href="#" aria-label="Shopping Cart">
                <ShoppingCart className="h-5 w-5 hover:text-black" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-gray-700 hover:text-black"
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
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 p-4">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between text-gray-700 hover:text-black"
            >
              Shop <ChevronDown className="h-4 w-4" />
            </button>
            {shopOpen && (
              <div className="flex flex-col space-y-2 pl-4">
                <a href="#" className="text-gray-600 hover:text-black">
                  Category 1
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  Category 2
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  Category 3
                </a>
              </div>
            )}
            <a href="#" className="text-gray-700 hover:text-black">
              Garage Sale
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              All Products
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              About CoreX
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
