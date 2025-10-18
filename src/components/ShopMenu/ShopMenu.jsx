'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShopOpen]);

  // Keyboard navigation
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
          setFocusedIndex((prev) => (prev + 1) % menuItemsRef.current.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev - 1 < 0 ? menuItemsRef.current.length - 1 : prev - 1
          );
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
            menuItemsRef.current[focusedIndex].click();
          }
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shopOpen, focusedIndex]);

  // Focus management
  useEffect(() => {
    if (focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleCollectionClick = (collectionName) => {
    window.open(
      `https://corexshoptest.onrender.com/api/collections/${collectionName.toLowerCase()}`,
      '_blank'
    );
    setShopOpen(false);
    setFocusedIndex(-1);
  };

  const createMenuItem = (collectionName, displayName, index) => (
    <button
      ref={(el) => (menuItemsRef.current[index] = el)}
      onClick={() => handleCollectionClick(collectionName)}
      className="relative w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600 transition-all py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      role="menuitem"
      tabIndex={focusedIndex === index ? 0 : -1}
    >
      {displayName}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </button>
  );

  const menuData = [
    {
      title: 'SHOP ALL',
      items: [
        { name: 'all-products', label: 'All Products' },
        { name: 'best-sellers', label: 'Best Sellers' },
        { name: 'garage-sale', label: 'Garage Sale' },
        { name: 'apparel-gear', label: 'Apparel & Gear' },
      ],
    },
    {
      title: 'SPORT NUTRITION',
      items: [
        { name: 'pre-workout', label: 'Pre-Workout' },
        { name: 'intra-workout', label: 'Intra-Workout' },
        { name: 'muscle-recovery', label: 'Muscle Recovery' },
        { name: 'supplements', label: 'Supplements' },
      ],
    },
    {
      title: 'PROTEIN',
      items: [
        { name: 'lactose-free', label: 'Lactose Free' },
        { name: 'whey-protein', label: 'Whey Protein' },
        { name: 'iso-protein', label: 'ISO Protein' },
        { name: 'vegan-protein', label: 'Vegan Protein' },
      ],
    },
    {
      title: 'AMINO ACIDS',
      items: [
        { name: 'bcaas', label: 'BCAAs' },
        { name: 'creatine', label: 'Creatine' },
        { name: 'glutamine', label: 'Glutamine' },
        { name: 'eaas', label: 'EAAs' },
      ],
    },
    {
      title: 'HEALTH & WELLNESS',
      items: [
        { name: 'multivitamins', label: 'Multivitamins' },
        { name: 'greens-and-reds', label: 'Greens and Reds' },
        { name: 'joint-health', label: 'Joint Health' },
      ],
    },
  ];

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
        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer flex items-center ${
          shopOpen
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-blue-600 hover:text-white'
        }`}
        aria-expanded={shopOpen}
        aria-haspopup="true"
      >
        SHOP {shopOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
      </button>

      {/* Mega Menu */}
      {shopOpen && (
        <div
          className="fixed left-0 top-[80px] w-screen bg-white shadow-lg z-40 overflow-y-auto p-6 transition-all"
          role="menu"
          aria-label="Shop categories"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuData.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xl font-bold mb-4 uppercase">{section.title}</h3>
                <div className="flex flex-col gap-2">
                  {section.items.map((item, idx) =>
                    createMenuItem(item.name, item.label, sectionIndex * 10 + idx)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopMenu;
