// src/components/BestOfCoreX.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCollectionById } from '../../store/CollectionSlice';
import CoreProductCard from '../CoreProductCard';

const BestOfCoreX = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.collections
  );

  const [activeTab, setActiveTab] = useState('best-sellers');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  const tabs = [
    { id: 'best-sellers', label: 'BEST SELLERS' },
    { id: 'protein-powder', label: 'PROTEIN POWDER' },
    { id: 'weight-management', label: 'WEIGHT MANAGEMENT' },
    {
      id: 'health-wellness-supplements',
      label: 'HEALTH & WELLNESS SUPPLEMENTS',
    },
  ];

  const PRODUCTS_PER_PAGE = 4; // Show 4 products at a time like in the image

  // Fetch collection when tab changes
  useEffect(() => {
    const fetchCollection = async () => {
      setIsAnimating(true);
      try {
        await dispatch(fetchCollectionById(activeTab)).unwrap();
      } catch (error) {
        console.error('Failed to fetch collection:', error);
      } finally {
        setIsAnimating(false);
        setCurrentPage(0);
      }
    };

    fetchCollection();
  }, [dispatch, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const currentProducts = products.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  );

  const handleTabClick = useCallback(
    (tabId) => {
      if (tabId !== activeTab && !isAnimating) {
        setActiveTab(tabId);
      }
    },
    [activeTab, isAnimating]
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Scroll to show current page products
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [currentPage, activeTab]);

  // Animation variants for horizontal slide
  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

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
    <section className="max-w-7xl mx-auto flex flex-col gap-[40px]">
      {/* Header */}
      <div className="flex flex-col gap-[40px]">
        <h2 className="bg-[#F7FAFF] text-[32px] lg:text-[48px] uppercase section-title">
          <span className="text-[#000]">BEST </span>
          <span className="stroke-title">of</span>
          <span className="capitalize text-[#000]"> Core</span>
          <span className="text-red-500">X</span>
          <span className="text-[#000]"> Nutrition</span>
        </h2>

        {/* Navigation Tabs and Arrows */}
        <div className="flex justify-between items-center">
          {/* Navigation Tabs */}
          <nav className="flex px-4 md:px-0 w-full justify-start">
            <div className="w-full max-w-6xl">
              {/* Mobile */}
              <div className="md:hidden overflow-x-auto">
                <div className="flex min-w-max gap-2 py-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`px-4 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-300 rounded-lg whitespace-nowrap min-w-[120px] text-center ${
                        activeTab === tab.id
                          ? 'bg-[#171717] text-white'
                          : 'bg-[#17171706] text-[#171717] hover:bg-[#1717170F]'
                      } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => handleTabClick(tab.id)}
                      disabled={isAnimating}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:flex justify-start items-start gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 rounded-lg whitespace-nowrap text-center ${
                      activeTab === tab.id
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#17171706] text-[#171717] hover:bg-[#1717170F]'
                    } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleTabClick(tab.id)}
                    disabled={isAnimating}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Navigation Arrows */}
          <div className="flex gap-4 ml-10">
            {/* Left Arrow */}
            <button
              className={`w-12 h-12 hidden md:flex items-center justify-center rounded-full border-2 transition-all duration-300 shrink-0 ${
                currentPage === 0 || loading
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-900 hover:scale-105'
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 0 || loading}
              aria-label="Previous products"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              className={`w-12 h-12 hidden md:flex items-center justify-center rounded-full border-2 transition-all duration-300 shrink-0 ${
                currentPage >= totalPages - 1 || loading
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-900 hover:scale-105'
              }`}
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1 || loading}
              aria-label="Next products"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Carousel - Horizontal Scroll */}
      <div className="relative">
        {/* Products Container with Horizontal Layout */}
        <div className="relative overflow-hidden">
          {loading || isAnimating ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
              <div className="w-10 h-10 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              {/* If no products found */}
              {products.length === 0 && (
                <div className="text-center md:text-lg text-base md:mt-24 md:mb-0  mb-10 justify-center flex items-center text-[#171717]">
                  <p>No products found in this collection.</p>
                </div>
              )}
              {/* Mobile: Vertical flex column - Show all products */}
              <div className="md:hidden">
                <div className="flex flex-col gap-8 w-full">
                  {products.map((product) => (
                    <div key={product._id} className="w-full">
                      <CoreProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
              <div
                ref={carouselRef}
                className="md:flex gap-6 hidden transition-all duration-500 ease-in-out"
              >
                <AnimatePresence mode="wait" custom={currentPage}>
                  <motion.div
                    key={`${activeTab}-${currentPage}`}
                    className="flex gap-6 w-full"
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    custom={currentPage}
                  >
                    {currentProducts.map((product) => (
                      <div
                        key={product._id}
                        className="shrink-0 w-[280px] md:w-[300px] lg:w-[320px]" // Fixed width for consistent cards
                      >
                        <CoreProductCard product={product} />
                      </div>
                    ))}

                    {/* Fill empty slots for consistent layout */}
                    {Array.from({
                      length: PRODUCTS_PER_PAGE - currentProducts.length,
                    }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="shrink-0 w-[280px] md:w-[300px] lg:w-[320px] invisible"
                      >
                        <div className="w-full h-[400px]"></div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pagination Dots */}
      {/* {totalPages > 1 && !loading && !isAnimating && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-gray-900 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </section>
  );
};

export default BestOfCoreX;
