import { useEffect } from 'react';

export function useIntersectionObserver({
    ref,
    selector,
    className = 'animate-fadeInUp',
    threshold = 0.12,
    onIntersect
}) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const container = ref.current;
        if (!container) return;

        const elements = Array.from(container.querySelectorAll(selector));
        if (!elements.length) return;

        if (!('IntersectionObserver' in window)) {
            elements.forEach((el) => {
                el.classList.add(className);
                onIntersect?.(el);
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        el.classList.add(className);
                        onIntersect?.(el);
                        obs.unobserve(el);
                    }
                });
            },
            { threshold }
        );

        elements.forEach((el) => observer.observe(el));

        // Check for elements already in viewport on load
        const initialEntries = observer.takeRecords();
        initialEntries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                onIntersect?.(entry.target);
                observer.unobserve(entry.target);
            }
        });

        return () => observer.disconnect();
    }, [ref, selector, className, threshold, onIntersect]);
}
