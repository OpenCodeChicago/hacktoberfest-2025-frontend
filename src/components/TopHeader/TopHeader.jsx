import { useEffect, useState } from 'react';
import SocialIcons from '../ui/SocialIcons/SocialIcons';

export default function TopHeader() {
  const messages = [
    <>
      Buy 1 get 1{' '}
      <span className=" text-white relative">
        50% off
        <span className="absolute bottom-[-4px] left-0 right-0 w-full">
          <img src="/icons/discount-line.svg" alt="" />
        </span>
      </span>
    </>,
    <>
      <span className=" text-white relative">
        Free shipping
        <span className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-[80%] flex justify-center">
          <img src="/icons/free-shipping-line.svg" alt="" />
        </span>
      </span>{' '}
      on orders over $110
    </>,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full bg-[#0D1B2A] text-white text-sm fixed top-0 left-0 right-0 z-50 h-[48px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
        <div className="flex items-center h-full">
          {/* Promo Message - Centered across full viewport */}
          <div
            className="
              font-medium pointer-events-none
              text-left md:text-center
              w-full md:w-auto
              md:absolute md:left-1/2 md:-translate-x-1/2
            "
          >
            <p className="transition-opacity duration-500 ease-in-out whitespace-nowrap">
              {messages[index]}
            </p>
          </div>

          {/* Right Side Icons - Aligned with main header icons */}
          <div className="ml-auto">
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
