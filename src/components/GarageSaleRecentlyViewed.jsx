import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductCard from './Products/ProductCard';
import { getRecentlyViewed } from '../utils/recentlyViewed';

export default function GarageSaleRecentlyViewed() {
  const [recentlyViewedItems] = useState(() => {
    const items = getRecentlyViewed();
    // Filter to only show products that are currently on sale (sale > 0)
    return items.filter(product => {
      const hasSalePrice = product.originalPrice && product.originalPrice > product.price;
      return product.sale > 0 || hasSalePrice;
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

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

  // Don't render if no recently viewed sale items
  if (!recentlyViewedItems || recentlyViewedItems.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      {/* Header section with title and navigation arrows */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl lg:text-heading-xxl font-montserrat text-black leading-none uppercase tracking-tight py-6">
          <span className="font-bold">RECENTLY</span>
          <span className="ml-5 text-[#f7faff] font-bold" style={{ 
            WebkitTextStroke: '2px black',
            color: 'transparent'
          }}>VIEWED</span>
        </h2>

        {/* Navigation Buttons - Only show if there are more than 5 items */}
        {recentlyViewedItems.length > itemsPerPage && (
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={!navigationState.canGoPrev}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              aria-label="Previous 5 items"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!navigationState.canGoNext}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              aria-label="Next 5 items"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
      
      {/* Recently Viewed Products Slider */}
      <div className="relative">
        {/* Left Arrow */}
        {recentlyViewedItems.length > itemsPerPage && navigationState.canGoPrev && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            aria-label="Previous 5 items"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}

        {/* Slider Container */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              width: `${(recentlyViewedItems.length / itemsPerPage) * 100}%`
            }}
          >
            {recentlyViewedItems.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 min-w-0"
                style={{ width: `${100 / recentlyViewedItems.length}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {recentlyViewedItems.length > itemsPerPage && navigationState.canGoNext && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            aria-label="Next 5 items"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {recentlyViewedItems.length > itemsPerPage && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: navigationState.totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-gray-800 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
