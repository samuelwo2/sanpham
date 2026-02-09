import api from './api';

export const adminService = {
  // Product management
  createProduct: async (productData) => {
    const response = await api.post('/admin/products', productData);
    return response;
  },
  
  updateProduct: async (productId, productData) => {
    const response = await api.put(`/admin/products/${productId}`, productData);
    return response;
  },
  
  deleteProduct: async (productId) => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response;
  },
  
  // Category management
  getCategories: async () => {
    const response = await api.get('/admin/categories');
    return response;
  },
  
  createCategory: async (categoryData) => {
    const response = await api.post('/admin/categories', categoryData);
    return response;
  },
  
  // Order management
  getAllOrders: async (params = {}) => {
    const response = await api.get('/admin/orders', { params });
    return response;
  },
  
  // User management
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response;
  },
  
  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response;
  },
  
  // Dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response;
  },
  
  getSalesReport: async (params = {}) => {
    const response = await api.get('/admin/dashboard/sales-report', { params });
    return response;
  },
};