import { useState, useRef, useEffect } from 'react';

const SORT_OPTIONS = [
  { label: 'Featured', field: 'featured', order: 'desc' },
  { label: 'A - Z', field: 'title', order: 'asc' },
  { label: 'Z - A', field: 'title', order: 'desc' },
  { label: 'Price - Low to High', field: 'price', order: 'asc' },
  { label: 'Price - High to Low', field: 'price', order: 'desc' },
  { label: 'Rating - Low to High', field: 'rating', order: 'asc' },
  { label: 'Rating - High to Low', field: 'rating', order: 'desc' },
];

export default function SortDropdown({ sortBy = 'featured', sortOrder = 'desc', onSortChange = () => {}, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentSort = SORT_OPTIONS.find(
    option => option.field === sortBy && option.order === sortOrder
  ) || SORT_OPTIONS[0];

  // This hook now handles clicks outside AND page scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // A simple function to close the dropdown
    const handleScroll = () => {
      setIsOpen(false);
    };

    // Add event listeners only when the dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true); // Added scroll listener
    }

    // Cleanup: remove both event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true); // Removed scroll listener
    };
  }, [isOpen]);

  const handleSortSelect = (option) => {
    onSortChange(option.field, option.order);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-4 ${className}`}>
      <div className="relative flex-shrink-0">
        <span className="font-semibold text-lg text-gray-800">Sort by:</span>
        <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gray-800" />
      </div>

      <div className="relative flex-1 sm:flex-initial" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-[240px] flex items-center justify-between gap-2 bg-transparent text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="truncate text-left">{currentSort.label}</span>
          <svg className="w-4 h-4 ml-2 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 z-50 w-full sm:w-64 mt-2 origin-top-left sm:origin-top-right bg-white border border-gray-200 rounded-lg shadow-xl">
            <div className="py-2">
              {SORT_OPTIONS.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSortSelect(option)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors ${
                    option.field === sortBy && option.order === sortOrder
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700'
                  }`}
                  role="menuitem"
                >
                  <span>{option.label}</span>
                  {option.field === sortBy && option.order === sortOrder && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}