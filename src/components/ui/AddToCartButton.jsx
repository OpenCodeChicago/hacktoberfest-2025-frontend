import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addToCart, 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart 
} from '../../store/cartSlice';
import { 
  addToCart as addToCartUtil, 
  incrementCartQuantity, 
  decrementCartQuantity, 
  removeFromCart as removeFromCartUtil,
  getCartItemQuantity 
} from '../../utils/cart';

const CartIcon = ({ className = 'h-6 w-6' }) => (
  <img src="/images/cart-icon.svg" alt="Add to cart" className={className} />
);

const AddToCartButton = ({ 
  product, 
  selectedFlavor = null, 
  onCartMenuOpen = null,
  className = '',
  size = 'default' // 'default' or 'small'
}) => {
  const dispatch = useDispatch();
  const [cartLoading, setCartLoading] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  
  const cartLoadingTimeoutRef = React.useRef(null);
  const cartAddedTimeoutRef = React.useRef(null);

  // Get cart item quantity from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  
  // Create cart item key
  const productId = product?.id || product?._id;
  const cartItemKey = selectedFlavor ? `${productId}_${selectedFlavor}` : productId;
  
  // Find current item in cart
  const cartItem = cartItems.find(item => item.cartItemKey === cartItemKey);
  const currentQuantity = cartItem?.quantity || 0;

  // Update local state when cart changes
  useEffect(() => {
    setIsInCart(currentQuantity > 0);
    setQuantity(currentQuantity);
  }, [currentQuantity]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Visual feedback: show loading, then added state
    setCartLoading(true);
    
    if (cartLoadingTimeoutRef.current) {
      clearTimeout(cartLoadingTimeoutRef.current);
    }
    
    cartLoadingTimeoutRef.current = setTimeout(() => {
      setCartLoading(false);
      setCartAdded(true);
      
      // Add to Redux store
      dispatch(addToCart({ 
        product, 
        selectedFlavor, 
        quantity: 1 
      }));
      
      // Add to localStorage
      addToCartUtil(product, selectedFlavor, 1);
      
      // Open cart menu if callback provided
      if (onCartMenuOpen) {
        onCartMenuOpen();
      }
      
      // Keep added state visible for ~1.5s
      if (cartAddedTimeoutRef.current) {
        clearTimeout(cartAddedTimeoutRef.current);
      }
      cartAddedTimeoutRef.current = setTimeout(() => {
        setCartAdded(false);
      }, 1500);
    }, 700);
  };

  const handleIncrement = () => {
    if (isInCart) {
      // Update Redux store
      dispatch(incrementQuantity({ cartItemKey }));
      // Update localStorage
      incrementCartQuantity(cartItemKey);
    } else {
      // Add to cart if not already in cart
      handleAddToCart();
    }
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      // Remove from cart
      dispatch(removeFromCart({ cartItemKey }));
      removeFromCartUtil(cartItemKey);
    } else {
      // Decrease quantity
      dispatch(decrementQuantity({ cartItemKey }));
      decrementCartQuantity(cartItemKey);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (cartLoadingTimeoutRef.current) {
        clearTimeout(cartLoadingTimeoutRef.current);
      }
      if (cartAddedTimeoutRef.current) {
        clearTimeout(cartAddedTimeoutRef.current);
      }
    };
  }, []);

  // Size classes
  const sizeClasses = {
    default: 'py-3 px-4 text-sm',
    small: 'py-2 px-3 text-xs'
  };

  const iconSizeClasses = {
    default: 'h-5 w-5',
    small: 'h-4 w-4'
  };

  if (!product) {
    return null;
  }

  // Show quantity controls if item is in cart
  if (isInCart && quantity > 0) {
    return (
      <div className={`flex items-center bg-[#023e8a] text-white rounded-r-xl ${sizeClasses[size]} ${className}`}>
        {/* Decrement button */}
        <button
          onClick={handleDecrement}
          className="flex items-center justify-center w-8 h-8 rounded-l-lg hover:bg-[#1054ab] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Decrease quantity"
        >
          <svg
            className="w-4 h-4"
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
        
        {/* Quantity display */}
        <div className="flex items-center justify-center min-w-[2rem] px-2 border-l border-r border-white/20">
          <span className="font-semibold">{quantity}</span>
        </div>
        
        {/* Increment button */}
        <button
          onClick={handleIncrement}
          className="flex items-center justify-center w-8 h-8 rounded-r-lg hover:bg-[#1054ab] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Increase quantity"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Show add to cart button
  return (
    <button
      onClick={handleAddToCart}
      className={`
        -ml-px flex-grow flex items-center justify-center gap-2 font-medium 
        rounded-r-xl transition-colors duration-150 hover:shadow-lg cursor-pointer
        focus:outline-none focus:z-10 bg-[#023e8a] text-white hover:bg-[#1054ab]
        ${sizeClasses[size]} ${className}
      `}
      aria-live="polite"
      disabled={cartLoading}
    >
      {cartLoading ? (
        <span className="ml-2 flex items-center gap-2 font-semibold">
          <img
            src="/images/add-to-cart-animation.gif"
            alt="Adding to cart..."
            className={`${iconSizeClasses[size]} object-contain`}
            aria-hidden="true"
          />
          <span>ADDING...</span>
        </span>
      ) : cartAdded ? (
        <span className="ml-2 flex items-center gap-2 font-semibold">
          <img
            src="/images/add-to-cart-animation.gif"
            alt="Added to cart"
            className={`${iconSizeClasses[size]} object-contain`}
            aria-hidden="true"
          />
          <span>ADDED</span>
        </span>
      ) : (
        <>
          <CartIcon className={iconSizeClasses[size]} />
          <span className="ml-2">ADD TO CART</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
