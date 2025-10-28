import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const DEBOUNCE_DELAY = 180; // ms: short in-flight guard to avoid rapid-click races

const CartIcon = ({ className = 'h-6 w-6' }) => (
  <img src="/images/cart-icon.svg" alt="Add to cart" className={className} />
);

const AddToCartButton = ({ className, product, selectedFlavor }) => {
  const [countAnimation, setCountAnimation] = useState('');
  const animationTimeoutRef = useRef(null);

  // Cart context
  const { getItemQuantity, addItem, updateItemQuantity } = useCart();
  // Local reactive quantity to avoid stale closures when user updates cart elsewhere
  const [localQuantity, setLocalQuantity] = useState(() =>
    getItemQuantity(product, selectedFlavor)
  );
  // small in-flight guard to prevent rapid click race conditions
  const [inFlight, setInFlight] = useState(false);

  // Keep local quantity synced whenever cart context changes
  useEffect(() => {
    setLocalQuantity(getItemQuantity(product, selectedFlavor));
  }, [getItemQuantity, product, selectedFlavor]);

  const cartQuantity = localQuantity || 0;

  const triggerCountAnimation = (direction) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setCountAnimation(
      direction === 'up' ? 'animate-count-up' : 'animate-count-down'
    );
    animationTimeoutRef.current = setTimeout(() => {
      setCountAnimation('');
    }, 350);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  const handleAddToCart = () => {
    // If not in cart, add first item - read latest value from context
    if (inFlight) return;
    const current = getItemQuantity(product, selectedFlavor) || 0;
    if (current === 0) {
      setInFlight(true);
      const ok = addItem(product, selectedFlavor, 1);
      if (ok) setLocalQuantity(1);
      // small delay to avoid immediate double clicks
      setTimeout(() => setInFlight(false), DEBOUNCE_DELAY);
      triggerCountAnimation('down'); // First addition animates from below
    }
  };

  const handleIncrement = () => {
    if (inFlight) return;
    setInFlight(true);
    // Read newest quantity from context to avoid stale closure issues
    const current = getItemQuantity(product, selectedFlavor) || 0;
    const newQuantity = current + 1;
    const ok = updateItemQuantity(product, selectedFlavor, newQuantity);
    if (ok) setLocalQuantity(newQuantity);
    // small delay to avoid rapid click races
    setTimeout(() => setInFlight(false), DEBOUNCE_DELAY);
    triggerCountAnimation('down'); // Animation comes from below for increment
  };

  const handleDecrement = () => {
    if (inFlight) return;
    setInFlight(true);
    const current = getItemQuantity(product, selectedFlavor) || 0;
    const newQuantity = Math.max(0, current - 1);
    const ok = updateItemQuantity(product, selectedFlavor, newQuantity);
    if (ok) setLocalQuantity(newQuantity);
    setTimeout(() => setInFlight(false), DEBOUNCE_DELAY);
    triggerCountAnimation('up'); // Animation goes up for decrement
  };

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* --- Add to Cart Button / Counter --- */}
      {cartQuantity === 0 ? (
        // Show "Add to Cart" button when quantity is 0
        <button
          onClick={(e) => handleActionClick(e, handleAddToCart)}
          className={`
            -ml-px flex-grow flex items-center justify-center gap-2 font-medium 
            py-3 px-4 rounded-r-xl transition-colors duration-150 hover:shadow-lg cursor-pointer
            focus:outline-none focus:z-10
            bg-[#023e8a] text-white hover:bg-[#1054ab] ${className}
          `}
          aria-label="Add to cart"
        >
          <CartIcon />
          <span className="ml-2">ADD TO CART</span>
        </button>
      ) : (
        // Show counter when quantity > 0
        <div
          className={`-ml-px flex-grow flex items-stretch bg-[#023e8a] rounded-r-xl overflow-hidden ${className}`}
        >
          {/* Decrement Button */}
          <button
            onClick={(e) => handleActionClick(e, handleDecrement)}
            className="flex-1 flex items-center justify-center w-12 text-white cursor-pointer transition-colors duration-150 focus:outline-none"
            aria-label="Decrease quantity"
            disabled={inFlight}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>

          {/* Quantity Display with dashed border*/}
          <div className="flex-1 flex items-center justify-center relative bg-[#023e8a] py-3">
            <span className="absolute left-0 h-[60%] top-1/2 -translate-y-1/2 border-l border-dashed border-white/40"></span>
            <span className="absolute right-0 h-[60%] top-1/2 -translate-y-1/2 border-r border-dashed border-white/40"></span>
            <span
              className={`text-white font-medium text-md ${countAnimation}`}
              aria-live="polite"
            >
              {cartQuantity}
            </span>
          </div>

          {/* Increment Button */}
          <button
            onClick={(e) => handleActionClick(e, handleIncrement)}
            className="flex-1 flex items-center justify-center w-12 text-white cursor-pointer transition-colors duration-150 focus:outline-none"
            aria-label="Increase quantity"
            disabled={inFlight}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
