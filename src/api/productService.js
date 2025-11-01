import axiosInstance from './axiosInstance.js';

/**
 * Transforms a single product from the API response to the format used in the frontend.
 * @param {Object} apiProduct - The product object from the API.
 * @returns {Object} Transformed product object.
 */
const transformProduct = (apiProduct = {}) => {
  if (!apiProduct || typeof apiProduct !== 'object') return null;

  const price = Number(apiProduct.price ?? 0);
  const sale = Number(apiProduct.sale ?? 0);
  const originalPrice = sale > 0 ? Number((price / (1 - sale / 100)).toFixed(2)) : null;

  return {
    id: apiProduct._id ?? apiProduct.id ?? null,
    name: apiProduct.name ?? apiProduct.title ?? 'Unnamed Product',
    description: apiProduct.description ?? apiProduct.shortDescription ?? '',
    shortDescription: apiProduct.shortDescription ?? apiProduct.description ?? '',
    longDescription: apiProduct.longDescription ?? '',
    price,
    originalPrice,
    category: apiProduct.category ?? null,
    imageUrl: apiProduct.image ?? apiProduct.imageUrl ?? '/images/product-default-image.jpg',
    imageGallery: Array.isArray(apiProduct.images) ? apiProduct.images : Array.isArray(apiProduct.gallery) ? apiProduct.gallery : [],
    rating: Number(apiProduct.rating ?? 0),
    reviewCount: Number(apiProduct.reviewsCount ?? apiProduct.reviewCount ?? 0),
    stock: Number(apiProduct.stock ?? apiProduct.inventory ?? 0),
    isNew: Boolean(apiProduct.new),
    onSale: sale > 0,
    salePercentage: sale,
    flavors: Array.isArray(apiProduct.flavors) ? apiProduct.flavors : [],
    sizes: Array.isArray(apiProduct.sizes) ? apiProduct.sizes : [],
    quality: Array.isArray(apiProduct.quality) ? apiProduct.quality : [],
    goals: Array.isArray(apiProduct.goals) ? apiProduct.goals : [],
    collections: Array.isArray(apiProduct.collections) ? apiProduct.collections : [],
    usageTips: typeof apiProduct.usageTips === 'object' ? apiProduct.usageTips : {},
    createdAt: apiProduct.createdAt ? new Date(apiProduct.createdAt).toISOString() : null,
    updatedAt: apiProduct.updatedAt ? new Date(apiProduct.updatedAt).toISOString() : null,
    raw: apiProduct, // keep original object for debugging if needed
  };
};

/**
 * Transforms the API response containing multiple products.
 * Accepts several shapes returned by different backends.
 * @param {Object} apiResponse - The response object from the API.
 * @returns {Object} Transformed response object.
 */
const transformApiResponse = (apiResponse = {}) => {
  // apiResponse may be { products: [...], total, page, pages } or { data: { products: [...] } }
  const payload = apiResponse.products ?? apiResponse.data?.products ?? apiResponse.data ?? apiResponse;
  const productsArray = Array.isArray(payload) ? payload : Array.isArray(payload.products) ? payload.products : [];

  const mapped = productsArray.map(transformProduct).filter(Boolean);

  const total = Number(apiResponse.total ?? apiResponse.data?.total ?? payload.total ?? mapped.length);
  const page = Number(apiResponse.page ?? apiResponse.data?.page ?? payload.page ?? 1);
  const pages = Number(apiResponse.pages ?? apiResponse.data?.pages ?? payload.pages ?? 1);

  return {
    products: mapped,
    totalCount: total,
    currentPage: page,
    hasNextPage: page < pages,
    totalPages: pages,
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

    // support multiple payload shapes
    if (Array.isArray(data)) {
      return {
        success: true,
        data: {
          products: data.map(transformProduct).filter(Boolean),
          total: data.length,
          page: 1,
          pages: 1,
        },
        status: response.status,
      };
    }

    // If API returns wrapper like { products: [...], total, page, pages }
    if (data.products || data.data?.products) {
      return {
        success: true,
        data: transformApiResponse(data),
        status: response.status,
      };
    }

    // If API returns nested data or other shapes, attempt to transform generically
    return {
      success: true,
      data: transformApiResponse(data),
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch products',
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
    const data = response.data;

    // Accept shapes: { ...product }, { product: {...} }, { data: { product: {...} } }
    const productPayload = data.product ?? data.data?.product ?? data.data ?? data;

    return {
      success: true,
      data: transformProduct(productPayload),
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch product',
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

    const data = response.data;

    if (Array.isArray(data)) {
      return {
        success: true,
        data: {
          products: data.map(transformProduct).filter(Boolean),
          total: data.length,
          page: 1,
          pages: 1,
        },
        status: response.status,
      };
    }

    return {
      success: true,
      data: transformApiResponse(data),
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to search products',
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
      error: error.response?.data?.message || error.message || 'Failed to fetch categories',
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

    const response = await axiosInstance.get(`/products/${id}/recommended?limit=${limit}`);
    const data = response.data;

    // data may be { products: [...] } or an array
    const productsArray = Array.isArray(data)
      ? data
      : Array.isArray(data.products)
      ? data.products
      : data.data?.products ?? [];

    return {
      success: true,
      data: productsArray.map(transformProduct).filter(Boolean),
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch recommended products',
      status: error.response?.status || 500,
    };
  }
};

