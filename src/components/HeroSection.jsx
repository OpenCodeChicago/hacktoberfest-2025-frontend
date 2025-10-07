import { LinkButton, Slider } from "./ui";

import { heroJoin, heroCorex, heroUnlock, heroSales } from "../assets/hero";

const slides = [
    {
        image: heroJoin,
        buttonLabel: "Join Us",
        href: "/about-corex",
        alt: "Join the CoreX community - Premium supplements for serious athletes"
    },
    {
        image: heroCorex,
        buttonLabel: "Shop Now",
        href: "/products",
        alt: "CoreX Nutrition - Science-backed supplements for peak performance"
    },
    {
        image: heroUnlock,
        buttonLabel: "Shop Now",
        href: "/products",
        alt: "Unlock your potential with CoreX performance supplements"
    },
    {
        image: heroSales,
        buttonLabel: "Shop Now",
        href: "/products",
        alt: "Special offer - CoreX supplements on 40% off sale now"
    }
];

function HeroSection() {
    return (
        <section className="hero-section" aria-label="Hero carousel" id="hero-section">
            <Slider
                className="hero-slider"
                autoplay
                autoplaySpeed={4000}
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
