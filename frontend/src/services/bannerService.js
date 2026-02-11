import api from './api';

export const bannerService = {
  // Get active banners
  getActiveBanners: async () => {
    try {
      const response = await api.get('/banners/active');
      return response;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  },

  // Get all banners (admin)
  getAllBanners: async () => {
    try {
      const response = await api.get('/admin/banners');
      return response;
    } catch (error) {
      console.error('Error fetching banners:', error);
      throw error;
    }
  },

  // Create banner (admin)
  createBanner: async (bannerData) => {
    try {
      const response = await api.post('/admin/banners', bannerData);
      return response;
    } catch (error) {
      console.error('Error creating banner:', error);
      throw error;
    }
  },

  // Update banner (admin)
  updateBanner: async (bannerId, bannerData) => {
    try {
      const response = await api.put(`/admin/banners/${bannerId}`, bannerData);
      return response;
    } catch (error) {
      console.error('Error updating banner:', error);
      throw error;
    }
  },

  // Delete banner (admin)
  deleteBanner: async (bannerId) => {
    try {
      const response = await api.delete(`/admin/banners/${bannerId}`);
      return response;
    } catch (error) {
      console.error('Error deleting banner:', error);
      throw error;
    }
  }
};