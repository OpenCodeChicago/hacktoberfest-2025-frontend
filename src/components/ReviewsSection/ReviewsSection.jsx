import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

/**
 * CoreX Nutrition - Reviews Section Component
 * A responsive testimonials section showcasing customer reviews.
 */

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '' }) => (
  <div className={`absolute -top-3 -right-3 bg-green-500 rounded-full p-2 shadow-md ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'p-2 rounded-full hover:bg-gray-200 transition-colors',
    ghost: 'p-2 rounded-full hover:bg-gray-100 transition-colors'
  };
  
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex gap-1 justify-center" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-300 text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <article className="relative">
    <Card className="p-6 h-full flex flex-col">
      <Badge>
        <BadgeCheck className="w-6 h-6 text-white" aria-label="Verified purchase" />
      </Badge>

      <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
        {review.product}
      </h3>

      <p className="text-gray-700 text-sm leading-relaxed mb-6 text-center flex-grow">
        {review.comment}
      </p>

      <div className="mt-auto">
        <p className="font-bold text-center text-gray-900 mb-3">
          {review.customerName}
        </p>
        <StarRating rating={review.rating} />
      </div>
    </Card>
  </article>
);

const PaginationDots = ({ total, current, onChange }) => (
  <div className="flex justify-center gap-2" role="tablist" aria-label="Review pages">
    {[...Array(total)].map((_, index) => (
      <button
        key={index}
        onClick={() => onChange(index)}
        className={`w-3 h-3 rounded-full transition-colors ${
          index === current ? 'bg-gray-400' : 'bg-gray-300'
        }`}
        role="tab"
        aria-label={`Go to review set ${index + 1}`}
        aria-selected={index === current}
      />
    ))}
  </div>
);

// Mock Reviews Data
const MOCK_REVIEWS = [
  {
    id: 1,
    product: "REVIVE",
    comment: "After heavy leg day, this is a lifesaver. I'm way less sore the next morning.",
    customerName: "Mark S.",
    rating: 5
  },
  {
    id: 2,
    product: "PULSE",
    comment: "Best pump I've had. My arms looked like balloons after chest day.",
    customerName: "Alex S.",
    rating: 5
  },
  {
    id: 3,
    product: "NOVA WHEY",
    comment: "Leaner gains, faster recovery, and no bloat. Exactly what I wanted.",
    customerName: "Viktor T.",
    rating: 5
  },
  {
    id: 4,
    product: "ZEN MODE",
    comment: "Solid sleep supplement. Helps me wind down, but I wish capsules were smaller.",
    customerName: "Bob K.",
    rating: 5
  },
  {
    id: 5,
    product: "BURN",
    comment: "Down 8 lbs in 3 weeks. Clean energy, no jitters. Perfect for cutting season.",
    customerName: "Lisa M.",
    rating: 5
  },
  {
    id: 6,
    product: "CREATINE PURE",
    comment: "Strength gains are real. Hit a new PR on bench after just 2 weeks.",
    customerName: "Tom H.",
    rating: 4
  },
  {
    id: 7,
    product: "HYDRATE",
    comment: "Game changer for my endurance. No more cramping during long runs.",
    customerName: "Sarah P.",
    rating: 5
  },
  {
    id: 8,
    product: "GREENS+",
    comment: "Easy way to get my veggies in. Tastes surprisingly good mixed with juice.",
    customerName: "Chris D.",
    rating: 4
  }
];

// Main Component
const ReviewsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const REVIEWS_PER_PAGE = 4;
  const reviews = MOCK_REVIEWS;
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  
  const currentReviews = reviews.slice(
    currentPage * REVIEWS_PER_PAGE,
    (currentPage + 1) * REVIEWS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-16 px-4 bg-gray-100" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="reviews-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16">
          THOUSANDS{' '}
          <span className="inline-block" style={{
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '2px black',
            paintOrder: 'stroke fill'
          }}>
            LOVE
          </span>{' '}
          <span className="inline-block">
            Core<span className="text-red-600">X</span>
          </span>{' '}
          NUTRITION
        </h2>

        <div className="flex justify-end mb-6 gap-2">
          <Button 
            onClick={handlePrevious}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" aria-hidden="true" />
          </Button>
          <Button 
            onClick={handleNext}
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <PaginationDots 
          total={totalPages} 
          current={currentPage} 
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ReviewsSection;