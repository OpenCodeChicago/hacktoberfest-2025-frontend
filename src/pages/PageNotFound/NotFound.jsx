import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex md:items-start md:justify-start justify-center items-center px-10 md:py-5 bg-cover bg-center text-white">

      {/* Background Images */}
      <picture>
        {/* Desktop Background */}
        <source media="(min-width: 768px)" srcSet="/images/notFoundLandscape.png" />
        {/* Mobile Background */}
        <img
          src="/images/pnf-mob.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <section className="relative z-10 flex flex-col justify-center items-center text-center px-6 md:px-12 py-6 max-w-3xl">

        {/* 404 SVG */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/assets/404-desktop.svg" />
          <img
            src="/assets/404-mobile.svg"
            alt="404 Illustration"
            className="w-[280px] md:w-[400px] mb-4"
            loading="lazy"
          />
        </picture>

        {/* Not Found SVG */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/assets/notfound-desktop.svg" />
          <img
            src="/assets/notfound-mobile.svg"
            alt="Not Found Text"
            className="w-[200px] md:w-[300px] mb-6"
            loading="lazy"
          />
        </picture>

        {/* Text */}
        <p
          className="uppercase text-base md:text-lg font-bold tracking-wide text-white"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Oops! This page wandered off the workout plan.
        </p>

        <p
          className="mt-4 md:text-sm text-xs leading-relaxed max-w-xl text-white"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Looks like the page you’re looking for doesn’t exist. But don’t worry — your fitness journey doesn’t stop here.
          Fuel your goals with{" "}
          <span className="text-red-500 font-semibold">CoreX</span> supplements.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 text-base">
          {/* Filled → bordered on hover */}
          <Link
            to="/"
            className="bg-[#F7FAFF] text-[#010409] font-medium uppercase text-sm md:text-base px-10 py-3 rounded-xl border border-[#F7FAFF] transition-all duration-300 hover:bg-transparent hover:text-white shadow-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            GO TO HOME PAGE
          </Link>

          {/* Bordered → filled on hover */}
          <Link
            to="/products"
            className="border border-[#F7FAFF] text-white font-medium uppercase text-sm md:text-base px-10 py-3 rounded-xl transition-all duration-300 hover:bg-[#F7FAFF] hover:text-[#010409] shadow-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    </main>
  );
}
