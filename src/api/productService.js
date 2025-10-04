import axiosInstance from './axiosInstance.js';

/**
 * Fetch all products with optional filters
 * @param {Object} params - Optional query parameters
 * @param {number} params.page - Page number for pagination
 * @param {number} params.limit - Number of items per page
 * @param {string} params.category - Filter by category
 * @param {string} params.goals - Filter by goals
 * @param {string} params.search - Search term
 * @param {string} params.sortBy - Sort field
 * @param {string} params.sortOrder - Sort order (asc/desc)
 * @returns {Promise<Object>} Products data
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/products', {
      params: {
        ...params,
      },
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch products',
      status: error.response?.status || 500,
    };
  }
};

/**
 * Fetch a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Product data
 */
export const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const response = await axiosInstance.get(`/products/${id}`);
    
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch product',
      status: error.response?.status || 500,
    };
  }
};

/**
 * Search products by query
 * @param {string} query - Search query
 * @param {Object} params - Additional parameters
 * @returns {Promise<Object>} Search results
 */
export const searchProducts = async (query, params = {}) => {
  try {
    const response = await axiosInstance.get('/products/search', {
      params: {
        q: query,
        ...params,
      },
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to search products',
      status: error.response?.status || 500,
    };
  }
};

/**
 * Get product categories
 * @returns {Promise<Object>} Categories data
 */
export const getProductCategories = async () => {
  try {
    const response = await axiosInstance.get('/products/categories');
    
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch categories',
      status: error.response?.status || 500,
    };
  }
};