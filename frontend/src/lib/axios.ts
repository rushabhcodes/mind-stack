import axios from 'axios';

// Create axios instance with base URL from environment variables
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  withCredentials: true,
});

// Add a request interceptor to ensure all requests include credentials
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // If we get a 401, it might mean the user is not authenticated
      // We can handle this globally if needed
      console.log('Authentication error detected');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
