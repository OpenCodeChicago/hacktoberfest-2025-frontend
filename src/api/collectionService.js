import axiosInstance from './axiosInstance';

/**
 * Fetch collection by ID/slug with its products
 * @param {string} collectionId - The collection identifier (e.g., 'weight-management')
 * @returns {Promise} Collection data with products array
 */
export const getCollectionById = async (collectionId) => {
  const response = await axiosInstance.get(
    `/collections/${encodeURIComponent(collectionId)}`
  );
  return response.data;
};
