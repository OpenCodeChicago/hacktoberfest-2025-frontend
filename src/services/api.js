import axios from 'axios';

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://corexshoptest.onrender.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (when authentication is implemented)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

// Product API services
export const productServices = {
  // Get all products with optional query parameters
  getProducts: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    return api.get(url);
  },

  // Get product by ID
  getProductById: (id) => {
    return api.get(`/api/products/${id}`);
  },

  // Future methods for when backend supports them:
  // createProduct: (productData) => api.post('/api/products', productData),
  // updateProduct: (id, productData) => api.put(`/api/products/${id}`, productData),
  // deleteProduct: (id) => api.delete(`/api/products/${id}`),
};

// Auth API services (stubs for future implementation)
export const authServices = {
  login: (credentials) => {
    // TODO: Implement when backend auth is ready
    return api.post('/api/auth/login', credentials);
  },
  
  register: (userData) => {
    // TODO: Implement when backend auth is ready
    return api.post('/api/auth/register', userData);
  },
  
  logout: () => {
    // TODO: Implement when backend auth is ready
    return api.post('/api/auth/logout');
  },
  
  refreshToken: () => {
    // TODO: Implement when backend auth is ready
    return api.post('/api/auth/refresh');
  },
};

// Cart API services (stubs for future implementation)
export const cartServices = {
  getCart: () => {
    // TODO: Implement when backend cart is ready
    return api.get('/api/cart');
  },
  
  addToCart: (productId, quantity) => {
    // TODO: Implement when backend cart is ready
    return api.post('/api/cart/add', { productId, quantity });
  },
  
  updateCartItem: (itemId, quantity) => {
    // TODO: Implement when backend cart is ready
    return api.put(`/api/cart/items/${itemId}`, { quantity });
  },
  
  removeFromCart: (itemId) => {
    // TODO: Implement when backend cart is ready
    return api.delete(`/api/cart/items/${itemId}`);
  },
  
  clearCart: () => {
    // TODO: Implement when backend cart is ready
    return api.delete('/api/cart');
  },
};

export default api;