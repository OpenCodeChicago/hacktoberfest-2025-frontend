import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import SEO from '../../components/SEO';
import ProductGrid from '../../components/Products/ProductGrid';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import GarageSaleRecentlyViewed from '../../components/GarageSaleRecentlyViewed';

function GarageSale() {
  const dispatch = useDispatch();
  const {
    products: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Filter products that are on sale (have sale > 0 or originalPrice > price)
  const saleProducts = allProducts.filter(product => {
    // Check if product has a sale price (originalPrice exists and is greater than current price)
    const hasSalePrice = product.originalPrice && product.originalPrice > product.price;
    // Or check if there's a sale field/property
    const hasSaleField = product.sale && product.sale > 0;
    return hasSalePrice || hasSaleField;
  });

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <>
      <SEO
        title="Garage Sale | CoreX Nutrition"
        description="Discover amazing deals on premium sports nutrition supplements. Limited time offers on protein powders, pre-workouts, and fitness supplements."
        keywords="garage sale, sale, discounts, sports nutrition, supplements, deals, CoreX Nutrition"
      />

      <main className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
        {/* Banner Section */}
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

        {/* Product Grid Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col gap-8">
            <div className="w-full">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <div className="text-red-600 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-800 mb-3">
                    Unable to Load Products
                  </h3>
                  <p className="text-red-600 mb-6">{error}</p>
                  <button
                    onClick={() =>
                      dispatch(fetchProducts({ page: 1, limit: 1000 }))
                    }
                    className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {loading && <ProductSkeleton count={6} />}

              {!loading && !error && saleProducts.length > 0 && (
                <>
                  <ProductGrid
                    products={saleProducts}
                  />
                </>
              )}

              {!loading && !error && saleProducts.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
                  <div className="text-gray-400 mb-6">
                    <svg
                      className="w-20 h-20 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    No Sale Products Available
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Check back later for amazing deals on our premium supplements.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recently Viewed Section (bottom of page) */}
        {!loading && !error && <GarageSaleRecentlyViewed />}
      </main>
    </>
  );
}

export default GarageSale;
