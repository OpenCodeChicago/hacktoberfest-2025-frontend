import { Link } from 'react-router-dom';

export default function NewProductsBanner({
  productId = '',
  imageUrl = '',
  imageMobileUrl = '',
  alt = 'Featured product image',
  placeholder = '/images/promo-banner.jpg',
  className = '',
  onLoad,
  onError,
}) {
  // Fall back to placeholder so the image element always has a src on first render
  const finalSrc = imageUrl || placeholder;

  return (
    <section aria-label={alt}>
      <Link to={`/products/${productId}`} className={`w-full ${className}`}>
        <picture>
          {imageMobileUrl && (
            <source srcSet={imageMobileUrl} media="(max-width: 767px)" />
          )}
          <img
            src={finalSrc}
            alt={alt}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
            className="w-full h-full object-contain block"
          />
        </picture>
      </Link>
    </section>
  );
}
