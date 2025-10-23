import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Dynamically add Google Font
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fredoka:wght@413&family=Poppins:wght@600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center md:flex justify-center items-center text-white text-center px-4"
      style={{
        backgroundImage: isMobile
          ? "url('/images/pnf-mob.png')" // mobile image
          : "url('/images/notFoundGym.jpg')", // desktop image
      }}
    >
      <div className="md:w-1/2 max-w-2xl px-12 pt-30 md:pt-0">
        {/* 404 text */}
        <div className='bg-black/30 backdrop-blur-md p-6 rounded-xl'>
          <h1 className="text-9xl md:text-9xl text-red-500 font-extrabold tracking-widest" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            404
          </h1>

          {/* Subtitle */}
          <h2
            className="text-4xl  text-center md:text-7xl mt-4 "
            style={{ fontFamily: '"Fredoka", sans-serif' }}
          >
            NOT FOUND
          </h2>
        </div>
        {/* Description */}
        <p className="uppercase mt-6 bg-blue-900/40 backdrop-blur-md p-6 rounded-xl text-center  font-semibold" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 700 }}>
          Oops! This page wandered off the workout plan.
        </p>

        <p className="mt-3 bg-black-900/40 backdrop-blur-md p-6 rounded-xl text-center leading-relaxed" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 600 }}>
          Looks like the page you're looking for doesn't exist. But don't worry
          — your fitness journey doesn't stop here. Fuel your goals with CoreX
          supplements.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" >
          <Link
            to="/"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 hover:text-white transition" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 600 }}
          >
            GO TO HOME PAGE
          </Link>

          <Link
            to="/products"
            className="border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 hover:border-red-600 transition" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 600 }}
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
}
