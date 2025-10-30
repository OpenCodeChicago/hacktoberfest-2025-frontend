import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import {
  fetchCollectionById,
  clearCurrentCollection,
} from '../../store/CollectionSlice';
import ProductGrid from '../../components/Products/ProductGrid';
import SortDropdown from '../../components/Products/SortDropdown';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import FilterPanel from '../../components/Products/FilterPanel/FilterPanel';
import RecentlyViewed from '../../components/RecentlyViewed';
import SEO from '../../components/SEO';
import { collections } from '../../components/CollectionSection';

export default function CollectionPage() {
  const { name } = useParams();

  const dispatch = useDispatch();
  const {
    currentCollection,
    products: collectionProducts,
    loading,
    error,
    pagination,
  } = useSelector((state) => state.collections || {});

  const observer = useRef();
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    categories: [],
    goals: [],
    garageSaleOnly: false,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [sortOrder, setSortOrder] = useState('desc');

  // scroll to top on load
  useEffect(() => {
    const current = document.getElementById('collection-page');
    if (current) {
      const elementTop = current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - 150,
        behavior: 'auto',
      });
    }
  }, []);

  // Fetch collection data
  useEffect(() => {
    if (!name) return;
    dispatch(fetchCollectionById(name));

    return () => {
      dispatch(clearCurrentCollection());
    };
  }, [dispatch, name]);

  const normalizedProducts = useMemo(() => {
    if (!collectionProducts || collectionProducts.length === 0) return [];
    return collectionProducts.map((product) => ({
      ...product,
      id: product._id || product.id,
      imageUrl: product.image,
      reviewCount: product.reviewsCount,
    }));
  }, [collectionProducts]);

  // Calculate max price from collection products
  const maxProductPrice = useMemo(() => {
    if (!normalizedProducts || normalizedProducts.length === 0) return 100;
    const prices = normalizedProducts
      .map((p) => Number(p.price || 0))
      .filter((p) => !isNaN(p) && p > 0);
    return Math.ceil(Math.max(...prices)) || 100;
  }, [normalizedProducts]);

  // Apply filters to collection products
  const filteredProducts = useMemo(() => {
    if (!normalizedProducts || normalizedProducts.length === 0) return [];
    const [minPrice, maxPrice] = filters.priceRange || [0, maxProductPrice];

    return normalizedProducts.filter((p) => {
      const price = Number(p.price || 0);
      if (Number.isNaN(price)) return false;
      if (price < minPrice || price > maxPrice) return false;

      if (filters.garageSaleOnly) {
        const saleVal = Number(p.sale || 0) || (p.onSale ? 1 : 0);
        if (!(saleVal > 0)) return false;
      }

      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(p.category)) return false;
      }

      if (filters.goals && filters.goals.length > 0) {
        const productGoals = Array.isArray(p.goals) ? p.goals : [];
        const hasGoal = filters.goals.some((g) => productGoals.includes(g));
        if (!hasGoal) return false;
      }

      return true;
    });
  }, [normalizedProducts, filters, maxProductPrice]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    if (!filteredProducts || filteredProducts.length === 0) return [];
    const sorted = [...filteredProducts];

    if (sortBy === 'title') {
      sorted.sort((a, b) => {
        const titleA = (a.name || a.title || '').toLowerCase();
        const titleB = (b.name || b.title || '').toLowerCase();
        return sortOrder === 'asc'
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => {
        const priceA = Number(a.price || 0);
        const priceB = Number(b.price || 0);
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => {
        const ratingA = Number(a.rating || 0);
        const ratingB = Number(b.rating || 0);
        return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      });
    }

    return sorted;
  }, [filteredProducts, sortBy, sortOrder]);

  const displayedProducts = sortedProducts.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < sortedProducts.length;

  // Infinite scroll observer
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreProducts) {
          setDisplayedCount((prevCount) =>
            Math.min(prevCount + 8, sortedProducts.length)
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreProducts, sortedProducts.length]
  );

  const collectionSlug = currentCollection || name;
  const collectionTitle = collectionSlug?.replace(/-/g, ' ') || 'Collection';
  const collectionTitleCapitalized =
    collectionTitle.charAt(0).toUpperCase() + collectionTitle.slice(1);

  const getValidatedImageUrl = () => {
    const stateImage = window.history.state?.usr?.imageUrl;
    if (stateImage && typeof stateImage === 'string') {
      if (stateImage.startsWith('/') || stateImage.startsWith('./')) {
        return stateImage;
      }
    }

    // Fallback to collection lookup from allowlisted collections
    const collection = collections.find((col) => col.id === name);
    return collection?.image || null;
  };

  const imageUrl = getValidatedImageUrl();

  if (error) {
    return (
      <>
        <SEO
          title={`${collectionTitleCapitalized} | CoreX Nutrition`}
          description="Browse our collection of premium supplements"
          keywords="supplements, fitness, nutrition"
        />
        <main className="min-h-screen bg-[#F7FAFF] flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-4">
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
              Unable to Load Collection
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => dispatch(fetchCollectionById(name))}
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${collectionTitleCapitalized} Collection | CoreX Nutrition`}
        description={`Browse our ${collectionTitle} collection and find premium supplements that support your fitness goals.`}
        keywords={`${collectionTitle}, supplements, fitness, nutrition, corex`}
      />

      <main
        id="collection-page"
        className={`min-h-screen bg-[#F7FAFF] ${isFilterOpen ? 'relative' : ''}`}
      >
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            style={{ zIndex: 9998 }}
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Collection Banner */}
        <section
          className={`collections-banner-div text-white py-20 ${
            imageUrl
              ? ''
              : 'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900'
          }`}
          style={
            imageUrl
              ? {
                  '--bg-image': `url(${imageUrl})`,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#1e293b',
                }
              : undefined
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6  font-montserrat text-white mt-6">
                {collectionTitleCapitalized}
              </h1>
              <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
                Browse our {collectionTitle} collection and find premium
                supplements that support your fitness goals.
              </p>

              <motion.p
                className={`${sortedProducts.length > 0 ? '' : 'opacity-0 '} transition-all duration-150 ease-in-out text-slate-200`}
              >
                {pagination?.total || sortedProducts.length} products available
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Toolbar */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            >
              <span className="hidden sm:inline">All Filters</span>
              <span className="sm:hidden">Filters</span>
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
            </button>

            <div className="self-end sm:self-auto w-full sm:w-auto">
              <SortDropdown
                className="w-full sm:w-auto"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(field, order) => {
                  setSortBy(field || 'featured');
                  setSortOrder(order || 'desc');
                  setDisplayedCount(12);
                }}
              />
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col gap-8">
            <div className="w-full">
              {loading && <ProductSkeleton count={12} />}

              {!loading && !error && displayedProducts.length > 0 && (
                <>
                  <ProductGrid
                    products={displayedProducts}
                    lastProductElementRef={lastProductElementRef}
                  />
                  {hasMoreProducts && (
                    <div className="flex justify-center mt-8">
                      <div className="text-gray-500">Loading more...</div>
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
                    We couldn't find any products matching your filters in this
                    collection.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        priceRange: [0, maxProductPrice],
                        categories: [],
                        goals: [],
                        garageSaleOnly: false,
                      });
                      setDisplayedCount(12);
                    }}
                    className="bg-gray-600 cursor-pointer text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <FilterPanel
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          products={normalizedProducts || []}
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

        {!loading && !error && <RecentlyViewed saleOnly={false} />}
      </main>
    </>
  );
}
