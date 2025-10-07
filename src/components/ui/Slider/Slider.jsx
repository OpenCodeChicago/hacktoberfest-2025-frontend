import ReactSlick from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

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
