import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function TopHeader() {
  const messages = ['Buy 1 get 1 50% off', 'Free shipping on orders over $110'];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 10000); // rotates every 10 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full bg-[#0D1B2A] py-2.5 text-white top-0 text-sm fixed z-50 px-4 flex items-center justify-between">
      {/* Center Promo Message */}
      <div className="flex-1 text-center font-medium">
        <p className="transition-opacity duration-500 ease-in-out">
          {messages[index]}
        </p>
      </div>
      <div className="flex space-x-4 ml-4">
        <a href="#" aria-label="Facebook" className="hover:text-gray-300">
          <Facebook
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-gray-300">
          <Twitter
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gray-300">
          <Instagram size={18} />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-gray-300">
          <Linkedin
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
      </div>
    </header>
  );
}
