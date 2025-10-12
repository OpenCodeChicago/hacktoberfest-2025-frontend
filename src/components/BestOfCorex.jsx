import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductCarousel } from '../hooks/useProductCarousel';
import ProductSkeleton from './Products/ProductSkeleton';
import ProductCarousel from './Products/ProductCarousel';
import { useBestOfCoreX } from '../hooks/useBestOfCoreX';

const BestOfCoreX = () => {
  const {
    collections,
    activeTab,
    setActiveTab,
    products,
    loading,
    error,
    allCollectionsData
  } = useBestOfCoreX();

  // Use the custom hook to manage all carousel state and logic
  const { scrollContainerRef, currentPage, productPages, scroll, showArrows } =
    useProductCarousel({ products, productsPerPage: 6 });

  return (
    <section className="px-4 sm:px-8 py-12 font-sans">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-4">
          <h2
            id="why-choose"
            className="text-4xl lg:text-heading-xxl font-montserrat text-black leading-none uppercase py-16 section-title"
          >
            <span className="text-[#000]">BEST </span>
            <span>OF</span>
            <span className="capitalize text-[#000]"> Core</span>
            <span className="text-red-500">X</span>
            <span className="text-[#000]"> NUTRITION</span>
          </h2>
        </div>

        {/* Tab Navigation & Carousel Arrows */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
          {/* Tab Buttons */}
          {collections.map(([name]) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeTab === name
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {name}
            </button>
          ))}

          {/* Carousel Arrows */}
          {showArrows && !loading && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                disabled={currentPage === 0}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:hover:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={currentPage >= productPages.length - 1}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:hover:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}


        {/* Product Carousel */}
        {!loading && allCollectionsData && (
          <ProductCarousel
            productPages={productPages}
            scrollContainerRef={scrollContainerRef}
          />
        )}
      </div>
    </section>
  );
};

export default BestOfCoreX;
