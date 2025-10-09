import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import SEO from '../../components/SEO';
import ProductGrid from '../../components/Products/ProductGrid';
import SortDropdown from '../../components/Products/SortDropdown';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import RecentlyViewed from '../../components/RecentlyViewed';
import FilterPanel from '../../components/Products/FilterPanel/FilterPanel';

export default function Products() {
  const dispatch = useDispatch();
  const {
    products: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const observer = useRef();

  const [displayedCount, setDisplayedCount] = useState(12);
  
  // Get max price from products
  const maxProductPrice = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return 100;
    const prices = allProducts.map(p => Number(p.price || 0)).filter(p => !isNaN(p) && p > 0);
    return Math.ceil(Math.max(...prices)) || 100;
  }, [allProducts]);

  const [filters, setFilters] = useState({
    priceRange: [0, 100], // Initial fallback
    categories: [],
    goals: [],
    garageSaleOnly: false,
  });
  // Sorting state (client-side)
  const [sortBy, setSortBy] = useState('best_selling');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productListKey = allProducts[0]?._id || 'no-products';

  // Client-side filtered products (real-time)
  const filteredProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    const [minPrice, maxPrice] = filters.priceRange || [0, maxProductPrice];
    return allProducts.filter((p) => {
      const price = Number(p.price || 0);
      if (Number.isNaN(price)) return false;
      
      if (price < minPrice || price > maxPrice) return false;


      if (filters.garageSaleOnly) {
        // consider sale fields: sale > 0 or onSale flag
        const saleVal = Number(p.sale || 0) || (p.onSale ? 1 : 0);
        if (!(saleVal > 0)) return false;
      }

      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(p.category)) return false;
      }

      if (filters.goals && filters.goals.length > 0) {
        const productGoals = Array.isArray(p.goals) ? p.goals : [];
        // include if productGoals intersects selected goals
        const hasGoal = filters.goals.some((g) => productGoals.includes(g));
        if (!hasGoal) return false;
      }

      return true;
    });
  }, [allProducts, filters, maxProductPrice]);

  // Apply client-side sorting to filtered products
  const sortedProducts = useMemo(() => {
    if (!filteredProducts || filteredProducts.length === 0) return [];

    // shallow copy to avoid mutating original array
    const copy = [...filteredProducts];

    const getString = (p, key) => (p[key] || p.name || p.title || '').toString().toLowerCase();
    const getNumber = (p, key) => {
      const val = p[key];
      if (val === undefined || val === null || val === '') return 0;
      const n = Number(val);
      return Number.isNaN(n) ? 0 : n;
    };

    switch (`${sortBy}:${sortOrder}`) {
      case 'title:asc':
        copy.sort((a, b) => getString(a, 'name').localeCompare(getString(b, 'name')));
        break;
      case 'title:desc':
        copy.sort((a, b) => getString(b, 'name').localeCompare(getString(a, 'name')));
        break;
      case 'price:asc':
        copy.sort((a, b) => getNumber(a, 'price') - getNumber(b, 'price'));
        break;
      case 'price:desc':
        copy.sort((a, b) => getNumber(b, 'price') - getNumber(a, 'price'));
        break;
      case 'rating:asc':
        copy.sort((a, b) => getNumber(a, 'rating') - getNumber(b, 'rating'));
        break;
      case 'rating:desc':
        copy.sort((a, b) => getNumber(b, 'rating') - getNumber(a, 'rating'));
        break;
      case 'best_selling:desc':
      default:
        // Best Selling is a placeholder - keep original order (assumed backend order)
        break;
    }

    return copy;
  }, [filteredProducts, sortBy, sortOrder]);

  // Simple display of filtered products with pagination/infinite scroll
  const displayedProducts = sortedProducts.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < filteredProducts.length;

  // Infinite scroll callback
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreProducts) {
          setDisplayedCount((prevCount) =>
            Math.min(prevCount + 5, filteredProducts.length)
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreProducts, filteredProducts.length]
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 1000 }));
  }, [dispatch]);

  return (
    <>
      <SEO
        title="All Products | CoreX Nutrition"
        description="Browse our complete collection of premium sports nutrition supplements and fitness products. Find the perfect supplements to support your fitness goals."
        keywords="sports nutrition, supplements, protein powder, pre-workout, fitness products, CoreX Nutrition"
      />

      <main className={`min-h-screen bg-[#F7FAFF] ${isFilterOpen ? 'relative' : ''}`}>
        {/* Filter Panel Backdrop - covers entire viewport including header */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            style={{ zIndex: 9998 }}
            onClick={() => setIsFilterOpen(false)}
          />
        )}
        {/* Banner Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-montserrat bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mt-6">
                All Products
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Discover our complete range of premium sports nutrition
                supplements designed to fuel your fitness journey
              </p>
            </div>
          </div>
        </section>

        {/* Toolbar Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            {/* Left: All Filters button */}
            <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 bg-transparent text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.863281 10.7949H3.13601M3.13601 10.7949C3.13601 12.3012 4.35705 13.5222 5.86328 13.5222C7.36951 13.5222 8.59055 12.3012 8.59055 10.7949C8.59055 9.28865 7.36951 8.06765 5.86328 8.06765C4.35705 8.06765 3.13601 9.28865 3.13601 10.7949ZM15.8633 3.52219H18.136M15.8633 3.52219C15.8633 5.02842 14.6423 6.24947 13.136 6.24947C11.6297 6.24947 10.4087 5.02842 10.4087 3.52219C10.4087 2.01597 11.6297 0.794922 13.136 0.794922C14.6423 0.794922 15.8633 2.01597 15.8633 3.52219ZM11.3178 10.7949H18.136M0.863281 3.52219H7.68146"
                  stroke="#0D1B2A"
                  strokeLinecap="round"
                />
              </svg>
              All Filters
            </button>
            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(field, order) => {
                // If user chooses Best Selling (placeholder), map empty or best_selling
                setSortBy(field || 'best_selling');
                setSortOrder(order || 'desc');
                // reset displayed count to show top results
                setDisplayedCount(12);
              }}
            />
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div key={productListKey} className="flex flex-col gap-8">
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

              {loading && <ProductSkeleton count={12} />}

              {!loading && !error && displayedProducts.length > 0 && (
                <>
                  <ProductGrid
                    products={displayedProducts}
                    lastProductElementRef={lastProductElementRef}
                  />
                  {hasMoreProducts && (
                    <div className="flex justify-center mt-8">
                      <div className="text-gray-500">
                        Loading more...
                      </div>
                    </div>
                  )}
                </>
              )}

              {!loading && !error && displayedProducts.length === 0 && (
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
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filter Panel (slide-in) */}
        <FilterPanel
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          products={allProducts}
          filters={filters}
          onChangeFilters={(next) => {
            const pr = next.priceRange || [0, maxProductPrice];
            setFilters({
              priceRange: [pr[0] ?? 0, pr[1] ?? maxProductPrice],
              categories: next.categories || [],
              goals: next.goals || [],
              garageSaleOnly: !!next.garageSaleOnly,
            });
            setDisplayedCount(12);
          }}
        />

        {!loading && !error && <RecentlyViewed />}
      </main>
    </>
  );
}
