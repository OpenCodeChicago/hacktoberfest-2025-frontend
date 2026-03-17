import { useState, useCallback } from 'react';
import { LinkButton, Slider } from '../ui';
import { useSliderAutoplay } from '../../hooks/useSliderAutoplay';
import heroSlides from './heroSlides';

function HeroSection() {
  const sliderRef = useSliderAutoplay(8000);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = useCallback((_, next) => setActiveSlide(next), []);

  return (
    <section
      className="hero-section overflow-hidden"
      aria-label="Hero carousel"
      id="hero-section"
    >
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeSlide + 1} of {heroSlides.length}
      </span>
      <Slider
        ref={sliderRef}
        className="hero-slider h-full"
        autoplay={false}
        speed={1000}
        fade
        dots
        arrows={false}
        infinite
        beforeChange={handleSlideChange}
      >
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full">
            <picture className="block w-full h-full">
              <source
                media="(max-width: 40rem)"
                type="image/webp"
                srcSet={slide.mobile}
              />
              <source type="image/webp" srcSet={slide.srcSet} sizes="100vw" />
              <img
                src={slide.fallback}
                alt={slide.alt}
                tabIndex={-1}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
                className="w-full h-full object-cover object-top md:object-contain md:object-center xl:object-cover xl:object-center min-h-[550px]"
              />
            </picture>

            <LinkButton
              to={slide.to}
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
