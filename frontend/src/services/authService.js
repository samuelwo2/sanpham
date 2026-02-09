import api from './api';

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },
  
  // Register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },
  
  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },
  
  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response;
  },
  
  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response;
  }
};