import { renderStars } from '../common/ReviewStars';

const ReviewCard = ({ product, comment, name, rating, interactive = true }) => {
  return (
    <article
      className={`review-card relative flex h-full w-full max-w-full flex-col items-center justify-center gap-6 rounded-lg border border-[#DDDDDD] bg-white p-6 shadow-md ${
        interactive
          ? 'cursor-default transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl'
          : 'pointer-events-none'
      }`}
    >
      <img
        src="/icons/material-icon-theme_verified.svg"
        alt="Verified review"
        className="verified-badge absolute top-[-10px] right-[-12px]"
      />
      <h3 className="review-title text-lg font-bold text-[#0D1B2A]">{product}</h3>
      <p className="review-comment min-h-[calc(1.5em*3)] text-center text-sm line-clamp-3 text-[#333333]">
        {comment}
      </p>
      <p className="review-name text-lg font-bold text-[#0D1B2A]">{name}</p>
      <div className="flex gap-1">{renderStars(rating)}</div>
    </article>
  );
};

export default ReviewCard;
