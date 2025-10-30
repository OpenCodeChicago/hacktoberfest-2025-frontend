/**
 * @deprecated This file is deprecated. Use the new centralized API services from @/api instead.
 * 
 * New usage:
 * import { getProducts, getProductById } from '@/api/productService';
 * import { getCart, addToCart } from '@/api/cartService';
 * 
 * Or import everything from the centralized index:
 * import { getProducts, getProductById, getCart } from '@/api';
 */

import { 
  getProducts as newGetProducts, 
  getProductById as newGetProductById 
} from '../api/productService.js';

import { 
  getCart as newGetCart,
  addToCart as newAddToCart,
  removeFromCart as newRemoveFromCart,
  updateCartItemQuantity as newUpdateCartItemQuantity,
  clearCart as newClearCart
} from '../api/cartService.js';

import { axiosInstance } from '../api/axiosInstance.js';

const api = axiosInstance;

export const productServices = {
  getProducts: async (params = {}) => {
    console.warn('⚠️  Using deprecated productServices.getProducts. Use getProducts from @/api/productService instead.');
    const result = await newGetProducts(params);
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },

  getProductById: async (id) => {
    console.warn('⚠️  Using deprecated productServices.getProductById. Use getProductById from @/api/productService instead.');
    const result = await newGetProductById(id);
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },
};

// Auth services can be removed if not implemented
export const authServices = {
  login: (credentials) => {
    // POST to /auth/login; server is expected to set HttpOnly cookie and optionally return user/token
    return api.post('/auth/login', credentials);
  },

  register: (userData) => {
    // POST to /auth/register; server should set cookie and return user/token as appropriate
    return api.post('/auth/register', userData);
  },

  logout: () => {
    // POST to /auth/logout to clear server-side cookie/session
    return api.post('/auth/logout');
  },

  refreshToken: () => {
    // POST to /auth/refresh using cookies; server returns a new token or re-establishes session
    return api.post('/auth/refresh');
  },
};

export const cartServices = {
  getCart: async () => {
    console.warn('⚠️  Using deprecated cartServices.getCart. Use getCart from @/api/cartService instead.');
    const result = await newGetCart();
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },
  
  addToCart: async (productId, quantity) => {
    console.warn('⚠️  Using deprecated cartServices.addToCart. Use addToCart from @/api/cartService instead.');
    const result = await newAddToCart({ productId, quantity });
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },
  
  updateCartItem: async (itemId, quantity) => {
    console.warn('⚠️  Using deprecated cartServices.updateCartItem. Use updateCartItemQuantity from @/api/cartService instead.');
    const result = await newUpdateCartItemQuantity(itemId, quantity);
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },
  
  removeFromCart: async (itemId) => {
    console.warn('⚠️  Using deprecated cartServices.removeFromCart. Use removeFromCart from @/api/cartService instead.');
    const result = await newRemoveFromCart(itemId);
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },
  
  clearCart: async () => {
    console.warn('⚠️  Using deprecated cartServices.clearCart. Use clearCart from @/api/cartService instead.');
    const result = await newClearCart();
    
    if (result.success) {
      return { data: result.data };
    } else {
      throw new Error(result.error);
    }
  },
};

export default api;