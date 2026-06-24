import ReactSlickImport from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

// react-slick is a CommonJS package. Vite's Rolldown dep pre-bundler can hand
// back the module's CJS `exports` object ({ __esModule, default }) instead of
// the Slider class itself, which makes React throw "Element type is invalid".
// Unwrap defensively so this works whether we get the object or the class.
const ReactSlick = ReactSlickImport?.default ?? ReactSlickImport;

export default function Slider({
    children,
    autoplay = false,
    autoplaySpeed = 3000,
    speed = 500,
    dots = true,
    arrows = false,
    infinite = true,
    fade = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    pauseOnHover = true,
    className = "",
    ...customSettings
}) {
    const sliderSettings = {
        dots,
        arrows,
        infinite,
        speed,
        slidesToShow,
        slidesToScroll,
        autoplay,
        autoplaySpeed,
        fade,
        pauseOnHover,
        waitForAnimate: false,
        className,
        ...customSettings
    };

    return (
        <ReactSlick {...sliderSettings}>
            {children}
        </ReactSlick>
    );
}
