import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';

const ShopMenu = ({ shopOpen, setShopOpen, onShopClick, onShopKeyDown }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuItemsRef = useRef([]);
  const shopButtonRef = useRef(null);

  // Close shop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopButtonRef.current && !shopButtonRef.current.contains(event.target)) {
        setShopOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShopOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!shopOpen) return;

      switch (event.key) {
        case 'Escape':
          setShopOpen(false);
          setFocusedIndex(-1);
          shopButtonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => {
            const nextIndex = prev + 1;
            const totalItems = menuItemsRef.current.length;
            return nextIndex >= totalItems ? 0 : nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => {
            const prevIndex = prev - 1;
            const totalItems = menuItemsRef.current.length;
            return prevIndex < 0 ? totalItems - 1 : prevIndex;
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          setFocusedIndex(prev => {
            // Move to next column (every 4 items per column)
            const itemsPerColumn = 4;
            const currentColumn = Math.floor(prev / itemsPerColumn);
            const nextColumn = (currentColumn + 1) % 8; // 8 total columns
            const nextIndex = nextColumn * itemsPerColumn + (prev % itemsPerColumn);
            return nextIndex < menuItemsRef.current.length ? nextIndex : prev;
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setFocusedIndex(prev => {
            // Move to previous column (every 4 items per column)
            const itemsPerColumn = 4;
            const currentColumn = Math.floor(prev / itemsPerColumn);
            const prevColumn = currentColumn === 0 ? 7 : currentColumn - 1; // 8 total columns
            const prevIndex = prevColumn * itemsPerColumn + (prev % itemsPerColumn);
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
  }, [shopOpen, focusedIndex, setShopOpen, shopButtonRef]);

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  // Handle navigation to collection
  const handleCollectionClick = (collectionName) => {
    const url = `https://corexshoptest.onrender.com/api/collections/${collectionName.toLowerCase()}`;
    window.open(url, '_blank');
    setShopOpen(false);
    setFocusedIndex(-1);
  };

  // Helper function to create menu item with accessibility
  const createMenuItem = (collectionName, displayName, index) => (
    <button 
      ref={el => menuItemsRef.current[index] = el}
      onClick={() => handleCollectionClick(collectionName)}
      className="text-black hover:text-gray-600 transition-all duration-300 ease-in-out relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-0 py-1 cursor-pointer"
      style={{ 
        fontSize: '22px', 
        lineHeight: '26px', 
        letterSpacing: '-1.5px',
        fontWeight: '400'
      }}
      role="menuitem"
      tabIndex={focusedIndex === index ? 0 : -1}
    >
      {displayName}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </button>
  );

  return (
    <>
      {/* Shop Button */}
      <button
        ref={shopButtonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onShopClick();
        }}
        onKeyDown={onShopKeyDown}
        className={`flex items-center gap-2 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 cursor-pointer rounded-full ${
          shopOpen 
            ? 'bg-blue-600 text-white border-2 border-blue-600' 
            : 'text-gray-700 hover:text-black'
        }`}
        aria-expanded={shopOpen}
        aria-haspopup="true"
      >
        SHOP {shopOpen ? <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : <ChevronDown className="h-4 w-4 transition-transform duration-200" />}
      </button>

      {/* Mega Menu */}
      {shopOpen && (
        <div 
          className="fixed left-0 w-screen shadow-lg transition-all duration-300 ease-in-out transform origin-top opacity-100 translate-y-0 scale-y-100 z-40 overflow-y-auto"
          style={{ 
            top: '104px',
            backgroundColor: '#F7FAFF',
            fontFamily: 'Inter, sans-serif',
            maxHeight: 'calc(100vh - 104px)'
          }}
          onWheel={(e) => e.stopPropagation()}
          role="menu"
          aria-label="Shop categories"
        >
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-8 pb-12">
            {/* SHOP ALL Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="font-bold text-black uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  SHOP ALL
                </h2>
                <ArrowRight className="h-5 w-5 text-black" />
              </div>
            </div>

            {/* Mega Menu Grid */}
            <div className="grid grid-cols-5 gap-16 mb-8">
              {/* Column 1: SHOP ALL */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  SHOP ALL
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('all-products', 'All products', 0)}</li>
                  <li>{createMenuItem('best-sellers', 'Best Sellers', 1)}</li>
                  <li>{createMenuItem('garage-sale', 'Garage Sale', 2)}</li>
                  <li>{createMenuItem('apparel-gear', 'Apparel & Gear', 3)}</li>
                </ul>
              </div>

              {/* Column 2: SPORT NUTRITION PROTEIN */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-12">
                  {/* SPORT NUTRITION Sub-column */}
                  <div className="mr-4">
                    <h3 
                      className="font-bold text-black mb-4 uppercase whitespace-nowrap"
                      style={{ 
                        fontSize: '28px', 
                        lineHeight: '28px', 
                        letterSpacing: '-1.5px',
                        fontWeight: '700'
                      }}
                    >
                      SPORT NUTRITION
                    </h3>
                    <ul className="space-y-4">
                      <li>{createMenuItem('pre-workout', 'Pre-Workout', 4)}</li>
                      <li>{createMenuItem('intra-workout', 'Intra-Workout', 5)}</li>
                      <li>{createMenuItem('muscle-recovery', 'Muscle Recovery', 6)}</li>
                      <li>{createMenuItem('supplements', 'Supplements', 7)}</li>
                    </ul>
                  </div>

                  {/* PROTEIN Sub-column */}
                  <div className="ml-8">
                    <h3 
                      className="font-bold text-black mb-4 uppercase"
                      style={{ 
                        fontSize: '28px', 
                        lineHeight: '28px', 
                        letterSpacing: '-1.5px',
                        fontWeight: '700'
                      }}
                    >
                      PROTEIN
                    </h3>
                    <ul className="space-y-4">
                      <li>{createMenuItem('lactose-free', 'Lactose Free', 8)}</li>
                      <li>{createMenuItem('whey-protein', 'Whey Protein', 9)}</li>
                      <li>{createMenuItem('iso-protein', 'ISO Protein', 10)}</li>
                      <li>{createMenuItem('vegan-protein', 'Vegan Protein', 11)}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 3: AMINO ACIDS */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  AMINO ACIDS
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('bcaas', 'BCAAs', 12)}</li>
                  <li>{createMenuItem('creatine', 'Creatine', 13)}</li>
                  <li>{createMenuItem('glutamine', 'Glutamine', 14)}</li>
                  <li>{createMenuItem('eaas', 'EAAs', 15)}</li>
                </ul>
              </div>

              {/* Column 4: HEALTH & WELLNESS */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  HEALTH & WELLNESS
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('multivitamins', 'Multivitamins', 16)}</li>
                  <li>{createMenuItem('greens-and-reds', 'Greens and Reds', 17)}</li>
                  <li>{createMenuItem('joint-health', 'Joint Health', 18)}</li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-4 gap-16 mt-12">
              {/* Column 1: WEIGHT MANAGEMENT */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  WEIGHT MANAGEMENT
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('meal-replacement', 'Meal Replacement', 19)}</li>
                  <li>{createMenuItem('fat-burner', 'Fat Burner', 20)}</li>
                  <li>{createMenuItem('weight-management-supplements', 'Supplements', 21)}</li>
                </ul>
              </div>

              {/* Column 2: HORMONE HEALTH */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  HORMONE HEALTH
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('testosterone-booster', 'Testosterone Booster', 22)}</li>
                </ul>
              </div>

              {/* Column 3: SHOP BY GOAL */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  SHOP BY GOAL
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('build-mass', 'Build Mass', 23)}</li>
                  <li>{createMenuItem('endurance', 'Endurance', 24)}</li>
                  <li>{createMenuItem('athletic-performance', 'Athletic Performance', 25)}</li>
                  <li>{createMenuItem('health-wellness', 'Health & Wellness', 26)}</li>
                </ul>
              </div>

              {/* Column 4: APPAREL & GEAR */}
              <div>
                <h3 
                  className="font-bold text-black mb-4 uppercase"
                  style={{ 
                    fontSize: '28px', 
                    lineHeight: '28px', 
                    letterSpacing: '-1.5px',
                    fontWeight: '700'
                  }}
                >
                  APPAREL & GEAR
                </h3>
                <ul className="space-y-4">
                  <li>{createMenuItem('apparel', 'Apparel', 27)}</li>
                  <li>{createMenuItem('gear', 'Gear', 28)}</li>
                  <li>{createMenuItem('merchandise', 'Merchandise', 29)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopMenu;
