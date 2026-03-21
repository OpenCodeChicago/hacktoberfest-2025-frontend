import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './SupplementForGoalsSection.css';
import { goalCards } from './goalCards';
import GoalCard from './GoalCard/GoalCard';

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
      className="px-5 md:px-0  flex flex-col gap-16"
      aria-labelledby="goals-heading"
    >
      <h2
        id="goals-heading"
        className="section-title text-[32px] lg:text-[48px]"
      >
        <span className="text-[#000]">Supplements for </span>
        <span className="text-[#f7faff] stroke-title">every</span>{' '}
        <span className="text-[#000]">goal</span>
      </h2>

      <div className="space-y-10 md:py-0 md:px-32">
        <div className="flex justify-center flex-col md:flex-row gap-10">
          {goalCards.slice(0, 2).map((goalCard, index) => (
            <GoalCard
              key={goalCard.id}
              item={goalCard}
              delayIndex={index}
              size="large"
            />
          ))}
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-[26px]">
          {goalCards.slice(2, 5).map((goalCard, index) => (
            <GoalCard
              key={goalCard.id}
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
