import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Trail API
export const trailAPI = {
  getAll: (params) => api.get('/trails', { params }),
  getById: (id) => api.get(`/trails/${id}`),
  getNearby: (longitude, latitude, maxDistance) => 
    api.get('/trails/nearby', { params: { longitude, latitude, maxDistance } }),
  create: (data) => api.post('/trails', data),
  update: (id, data) => api.put(`/trails/${id}`, data),
  delete: (id) => api.delete(`/trails/${id}`),
  getStats: (id) => api.get(`/trails/${id}/stats`)
};

// Review API
export const reviewAPI = {
  getTrailReviews: (trailId, params) => api.get(`/reviews/trail/${trailId}`, { params }),
  getUserReviews: () => api.get('/reviews/user'),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  toggleLike: (id) => api.post(`/reviews/${id}/like`)
};

// Forum API
export const forumAPI = {
  getPosts: (params) => api.get('/forum', { params }),
  getPost: (id) => api.get(`/forum/${id}`),
  getUserPosts: () => api.get('/forum/user'),
  create: (data) => api.post('/forum', data),
  update: (id, data) => api.put(`/forum/${id}`, data),
  delete: (id) => api.delete(`/forum/${id}`),
  addComment: (id, texto) => api.post(`/forum/${id}/comment`, { texto }),
  toggleLike: (id) => api.post(`/forum/${id}/like`)
};

// Emergency API
export const emergencyAPI = {
  createSOS: (data) => api.post('/emergency/sos', data),
  getUserEmergencies: (status) => api.get('/emergency/user', { params: { status } }),
  getEmergency: (id) => api.get(`/emergency/${id}`),
  resolve: (id, notas) => api.put(`/emergency/${id}/resolve`, { notas }),
  cancel: (id) => api.put(`/emergency/${id}/cancel`),
  getActive: () => api.get('/emergency/active')
};

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken })
};

export default api;