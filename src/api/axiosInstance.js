import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://corexshoptest.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message || 'Server error',
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error('Network Error:', 'No response received from server');
    } else {
      console.error('Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance };