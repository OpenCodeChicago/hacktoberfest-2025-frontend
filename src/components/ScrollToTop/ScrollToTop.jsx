import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A simple component that scrolls the window to the top (0, 0)
 * every time the route location changes.
 */
const ScrollToTop = () => {
  // Get the current page's path (e.g., "/about", "/collections")
  const { pathname } = useLocation();

  // This effect runs every time the 'pathname' changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render any visible HTML
  return null;
};

export default ScrollToTop;