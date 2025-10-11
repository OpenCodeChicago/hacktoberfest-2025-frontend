/**
 * @file Centralized API endpoint constants.
 *  for easier maintenance
 */
const COLLECTIONS_BASE_URL = `${import.meta.env.VITE_API_URL}/collections`




export const API_ENDPOINTS = {
  // Product Endpoints
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id) => `/api/products/${id}`,

  // Collection Endpoints
  //Incase URL are to be change in production
  COLLECTIONS: {
    'BEST SELLERS': `${COLLECTIONS_BASE_URL}/best-sellers`,
    'PROTEIN POWDER': `${COLLECTIONS_BASE_URL}/protein-powder`,
    'WEIGHT MANAGEMENT': `${COLLECTIONS_BASE_URL}/weight-management`,
    'HEALTH WELLNESS': `${COLLECTIONS_BASE_URL}/health-wellness-supplements`,
  },


};