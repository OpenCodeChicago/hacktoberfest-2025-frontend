import { useState } from 'react';
import { API_ENDPOINTS } from '../routes/apiEndpoints';
import { useFetchnCache } from './useFetchnCache';

/**
 * Custom hook to manage the state and data fetching for the BestOfCoreX component.
 *
 * @returns {object} An object containing collections, active tab state, products for the active tab, and loading/error states.
 */
export const useBestOfCoreX = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS);
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');

  // Fetch all collection URLs on component mount using the useFetchnCache hook
  const {
    data: allCollectionsData,
    loading,
    error,
    errors,
  } = useFetchnCache(Object.values(API_ENDPOINTS.COLLECTIONS));

  const activeEndpoint = activeTab
    ? API_ENDPOINTS.COLLECTIONS[activeTab]
    : null;

  // Select the data for the active tab from the pre-fetched data
  const productData = allCollectionsData
    ? allCollectionsData[activeEndpoint]
    : null;

  const products = productData?.products || [];

  return {
    collections,
    activeTab,
    setActiveTab,
    products,
    loading,
    error,
    errors,
    allCollectionsData,
  };
};