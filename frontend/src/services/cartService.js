import api from './api';

export const cartService = {
  // Get cart from localStorage
  getLocalCart: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to localStorage
  saveLocalCart: (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  // Sync cart with server (for authenticated users)
  syncCart: async (cartItems) => {
    try {
      const response = await api.post('/cart/sync', { items: cartItems });
      return response;
    } catch (error) {
      console.error('Error syncing cart:', error);
      throw error;
    }
  },

  // Get cart from server (for authenticated users)
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1, options = {}) => {
    try {
      const response = await api.post('/cart/add', {
        productId,
        quantity,
        ...options
      });
      return response;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update cart item
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/cart/clear');
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Apply coupon
  applyCoupon: async (couponCode) => {
    try {
      const response = await api.post('/cart/apply-coupon', { code: couponCode });
      return response;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  },

  // Remove coupon
  removeCoupon: async () => {
    try {
      const response = await api.delete('/cart/remove-coupon');
      return response;
    } catch (error) {
      console.error('Error removing coupon:', error);
      throw error;
    }
  }
};