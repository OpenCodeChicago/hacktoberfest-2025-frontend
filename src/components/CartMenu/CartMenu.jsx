import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart,
  clearCart 
} from '../../store/cartSlice';
import { 
  incrementCartQuantity, 
  decrementCartQuantity, 
  removeFromCart as removeFromCartUtil,
  clearCart as clearCartUtil 
} from '../../utils/cart';

const CartMenu = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  // Handle cart item quantity changes
  const handleIncrement = (cartItemKey) => {
    dispatch(incrementQuantity({ cartItemKey }));
    incrementCartQuantity(cartItemKey);
  };

  const handleDecrement = (cartItemKey) => {
    dispatch(decrementQuantity({ cartItemKey }));
    decrementCartQuantity(cartItemKey);
  };

  const handleRemove = (cartItemKey) => {
    dispatch(removeFromCart({ cartItemKey }));
    removeFromCartUtil(cartItemKey);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    clearCartUtil();
  };

  // Animation handling
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Cart Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-[#023e8a]" />
            <h2 className="text-xl font-bold text-gray-800">
              Cart ({totalQuantity})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add some products to get started
              </p>
              <Link
                to="/products"
                onClick={onClose}
                className="bg-[#023e8a] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1054ab] transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartItemKey}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl || '/images/missing-picture-product.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">
                          {item.name}
                        </h4>
                        {item.selectedFlavor && (
                          <p className="text-sm text-gray-500">
                            Flavor: {item.selectedFlavor}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-[#023e8a]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrement(item.cartItemKey)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleIncrement(item.cartItemKey)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.cartItemKey)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-[#023e8a]">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleClearCart}
                    className="w-full py-2 px-4 text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium"
                  >
                    Clear Cart
                  </button>
                  
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full bg-[#023e8a] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#1054ab] transition-colors duration-200"
                  >
                    Checkout
                  </Link>
                  
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="block w-full border border-[#023e8a] text-[#023e8a] py-3 px-4 rounded-lg font-medium text-center hover:bg-[#023e8a] hover:text-white transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartMenu;
