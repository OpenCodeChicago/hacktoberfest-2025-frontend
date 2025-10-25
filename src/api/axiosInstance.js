import axios from 'axios';
import store from '../store';
import { setToken, logout, loginSuccess } from '../store/authSlice';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  // Send cookies (HttpOnly) for cookie-first auth
  withCredentials: true,
});

// Refresh coalescing helpers: ensure only one refresh request is in-flight and queue other requests
let isRefreshing = false;
let refreshSubscribers = [];

function processQueue(error, token) {
  refreshSubscribers.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      try {
        if (token) {
          prom.originalRequest.headers = prom.originalRequest.headers || {};
          prom.originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        prom.resolve(axiosInstance(prom.originalRequest));
      } catch (e) {
        prom.reject(e);
      }
    }
  });
  refreshSubscribers = [];
}

// Attach Authorization header only when calling our API origin and when token exists in memory
axiosInstance.interceptors.request.use((config) => {
  try {
    const token = store.getState()?.auth?.token;
    // Attach Authorization header for relative URLs (not starting with 'http') or absolute URLs matching API_BASE
    const urlStr = String(config.url);
    const isRelative = !urlStr.startsWith('http');
    const isApiBase = urlStr.startsWith(API_BASE);
    if (token && config && config.url && (isRelative || isApiBase)) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isCanceled =
      error?.code === 'ERR_CANCELED' ||
      error?.name === 'CanceledError' ||
      error?.name === 'AbortError' ||
      error?.message === 'canceled';

    if (isCanceled) {
      if (import.meta.env.DEV) {
        console.debug('Request was canceled/aborted:', error?.message || error);
      }
      return Promise.reject(error);
    }

    // If we receive 401, attempt a cookie-based refresh flow once and retry the original request
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        // queue the request
        refreshSubscribers.push({ resolve, reject, originalRequest });

        // if a refresh is already in progress, queued requests will be resolved/rejected when it finishes
        if (isRefreshing) return;

        isRefreshing = true;

        // Start refresh
        axios
          .post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true })
          .then((res) => {
            const newToken = res?.data?.token || null;
            if (newToken) {
              store.dispatch(setToken(newToken));
              processQueue(null, newToken);
              isRefreshing = false;
              return;
            }

            // If refresh succeeded but no token, attempt to fetch /users/current to populate user
            axios
              .get(`${API_BASE}/users/current`, { withCredentials: true })
              .then((userRes) => {
                const userPayload = userRes?.data || {};
                const user = userPayload.user || userPayload.data || null;
                if (user) {
                  store.dispatch(loginSuccess({ user, token: null }));
                }
                processQueue(null, null);
                isRefreshing = false;
              })
              .catch((err) => {
                store.dispatch(logout());
                processQueue(err, null);
                isRefreshing = false;
              });
          })
          .catch((refreshErr) => {
            store.dispatch(logout());
            processQueue(refreshErr, null);
            isRefreshing = false;
          });
      });
    }

    // Suppress expected 401s from auth refresh endpoint (common when user is not logged in)
    const reqUrl = error?.config?.url || '';
    if (reqUrl.includes('/auth/refresh') || reqUrl.includes('/auth/logout')) {
      // don't noisy-log refresh/logout failures (these are expected when session absent)
      return Promise.reject(error);
    }

    if (import.meta.env.DEV) {
      if (error.response) {
        console.error('API Error:', {
          status: error.response.status,
          url: error.config?.url,
          message: error.response.data?.message || error.message,
        });
      } else if (error.request) {
        console.error('Network Error: No response received from server');
      } else {
        console.error('Request Setup Error:', error.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance };

