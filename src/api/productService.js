import axiosInstance from './axiosInstance.js';

/**
 * Transforms a single product from the API response to the format used in the frontend.
 * @param {Object} apiProduct - The product object from the API.
 * @returns {Object} Transformed product object.
 */
const transformProduct = (apiProduct) => {
  const originalPrice = apiProduct.sale > 0
    ? Number((apiProduct.price / (1 - apiProduct.sale / 100)).toFixed(2))
    : null;

  return {
    id: apiProduct._id,
    name: apiProduct.name,
    description: apiProduct.description || apiProduct.shortDescription,
    price: apiProduct.price,
    originalPrice: originalPrice,
    category: apiProduct.category,
    imageUrl: apiProduct.image,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviewsCount,
    stock: 15, // Consider fetching stock from the API if available
    isNew: apiProduct.new,
    onSale: apiProduct.sale > 0,
    flavors: apiProduct.flavors || [],
    features: apiProduct.quality || [],
    goals: apiProduct.goals || [],
    sizes: apiProduct.sizes || [],
    salePercentage: apiProduct.sale,
    longDescription: apiProduct.longDescription,
    usageTips: apiProduct.usageTips || []
  };
};

/**
 * Transforms the API response containing multiple products.
 * @param {Object} apiResponse - The response object from the API.
 * @returns {Object} Transformed response object.
 */
const transformApiResponse = (apiResponse) => {
  return {
    products: apiResponse.products.map(transformProduct),
    totalCount: apiResponse.total,
    currentPage: apiResponse.page,
    hasNextPage: apiResponse.page < apiResponse.pages,
    totalPages: apiResponse.pages
  };
};

/**
 * Fetches products from the API and transforms the response.
 * @param {Object} params - Query parameters for fetching products.
 * @returns {Promise<Object>} Result containing success status and data.
 */
export const getProducts = async (params = {}) => {
  try {
    const apiParams = {
      page: params.page,
      limit: params.limit,
      category: params.category,
      goals: params.goals,
      search: params.search,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    };

    const response = params.sort
      ? await axiosInstance.get(`/products/sort/${encodeURIComponent(params.sort)}`, { params: apiParams })
      : await axiosInstance.get('/products', { params: apiParams });

    const data = response.data;

    return {
      success: true,
      data: Array.isArray(data) ? {
        products: data,
        total: data.length,
        page: 1,
        pages: 1,
      } : transformApiResponse(data),
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
 * Fetches a single product by ID and transforms the response.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} Result containing success status and data.
 */
export const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const response = await axiosInstance.get(`/products/${id}`);

    return {
      success: true,
      data: transformProduct(response.data),
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
 * Searches for products based on a query and transforms the response.
 * @param {string} query - The search query.
 * @param {Object} params - Additional query parameters.
 * @returns {Promise<Object>} Result containing success status and data.
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
 * Fetches product categories from the API.
 * @returns {Promise<Object>} Result containing success status and data.
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

/**
 * Fetches recommended products based on a product ID.
 * @param {string} id - The ID of the product to base recommendations on.
 * @param {number} limit - The number of recommended products to fetch.
 * @returns {Promise<Object>} Result containing success status and data.
 */
export const getRecommendedProducts = async (id, limit = 3) => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    // const response = await axiosInstance.get(`/products/recommended/${id}?limit=${limit}`);
    const response = await axiosInstance.get(`/products/${id}/recommended?limit=${limit}`);


    return {
      success: true,
      data: response.data.products.map(transformProduct),
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch recommended products',
      status: error.response?.status || 500,
    };
  }
};

