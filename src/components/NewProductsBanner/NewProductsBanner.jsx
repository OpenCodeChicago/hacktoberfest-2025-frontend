import { Link } from 'react-router-dom';

export default function FeaturedProductImage({
  productId = '',
  imageUrl = '',
  alt = 'Featured product image',
  placeholder = '/images/test-product-image.jpg',
  className = '',
  onLoad,
  onError,
}) {
  // in-case src is empty during first render, use placeholder so image element always has a src
  const finalSrc = imageUrl || placeholder;

  return (
    <Link
      to={`/product/${productId}`}
      aria-label={`View product ${alt}`}
      className={'group w-full' + className}
    >
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        onLoad={onLoad}
        onError={onError}
        className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-95 cursor-pointer"
      />
    </Link>
  );
}
