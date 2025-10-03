import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import preWorkoutImg from '../../public/images/pre-workout.png';
import buildMuscleImg from '../../public/images/build-muscle.png';
import weightManagementImg from '../../public/images/weight-management.png';
import healthWellnessImg from '../../public/images/health-wellness.png';
import './collection.css';

const collections = [
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

  const handleCardClick = () => {
    navigate('/collections');
  };

  return (
    <section className="shop-by-collection">
      <h2 className="collection-heading">
        <span className="heading-shop">SHOP</span>{' '}
        <span className="heading-by">BY</span>{' '}
        <span className="heading-collection">COLLECTION</span>
      </h2>

      <div className="collection-grid">
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="collection-card"
            onClick={handleCardClick}
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
