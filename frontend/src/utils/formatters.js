// Format order status
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: { text: 'Chờ xử lý', color: '#f39c12' },
    processing: { text: 'Đang xử lý', color: '#3498db' },
    shipped: { text: 'Đang giao hàng', color: '#9b59b6' },
    delivered: { text: 'Đã giao hàng', color: '#27ae60' },
    cancelled: { text: 'Đã hủy', color: '#e74c3c' },
    refunded: { text: 'Đã hoàn tiền', color: '#95a5a6' },
  };
  
  return statusMap[status] || { text: 'Không xác định', color: '#7f8c8d' };
};

// Format payment method
export const formatPaymentMethod = (method) => {
  const methodMap = {
    cod: 'Thanh toán khi nhận hàng',
    bank: 'Chuyển khoản ngân hàng',
    card: 'Thẻ thanh toán',
    momo: 'Ví MoMo',
    zalopay: 'Ví ZaloPay',
  };
  
  return methodMap[method] || 'Không xác định';
};

// Format product rating
export const formatRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push('full');
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  
  return stars;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};