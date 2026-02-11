import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FaTachometerAlt, 
  FaBoxes, 
  FaShoppingCart, 
  FaUsers, 
  FaTags,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/products', name: 'Quản lý sản phẩm', icon: <FaBoxes /> },
    { path: '/admin/orders', name: 'Quản lý đơn hàng', icon: <FaShoppingCart /> },
    { path: '/admin/users', name: 'Quản lý người dùng', icon: <FaUsers /> },
    { path: '/admin/categories', name: 'Danh mục', icon: <FaTags /> },
    { path: '/admin/settings', name: 'Cài đặt', icon: <FaCog /> },
  ];

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-logo">
            {isSidebarOpen ? 'Admin Panel' : 'AP'}
          </Link>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'A'}
          </div>
          {isSidebarOpen && (
            <div className="user-info">
              <p className="user-name">{user?.name || 'Admin'}</p>
              <p className="user-role">Quản trị viên</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-text">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon"><FaSignOutAlt /></span>
            {isSidebarOpen && <span className="nav-text">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="page-title">Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-text">
              Xin chào, {user?.name || 'Admin'}!
            </span>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;