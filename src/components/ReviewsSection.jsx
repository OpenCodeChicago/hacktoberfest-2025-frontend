import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReviewCard from './Reviews/ReviewCard';
import PageIndicator from './Reviews/PageIndicator';
import reviews from '../data/reviewsData.json';

const ReviewsSection = () => {
  const pageSize = 4;
  const totalPages = Math.ceil(reviews.length / pageSize);
  const [currentPage, setCurrentPage] = useState(0);

  const startIdx = currentPage * pageSize;
  const visibleReviews = reviews.slice(startIdx, startIdx + pageSize);

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  const goToPage = (idx) => setCurrentPage(idx);

  // Determine slide direction for animations
  const prevPageRef = useRef(0);
  const direction = currentPage >= prevPageRef.current ? 1 : -1;
  useEffect(() => {
    prevPageRef.current = currentPage;
  }, [currentPage]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    }),
  };

  return (
    <section
      className="reviews-section p-[0 16px] place-self-center md:p-[0 85px] lg:p-[0 80px] flex flex-col gap-[64px] pb-24"
      aria-labelledby="reviews"
    >
      <h2
        id="reviews"
        className=" text-[32px] lg:text-[48px] uppercase section-title  px-5 md:px-0 align-center"
      >
        <span className="text-[#000]">THOUSANDS</span>
        <span className="stroke-title">{'  '} LOVE</span>
        <span className="capitalize text-[#000]"> Core</span>
        <span className="text-red-500">X</span>
        <span className="text-[#000]"> Nutrition</span>
      </h2>

      <div className="carousel-container items-center flex flex-col gap-6">
        <nav
          className="flex flex-row gap-2 w-[80%] items-center justify-end mr-[-6px]"
          aria-label="Reviews carousel controls"
        >
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous reviews page"
            className={`cursor-pointer rounded disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.1] active:scale-100 transition-all duration-150 ease-in-out`}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next reviews page"
            className={`cursor-pointer rounded disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.1] active:scale-100 transition-all duration-150 ease-in-out`}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </nav>

        <div className="w-[80%] place-self-center flex justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <Motion.ul
              key={currentPage}
              className="reviews-carousel grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4   gap-4 justify-center"
              role="list"
              aria-live="polite"
              aria-label={`Showing reviews ${startIdx + 1}-${Math.min(
                startIdx + pageSize,
                reviews.length
              )} of ${reviews.length}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {visibleReviews.map((review, index) => (
                <ReviewCard
                  key={startIdx + index}
                  product={review.product}
                  comment={review.comment}
                  name={review.name}
                  rating={review.rating}
                />
              ))}
            </Motion.ul>
          </AnimatePresence>
        </div>
        <PageIndicator
          totalPages={totalPages}
          currentPage={currentPage}
          onSelect={goToPage}
        />
      </div>
    </section>
  );
};

export default ReviewsSection;
