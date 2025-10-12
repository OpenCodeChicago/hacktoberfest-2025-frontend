import React from 'react';
import { motion } from 'framer-motion'; // need this for motion.div need to updadte linting rules
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductCarousel = ({ productPages, scrollContainerRef }) => {
  if (!productPages || productPages.flat().length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-center text-gray-500">
        No products found in this collection.
      </div>
    );
  }

  // Will show arrow if more than one page
  const showAsGrid = productPages.length > 1;

  return (
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {productPages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className={`w-full flex-shrink-0 snap-start p-1 md:p-2 ${
              showAsGrid
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-6' // sm-lg: 3x2 grid, lg+: 1x6 grid
                : 'flex justify-center gap-6'
            }`}
          >
            {page.map((product, index) => (
              <motion.div
                key={product.id || product._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.05 }}
                // When not a grid (fewer than a page), we need to define the width of each item
                className={!showAsGrid ? 'w-1/2 sm:w-1/3 lg:w-1/6' : ''}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
  );
};

ProductCarousel.propTypes = {
  productPages: PropTypes.arrayOf(PropTypes.array).isRequired,
  scrollContainerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

ProductCarousel.defaultProps = {
  productPages: [],
};

export default ProductCarousel;