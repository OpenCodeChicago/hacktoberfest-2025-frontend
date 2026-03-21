export default function GoalCard({ item, delayIndex = 0, size }) {
  const labelId = `goal-label-${item.id}`;
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
      alt=""
      loading="lazy"
      decoding="async"
      width={dimensions.width}
      height={dimensions.height}
      className={`w-full ${dimensions.minClass} object-contain bg-white transition-opacity duration-300`}
    />
  );
}
