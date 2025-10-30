const PageIndicator = ({ totalPages, currentPage, onSelect }) => {
  if (totalPages <= 1) return null;
  return (
    <nav
      className=" reviews-page-viewer w-full mt-2 flex gap-2 items-center justify-center flex-row"
      aria-label="Reviews pages"
    >
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(idx)}
          aria-label={`Go to page ${idx + 1}`}
          aria-current={idx === currentPage ? 'page' : undefined}
          className={`flex items-center min-w-4 min-h-4 md:min-w-5 md:min-h-5   aspect-square rounded-full ${
            idx === currentPage
              ? 'bg-[#89949F]'
              : 'bg-[#B4C2CF] cursor-pointer scale-3d hover:scale-[1.1] transition-all duration-150 ease-in-out'
          }`}
        />
      ))}
    </nav>
  );
};

export default PageIndicator;
