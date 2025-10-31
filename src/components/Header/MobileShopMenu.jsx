import { useState, useImperativeHandle, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { menuColumns } from '../ShopMenu/menuData';

const BackButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="flex items-center text-gray font-semibold hover:text-black text-sm mb-4 cursor-pointer"
  >
    <ChevronLeft className="h-4 w-4 text-gray mr-1" />
    {label}
  </button>
);

const NavigationButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full font-bold text-dark-blue-text hover:text-hover cursor-pointer transition-colors duration-200"
  >
    {children}
    <ChevronRight className="h-4 w-4 text-gray" />
  </button>
);

const MobileShopMenu = forwardRef(({ onClose, onNavigationChange }, ref) => {
  const [showShopPage, setShowShopPage] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setShowShopPage(false);
      setCurrentCategory(null);
      onNavigationChange?.(false);
    },
  }));

  const handleLinkClick = () => {
    onClose();
    setShowShopPage(false);
    setCurrentCategory(null);
  };

  const handleShowShopPage = () => {
    setShowShopPage(true);
    onNavigationChange?.(true);
  };

  const handleBackToMenu = () => {
    setShowShopPage(false);
    setCurrentCategory(null);
    onNavigationChange?.(false);
  };

  const handleShowCategory = (column) => {
    setCurrentCategory(column);
  };

  const handleBackToShop = () => {
    setCurrentCategory(null);
  };

  if (!showShopPage && !currentCategory) {
    return (
      <button
        onClick={handleShowShopPage}
        className="flex items-center justify-between w-full text-gray-700 hover:text-black font-medium cursor-pointer"
      >
        Shop
        <ChevronRight className="h-4 w-4" />
      </button>
    );
  }

  if (showShopPage && !currentCategory) {
    return (
      <div key="shop-categories" className="animate-slideInRight">
        <BackButton onClick={handleBackToMenu} label="Menu" />
        <div className="space-y-2">
          {menuColumns.map((column) => (
            <NavigationButton
              key={column.id}
              onClick={() => handleShowCategory(column)}
            >
              {column.title}
            </NavigationButton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      key={`category-${currentCategory?.id}`}
      className="animate-slideInRight"
    >
      <BackButton onClick={handleBackToShop} label="Shop" />
      <div className="space-y-2">
        {currentCategory.items.map((item) => (
          <Link
            key={item.id}
            to={item.link || `/collections/${item.slug}`}
            className="block p-0 font-bold text-dark-blue-text hover:text-hover cursor-pointer transition-colors duration-200"
            onClick={handleLinkClick}
          >
            {item.displayName}
          </Link>
        ))}
      </div>
    </div>
  );
});

MobileShopMenu.displayName = 'MobileShopMenu';

export default MobileShopMenu;
