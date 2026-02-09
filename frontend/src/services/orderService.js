import api from './api';

export const orderService = {
  // Create order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response;
  },
  
  // Get user orders
  getUserOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response;
  },
  
  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response;
  },
  
  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response;
  },
  
  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response;
  },
};