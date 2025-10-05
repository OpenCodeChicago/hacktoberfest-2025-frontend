import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeartIcon = ({ isWishlisted }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-6 w-6 transition-colors duration-300 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProductCard = forwardRef(({ product }, ref) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || '');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const formatPrice = (price) => {
    return `$${Number(price || 0).toFixed(2)}`;
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  const handleAddToCart = () => {
    console.log(`Added ${product.name} (${selectedFlavor}) to cart.`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    console.log(`Product ${product.name} wishlisted: ${!isWishlisted}`);
  };

  if (!product) {
    return null;
  }

  return (
    <div 
      ref={ref}
      className="group bg-white rounded-2xl p-4 transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)] flex flex-col"
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleProductClick()}
      aria-label={`View details for ${product.name}`}
    >
      {/* --- IMAGE CONTAINER --- */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-gray-100">
        
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
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* State 2: Image failed to load */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* State 3: Image successfully loaded */}
        <img
          src={product.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTI1SDEzNVYxMzVIMTI1VjEyNVpNMTM1IDEyNUgxNDVWMTM1SDEzNVYxMjVaTTE0NSAxMjVIMTU1VjEzNUgxNDVWMTI1Wk0xNTUgMTI1SDE2NVYxMzVIMTU1VjEyNVpNMTY1IDEyNUgxNzVWMTM1SDE2NVYxMjVaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzUgMTQ1SDE0NVYxNTVIMTM1VjE0NVpNMTQ1IDE0NUgxNTVWMTU1SDE0NVYxNDVaTTE1NSAxNDVIMTY1VjE1NUgxNTVWMTQ1WiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4K'}
          alt={product.name}
          className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageLoaded(true);
            setImageError(true);
          }}
          loading="lazy"
        />

        {/* "VIEW PRODUCT" Overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => handleActionClick(e, handleProductClick)}
            className="opacity-0 group-hover:opacity-100 bg-blue-800 text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm shadow-lg"
          >
            VIEW PRODUCT
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="font-bold text-lg text-gray-800">{formatPrice(product.price)}</span>
          </div>
        </div>
        
        <div className="min-h-[40px] mb-2">
          <h3 className="font-semibold text-base text-gray-800 leading-tight line-clamp-2">{product.name}</h3>
        </div>

        <div className="min-h-[40px] mb-2">
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>

        <div className="min-h-[48px] mb-4">
          {product.flavors && product.flavors.length > 0 && (
            <div className="relative">
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2.5 px-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                aria-label="Select flavor"
              >
                {product.flavors.map((flavor) => (
                  <option key={flavor} value={flavor} className="py-2">
                    {flavor}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          <button 
            onClick={(e) => handleActionClick(e, handleWishlistToggle)}
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <HeartIcon isWishlisted={isWishlisted} />
          </button>
          <button 
            onClick={(e) => handleActionClick(e, handleAddToCart)}
            className="flex-grow flex items-center justify-center gap-2 bg-blue-800 text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-900 transition-colors"
          >
            <CartIcon />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;