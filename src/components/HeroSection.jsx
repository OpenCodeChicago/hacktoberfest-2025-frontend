import { LinkButton, Slider } from "./ui";
import { useSliderAutoplay } from "../hooks/useSliderAutoplay";

import { heroJoin, heroCorex, heroUnlock, heroSales } from "../assets/hero";

const slides = [
    {
        image: heroCorex,
        buttonLabel: "Shop Now",
        href: "/products",
        alt: "CoreX Nutrition - Science-backed supplements for peak performance"
    },
    {
        image: heroSales,
        buttonLabel: "Shop Now",
        href: "/products",
        alt: "Special offer - CoreX supplements on 40% off sale now"
    },
    {
        image: heroUnlock,
        buttonLabel: "Shop Now",
        href: "/products",
        alt: "Unlock your potential with CoreX performance supplements"
    },
    {
        image: heroJoin,
        buttonLabel: "Join Us",
        href: "/about-corex",
        alt: "Join the CoreX community - Premium supplements for serious athletes"
    },
];

function HeroSection() {
    const sliderRef = useSliderAutoplay(8000);

    return (
        <section className="hero-section" aria-label="Hero carousel" id="hero-section">
            <Slider
                ref={sliderRef}
                className="hero-slider"
                autoplay={false}
                speed={1000}
                fade
                dots
                arrows={false}
                infinite
            >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-auto block"
                            tabIndex={-1}
                        />

                        <LinkButton
                            href={slide.href}
                            className="absolute bottom-10 right-8 md:bottom-21 md:right-21"
                        >
                            {slide.buttonLabel}
                        </LinkButton>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default HeroSection
