import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collections } from './collectionsData';
import './collection.css';

const CollectionSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = Array.from(
      sectionRef.current?.querySelectorAll('.collection-card') ?? []
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const index = parseInt(el.dataset.index, 10) || 0;
            setTimeout(() => {
              el.classList.add('collection-card-visible');
            }, index * 150);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="shop-by-collection" ref={sectionRef}>
      <h2 className="section-title text-[32px] lg:text-[48px]">
        <span className="text-[#000]">SHOP </span>
        <span className="stroke-title">BY </span>
        <span className="text-[#000]">COLLECTION</span>
      </h2>

      <div className="collection-grid">
        {collections.map((collection, index) => (
          <Link
            key={collection.id}
            to={`/collections/${encodeURIComponent(collection.id)}`}
            state={{ imageUrl: collection.image }}
            className="collection-card"
            data-index={index}
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
                aria-hidden="true"
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
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
