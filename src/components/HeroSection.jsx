import { LinkButton, Slider } from './ui';
import { useSliderAutoplay } from '../hooks/useSliderAutoplay';
import { useState } from 'react';

import {
  heroJoin,
  heroCorex,
  heroUnlock,
  heroSales,
  heroCorexMob640,
  heroCorex1080,
  heroCorex1920,
  heroSalesMob640,
  heroSales1080,
  heroSales1920,
  heroUnlockMob640,
  heroUnlock1080,
  heroUnlock1920,
  heroJoinMob640,
  heroJoin1080,
  heroJoin1920,
} from '../assets';

const slides = [
  {
    mobile: heroCorexMob640,
    srcSet: `${heroCorex1080} 1080w, ${heroCorex1920} 1920w`,
    fallback: heroCorex,
    buttonLabel: 'Shop Now',
    href: '/products',
    alt: 'CoreX Nutrition - Science-backed supplements for peak performance',
  },
  {
    mobile: heroSalesMob640,
    srcSet: `${heroSales1080} 1080w, ${heroSales1920} 1920w`,
    fallback: heroSales,
    buttonLabel: 'Shop Now',
    href: '/products',
    alt: 'Special offer - CoreX supplements on 40% off sale now',
  },
  {
    mobile: heroUnlockMob640,
    srcSet: `${heroUnlock1080} 1080w, ${heroUnlock1920} 1920w`,
    fallback: heroUnlock,
    buttonLabel: 'Shop Now',
    href: '/products',
    alt: 'Unlock your potential with CoreX performance supplements',
  },
  {
    mobile: heroJoinMob640,
    srcSet: `${heroJoin1080} 1080w, ${heroJoin1920} 1920w`,
    fallback: heroJoin,
    buttonLabel: 'Join Us',
    href: '/about-corex',
    alt: 'Join the CoreX community - Premium supplements for serious athletes',
  },
];

function HeroSection() {
  const sliderRef = useSliderAutoplay(8000);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section
      className="hero-section h-[calc(100vh-4rem)] sm:h-auto xl:h-[calc(100vh-4rem)] overflow-hidden"
      aria-label="Hero carousel"
      id="hero-section"
    >
      <Slider
        ref={sliderRef}
        className="hero-slider h-full"
        autoplay={false}
        speed={1000}
        fade
        dots
        arrows={false}
        infinite
        beforeChange={(current, next) => setActiveSlide(next)}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <picture className="block w-full h-full">
              <source
                media="(max-width: 40rem)"
                type="image/webp"
                srcSet={slide.mobile}
              />
              <source
                type="image/webp"
                srcSet={slide.srcSet}
                sizes="100vw"
              />
              <img
                src={slide.fallback}
                alt={slide.alt}
                tabIndex={-1}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
                className="w-full h-full object-cover object-top md:object-contain md:object-center xl:object-cover xl:object-center"
              />
            </picture>

            <LinkButton
              href={slide.href}
              className="absolute bottom-22 right-8 sm:right-14 sm:bottom-20 md:bottom-30 md:right-21 animate-fade-slide-up"
              tabIndex={index === activeSlide ? 0 : -1}
              aria-hidden={index !== activeSlide}
            >
              {slide.buttonLabel}
            </LinkButton>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HeroSection;
