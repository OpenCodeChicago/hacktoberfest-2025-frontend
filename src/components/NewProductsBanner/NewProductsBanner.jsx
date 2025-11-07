import { Link } from 'react-router-dom';

export default function FeaturedProductImage({
  productId = '',
  imageUrl = '',
  imageMobileUrl = '',
  alt = 'Featured product image',
  placeholder = '/images/promo-banner.jpg',
  className = '',
  onLoad,
  onError,
}) {
  // in-case src is empty during first render, use placeholder so image element always has a src
  const finalSrc = imageUrl || placeholder;

  return (
    <section>
      <Link
        to={`/products/${productId}`}
        aria-label={`View product ${alt}`}
        className={`group w-full ${className}`}
      >
        <picture>
          {imageMobileUrl && (
            <source srcSet={imageMobileUrl} media="(max-width: 767px)" />
          )}
          <source srcSet={imageUrl} />
          <img
            src={finalSrc}
            alt={alt}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
            className="w-full h-full object-contain cursor-pointer block"
          />
        </picture>
      </Link>
    </section>
  );
}
