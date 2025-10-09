import React, { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function TopHeader() {
  const messages = [
    <>
      Buy 1 get 1{' '}
      <span className="underline decoration-red-500 decoration-2 underline-offset-4 text-white">
        50% off
      </span>
    </>,
    <>
      <span className="underline decoration-red-500 decoration-2 underline-offset-4 text-white">
        Free shipping
      </span>{' '}
      on orders over $110
    </>,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 10000); // rotates every 10 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <header className="w-full bg-[#0D1B2A] text-white text-sm fixed py-2 px-2 flex items-center justify-between z-50">
      {/* Center Promo Message */}
      <div className="flex-1 text-center font-medium">
        <p className="transition-opacity duration-500 ease-in-out">
          {messages[index]}
        </p>
      </div>
      {/* Right Side Icons */}
      <div className="flex space-x-4 ml-4">
        <a href="#" aria-label="Facebook" className="hover:text-gray-300">
          <FaFacebookF
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-gray-300">
          <FaTwitter
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gray-300">
          <FaInstagram size={18} />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-gray-300">
          <FaLinkedinIn
            size={18}
            className="fill-current text-white hover:text-gray-300"
            stroke="none"
          />
        </a>
      </div>
    </header>
  );
}
