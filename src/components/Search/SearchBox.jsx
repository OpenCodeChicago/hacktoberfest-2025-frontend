import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import notfound from '../../assets/Not-found.svg';
import { Link } from 'react-router-dom';
import missingImg from '/images/product-default-image.jpg';

export default function SearchBox({ onClose, isOpen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const mountedRef = useRef(true);
  const debounceRef = useRef(null);
  const minVisibleRef = useRef(null);

  // Close drawer and reset search state
  const closeAndReset = () => {
    onClose?.();
    setSearchQuery('');
    setProducts([]);
    setSearchDone(false);
    setError('');
    setLoading(false);
    // optionally blur input to remove focus
    inputRef.current?.blur?.();
  };

  // Close on Escape or outside click
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose?.();
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) onClose?.();
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // track mounted state for safe setState
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // focus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      // small delay to allow animation to finish
      setTimeout(() => inputRef.current?.focus?.(), 500);
    }
  }, [isOpen]);

  // Fetch search results with debounce
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProducts = async () => {
      if (searchQuery.trim().length < 3) {
        if (mountedRef.current) {
          setProducts([]);
          setSearchDone(false);
        }
        return;
      }
      if (mountedRef.current) {
        setLoading(true);
        setSearchDone(false);
        setError('');
      }

      const start = Date.now();
      try {
        const params = new URLSearchParams({ search: searchQuery }).toString();
        const response = await fetch(`${API_URL}/products?${params}`, {
          signal,
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        if (mountedRef.current) setProducts(data.products || data || []);
      } catch (err) {
        if (err?.name !== 'AbortError' && mountedRef.current) {
          setError('Something went wrong while fetching products.');
        }
      } finally {
        const elapsed = Date.now() - start;
        const minVisible = 1200;
        // ensure loader visible for at least minVisible ms
        minVisibleRef.current = setTimeout(
          () => {
            if (!mountedRef.current) return;
            setLoading(false);
            setSearchDone(true);
          },
          Math.max(0, minVisible - elapsed)
        );
      }
    };

    debounceRef.current = setTimeout(fetchProducts, 400);
    return () => {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
      clearTimeout(minVisibleRef.current);
      controller.abort();
    };
  }, [searchQuery, API_URL]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } z-[998]`}
      />

      {/* Drawer */}
      <div
        ref={boxRef}
        className={`fixed top-0 right-0 w-full sm:w-[40%] h-full bg-white shadow-2xl border-l border-gray-200 z-[999]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        {/* Drawer Content */}
        <div
          className={`flex flex-col h-full transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100 delay-100' : 'opacity-0'
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-lg text-[#023E8A] tracking-wide">
              SEARCH
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition group"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-gray-700 transform transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
            </button>
          </div>

          {/* SEARCH INPUT */}
          <div className="px-6 py-4">
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                id="search"
                className="w-full px-4 py-3 pr-16 bg-gray-100 border border-gray-200 rounded-md
                           text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 peer hover:shadow-sm"
                aria-label="Search products"
                placeholder=" "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label
                htmlFor="search"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 left-3 z-10 origin-[0] px-2
                          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
                          peer-focus:text-gray-400 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Search for...
              </label>

              {searchQuery && !loading && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
                >
                  clear
                </button>
              )}
            </div>
          </div>

          {/* RESULTS SCROLL AREA */}
          <div className="px-6 flex-1 overflow-y-auto pb-28">
            {/* Loader */}
            {loading && (
              <div className="flex justify-center mt-10">
                <Loader2 size={36} className="text-blue-600 animate-spin" />
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <p className="text-sm text-red-600 text-center mt-4">{error}</p>
            )}

            {/* Products */}
            {!loading && !error && products.length > 0 && (
              <div className="w-full">
                <h3 className="font-semibold text-gray-700 mb-2 text-xs tracking-wide uppercase">
                  Products
                </h3>
                <hr className="border-gray-300 mb-4" />
                <ul className="space-y-3" role="list" aria-live="polite">
                  {products.map((product) => (
                    <li key={product._id}>
                      <Link
                        onClick={closeAndReset}
                        to={`/products/${product._id}`}
                        className="group flex items-center space-x-4 bg-white border border-gray-100 rounded-lg p-3 shadow-sm 
                                   hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-16 h-16 flex justify-center items-center overflow-hidden">
                          <img
                            src={
                              product.image || product.imageUrl || missingImg
                            }
                            alt={product.name || 'Product image'}
                            loading="lazy"
                            decoding="async"
                            width="64"
                            height="64"
                            className="w-16 h-16 object-contain transition-transform duration-300"
                            onError={(e) => (e.currentTarget.src = missingImg)}
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            {product.brand}
                          </p>
                          <h4
                            className="text-sm font-medium relative inline-block link-underline"
                            style={{ color: '#023E8A' }}
                          >
                            {product.name}
                          </h4>
                          <p className="text-sm text-[#023E8A] mt-0.5">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Empty state */}
            {!loading &&
              searchDone &&
              !error &&
              products.length === 0 &&
              searchQuery.length >= 3 && (
                <div className="flex flex-col items-center justify-center text-center mt-10 text-[#023E8A]">
                  <img src={notfound} className="mb-4" alt="Not Found" />
                  <p className="font-semibold text-lg">NO RESULTS</p>
                  <p className="text-sm">
                    Try a different keyword or check the spelling.
                  </p>
                </div>
              )}
          </div>

          {/* SEE ALL PRODUCTS BUTTON */}
          {!loading && !error && products.length > 0 && (
            <div className="absolute bottom-[30px] left-0 w-full px-6">
              <Link to="/products">
                <button
                  onClick={closeAndReset}
                  className="group w-full py-3 bg-[#023E8A] text-white rounded-md font-semibold 
                             hover:bg-blue-800 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
                >
                  <span>SEE ALL PRODUCTS</span>
                  <span className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
