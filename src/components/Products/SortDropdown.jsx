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

  // Handle clicks outside to close the dropdown. Do NOT close on scroll — UX requires it remain open until user closes.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSortSelect = (option) => {
    onSortChange(option.field, option.order);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative flex items-center gap-2 sm:gap-4 ${className}`}>
      <div className="flex-shrink-0">
        <span className="font-semibold text-lg text-gray-800">Sort by:</span>
        <div className="absolute left-0 w-12 h-0.5 bg-gray-800" />
      </div>

      <div className="flex-1 sm:flex-initial">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-[240px] flex items-center justify-between gap-2 bg-transparent text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="truncate text-left">{currentSort.label}</span>
          <svg className="w-4 h-4 ml-2 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`absolute top-0 left-0 right-0 z-20 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
            {/* Header with title and X close button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-800 uppercase">Sort by</div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close sort menu"
                className="text-gray-500 hover:text-gray-800 focus:outline-none ml-2 cursor-pointer border rounded-full p-1"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="py-2">
              {SORT_OPTIONS.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSortSelect(option)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors ${
                    option.field === sortBy && option.order === sortOrder
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700'
                  } cursor-pointer`}
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
      </div>
    </div>
  );

}
