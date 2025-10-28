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
      // Call refresh endpoint using plain axios so this call isn't intercepted again
      return axios
        .post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true })
        .then((res) => {
          const newToken = res?.data?.token || null;
          if (newToken) {
            // update in-memory token
            store.dispatch(setToken(newToken));
            // update original request Authorization and retry
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
          // If refresh succeeded but no token, attempt to fetch /users/current to populate user
          return axios
            .get(`${API_BASE}/users/current`, { withCredentials: true })
            .then((userRes) => {
              // Dispatch user to store so Redux reflects the valid session
              const userPayload = userRes?.data || {};
              const user = userPayload.user || userPayload.data || null;
              if (user) {
                // token may be null here if server relies purely on cookies
                store.dispatch(loginSuccess({ user, token: newToken || null }));
              }
              // session is valid - retry original request
              return axiosInstance(originalRequest);
            })
            .catch(() => {
              store.dispatch(logout());
              return Promise.reject(error);
            });
        })
        .catch((refreshErr) => {
          // refresh failed -> force logout
          store.dispatch(logout());
          return Promise.reject(refreshErr);
        });
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

