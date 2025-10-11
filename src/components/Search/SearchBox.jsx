import React, { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import notfound from "../../assets/Not-found.svg";
import { Link } from "react-router-dom";
import missingimg from "../../assets/missing-picture-product.jpg"
export default function SearchBox({ onClose, isOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const boxRef = useRef(null);

  // Close on Escape or outside click
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose?.();
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Fetch search results with debounce
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProducts = async () => {
      if (searchQuery.trim().length < 3) {
        setProducts([]);
        setSearchDone(false);
        return;
      }

      setLoading(true);
      setSearchDone(false);
      setError("");

      const start = Date.now();
      try {
        const response = await fetch(
          `${API_URL}/products?search=${encodeURIComponent(searchQuery)}`,
          { signal }
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products || data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong while fetching products.");
        }
      } finally {
        const elapsed = Date.now() - start;
        const minVisible = 1200;
        setTimeout(() => {
          setLoading(false);
          setSearchDone(true);
        }, Math.max(0, minVisible - elapsed));
      }
    };

    const debounce = setTimeout(fetchProducts, 400);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [searchQuery, API_URL]);

  return (
    <>
      {/* Overlay with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } z-[998]`}
      />

      {/* Drawer with smooth slide and content fade */}
      <div
        ref={boxRef}
        className={`fixed top-0 right-0 w-full sm:w-[480px] h-full bg-white shadow-2xl border-l border-gray-200 z-[999]
              transform transition-all duration-300 ease-in-out
              ${isOpen ? "translate-x-0 scale-100" : "translate-x-full scale-95"} flex flex-col`}
      >
        {/* Drawer Content with Fade */}
        <div
          className={`flex flex-col h-full transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 delay-100" : "opacity-0"
            }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-lg text-[#023E8A] tracking-wide">
              SEARCH
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* SEARCH INPUT */}
          <div className="px-6 py-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Searching for..."
                className="w-full px-4 py-3 pr-16 bg-gray-100 border border-gray-200 rounded-md
                         text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2
                         focus:ring-blue-600 hover:shadow-sm focus:shadow-md transition-all duration-200"
              />

              {/* Clear button */}
              {searchQuery && !loading && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 
                           text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
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
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="group flex items-center space-x-4 bg-white border border-gray-100 rounded-lg p-3 shadow-sm 
                      hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-16 h-16 flex justify-center items-center overflow-hidden">
                        <img
                          src={product.image || missingimg}
                          alt={product.name}
                          className="w-16 h-16 object-contain transition-transform duration-300"
                          onError={(e) => (e.target.src = missingimg)}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                        <h4 className="text-sm font-medium text-[#023E8A] relative inline-block
                             after:content-[''] after:absolute after:left-0 after:bottom-0 
                             after:h-[2px] after:bg-[#023E8A] after:w-0 
                             group-hover:after:w-full after:transition-[width] after:duration-300 after:ease-out">
                          {product.name}
                        </h4>
                        <p className="text-sm text-[#023E8A] mt-0.5">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <p className="font-semibold text-lg">FOUND FOR{" "}</p>
                  <span className="font-semibold text-lg">"{searchQuery}"</span>
                  <p className="text-sm">Try a different keyword or check the spelling.</p>
                </div>
              )}
          </div>

          {/* SEE ALL PRODUCTS BUTTON FIXED ABOVE BOTTOM */}
          {!loading && !error && products.length > 0 && (
            <div className="absolute bottom-[30px] left-0 w-full px-6">
              <Link to="/products">
                <button
                  onClick={onClose}
                  className="group w-full py-3 bg-[#023E8A] text-white rounded-md font-semibold 
                 hover:bg-blue-800 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
                >
                  <span>   SEE ALL PRODUCTS</span>

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