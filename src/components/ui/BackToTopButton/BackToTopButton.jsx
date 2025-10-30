import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * BackToTopButton
 * - appears after scrolling past `showAfter` px
 * - positioned bottom-left, keyboard-accessible, respects reduced-motion
 */
export default function BackToTopButton({ showAfter = 250 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > showAfter);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onKeyDown={onKeyDown}
      title="Back to Top"
      aria-label="Back to Top"
      className={`fixed right-6 sm:right-6 bottom-12 sm:bottom-8 z-[99999] w-11 h-11 sm:w-12 sm:h-12 rounded-full cursor-pointer flex items-center justify-center text-white bg-[#1E3A8A] border border-white/5 shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#0B1724]/20 hover:scale-105
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      style={{
        // Respect device safe area insets (iOS) so button is not flush to device edges
        right: 'calc(env(safe-area-inset-right, 0px) + 28px)',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
        touchAction: 'manipulation',
      }}
    >
      <span className="sr-only">Back to Top</span>
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
