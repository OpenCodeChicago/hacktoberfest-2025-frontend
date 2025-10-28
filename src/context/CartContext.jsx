import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCart,
  addToCartAsync,
  removeFromCartAsync,
  updateQuantityAsync,
  clearCartAsync,
  resetCart,
} from '../store/cartSlice';

// Helper function to generate cart item key
function makeCartItemKey(product, selectedFlavor = null) {
  if (!product) return null;
  const productId = product.id ?? product._id ?? product.productId;
  if (!productId) return null;
  return selectedFlavor ? `${String(productId)}_${String(selectedFlavor)}` : String(productId);
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const dispatch = useDispatch();
  const { items, loading, error, synced } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user && !synced) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, user, synced, dispatch]);

  // Reset cart when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(resetCart());
    }
  }, [isAuthenticated, dispatch]);

  // Add item to cart
  const addItem = useCallback(
    async (product, selectedFlavor = null, quantity = 1) => {
      if (!product || quantity <= 0) {
        console.warn('Invalid product or quantity');
        return false;
      }

      if (!isAuthenticated) {
        console.warn('User must be authenticated to add items to cart');
        return false;
      }

      try {
        const productId = product.id ?? product._id ?? product.productId;
        await dispatch(
          addToCartAsync({
            productId,
            quantity,
            selectedFlavor,
          })
        ).unwrap();
        return true;
      } catch (err) {
        console.error('Failed to add item to cart:', err);
        return false;
      }
    },
    [dispatch, isAuthenticated]
  );

  // Update item quantity
  const updateItemQuantity = useCallback(
    async (product, selectedFlavor = null, newQuantity) => {
      if (!product || newQuantity < 0) {
        console.warn('Invalid product or quantity');
        return false;
      }

      if (!isAuthenticated) {
        console.warn('User must be authenticated to update cart');
        return false;
      }

      try {
        const productId = product.id ?? product._id ?? product.productId;
        
        if (newQuantity === 0) {
          // Remove item if quantity is 0
          await dispatch(removeFromCartAsync(productId)).unwrap();
        } else {
          await dispatch(
            updateQuantityAsync({
              productId,
              quantity: newQuantity,
            })
          ).unwrap();
        }
        return true;
      } catch (err) {
        console.error('Failed to update cart item quantity:', err);
        return false;
      }
    },
    [dispatch, isAuthenticated]
  );

  // Remove item from cart
  const removeItem = useCallback(
    async (cartItemKey) => {
      if (!cartItemKey) {
        console.warn('Invalid cart item key');
        return false;
      }

      if (!isAuthenticated) {
        console.warn('User must be authenticated to remove items from cart');
        return false;
      }

      try {
        // Extract productId from cartItemKey (format: "productId" or "productId_flavor")
        const productId = cartItemKey.split('_')[0];
        await dispatch(removeFromCartAsync(productId)).unwrap();
        return true;
      } catch (err) {
        console.error('Failed to remove item from cart:', err);
        return false;
      }
    },
    [dispatch, isAuthenticated]
  );

  // Clear entire cart
  const clearCart = useCallback(async () => {
    if (!isAuthenticated) {
      console.warn('User must be authenticated to clear cart');
      return false;
    }

    try {
      await dispatch(clearCartAsync()).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to clear cart:', err);
      return false;
    }
  }, [dispatch, isAuthenticated]);

  // Get item quantity
  const getItemQuantity = useCallback(
    (product, selectedFlavor = null) => {
      if (!product) return 0;
      const productId = String(product.id ?? product._id ?? product.productId);
      // Match by productId only (ignore flavor for now since backend doesn't store it separately)
      const found = items.find((it) => {
        const itemProductId = String(it.productId ?? it._id ?? it.id);
        return itemProductId === productId;
      });
      return found ? found.quantity || 0 : 0;
    },
    [items]
  );

  // Get total item count
  const getItemCount = useCallback(() => {
    return items.reduce((total, it) => total + (it.quantity || 0), 0);
  }, [items]);

  const value = {
    items,
    loading,
    error,
    isAuthenticated,
    addItem,
    updateItemQuantity,
    removeItem,
    getItemQuantity,
    getItemCount,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

export default CartContext;
