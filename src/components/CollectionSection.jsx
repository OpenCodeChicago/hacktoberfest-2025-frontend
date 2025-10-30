import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import preWorkoutImg from '/images/pre-workout.png';
import buildMuscleImg from '/images/build-muscle.png';
import weightManagementImg from '/images/weight-management.png';
import healthWellnessImg from '/images/health-wellness.png';
import './collection.css';

export const collections = [
  { id: 'pre-workout', title: 'PRE-WORKOUT', image: preWorkoutImg },
  { id: 'build-muscle', title: 'BUILD MUSCLE', image: buildMuscleImg },
  {
    id: 'weight-management',
    title: 'WEIGHT MANAGEMENT',
    image: weightManagementImg,
  },
  {
    id: 'health-wellness',
    title: 'HEALTH & WELLNESS SUPPLEMENTS',
    image: healthWellnessImg,
  },
];

const CollectionSection = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('collection-card-visible');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Capture the current ref value
    const currentCards = cardsRef.current;

    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      // Use the captured value in cleanup
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
      observer.disconnect();
    };
  }, []);

  const handleCardClick = (collection) => {
    navigate(`/collections/${encodeURIComponent(collection.id)}`, {
      state: { imageUrl: collection.image },
    });
  };

  return (
    <section className="shop-by-collection">
      <h2 className="section-title mb-12">
        <span className="text-[#000]">SHOP </span>
        <span className="stroke-title">BY </span>
        <span className="text-[#000]">COLLECTION</span>
      </h2>

      <div className="collection-grid">
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="collection-card"
            onClick={() => handleCardClick(collection)}
          >
            <div className="collection-image-wrapper">
              <img
                src={collection.image}
                alt={collection.title}
                className="collection-image"
              />
            </div>
            <div className="collection-content">
              <h3 className="collection-title">{collection.title}</h3>
              <svg
                className="collection-arrow"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
