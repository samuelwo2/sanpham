// Categories
export const CATEGORIES = [
  { id: 1, name: 'Áo thun', slug: 'ao-thun', icon: '👕' },
  { id: 2, name: 'Áo sơ mi', slug: 'ao-so-mi', icon: '👔' },
  { id: 3, name: 'Quần jean', slug: 'quan-jean', icon: '👖' },
  { id: 4, name: 'Quần short', slug: 'quan-short', icon: '🩳' },
  { id: 5, name: 'Đầm/Váy', slug: 'dam-vay', icon: '👗' },
  { id: 6, name: 'Áo khoác', slug: 'ao-khoac', icon: '🧥' },
  { id: 7, name: 'Áo len', slug: 'ao-len', icon: '🧶' },
  { id: 8, name: 'Phụ kiện', slug: 'phu-kien', icon: '👒' },
];

// Sizes
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// Colors
export const COLORS = [
  { name: 'Đỏ', code: '#dc2626' },
  { name: 'Xanh dương', code: '#2563eb' },
  { name: 'Xanh lá', code: '#16a34a' },
  { name: 'Đen', code: '#000000' },
  { name: 'Trắng', code: '#ffffff', border: '#e5e5e5' },
  { name: 'Xám', code: '#6b7280' },
  { name: 'Vàng', code: '#facc15' },
  { name: 'Hồng', code: '#f472b6' },
  { name: 'Tím', code: '#9333ea' },
  { name: 'Cam', code: '#ea580c' },
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
  { value: 'popular', label: 'Phổ biến nhất' },
];

// Order statuses
export const ORDER_STATUS = [
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipped', label: 'Đang giao hàng' },
  { value: 'delivered', label: 'Đã giao hàng' },
  { value: 'cancelled', label: 'Đã hủy' },
];

// Payment methods
export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
  { value: 'bank', label: 'Chuyển khoản ngân hàng' },
  { value: 'momo', label: 'Ví MoMo' },
  { value: 'zalopay', label: 'Ví ZaloPay' },
];

// Shipping methods
export const SHIPPING_METHODS = [
  { value: 'standard', label: 'Giao hàng tiêu chuẩn (3-5 ngày)', cost: 30000 },
  { value: 'express', label: 'Giao hàng nhanh (1-2 ngày)', cost: 50000 },
  { value: 'free', label: 'Giao hàng miễn phí (đơn từ 500k)', cost: 0 },
];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_ONE: '/products/:id',
    CREATE: '/admin/products',
    UPDATE: '/admin/products/:id',
    DELETE: '/admin/products/:id',
  },
  ORDERS: {
    CREATE: '/orders',
    GET_MY_ORDERS: '/orders/my-orders',
    GET_ONE: '/orders/:id',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    ORDERS: '/admin/orders',
  },
};