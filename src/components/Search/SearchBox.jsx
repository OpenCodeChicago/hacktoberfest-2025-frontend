import React, { useState, useEffect } from "react";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch matching products from backend after 3+ characters
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.length < 3) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/products?search=${searchQuery}`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data.products || data); // handle both {products: []} or []
      } catch {
        setError("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 400); // debounce typing
    return () => clearTimeout(debounce);
  }, [searchQuery, API_URL]);

  return (
    <div className="w-full">
      {/* Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 pr-16 border border-gray-300 
             rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-sm font-medium"
          >
            clear
          </button>
        )}
      </div>

      {/* Status */}
      {loading && <p className="text-sm text-gray-500">Searching...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Product List */}
      {!loading && !error && products.length > 0 && (
        <>
          <h3 className="font-semibold text-gray-700 mb-3">PRODUCTS</h3>
          <hr className="border-gray-300 mb-4" />

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group flex items-center space-x-4 bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer hover:bg-gray-50"
              >
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden">
                  <img
                    src={product.image || "/api/placeholder/80/80"}
                    alt={product.name}
                    className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-sm text-[#023E8A]">{product.brand}</p>
                  <h4 className="text-sm font-medium text-[#023E8A]">
                    {product.name}
                  </h4>
                  <p className="text-sm text-[#023E8A]">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 absolute bottom-5 w-10/12 ">
            <button className="w-full py-3 bg-[#023E8A] hover:bg-blue-800 text-white rounded-md font-semibold">
              SEE ALL PRODUCTS →
            </button>
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && searchQuery.length >= 3 && products.length === 0 && !error && (
        <div className="text-sm text-center text-[#023E8A] mt-4">
          <p>
            No products found for "<span className="font-semibold">{searchQuery}</span>"
          </p>
          <p>Check the spelling or use a different word or phrase.</p>
        </div>
      )}
    </div>
  );
}
