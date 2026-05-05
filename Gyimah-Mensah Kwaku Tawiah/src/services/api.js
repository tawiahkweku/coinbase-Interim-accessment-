import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

// Crypto API calls
export const cryptoAPI = {
  getAll: () => API.get('/crypto'),
  getGainers: () => API.get('/crypto/gainers'),
  getNew: () => API.get('/crypto/new'),
  getById: (id) => API.get(`/crypto/${id}`),
  create: (cryptoData) => API.post('/crypto', cryptoData),
};

// User API calls
export const userAPI = {
  getProfile: () => API.get('/user/profile'),
  updateProfile: (userData) => API.put('/user/profile', userData),
};

export default API;
