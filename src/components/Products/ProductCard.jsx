import { useState, forwardRef, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecentlyViewed } from '../../utils/recentlyViewed';
import { addToWishList, removeFromWishList } from '../../store/wishListSlice';
import { useDispatch } from 'react-redux';
import AddToCartButton from './AddToCartButton';
const HeartIcon = ({
  isWishlisted = false,
  animate = false,
  className = 'h-6 w-6',
}) => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-200 ease-out ${animate ? 'animate-double-pop' : isWishlisted ? 'scale-110' : ''} ${isWishlisted ? 'text-white' : 'text-current'}`}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M8.08268 2.49235L9.00002 3.41744L9.91735 2.49235C10.2918 2.10997 10.7397 1.8046 11.2351 1.59399C11.7304 1.38337 12.2633 1.2717 12.8028 1.26545C13.3424 1.25919 13.8778 1.35849 14.378 1.55757C14.8782 1.75665 15.3333 2.05155 15.7168 2.42515L15.7851 2.49235C17.383 4.10523 17.4043 6.70724 15.8512 8.34742L15.7851 8.41672L9.00002 15.2651L2.216 8.41462C0.594666 6.7797 0.594666 4.12728 2.216 2.4913C2.59625 2.10348 3.05195 1.79504 3.55592 1.58438C4.0599 1.37371 4.60182 1.26514 5.14934 1.26514C5.69687 1.26514 6.23879 1.37371 6.74276 1.58438C7.24674 1.79504 7.70244 2.10453 8.08268 2.49235Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.667}
      strokeLinejoin="round"
    />
  </svg>
);

const ProductCard = forwardRef(
  ({ product, isWishlisted: initialWishlisted = false }, ref) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [selectedFlavor, setSelectedFlavor] = useState(
      product.flavors?.[0] || ''
    );
    const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
    const [animateLike, setAnimateLike] = useState(false);
    const likeTimeoutRef = useRef(null);
    const dispatch = useDispatch();

    const handleProductClick = () => {
      // add to recently viewed list (stored in localStorage) before navigating
      try {
        addRecentlyViewed(product);
      } catch {
        // ignore errors (localStorage not available)
      }

      const productId = product.id || product._id;
      if (productId) {
        navigate(`/products/${encodeURIComponent(productId)}`);
      }
    };

    const formatPrice = (price) => {
      return `$${Number(price || 0).toFixed(2)}`;
    };

    const handleActionClick = (e, action) => {
      e.stopPropagation();
      action();
    };

    const handleWishlistToggle = () => {
      const next = !isWishlisted;
      setIsWishlisted(next);
      // trigger the double-pop animation
      setAnimateLike(true);
      if (likeTimeoutRef.current) clearTimeout(likeTimeoutRef.current);
      likeTimeoutRef.current = setTimeout(() => setAnimateLike(false), 520);
      // Call the toggle wishlist function
      if (isWishlisted) {
        dispatch(removeFromWishList(product));
      } else {
        dispatch(addToWishList(product));
      }
    };

    // Update wishlist state when prop changes
    useEffect(() => {
      setIsWishlisted(initialWishlisted);
    }, [initialWishlisted]);

    useEffect(() => {
      return () => {
        if (likeTimeoutRef.current) clearTimeout(likeTimeoutRef.current);
      };
    }, []);

    if (!product) {
      return null;
    }

    return (
      <div
        ref={ref}
        className="bg-white rounded-2xl p-4 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)] flex flex-col select-none"
      >
        {/* --- IMAGE CONTAINER --- */}
        <div
          className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-gray-100 group cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label={`View details for ${product.name}`}
          onClick={handleProductClick}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && handleProductClick()
          }
        >
          {/* Badges for NEW and SALE */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-md">
                NEW
              </span>
            )}
            {product.onSale && product.salePercentage > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-md">
                -{product.salePercentage}%
              </span>
            )}
          </div>

          {/* State 1: Image is loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* State 2: Image failed to load - render SVG frame fallback */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-400"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="64" height="64" rx="8" fill="#F3F4F6" />
                <path
                  d="M10 44L26 28l12 12 18-22"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* State 3: Image successfully loaded or attempt to load */}
          {!imageError && (product.imageUrl || product.image || true) && (
            <img
              src={
                product.imageUrl ||
                product.image ||
                '/images/product-default-image.jpg'
              }
              alt={product.name || 'Product image'}
              width="512"
              height="512"
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallbackTried) {
                  img.dataset.fallbackTried = '1';
                  img.src = '/images/product-default-image.jpg';
                  return;
                }
                // default failed too -> switch to SVG fallback
                setImageError(true);
              }}
            />
          )}

          {/* "VIEW PRODUCT" Overlay */}
          <div className="absolute inset-0 bg-transparent transition-all duration-300 flex items-center justify-center">
            <button
              onClick={(e) => handleActionClick(e, handleProductClick)}
              className="opacity-0 group-hover:opacity-80 group-focus-within:opacity-80 bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-300 text-md shadow-lg cursor-pointer pointer-events-none group-hover:pointer-events-auto"
            >
              VIEW PRODUCT
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviewCount || 0})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-bold text-lg text-gray-800">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="font-bold text-2xl text-gray-800 leading-tight line-clamp-2">
              {product.name}
            </h3>
          </div>

          <div className="mb-2">
            <p className="text-md text-blue-500">
              {product.flavors && product.flavors.length > 0
                ? `Available in flavours: ${product.flavors.length}`
                : 'No flavors available'}
            </p>
          </div>

          <div className="mb-3">
            {product.flavors && product.flavors.length > 0 && (
              <div className="relative">
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full appearance-none bg-gray-200 border border-gray-300 rounded-lg py-2.5 px-3 pr-8 text-md uppercase text-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                  aria-label="Select flavor"
                >
                  {product.flavors.map((flavor) => (
                    <option key={flavor} value={flavor} className="py-2">
                      {flavor}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <button
              onClick={(e) => handleActionClick(e, handleWishlistToggle)}
              className={`
              flex items-center justify-center px-4 py-3 rounded-l-xl border-2 transition-colors duration-150 hover:shadow-lg cursor-pointer focus:outline-none
              ${isWishlisted ? 'bg-[#023e8a] border-[#023e8a] text-white hover:bg-[#1054ab] hover:border-[#1054ab]' : 'bg-white border-[#023e8a] text-[#023e8a] hover:text-[#1054ab] hover:border-[#1054ab]'}
            `}
              aria-label={
                isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
              }
              aria-pressed={isWishlisted}
            >
              <HeartIcon
                isWishlisted={isWishlisted}
                animate={animateLike}
                className="h-5 w-5"
              />
            </button>

            {/* Add to Cart component */}
            <AddToCartButton
              product={product}
              selectedFlavor={selectedFlavor}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
