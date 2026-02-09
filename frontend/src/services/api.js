import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
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
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Phiên đăng nhập đã hết hạn');
          break;
          
        case 403:
          toast.error('Bạn không có quyền truy cập');
          break;
          
        case 404:
          toast.error('Không tìm thấy tài nguyên');
          break;
          
        case 500:
          toast.error('Lỗi máy chủ');
          break;
          
        default:
          if (response.data && response.data.message) {
            toast.error(response.data.message);
          } else {
            toast.error('Đã xảy ra lỗi');
          }
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Yêu cầu quá thời gian chờ');
    } else if (error.message === 'Network Error') {
      toast.error('Không thể kết nối đến máy chủ');
    }
    
    return Promise.reject(error);
  }
);

export default api;