import axios, { AxiosInstance } from 'axios';

// Create Axios instance with default configuration
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `http://localhost:3001/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for adding auth tokens, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for handling common errors)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized - maybe redirect to login
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);
