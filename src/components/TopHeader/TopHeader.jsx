import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function TopHeader() {
  const messages = [
    '🎉 Buy 1 get 1 50% off - Limited time offer!', 
    '🚚 Free shipping on orders over $110',
    '💪 New pre-workout formulas now available!',
    '⭐ Join our loyalty program and earn rewards'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // rotates every 5 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full bg-gradient-to-r from-[#0D1B2A] to-[#1a2a3a] text-white text-sm fixed top-0 left-0 z-50 py-2 px-4 flex items-center justify-between border-b border-gray-600">
      {/* Center Promo Message */}
      <div className="flex-1 text-center font-medium">
        <p className="transition-opacity duration-500 ease-in-out">
          {messages[index]}
        </p>
      </div>
      <div className="flex space-x-3 ml-4">
        <a href="#" aria-label="Facebook" className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
          <Facebook
            size={18}
            className="fill-current text-white hover:text-blue-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Twitter" className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
          <Twitter
            size={18}
            className="fill-current text-white hover:text-blue-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Instagram" className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
          <Instagram size={18} className="text-white hover:text-pink-300 transition-colors duration-200" />
        </a>
        <a href="#" aria-label="LinkedIn" className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
          <Linkedin
            size={18}
            className="fill-current text-white hover:text-blue-300"
            stroke="none"
          />
        </a>
      </div>
    </header>
  );
}
