import { Heart } from 'lucide-react';

const WishListProductCard = ({ product, RemoveFromWishList }) => {
  if (!product) return null;
  const { name, price, imageUrl, salePercentage, flavor } = product;
  const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
  return (
    <div className="w-full max-w-lg p-4 flex ">
      {/* Left side container for image and product info */}
      <div className="flex ">
        {/* Product Image */}
        <img
          src={
            imageUrl ||
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTI1SDEzNVYxMzVIMTI1VjEyNVpNMTM1IDEyNUgxNDVWMTM1SDEzNVYxMjVaTTE0NSAxMjVIMTU1VjEzNUgxNDVWMTI1Wk0xNTUgMTI1SDE2NVYxMzVIMTU1VjEyNVpNMTY1IDEyNUgxNzVWMTM1SDE2NVYxMjVaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzUgMTQ1SDE0NVYxNTVIMTM1VjE0NVpNMTQ1IDE0NUgxNTVWMTU1SDE0NVYxNDVaTTE1NSAxNDVIMTY1VjE1NUgxNTVWMTQ1WiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4K'
          }
          alt={name}
          className={`w-24 h-24 object-contain mr-6 `}
          onLoad={() => {}}
          onError={() => {}}
          loading="lazy"
        />

        {/* Product Info */}
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-800">{name}</h3>
          <div className="flex items-center space-x-2 my-1">
            <span className="text-gray-800 text-sm">${priceStr}</span>
            <span className="bg-blue-600 text-white text-xs font-semibold py-0.5 px-1.5 rounded">
              {salePercentage}% OFF
            </span>
          </div>
          <p className="text-gray-500 text-sm">{flavor}</p>
        </div>
        <div className="right-0 absolute pr-4">
          {/* Wishlist Icon on the far right */}
          <button
            onClick={RemoveFromWishList}
            className="text-gray-800 hover:text-red-500"
            aria-label="Toggle wishlist"
          >
            <Heart className="h-6 w-6" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListProductCard;
