import React, { useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { RemoveFromWishList } from '../../store/wishListSlice';
import WishListProductCard from './WishListProduct';

const WishListDrawer = ({ wishListData, setWishListOpen }) => {
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
              aria-label="Close wishlist"
              className="text-gray-600 hover:text-red-500 cursor-pointer"
              onClick={() => setWishListOpen(false)}
            >
              <X size={24} />
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
                    RemoveFromWishList={() =>
                      dispatch(RemoveFromWishList(prod))
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

export default WishListDrawer;
