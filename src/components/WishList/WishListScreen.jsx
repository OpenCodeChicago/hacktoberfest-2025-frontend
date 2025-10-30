import { useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromWishList } from '../../store/wishListSlice';
import { Heart } from 'lucide-react';

const WishListProductCard = ({ product, removeFromWishList }) => {
  if (!product) return null;
  const { name, price, imageUrl, salePercentage, flavor } = product;
  const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
  return (
    <div className="w-full max-w-lg p-4 flex ">
      {/* Left side container for image and product info */}
      <div className="flex ">
        {/* Product Image */}
        <img
          src={imageUrl || '/images/product-default-image.jpg'}
          alt={name || 'Product image'}
          className="w-24 h-24 object-contain mr-6"
          loading="lazy"
          decoding="async"
          width="96"
          height="96"
          onError={(e) => {
            const tgt = e.currentTarget;
            if (!tgt.src.includes('/images/product-default-image.jpg')) {
              tgt.src = '/images/product-default-image.jpg';
            }
          }}
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
            onClick={removeFromWishList}
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
const WishListScreen = ({ wishListData, setWishListOpen }) => {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  // 🔹 Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setWishListOpen(false);

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableEls = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls.length) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setWishListOpen]);

  useEffect(() => {
    if (drawerRef.current) {
      const firstEl = drawerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstEl?.focus();
    }
  }, [wishListData]);

  const wishListScreen = useMemo(() => {
    return (
      <div
        className="fixed inset-0 bg-black/40 z-[999]"
        role="presentation"
        onClick={() => setWishListOpen(false)}
      >
        {/* Drawer */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishlist-title"
          className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg z-[1000] flex flex-col transition-transform duration-300 focus:outline-none"
          ref={drawerRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b p-4">
            <h2
              id="wishlist-title"
              className="text-xl font-bold text-[#0b1a39] tracking-wide"
            >
              WISHLIST
            </h2>
            <button
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition group"
              aria-label="Close cart"
              onClick={() => setWishListOpen(false)}
            >
              <X className="h-5 w-5 text-gray-700 transform transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
            </button>
          </div>

          {/* Wishlist Content */}
          {wishListData.items.length === 0 ? (
            <div className="flex flex-col flex-grow items-center justify-center text-center p-4">
              <p className="text-gray-500 mb-2">Your wishlist is empty.</p>
              <button
                className="text-sm text-[#0b1a39] underline hover:text-black"
                onClick={() => setWishListOpen(false)}
              >
                Start adding your favorite supplements!
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {wishListData.items.map((prod) => (
                  <WishListProductCard
                    key={prod.id}
                    product={prod}
                    removeFromWishList={() =>
                      dispatch(removeFromWishList(prod))
                    }
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 mt-auto border-t">
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    // Add all add to cart slicer here in future
                  }}
                >
                  Add All To Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }, [wishListData, dispatch, setWishListOpen]);

  return wishListScreen;
};

export default WishListScreen;
