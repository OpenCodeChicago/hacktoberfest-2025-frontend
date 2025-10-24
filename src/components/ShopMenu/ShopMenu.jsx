import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Sparkles, Zap, Star, Heart, Flame } from 'lucide-react';

const ShopMenu = ({ shopOpen, setShopOpen, onShopClick, onShopKeyDown }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [animationState, setAnimationState] = useState('closed');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const menuItemsRef = useRef([]);
  const shopButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Enhanced animation states
  const handleOpenMenu = useCallback(() => {
    setAnimationState('opening');
    setTimeout(() => setAnimationState('open'), 300);
  }, []);

  const handleCloseMenu = useCallback(() => {
    if (animationState === 'closing') return;
    setAnimationState('closing');
    setTimeout(() => {
      setShopOpen(false);
      setAnimationState('closed');
      setFocusedIndex(-1);
    }, 300);
  }, [animationState, setShopOpen]);

  // Mouse tracking for parallax effects
  const handleMouseMove = useCallback((e) => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  }, []);

  // Enhanced accessibility
  useEffect(() => {
    const isMenuVisible = shopOpen || animationState === 'opening' || animationState === 'open' || animationState === 'closing';
    
    if (isMenuVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.setAttribute('inert', 'true');
        mainContent.setAttribute('aria-hidden', 'true');
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.background = '';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.removeAttribute('inert');
        mainContent.removeAttribute('aria-hidden');
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.background = '';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.removeAttribute('inert');
        mainContent.removeAttribute('aria-hidden');
      }
    };
  }, [shopOpen, animationState]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopButtonRef.current && !shopButtonRef.current.contains(event.target) && 
          shopOpen && animationState !== 'closing') {
        handleCloseMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shopOpen, animationState, handleCloseMenu]);

  // Opening animation
  useEffect(() => {
    if (shopOpen && animationState === 'closed') {
      handleOpenMenu();
    }
  }, [shopOpen, animationState, handleOpenMenu]);

  // Enhanced keyboard navigation
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
          setFocusedIndex(prev => (prev + 1) % menuItemsRef.current.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => prev <= 0 ? menuItemsRef.current.length - 1 : prev - 1);
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0) {
            event.preventDefault();
            menuItemsRef.current[focusedIndex]?.click();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shopOpen, focusedIndex, handleCloseMenu]);

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleCollectionClick = useCallback((collectionName) => {
    const encodedName = encodeURIComponent(collectionName.toLowerCase());
    const url = `https://corexshoptest.onrender.com/api/collections/${encodedName}`;
    window.open(url, '_blank');
    handleCloseMenu();
  }, [handleCloseMenu]);

  // Enhanced menu item with cool effects
  const createMenuItem = (collectionName, displayName, index, icon = null) => (
    <div
      key={collectionName}
      className="relative group"
      onMouseEnter={() => setHoveredItem(index)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <button
        ref={(el) => (menuItemsRef.current[index] = el)}
        onClick={() => handleCollectionClick(collectionName)}
        className={`
          relative w-full text-left px-4 py-3 rounded-xl transition-all duration-500 ease-out
          ${focusedIndex === index 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl scale-105' 
            : 'text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
          }
          ${hoveredItem === index ? 'transform scale-105 shadow-xl' : 'transform scale-100'}
        `}
        style={{
          fontSize: '18px',
          lineHeight: '22px',
          letterSpacing: '-0.5px',
          fontWeight: '500',
          backdropFilter: 'blur(10px)',
          background: focusedIndex === index 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'rgba(255, 255, 255, 0.1)',
        }}
        role="menuitem"
        tabIndex={focusedIndex === index ? 0 : -1}
      >
        <div className="flex items-center justify-between">
          <span className="relative z-10">{displayName}</span>
          {icon && (
            <div className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {icon}
            </div>
          )}
        </div>
        
        {/* Animated background effect */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
          ${hoveredItem === index ? 'animate-pulse' : ''}
        `} />
        
        {/* Glow effect */}
        <div className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-sm -z-10
          ${hoveredItem === index ? 'animate-pulse' : ''}
        `} />
      </button>
    </div>
  );

  const isMenuVisible = shopOpen || animationState === 'opening' || animationState === 'open' || animationState === 'closing';

  return (
    <>
      {/* Enhanced Shop Button */}
      <div className="relative">
        <button
          ref={shopButtonRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (shopOpen || animationState === 'opening' || animationState === 'open') {
              handleCloseMenu();
            } else {
              onShopClick();
            }
          }}
          onKeyDown={onShopKeyDown}
          className={`
            relative px-8 py-4 rounded-full font-bold transition-all duration-500 ease-out
            flex items-center gap-3 overflow-hidden group
            ${shopOpen
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl scale-105'
              : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105'
            }
          `}
          aria-expanded={shopOpen}
          aria-haspopup="true"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
          
          {/* Sparkle effect */}
          <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '3s' }} />
          
          <span className="relative z-10 text-lg font-black tracking-wide">
            SHOP
          </span>
          
          <div className={`
            relative z-10 transition-transform duration-300 ease-out
            ${shopOpen ? 'rotate-180' : 'rotate-0'}
          `}>
            {shopOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full blur-lg -z-10" />
        </button>
      </div>

      {/* Enhanced Mega Menu */}
      {isMenuVisible && (
        <div
          ref={menuRef}
          className={`
            fixed left-0 w-screen z-50 overflow-y-auto transition-all duration-500 ease-out
            ${animationState === 'closing' ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'}
          `}
          style={{
            top: '120px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            fontFamily: 'Inter, sans-serif',
            maxHeight: 'calc(100vh - 120px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
          onMouseMove={handleMouseMove}
          onWheel={(e) => e.stopPropagation()}
          role="menu"
          aria-label="Shop categories"
        >
          {/* Animated background pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                  rgba(255, 255, 255, 0.3) 0%, 
                  transparent 50%
                )
              `,
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-12 pb-16">
            {/* Enhanced SHOP ALL Section */}
            <div className="mb-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block"
              >
                <button
                  onClick={() => handleCollectionClick('all-products')}
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 ease-out hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
                    <h2 className="text-4xl font-black text-white uppercase tracking-wider group-hover:text-yellow-300 transition-colors duration-300">
                      ALL PRODUCTS
                    </h2>
                    <ArrowRight className="h-6 w-6 text-white group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl -z-10" />
                </button>
              </motion.div>
            </div>

            {/* Enhanced Mega Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* SHOP ALL Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-pink-400" />
                  SHOP ALL
                </h3>
                <div className="space-y-3">
                  {createMenuItem('all-products', 'All Products', 0, <Star className="h-4 w-4" />)}
                  {createMenuItem('best-sellers', 'Best Sellers', 1, <Flame className="h-4 w-4" />)}
                  {createMenuItem('garage-sale', 'Garage Sale', 2, <Zap className="h-4 w-4" />)}
                  {createMenuItem('apparel-gear', 'Apparel & Gear', 3, <Sparkles className="h-4 w-4" />)}
                </div>
              </motion.div>

              {/* SPORT NUTRITION Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  SPORT NUTRITION
                </h3>
                <div className="space-y-3">
                  {createMenuItem('pre-workout', 'Pre-Workout', 4, <Flame className="h-4 w-4" />)}
                  {createMenuItem('intra-workout', 'Intra-Workout', 5, <Zap className="h-4 w-4" />)}
                  {createMenuItem('muscle-recovery', 'Muscle Recovery', 6, <Heart className="h-4 w-4" />)}
                  {createMenuItem('supplements', 'Supplements', 7, <Star className="h-4 w-4" />)}
                </div>
              </motion.div>

              {/* PROTEIN Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Star className="h-6 w-6 text-blue-400" />
                  PROTEIN
                </h3>
                <div className="space-y-3">
                  {createMenuItem('lactose-free', 'Lactose Free', 8, <Heart className="h-4 w-4" />)}
                  {createMenuItem('whey-protein', 'Whey Protein', 9, <Zap className="h-4 w-4" />)}
                  {createMenuItem('iso-protein', 'ISO Protein', 10, <Flame className="h-4 w-4" />)}
                  {createMenuItem('vegan-protein', 'Vegan Protein', 11, <Sparkles className="h-4 w-4" />)}
                </div>
              </motion.div>

              {/* AMINO ACIDS Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Flame className="h-6 w-6 text-orange-400" />
                  AMINO ACIDS
                </h3>
                <div className="space-y-3">
                  {createMenuItem('bcaas', 'BCAAs', 12, <Zap className="h-4 w-4" />)}
                  {createMenuItem('creatine', 'Creatine', 13, <Star className="h-4 w-4" />)}
                  {createMenuItem('glutamine', 'Glutamine', 14, <Heart className="h-4 w-4" />)}
                  {createMenuItem('eaas', 'EAAs', 15, <Flame className="h-4 w-4" />)}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {/* WEIGHT MANAGEMENT */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-green-400" />
                  WEIGHT MANAGEMENT
                </h3>
                <div className="space-y-3">
                  {createMenuItem('meal-replacement', 'Meal Replacement', 16, <Star className="h-4 w-4" />)}
                  {createMenuItem('fat-burner', 'Fat Burner', 17, <Flame className="h-4 w-4" />)}
                  {createMenuItem('weight-management-supplements', 'Supplements', 18, <Zap className="h-4 w-4" />)}
                </div>
              </div>

              {/* HORMONE HEALTH */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Zap className="h-6 w-6 text-purple-400" />
                  HORMONE HEALTH
                </h3>
                <div className="space-y-3">
                  {createMenuItem('testosterone-booster', 'Testosterone Booster', 19, <Star className="h-4 w-4" />)}
                </div>
              </div>

              {/* SHOP BY GOAL */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Flame className="h-6 w-6 text-red-400" />
                  SHOP BY GOAL
                </h3>
                <div className="space-y-3">
                  {createMenuItem('build-mass', 'Build Mass', 20, <Zap className="h-4 w-4" />)}
                  {createMenuItem('endurance', 'Endurance', 21, <Heart className="h-4 w-4" />)}
                  {createMenuItem('athletic-performance', 'Athletic Performance', 22, <Star className="h-4 w-4" />)}
                  {createMenuItem('health-wellness', 'Health & Wellness', 23, <Sparkles className="h-4 w-4" />)}
                </div>
              </div>

              {/* APPAREL & GEAR */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-cyan-400" />
                  APPAREL & GEAR
                </h3>
                <div className="space-y-3">
                  {createMenuItem('apparel', 'Apparel', 24, <Heart className="h-4 w-4" />)}
                  {createMenuItem('gear', 'Gear', 25, <Zap className="h-4 w-4" />)}
                  {createMenuItem('merchandise', 'Merchandise', 26, <Star className="h-4 w-4" />)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopMenu;
