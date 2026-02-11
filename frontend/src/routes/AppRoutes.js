import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetailPage from '../pages/ProductDetail/ProductDetailPage';
import Cart from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import About from '../pages/About/About';
import Contact from '../pages/contact/ConTact'; // Đã đúng

// Protected Pages
import CheckOut from '../pages/checkout/CheckOut'; // Sửa tên import
import UserProfile from '../pages/User/Profile.jsx';
import UserOrders from '../pages/User/Orders';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard/Dashboard';
import AdminProducts from '../pages/admin/Products/Products.jsx/index.js';
import AdminOrders from '../pages/admin/Orders/Orders';
import AdminUsers from '../pages/admin/Users/Profile.jsx';

// Components
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        
        {/* Protected routes */}
        <Route path="checkout" element={
          <ProtectedRoute>
            <CheckOut /> {/* Sửa tên component */}
          </ProtectedRoute>
        } />
        
        <Route path="profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        
        <Route path="orders" element={
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        } />
      </Route>

      {/* Admin routes with AdminLayout */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={
        <MainLayout>
          <div style={{ padding: '100px 0', textAlign: 'center' }}>
            <h1>404 - Trang không tồn tại</h1>
            <p>Trang bạn đang tìm kiếm không có sẵn.</p>
            <button onClick={() => window.location.href = '/'}>
              Về trang chủ
            </button>
          </div>
        </MainLayout>
      } />
    </Routes>
  );
};

export default AppRoutes;