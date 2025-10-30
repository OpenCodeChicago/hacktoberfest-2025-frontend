import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import MenuColumn from './MenuColumn';
import { menuColumns } from './menuData';

const ShopMenu = ({ shopOpen, setShopOpen, onShopClick, onShopKeyDown }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [animationState, setAnimationState] = useState('closed'); // 'closed', 'opening', 'open', 'closing'
  const menuItemsRef = useRef([]);
  const shopButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Handle opening animation
  const handleOpenMenu = () => {
    setAnimationState('opening');
    setTimeout(() => {
      setAnimationState('open');
    }, 500); // Match animation duration
  };

  // Handle closing animation
  const handleCloseMenu = useCallback(() => {
    if (animationState === 'closing') return; // Prevent multiple close calls
    setAnimationState('closing');
    setTimeout(() => {
      setShopOpen(false);
      setAnimationState('closed');
      setFocusedIndex(-1);
    }, 500); // Match animation duration
  }, [animationState, setShopOpen]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (
      shopOpen ||
      animationState === 'opening' ||
      animationState === 'open' ||
      animationState === 'closing'
    ) {
      // Add overflow-hidden to body
      document.body.style.overflow = 'hidden';

      // Make main content inert for screen readers
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.setAttribute('inert', 'true');
        mainContent.setAttribute('aria-hidden', 'true');
      }
    } else {
      // Restore scrolling
      document.body.style.overflow = '';

      // Restore main content accessibility
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.removeAttribute('inert');
        mainContent.removeAttribute('aria-hidden');
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.removeAttribute('inert');
        mainContent.removeAttribute('aria-hidden');
      }
    };
  }, [shopOpen, animationState]);

  // Close shop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shopOpen &&
        animationState !== 'closing' &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        shopButtonRef.current &&
        !shopButtonRef.current.contains(event.target)
      ) {
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shopOpen, animationState, handleCloseMenu]);

  // Handle opening animation when shopOpen changes
  useEffect(() => {
    if (shopOpen && animationState === 'closed') {
      handleOpenMenu();
    }
  }, [shopOpen, animationState]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!shopOpen) return;

      switch (event.key) {
        case 'Escape':
          handleCloseMenu();
          shopButtonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev + 1;
            const totalItems = menuItemsRef.current.length;
            return nextIndex >= totalItems ? 0 : nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => {
            const prevIndex = prev - 1;
            const totalItems = menuItemsRef.current.length;
            return prevIndex < 0 ? totalItems - 1 : prevIndex;
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          setFocusedIndex((prev) => {
            // Move to next column (every 4 items per column)
            const itemsPerColumn = 4;
            const currentColumn = Math.floor(prev / itemsPerColumn);
            const nextColumn = (currentColumn + 1) % 8; // 8 total columns
            const nextIndex =
              nextColumn * itemsPerColumn + (prev % itemsPerColumn);
            return nextIndex < menuItemsRef.current.length ? nextIndex : prev;
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setFocusedIndex((prev) => {
            // Move to previous column (every 4 items per column)
            const itemsPerColumn = 4;
            const currentColumn = Math.floor(prev / itemsPerColumn);
            const prevColumn = currentColumn === 0 ? 7 : currentColumn - 1; // 8 total columns
            const prevIndex =
              prevColumn * itemsPerColumn + (prev % itemsPerColumn);
            return prevIndex < menuItemsRef.current.length ? prevIndex : prev;
          });
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0) {
            event.preventDefault();
            const focusedItem = menuItemsRef.current[focusedIndex];
            if (focusedItem) {
              focusedItem.click();
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shopOpen, focusedIndex, setShopOpen, shopButtonRef, handleCloseMenu]);

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleCollectionClick = () => {
    handleCloseMenu();
  };

  return (
    <>
      {/* Shop Button - Updated to match other navigation buttons */}
      <button
        ref={shopButtonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (
            shopOpen ||
            animationState === 'opening' ||
            animationState === 'open'
          ) {
            handleCloseMenu();
          } else {
            onShopClick();
          }
        }}
        onKeyDown={onShopKeyDown}
        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer flex items-center ${
          shopOpen
            ? 'bg-[#0D1B2A] text-white'
            : 'text-gray-700 hover:bg-[#0D1B2A] hover:text-white'
        }`}
        aria-expanded={shopOpen}
        aria-haspopup="true"
      >
        SHOP{' '}
        {shopOpen ? (
          <ChevronUp className="ml-1 h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
        )}
      </button>

      {/* Mega Menu */}
      {(shopOpen ||
        animationState === 'opening' ||
        animationState === 'open' ||
        animationState === 'closing') && (
        <nav
          ref={menuRef}
          className={`fixed left-0 w-screen shadow-lg transform origin-top z-40 overflow-y-auto ${
            animationState === 'closing'
              ? 'animate-slide-up'
              : 'animate-slide-down'
          }`}
          style={{
            top: '104px',
            height: 'calc(100vh - 104px)',
            backgroundColor: '#F7FAFF',
            fontFamily: 'Inter, sans-serif',
          }}
          onWheel={(e) => e.stopPropagation()}
          aria-label="Shop categories"
        >
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-8 pb-12">
            {/* SHOP ALL Section */}
            <div className="flex items-center justify-between">
              <NavLink
                to="/collections/all-products"
                onClick={handleCollectionClick}
                className="group w-full flex justify-between items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg cursor-pointer"
              >
                <h2
                  className="font-bold text-black uppercase group-hover:text-gray-600 transition-colors duration-300"
                  style={{
                    fontSize: '28px',
                    lineHeight: '28px',
                    letterSpacing: '-1.5px',
                    fontWeight: '700',
                  }}
                >
                  ALL PRODUCTS
                </h2>
                <ArrowRight className="h-5 w-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
              </NavLink>
            </div>
            <div className="border border-gray-300 mb-11 mt-8" />

            <div className="grid grid-cols-5 gap-y-20 gap-x-18">
              {menuColumns.map((column) => (
                <MenuColumn
                  key={column.id}
                  title={column.title}
                  items={column.items}
                  menuItemsRef={menuItemsRef}
                  focusedIndex={focusedIndex}
                  handleCollectionClick={handleCollectionClick}
                />
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default ShopMenu;
