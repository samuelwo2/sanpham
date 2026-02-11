import api from './api';

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    try {
      const response = await api.get(`/categories/${slug}`);
      return response;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (slug, params = {}) => {
    try {
      const response = await api.get(`/categories/${slug}/products`, { params });
      return response;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Admin: Create category
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/admin/categories', categoryData);
      return response;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Admin: Update category
  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Admin: Delete category
  deleteCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/admin/categories/${categoryId}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};