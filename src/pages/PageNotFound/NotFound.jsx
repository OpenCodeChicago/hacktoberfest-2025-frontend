import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
      style={{
        backgroundImage: "url('/images/notFoundLandscape.jpg')", // replace with your image path
      }}
    >
      {/* Overlay for dark tint */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-wider">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-200">
          NOT FOUND
        </h2>

        <p className="uppercase mt-6 text-gray-300 font-semibold">
          Oops! This page wandered off the workout plan.
        </p>

        <p className="mt-3 text-gray-400 leading-relaxed">
          Looks like the page you’re looking for doesn’t exist. But don’t worry — 
          your fitness journey doesn’t stop here. Fuel your goals with 
          <span className="text-red-500 font-semibold"> CoreX</span> supplements.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-red-600 hover:text-white transition"
          >
            GO TO HOME PAGE
          </Link>

          <Link
            to="/products"
            className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 hover:border-red-600 transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
}
