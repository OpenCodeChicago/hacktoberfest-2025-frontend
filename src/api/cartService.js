import axiosInstance from './axiosInstance.js';

/**
 * Cart Service - User-specific cart management with JWT authentication
 * All endpoints require authentication via JWT token in Authorization header
 */

/**
 * Get current authenticated user's cart
 * @returns {Promise<Object>} Cart data with items, total, and itemCount
 * @throws {Error} If user is not authenticated or request fails
 */
export const getCart = async () => {
  try {
    const response = await axiosInstance.get('/cart');
    return {
      success: true,
      data: response.data.data || response.data.cart || response.data,
      message: 'Cart retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch cart',
      status: error.response?.status,
    };
  }
};

/**
 * Add item to authenticated user's cart
 * @param {Object} item - Item to add to cart
 * @param {string|number} item.productId - Product ID
 * @param {number} item.quantity - Quantity to add
 * @param {string} [item.selectedFlavor] - Optional flavor selection
 * @returns {Promise<Object>} Updated cart data
 * @throws {Error} If user is not authenticated or request fails
 */
export const addToCart = async (item) => {
  try {
    const response = await axiosInstance.post('/cart', {
      productId: item.productId,
      quantity: item.quantity || 1,
      selectedFlavor: item.selectedFlavor || null,
    });
    return {
      success: true,
      data: response.data.data || response.data.cart || response.data,
      message: response.data.message || 'Item added to cart successfully',
    };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw {
      success: false,
      message: error.response?.data?.message || 'Failed to add item to cart',
      status: error.response?.status,
    };
  }
};

/**
 * Remove item from authenticated user's cart
 * @param {string|number} productId - Product ID to remove
 * @returns {Promise<Object>} Updated cart data
 * @throws {Error} If user is not authenticated or request fails
 */
export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/cart/${productId}`);
    return {
      success: true,
      data: response.data.data || response.data.cart || response.data,
      message: response.data.message || 'Item removed from cart successfully',
    };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw {
      success: false,
      message: error.response?.data?.message || 'Failed to remove item from cart',
      status: error.response?.status,
    };
  }
};

/**
 * Update cart item quantity for authenticated user
 * @param {string|number} productId - Product ID
 * @param {number} quantity - New quantity (0 to remove)
 * @returns {Promise<Object>} Updated cart data
 * @throws {Error} If user is not authenticated or request fails
 */
export const updateCartItemQuantity = async (productId, quantity) => {
  try {
    const response = await axiosInstance.put(`/cart/${productId}`, {
      quantity: quantity,
    });
    return {
      success: true,
      data: response.data.data || response.data.cart || response.data,
      message: response.data.message || 'Cart item quantity updated successfully',
    };
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw {
      success: false,
      message: error.response?.data?.message || 'Failed to update cart item quantity',
      status: error.response?.status,
    };
  }
};

/**
 * Clear entire cart for authenticated user
 * @returns {Promise<Object>} Empty cart data
 * @throws {Error} If user is not authenticated or request fails
 */
export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete('/cart');
    return {
      success: true,
      data: response.data.cart || {
        items: [],
        total: 0,
        itemCount: 0,
      },
      message: response.data.message || 'Cart cleared successfully',
    };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw {
      success: false,
      message: error.response?.data?.message || 'Failed to clear cart',
      status: error.response?.status,
    };
  }
};