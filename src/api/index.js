// API Services - Centralized exports

export { default as axiosInstance } from './axiosInstance.js';

export {
  getProducts,
  getProductById,
  searchProducts,
  getProductCategories,
} from './productService.js';

export {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from './cartService.js';

export * from './productService.js';
export * from './cartService.js';