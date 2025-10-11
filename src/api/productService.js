import axiosInstance from './axiosInstance.js';

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
    stock: 15,
    isNew: apiProduct.new,
    onSale: apiProduct.sale > 0,
    flavors: apiProduct.flavors,
    features: apiProduct.quality || [],
    goals: apiProduct.goals || [],
    sizes: apiProduct.sizes || [],
    salePercentage: apiProduct.sale,
    longDescription: apiProduct.longDescription,
    usageTips: apiProduct.usageTips
  };
};

const transformApiResponse = (apiResponse) => {
  return {
    products: apiResponse.products.map(transformProduct),
    totalCount: apiResponse.total,
    currentPage: apiResponse.page,
    hasNextPage: apiResponse.page < apiResponse.pages,
    totalPages: apiResponse.pages
  };
};

export const getProducts = async (params = {}) => {
  try {
    // Map our filter names to API parameter names
    const apiParams = {};

    if (params.page) apiParams.page = params.page;
    if (params.limit) apiParams.limit = params.limit;
    if (params.category) apiParams.category = params.category;
    if (params.goals) apiParams.goals = params.goals;
    if (params.search) apiParams.search = params.search;
    if (params.minPrice) apiParams.minPrice = params.minPrice;
    if (params.maxPrice) apiParams.maxPrice = params.maxPrice;
    if (params.sortBy) apiParams.sortBy = params.sortBy;
    if (params.sortOrder) apiParams.sortOrder = params.sortOrder;

    let response;
    if (params.sort) {
      const sortKey = encodeURIComponent(params.sort);
      response = await axiosInstance.get(`/products/sort/${sortKey}`, { params: apiParams });
    } else {
      response = await axiosInstance.get('/products', { params: apiParams });
    }

    const data = response.data;

    if (Array.isArray(data)) {
      return {
        success: true,
        data: {
          products: data,
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
      error: error.response?.data?.message || 'Failed to fetch products',
      status: error.response?.status || 500,
    };
  }
};

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

export const getRecommendedProducts = async (id, limit = 3) => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const response = await axiosInstance.get(`/products/recommended/${id}?limit=${limit}`);

    return {
      success: true,
      data: response.data.products.map(transformProduct),
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

