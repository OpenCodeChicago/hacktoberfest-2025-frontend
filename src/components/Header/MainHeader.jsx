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
import SearchBox from '../Search/SearchBox';
import TopHeader from "../TopHeader/TopHeader";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <>
      <TopHeader />
      <header className="bg-white shadow-md w-full fixed top-10 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="/images/official-logo-core-x.svg"
                  alt="CoreX Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
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

              <Link to="/garage-sale" className="text-gray-700 hover:text-black">
                Garage Sale
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-black">
                All Products
              </Link>
              <Link to="/about-corex" className="text-gray-700 hover:text-black">
                About CoreX
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6 text-gray-700">
                <button
                  aria-label="Search"
                  onClick={() => setSearch(true)}
                  className="cursor-pointer flex items-center"
                >
                  <Search className="h-5 w-5 hover:text-black" />
                </button>

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
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setSearch(true)}
                  className="text-gray-700 hover:text-black"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-gray-700 hover:text-black"
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50">
          <div className="bg-white w-64 h-full shadow-lg">
            <div className="p-4 border-b">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              <Link 
                to="/garage-sale" 
                className="block text-gray-700 hover:text-black"
                onClick={() => setMobileOpen(false)}
              >
                Garage Sale
              </Link>
              <Link
                to="/products"
                className="block text-gray-700 hover:text-black"
                onClick={() => setMobileOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/about-corex" 
                className="block text-gray-700 hover:text-black"
                onClick={() => setMobileOpen(false)}
              >
                About CoreX
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* 🔍 Right Slide Search Drawer */}
      {search && (
        <div className="fixed inset-0 z-[9999] flex justify-end bg-black/40">
          {/* Drawer */}
          <div className="relative w-full sm:w-[580px] bg-white h-full shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">SEARCH</h2>
              <button
                onClick={() => setSearch(false)}
                className="text-gray-600 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              <SearchBox />
            </div>
          </div>
        </div>
      )}
    </>
  );
}