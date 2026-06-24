import { useEffect, useRef, useState } from 'react';
import { motion as Motion, useMotionValue, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import ReviewCard from './ReviewCard';
import PageIndicator from './PageIndicator';
import reviews from './reviewsData.json';

// How many cards are visible at once, per breakpoint.
const getVisibleCount = (width) => {
  if (width >= 1024) return 4; // lg
  if (width >= 768) return 2; // md
  return 1; // mobile
};

const slide = { type: 'tween', duration: 0.4, ease: 'easeInOut' };

const ReviewsSection = () => {
  const [visibleCount, setVisibleCount] = useState(() =>
    getVisibleCount(typeof window === 'undefined' ? 1024 : window.innerWidth)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Measured pixel width of the viewport, used for swipe math + the track shift.
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  // The track's horizontal offset is driven imperatively so that dragging and
  // programmatic snapping share a single source of truth (avoids the framer
  // "stuck after a sub-threshold drag" issue).
  const x = useMotionValue(0);

  const total = reviews.length;
  // Furthest index we can scroll to while keeping the track full.
  const maxIndex = Math.max(0, total - visibleCount);
  const cardWidth = viewportWidth / visibleCount;

  // Track viewport width + visibleCount on mount and on resize.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const update = () => {
      setViewportWidth(el.clientWidth);
      setVisibleCount(getVisibleCount(window.innerWidth));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Clamp the active index whenever the bounds shrink (e.g. on resize).
  useEffect(() => {
    setCurrentIndex((idx) => Math.min(idx, maxIndex));
  }, [maxIndex]);

  // Snap the track to the active card whenever index or card size changes.
  useEffect(() => {
    const controls = animate(x, -currentIndex * cardWidth, slide);
    return controls.stop;
  }, [currentIndex, cardWidth, x]);

  const goToIndex = (idx) =>
    setCurrentIndex(Math.min(Math.max(0, idx), maxIndex));
  const handlePrev = () => goToIndex(currentIndex - 1);
  const handleNext = () => goToIndex(currentIndex + 1);

  // Snap to the nearest card based on drag distance + flick velocity.
  const handleDragEnd = (_event, info) => {
    if (!cardWidth) return;
    const projected = info.offset.x + info.velocity.x * 0.2;
    let steps = Math.round(-projected / cardWidth);
    if (steps === 0 && Math.abs(projected) > cardWidth * 0.25) {
      steps = projected < 0 ? 1 : -1;
    }
    const target = Math.min(Math.max(currentIndex + steps, 0), maxIndex);
    if (target === currentIndex) {
      // Index unchanged → the snap effect won't fire, so re-center here.
      animate(x, -currentIndex * cardWidth, slide);
    } else {
      setCurrentIndex(target);
    }
  };

  const atStart = currentIndex === 0;
  const atEnd = currentIndex >= maxIndex;
  const firstVisible = currentIndex + 1;
  const lastVisible = Math.min(currentIndex + visibleCount, total);

  return (
    <section
      className="reviews-section w-full max-w-7xl mx-auto flex flex-col gap-[64px] px-4 md:px-[85px] lg:px-20 pb-24"
      aria-labelledby="reviews"
    >
      <h2
        id="reviews"
        className="text-[32px] lg:text-[48px] uppercase section-title px-5 md:px-0 text-center"
      >
        <span className="text-black">THOUSANDS</span>
        <span className="stroke-title">{'  '} LOVE</span>
        <span className="capitalize text-black"> Core</span>
        <span className="text-red-500">X</span>
        <span className="text-black"> Nutrition</span>
      </h2>

      <div
        className="carousel-container flex flex-col items-center gap-6"
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
      >
        {/* Arrows are desktop-only; mobile navigates by swiping. */}
        <nav
          className="hidden md:flex flex-row gap-2 w-full items-center justify-end"
          aria-label="Reviews carousel controls"
        >
          <button
            type="button"
            onClick={handlePrev}
            disabled={atStart}
            aria-label="Previous review"
            className="cursor-pointer rounded disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 active:scale-100 transition-transform duration-150 ease-in-out"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={atEnd}
            aria-label="Next review"
            className="cursor-pointer rounded disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 active:scale-100 transition-transform duration-150 ease-in-out"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </nav>

        {/* Viewport clips the track horizontally; vertical padding leaves room
            for the verified badge and the card hover-scale. */}
        <div ref={viewportRef} className="w-full overflow-hidden py-6">
          <Motion.ul
            className="flex list-none p-0 m-0 cursor-grab active:cursor-grabbing select-none"
            role="list"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -(maxIndex * cardWidth), right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {reviews.map((review, index) => {
              const isVisible =
                index >= currentIndex && index < currentIndex + visibleCount;
              return (
                <li
                  key={`${review.name}-${index}`}
                  className="shrink-0 px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                  aria-hidden={!isVisible}
                >
                  <ReviewCard
                    product={review.product}
                    comment={review.comment}
                    name={review.name}
                    rating={review.rating}
                    interactive={isVisible}
                  />
                </li>
              );
            })}
          </Motion.ul>
        </div>

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Showing reviews {firstVisible} to {lastVisible} of {total}
        </span>

        <PageIndicator
          totalPages={maxIndex + 1}
          currentPage={currentIndex}
          onSelect={goToIndex}
          maxVisible={5}
        />
      </div>
    </section>
  );
};

export default ReviewsSection;
