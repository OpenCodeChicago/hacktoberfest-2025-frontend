import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Heart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import MobileShopMenu from './MobileShopMenu';
import CartIcon from '../CartComponent/CartIcon';

const MobileMenu = ({
  mobileOpen,
  setMobileOpen,
  mobileMenuRef,
  setCartOpen,
  setWishListOpen,
}) => {
  const [isInShopNavigation, setIsInShopNavigation] = useState(false);
  const shopMenuRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const wishListData = useSelector((state) => state.wishList);

  const handleCloseMenu = () => {
    setMobileOpen(false);
    shopMenuRef.current?.reset();
  };

  return (
    <>
      {/* Overlay for Mobile Menu */}
      <div
        onClick={handleCloseMenu}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } z-998`}
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 w-full sm:w-[280px] h-full bg-white shadow-2xl border-l border-gray-200 z-999 transform transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
        } flex flex-col`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-[#023E8A] tracking-wide">
            MENU
          </h2>
          <button
            onClick={handleCloseMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 px-6 py-4 flex flex-col space-y-4 overflow-y-auto">
          <div>
            <MobileShopMenu
              ref={shopMenuRef}
              onClose={handleCloseMenu}
              onNavigationChange={setIsInShopNavigation}
            />
            {!isInShopNavigation && (
              <div key="main-menu-items" className="animate-slideInRight">
                <Link
                  to="/garage-sale"
                  className="text-gray-700 hover:text-black font-medium block mt-4"
                  onClick={handleCloseMenu}
                >
                  Garage Sale
                </Link>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-black font-medium block mt-4"
                  onClick={handleCloseMenu}
                >
                  All Products
                </Link>
                <Link
                  to="/about-corex"
                  className="text-gray-700 hover:text-black font-medium block mt-4"
                  onClick={handleCloseMenu}
                >
                  About CoreX
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Icons */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer"
              onClick={() => {
                handleCloseMenu();
                setWishListOpen(true);
              }}
            >
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishListData?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishListData?.items?.length}
                  </span>
                )}
              </div>
              <span>Wishlist</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer"
              onClick={() => {
                handleCloseMenu();
                if (!isAuthenticated) {
                  navigate('/login');
                } else {
                  navigate('/profile');
                }
              }}
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
            <div
              className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer"
              onClick={() => {
                handleCloseMenu();
                setCartOpen(true);
              }}
            >
              <CartIcon />
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
