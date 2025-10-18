import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../Search/SearchBox';
import TopHeader from '../TopHeader/TopHeader';
import ShopMenu from '../ShopMenu';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  User,
} from 'lucide-react';
import WishListDrawerScreen from '../WishList/WishiListDrawerScreen';
import CartIcon from '../cart/CartIcon';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [wishListOpen, setWishListOpen] = useState(false);

  const wishListData = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
      <header className="bg-white shadow-md w-full fixed top-10 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
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
                    <span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold
                     rounded-full h-4 w-4 flex items-center justify-center"
                    >
                      {wishListData.items.length}
                    </span>
                  )}
                </button>

                <Link
                  to="/login"
                  aria-label="User Account"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black"
                >
                  <User className="h-5 w-5" />
                </Link>
                
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

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-md animate-fadeIn">
            <nav className="flex flex-col space-y-2 p-4">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center justify-between text-gray-700 hover:text-black transition"
              >
                <span>Shop</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    shopOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {shopOpen && (
                <div className="flex flex-col space-y-2 pl-4">
                  {['Category 1', 'Category 2', 'Category 3'].map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="text-gray-600 hover:text-black transition"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}

              <Link
                to="/garage-sale"
                className="text-gray-700 hover:text-black transition"
              >
                Garage Sale
              </Link>

              <Link
                to="/products"
                className="text-gray-700 hover:text-black transition"
              >
                All Products
              </Link>

              <Link
                to="/about-corex"
                className="text-gray-700 hover:text-black transition"
              >
                About CoreX
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Overlay for Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } z-[998]`}
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 w-full sm:w-[280px] h-full bg-white shadow-2xl border-l border-gray-200 z-[999] transform transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
        } flex flex-col`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-[#023E8A] tracking-wide">
            MENU
          </h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 px-6 py-4 flex flex-col space-y-4">
          <div>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between w-full text-gray-700 hover:text-black font-medium"
            >
              Shop
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  shopOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {shopOpen && (
              <div className="mt-2 pl-4 space-y-2">
                <Link
                  to="/category1"
                  className="block text-gray-600 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Category 1
                </Link>
                <Link
                  to="/category2"
                  className="block text-gray-600 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Category 2
                </Link>
                <Link
                  to="/category3"
                  className="block text-gray-600 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Category 3
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/garage-sale"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Garage Sale
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setMobileOpen(false)}
          >
            All Products
          </Link>
          <Link
            to="/about-corex"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setMobileOpen(false)}
          >
            About CoreX
          </Link>
        </nav>

        {/* Mobile Menu Icons */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <CartIcon onOpen={() => setCartOpen(true)} />
              <span>Cart</span>
            </a>
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      {wishListOpen && (
        <WishListDrawerScreen
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
