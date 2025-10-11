import { useState } from 'react';
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

export default function RecentlyViewed() {
  const [items] = useState(() => getRecentlyViewed());
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    const maxStartIndex = Math.max(0, items.length - itemsPerPage);
    const newIndex = Math.min(currentIndex + itemsPerPage, maxStartIndex);
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - itemsPerPage, 0);
    setCurrentIndex(newIndex);
  };

  if (!items || items.length === 0) {
    return null;
  }

  const canGoNext = currentIndex < items.length - itemsPerPage;
  const canGoPrev = currentIndex > 0;

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
      {/* Header section with title and navigation arrows */}
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
        <h2 className="section-title text-center w-full sm:w-auto mb-0">
          <span className="text-[#000]">RECENTLY </span>
          <span className="text-[#f7faff]">VIEWED</span>
        </h2>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Recently Viewed Products: grid on desktop, horizontal scroll on mobile */}
      <div className="transition-all duration-500 ease-in-out">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((product) => (
            <div key={product.id} className="opacity-100">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
