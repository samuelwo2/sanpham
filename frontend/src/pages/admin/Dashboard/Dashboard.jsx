import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingBag, 
  FaUsers, 
  FaBoxes, 
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt
} from 'react-icons/fa';
import { adminService } from '../../../services/adminService';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    fetchDashboardData();
  }, [period]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAllOrders({ page: 1, limit: 5 })
      ]);
      
      setStats(statsData);
      setRecentOrders(ordersData.orders || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="period-selector">
          <button 
            className={`period-btn ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Tuần này
          </button>
          <button 
            className={`period-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Tháng này
          </button>
          <button 
            className={`period-btn ${period === 'year' ? 'active' : ''}`}
            onClick={() => setPeriod('year')}
          >
            Năm nay
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <FaMoneyBillWave />
          </div>
          <div className="stat-info">
            <h3>Doanh thu</h3>
            <p className="stat-value">{formatCurrency(stats?.totalRevenue || 0)}</p>
            <span className="stat-change positive">
              <FaArrowUp /> +{stats?.revenueGrowth || 0}%
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <FaShoppingBag />
          </div>
          <div className="stat-info">
            <h3>Đơn hàng</h3>
            <p className="stat-value">{stats?.totalOrders || 0}</p>
            <span className="stat-change positive">
              <FaArrowUp /> +{stats?.orderGrowth || 0}%
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <FaBoxes />
          </div>
          <div className="stat-info">
            <h3>Sản phẩm</h3>
            <p className="stat-value">{stats?.totalProducts || 0}</p>
            <span className="stat-change">
              <FaArrowDown /> {stats?.lowStock || 0} sắp hết
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Người dùng</h3>
            <p className="stat-value">{stats?.totalUsers || 0}</p>
            <span className="stat-change positive">
              <FaArrowUp /> +{stats?.userGrowth || 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <div className="section-header">
          <h2>Đơn hàng gần đây</h2>
          <Link to="/admin/orders" className="view-all">
            Xem tất cả
          </Link>
        </div>

        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id}>
                  <td>#{order.orderCode}</td>
                  <td>{order.customer?.name}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${order._id}`} className="view-btn">
                      Xem
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;