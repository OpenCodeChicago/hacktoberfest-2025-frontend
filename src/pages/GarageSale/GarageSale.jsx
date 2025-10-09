import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard';
import GarageSaleRecentlyViewed from '../../components/GarageSaleRecentlyViewed';

function GarageSale() {
  const { allProducts } = useSelector((state) => state.product);
  
  // Filter products that are on sale (sale > 0)
  const saleProducts = allProducts.filter(product => product.sale > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Garage Sale Banner */}
      <section className="bg-gradient-to-r from-red-900 via-red-800 to-orange-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-montserrat text-white leading-tight">
              Garage Sale
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-red-100 max-w-3xl mx-auto leading-relaxed">
              Limited time offers on premium sports nutrition supplements. 
              Don't miss out on these incredible deals!
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-4 shadow-lg">
              <span className="text-white font-bold text-lg">
                {saleProducts.length} Products on Sale
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {saleProducts.length > 0 ? (
          <>
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center font-montserrat">
              Products on Sale
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No products on sale at the moment
            </h2>
            <p className="text-gray-500">
              Check back later for amazing deals!
            </p>
          </div>
        )}
      </section>

      {/* Recently Viewed Section */}
      <GarageSaleRecentlyViewed />
    </div>
  );
}

export default GarageSale;
