import React, { useState, useMemo } from 'react';
import ProductCard from './Products/ProductCard';
import { getRecentlyViewed } from '../utils/recentlyViewed';

// SVG component for the navigation arrows
const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default function GarageSaleRecentlyViewed() {
  const [recentlyViewedItems] = useState(() => {
    const items = getRecentlyViewed();
    // Show all recently viewed items, not just sale items
    return items;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Show 4 items at a time for better layout

  // Memoize navigation state for performance
  const navigationState = useMemo(() => {
    const totalPages = Math.ceil(recentlyViewedItems.length / itemsPerPage);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < recentlyViewedItems.length - itemsPerPage;
    
    return {
      totalPages,
      canGoPrev,
      canGoNext,
      currentPage: Math.floor(currentIndex / itemsPerPage) + 1
    };
  }, [currentIndex, recentlyViewedItems.length, itemsPerPage]);

  const nextSlide = () => {
    const maxStartIndex = Math.max(0, recentlyViewedItems.length - itemsPerPage);
    const newIndex = Math.min(currentIndex + itemsPerPage, maxStartIndex);
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - itemsPerPage, 0);
    setCurrentIndex(newIndex);
  };

  // Don't render if no recently viewed items
  if (!recentlyViewedItems || recentlyViewedItems.length === 0) {
    return null;
  }

  // Get the current visible items
  const visibleItems = recentlyViewedItems.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      {/* Header section with title and navigation arrows */}
      <div className="flex items-center justify-between mb-12">
        <div className="text-center w-full">
          <h2 className="text-4xl lg:text-5xl font-montserrat text-black leading-none uppercase tracking-tight mb-4">
            <span className="font-bold">RECENTLY</span>
            <span className="ml-4 text-[#f7faff] font-bold" style={{ 
              WebkitTextStroke: '2px black',
              color: 'transparent'
            }}>VIEWED</span>
          </h2>
          <p className="text-gray-600 text-lg">Products you've recently explored</p>
        </div>

        {/* Navigation Buttons - Only show if there are more than 4 items */}
        {recentlyViewedItems.length > itemsPerPage && (
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={!navigationState.canGoPrev}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Previous items"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!navigationState.canGoNext}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Next items"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
      
      {/* Recently Viewed Products Grid */}
      <div className="relative">
        {/* Left Arrow - Floating */}
        {recentlyViewedItems.length > itemsPerPage && navigationState.canGoPrev && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-xl hover:shadow-2xl"
            aria-label="Previous items"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
          {visibleItems.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow - Floating */}
        {recentlyViewedItems.length > itemsPerPage && navigationState.canGoNext && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-xl hover:shadow-2xl"
            aria-label="Next items"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {recentlyViewedItems.length > itemsPerPage && (
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: navigationState.totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-blue-600 scale-110 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Item Counter */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Showing {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, recentlyViewedItems.length)} of {recentlyViewedItems.length} items
        </p>
      </div>
    </section>
  );
}
