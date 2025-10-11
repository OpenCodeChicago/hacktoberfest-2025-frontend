import { useState, useEffect, useRef, useMemo } from 'react';
import axiosInstance from '../api/axiosInstance';

// In-memory cache stored outside the component lifecycle
const cache = new Map();

/**
 * Invalidates the cache. Can clear the entire cache or a specific entry.
 * @param {string | string[]} [urlOrUrls] - The specific URL or URLs to remove from the cache. If not provided, the entire cache is cleared.
 */
export const invalidateCache = (url) => {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
};

/**
 * A custom hook to fetch data from a single URL or multiple URLs with in-memory caching.
 * It manages loading, error, and data states.
 * @param {string | string[] | null} urlOrUrls The URL or array of URLs to fetch data from.
 * @returns {{
 *  data: any | null,
 *  loading: boolean,
 *  error: Error | null,
 *  errors: Error[],
 *  refetch: () => void
 * }} An object containing the fetched data, loading state, error details, and a refetch function.
 */
export const useFetchnCache = (urlOrUrls) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [forceRefetch, setForceRefetch] = useState(0);
  // Use a ref to track the current URL to prevent race conditions
  const requestRef = useRef(urlOrUrls);
  requestRef.current = urlOrUrls;

  // Memoize the stringified URL(s) to use as a stable dependency for useEffect.
  const urlsKey = useMemo(() => {
    return urlOrUrls ? JSON.stringify(urlOrUrls) : null;
  }, [urlOrUrls]);

  useEffect(() => {
    const isArray = Array.isArray(urlOrUrls);
    if (!urlOrUrls || (isArray && urlOrUrls.length === 0)) {
      setData(null);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setErrors([]);

      try {
        let resultData;
        if (isArray) {
          // Used Promise.allSettled to handle partial failures
          const settledResults = await Promise.allSettled(
            urlOrUrls.map(async (u) => {
              if (cache.has(u)) return { url: u, data: cache.get(u) };
              const response = await axiosInstance.get(u, { signal: abortController.signal });
              cache.set(u, response.data);
              return { url: u, data: response.data };
            })
          );

          const successfulData = {};
          const failedRequests = [];
          settledResults.forEach(result => {
            if (result.status === 'fulfilled') {
              successfulData[result.value.url] = result.value.data;
            } else {
              failedRequests.push(result.reason);
            }
          });
          resultData = successfulData;
          if (failedRequests.length > 0) {
            setErrors(failedRequests);
            // Set the primary error to the first one for convenience.
            setError(failedRequests[0]);
          }
        } else {
          // Handle single URL
          const singleUrl = urlOrUrls;
          if (cache.has(singleUrl)) {
            resultData = cache.get(singleUrl);
          } else {
            const response = await axiosInstance.get(singleUrl, { signal: abortController.signal });
            cache.set(singleUrl, response.data);
            resultData = response.data;
          }
        }

        if (urlsKey === JSON.stringify(requestRef.current)) {
          setData(resultData);
        }
      } catch (err) {
        //catch error from url(s)
        if (err.name !== 'CanceledError' && urlsKey === JSON.stringify(requestRef.current)) {
          setError(err);
          setErrors([err]);
        }
      } finally {
        if (urlsKey === JSON.stringify(requestRef.current)) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [urlsKey, forceRefetch]); //intentional

  const refetch = () => {
    if (Array.isArray(urlOrUrls)) {
      urlOrUrls.forEach(u => invalidateCache(u));
    } else if (urlOrUrls) {
      invalidateCache(urlOrUrls);
    }
    setForceRefetch(Date.now()); // Trigger a re-run of the effect
  };

  return { data, loading, error, errors, refetch };
};

export default useFetchnCache;