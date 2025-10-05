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

export const authServices = {
  login: (credentials) => {
    console.warn('⚠️  authServices not yet implemented. Use new API services from @/api when available.');
    return api.post('/api/auth/login', credentials);
  },
  
  register: (userData) => {
    console.warn('⚠️  authServices not yet implemented. Use new API services from @/api when available.');
    return api.post('/api/auth/register', userData);
  },
  
  logout: () => {
    console.warn('⚠️  authServices not yet implemented. Use new API services from @/api when available.');
    return api.post('/api/auth/logout');
  },
  
  refreshToken: () => {
    console.warn('⚠️  authServices not yet implemented. Use new API services from @/api when available.');
    return api.post('/api/auth/refresh');
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