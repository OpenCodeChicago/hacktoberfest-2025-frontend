// Windowed page indicator (iOS-style): never renders more than `maxVisible`
// dots. When there are more positions than fit, the dots at the edge that has
// hidden positions shrink progressively to hint that more content exists.
const PageIndicator = ({ totalPages, currentPage, onSelect, maxVisible = 5 }) => {
  if (totalPages <= 1) return null;

  const windowSize = Math.min(maxVisible, totalPages);
  // Center the active dot in the window, clamped to the valid range.
  const start = Math.max(
    0,
    Math.min(currentPage - Math.floor(windowSize / 2), totalPages - windowSize)
  );

  const hasMoreBefore = start > 0;
  const hasMoreAfter = start + windowSize < totalPages;

  const getSize = (pos) => {
    const isFirst = pos === 0;
    const isLast = pos === windowSize - 1;
    if ((isFirst && hasMoreBefore) || (isLast && hasMoreAfter)) return 'w-1.5 h-1.5';
    if ((pos === 1 && hasMoreBefore) || (pos === windowSize - 2 && hasMoreAfter))
      return 'w-2 h-2';
    return 'w-2.5 h-2.5';
  };

  return (
    <nav
      className="reviews-page-viewer mt-2 flex flex-row items-center justify-center gap-2"
      aria-label="Reviews pages"
    >
      {Array.from({ length: windowSize }, (_, pos) => {
        const idx = start + pos;
        const isActive = idx === currentPage;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(idx)}
            aria-label={`Go to review ${idx + 1}`}
            aria-current={isActive ? 'true' : undefined}
            className={`aspect-square rounded-full transition-all duration-200 ease-in-out ${getSize(
              pos
            )} ${
              isActive
                ? 'bg-[#89949F]'
                : 'bg-[#B4C2CF] cursor-pointer hover:scale-125'
            }`}
          />
        );
      })}
    </nav>
  );
};

export default PageIndicator;
