import { useEffect, useRef } from 'react';

export function useSliderAutoplay(interval = 8000) {
    const sliderRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [interval]);

    return sliderRef;
}
