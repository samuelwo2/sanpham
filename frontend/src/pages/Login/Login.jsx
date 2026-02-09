import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import { login } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      setLoading(true);
      const response = await authService.login(formData);
      
      dispatch(login({
        user: response.user,
        token: response.token
      }));
      
      navigate('/');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Đăng nhập thất bại'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-wrapper">
          <div className="login-form-container">
            <h1 className="login-title">Đăng nhập</h1>
            
            {errors.submit && (
              <div className="alert alert-danger">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Nhập email của bạn"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <FaLock /> Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Ghi nhớ đăng nhập
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary login-btn"
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
              
              <div className="social-login">
                <p className="divider">Hoặc đăng nhập với</p>
                <div className="social-buttons">
                  <button type="button" className="btn-social google-btn">
                    <FaGoogle /> Google
                  </button>
                  <button type="button" className="btn-social facebook-btn">
                    <FaFacebook /> Facebook
                  </button>
                </div>
              </div>
              
              <div className="register-link">
                <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
              </div>
            </form>
          </div>
          
          <div className="login-info">
            <h2>Chào mừng trở lại!</h2>
            <p>Đăng nhập để:</p>
            <ul className="benefits-list">
              <li>Xem lịch sử đơn hàng</li>
              <li>Quản lý thông tin cá nhân</li>
              <li>Lưu sản phẩm yêu thích</li>
              <li>Nhận ưu đãi đặc biệt</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;