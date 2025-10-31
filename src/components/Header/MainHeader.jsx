import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../Search/SearchBox';
import TopHeader from '../TopHeader/TopHeader';
import ShopMenu from '../ShopMenu';
import MobileMenu from './MobileMenu';
import { Menu, X, Search, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import WishListScreen from '../WishList/WishListScreen';
import CartIcon from '../CartComponent/CartIcon';
import CartDrawer from '../CartComponent/CartDrawer';
import ProfileMenu from './ProfileMenu/ProfileMenu';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [wishListOpen, setWishListOpen] = useState(false);

  const wishListData = useSelector((state) => state.wishList);

  // Handle shop button click
  const handleShopClick = () => {
    setShopOpen(!shopOpen);
  };

  // Handle shop button keyboard events
  const handleShopButtonKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleShopClick();
    }
  };

  return (
    <>
      <TopHeader />

      {/* Main Header */}
      <header className="bg-[#F7FAFF] shadow-md w-full fixed top-[48px] left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link to="/">
                <img
                  src="/icons/official-logo-core-x.svg"
                  alt="CoreX Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="relative">
                <ShopMenu
                  shopOpen={shopOpen}
                  setShopOpen={setShopOpen}
                  onShopClick={handleShopClick}
                  onShopKeyDown={handleShopButtonKeyDown}
                />
              </div>
              {/* Garage Sale */}
              <Link
                to="/garage-sale"
                className="px-5 py-2 rounded-full font-medium text-gray-700 transition-all duration-300 hover:bg-[#0D1B2A] hover:text-white"
              >
                GARAGE SALE
              </Link>

              {/* All Products */}
              <Link
                to="/products"
                className="px-5 py-2 rounded-full font-medium text-gray-700 transition-all duration-300 hover:bg-[#0D1B2A] hover:text-white"
              >
                ALL PRODUCTS
              </Link>
              {/* About CoreX */}
              <Link
                to="/about-corex"
                className="group px-5 py-2 rounded-full font-medium text-gray-700 transition-all duration-300 hover:bg-[#0D1B2A] hover:text-white"
              >
                ABOUT CORE
                <span className="text-red-600 group-hover:text-red-600 transition-colors duration-300">
                  X
                </span>
              </Link>
            </nav>

            {/* Right: Icons (desktop) + Mobile Hamburger */}
            <div className="flex items-center ">
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-6 text-gray-700">
                <button
                  aria-label="Search"
                  onClick={() => setSearch(true)}
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black cursor-pointer"
                >
                  <Search className="h-5 w-5" />
                </button>

                <button
                  aria-label="Wishlist"
                  onClick={() => setWishListOpen(true)}
                  className="relative transform transition-transform duration-200 hover:scale-110 hover:text-black cursor-pointer"
                >
                  <Heart className="h-5 w-5" />
                  {wishListData.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {wishListData.items.length}
                    </span>
                  )}
                </button>

                <ProfileMenu />

                <CartIcon onOpen={() => setCartOpen(true)} />
              </div>

              {/* Mobile Icons */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setSearch(true)}
                  className="text-gray-700 hover:text-black"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-gray-700 hover:text-black"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        mobileMenuRef={mobileMenuRef}
      />

      {/* Search Drawer */}
      {wishListOpen && (
        <WishListScreen
          setWishListOpen={setWishListOpen}
          wishListData={wishListData}
        />
      )}
      {search && <SearchBox isOpen={search} onClose={() => setSearch(false)} />}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
