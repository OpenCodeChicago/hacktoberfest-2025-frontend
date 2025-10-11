import { useRef } from 'react';
import {
  aminoAcids,
  intraWorkout,
  preWorkout,
  proteinPowder,
  weightManagement,
} from '../assets';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './SupplementForGoalsSection.css';

const goalCards = [
  {
    label: 'protein powder',
    image: proteinPowder,
    href: '/collections/protein-powder',
  },
  { label: 'pre-workout', image: preWorkout, href: '/collections/pre-workout' },
  {
    label: 'intra-workout',
    image: intraWorkout,
    href: '/collections/intra-workout',
  },
  { label: 'amino acids', image: aminoAcids, href: '/collections/amino-acids' },
  {
    label: 'weight management',
    image: weightManagement,
    href: '/collections/weight-management',
  },
];

export default function SupplementForGoalsSection() {
  const goalsRef = useRef(null);

  useIntersectionObserver({
    ref: goalsRef,
    selector: '.card-reveal',
    className: 'animate-fadeInUp',
    threshold: 0.12,
  });

  return (
    <section
      id="goals"
      ref={goalsRef}
      className="px-10 py-24 flex flex-col gap-16"
      aria-labelledby="goals-heading"
    >
      <h2 id="goals-heading" className="section-title">
        <span className="text-[#000]">Supplements for </span>
        <span className="text-[#f7faff]">every</span>{' '}
        <span className="text-[#000]">goal</span>
      </h2>

      <div className="space-y-10">
        <div className="flex justify-center flex-col md:flex-row gap-10">
          {goalCards.slice(0, 2).map((goalCard, index) => (
            <GoalCard
              key={goalCard.label}
              item={goalCard}
              delayIndex={index}
              size="large"
            />
          ))}
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-[26px]">
          {goalCards.slice(2, 5).map((goalCard, index) => (
            <GoalCard
              key={goalCard.label}
              item={goalCard}
              delayIndex={index + 2}
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalCard({ item, delayIndex = 0, size }) {
  const labelId = `goal-label-${delayIndex}`;
  const dimensions =
    size === 'large'
      ? {
          width: 600,
          height: 342,
          minClass: 'min-h-[200px] md:min-h-[224px] lg:min-h-[280px]',
        }
      : {
          width: 436,
          height: 220,
          minClass: 'min-h-[140px] md:min-h-[160px] lg:min-h-[200px]',
        };

  return (
    <a
      href={item.href}
      className="block card-reveal card-elevate"
      style={{ animationDelay: `${delayIndex * 120}ms` }}
      aria-labelledby={labelId}
      role="group"
    >
      <div className="relative overflow-hidden rounded card-inner">
        <GoalCardImage item={item} dimensions={dimensions} />

        <div className="absolute bottom-3 left-3">
          <span id={labelId} className="supplement-goal-label">
            {item.label}
          </span>
        </div>
      </div>
    </a>
  );
}

function GoalCardImage({ item, dimensions }) {
  return (
    <img
      src={item.image}
      alt={item.label}
      loading="lazy"
      decoding="async"
      width={dimensions.width}
      height={dimensions.height}
      className={`w-full ${dimensions.minClass} object-contain bg-white transition-opacity duration-300`}
    />
  );
}
