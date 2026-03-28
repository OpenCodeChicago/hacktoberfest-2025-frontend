import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionById } from '../../store/CollectionSlice';
import ProductCard from '../Products/ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/ChevronIcons';

const ITEMS_PER_PAGE = 3;

const tabs = [
  { id: 'best-sellers', label: 'BEST SELLERS' },
  { id: 'protein-powder', label: 'PROTEIN POWDER' },
  { id: 'weight-management', label: 'WEIGHT MANAGEMENT' },
  { id: 'health-wellness', label: 'HEALTH & WELLNESS SUPPLEMENTS' },
];

export default function BestOfCoreX() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.collections
  );

  const [activeTab, setActiveTab] = useState('best-sellers');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const promise = dispatch(fetchCollectionById(activeTab));
    promise
      .unwrap()
      .then(() => setCurrentIndex(0))
      .catch(() => {});
    return () => promise.abort();
  }, [dispatch, activeTab]);

  const nextSlide = useCallback(() => {
    const maxStartIndex = Math.max(0, products.length - ITEMS_PER_PAGE);
    setCurrentIndex((prev) => Math.min(prev + ITEMS_PER_PAGE, maxStartIndex));
  }, [products.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  }, []);

  const canGoNext = currentIndex < products.length - ITEMS_PER_PAGE;
  const canGoPrev = currentIndex > 0;
  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );

  if (error) {
    return (
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="text-center py-8 text-gray-600">
          <p>Unable to load products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 md:px-0 w-full max-w-7xl mx-auto flex flex-col gap-[40px]">
      {/* Header */}
      <h2 className="bg-[#F7FAFF] text-[32px] lg:text-[48px] uppercase section-title">
        <span className="text-[#000]">BEST </span>
        <span className="stroke-title">of</span>
        <span className="capitalize text-[#000]"> Core</span>
        <span className="text-red-500">X</span>
        <span className="text-[#000]"> Nutrition</span>
      </h2>

      {/* Tabs + Navigation */}
      <div className="flex flex-wrap justify-between items-center sm:gap-4">
        <div
          role="tablist"
          aria-label="Product categories"
          className="tabs-scroll-container sm:mx-0 sm:px-0 overflow-x-auto whitespace-nowrap snap-x snap-mandatory sm:overflow-visible flex gap-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-5 py-2 md:py-3 rounded-lg uppercase text-[12px] md:text-[16px] cursor-pointer tracking-wide transition-all duration-300
                ${
                  activeTab === tab.id
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#17171706] text-[#171717] hover:bg-[#17171710]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {products.length > ITEMS_PER_PAGE && (
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Product Grid + Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-700">
          No products found in this collection.
        </div>
      ) : (
        <div className="transition-all duration-500 ease-in-out">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProducts.map((product) => (
              <div key={product._id || product.id} className="opacity-100">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
