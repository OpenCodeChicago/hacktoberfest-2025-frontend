import { useState, useMemo, useRef, useEffect } from 'react';

/**
 * A simple debounce function.
 * @param {Function} func The function to debounce.
 * @param {number} wait The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * A custom hook to manage the state and logic for a paginated product carousel.
 * @param {{products: any[], productsPerPage: number}} config - The configuration object.
 * @param {any[]} config.products - The array of products to display.
 * @param {number} [config.productsPerPage=6] - The number of products per page on desktop.
 * @returns {{
 *  scrollContainerRef: React.RefObject<HTMLDivElement>,
 *  currentPage: number,
 *  productPages: Array<any[]>,
 *  scroll: (direction: -1 | 1) => void,
 *  showArrows: boolean
 * }} An object containing carousel state and control functions.
 */
export const useProductCarousel = ({ products, productsPerPage = 6 }) => {
  const scrollContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [responsiveProductsPerPage, setResponsiveProductsPerPage] = useState(productsPerPage);

  // Handle responsive products per page
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(
      debounce((entries) => {
        const { width } = entries[0].contentRect;
        setResponsiveProductsPerPage(width < 640 ? 1 : productsPerPage);
      }, 150)
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [productsPerPage]);

  // Memoize the pages based on products and responsive page size
  const productPages = useMemo(() => {
    if (!products) return [];
    const pages = [];
    for (let i = 0; i < products.length; i += responsiveProductsPerPage) {
      pages.push(products.slice(i, i + responsiveProductsPerPage));
    }
    return pages;
  }, [products, responsiveProductsPerPage]);

  // Reset to the first page when the underlying products change
  useEffect(() => {
    setCurrentPage(0);
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [products]);

  // Sync current page state with manual scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return; // Exit if the ref is not attached yet.

    const handleScroll = debounce(() => {
      if (container) {
        const pageIndex = Math.round(
          container.scrollLeft / container.clientWidth
        );
        setCurrentPage(pageIndex);
      }
    }, 100);

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only once.

  // Scroll function for arrow navigation
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const newPage = currentPage + direction;
      if (newPage >= 0 && newPage < productPages.length) {
        setCurrentPage(newPage);
        container.scrollTo({
          left: newPage * container.clientWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const showArrows = productPages.length > 1;

  return { scrollContainerRef, currentPage, productPages, scroll, showArrows };
};