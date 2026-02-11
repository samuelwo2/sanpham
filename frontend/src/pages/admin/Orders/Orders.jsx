import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaBox
} from 'react-icons/fa';
import { adminService } from '../../../services/adminService';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import { ORDER_STATUS } from '../../../utils/constants';
import './Orders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    fetchOrders();
  }, [pagination.current, selectedStatus, selectedDate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllOrders({
        page: pagination.current,
        limit: pagination.pageSize,
        status: selectedStatus,
        date: selectedDate
      });
      
      setOrders(response.orders || []);
      setPagination(prev => ({
        ...prev,
        total: response.total || 0
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    return order.orderCode?.includes(searchTerm) ||
           order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>Quản lý đơn hàng</h1>
        <div className="order-stats">
          <div className="stat-item">
            <span className="stat-label">Tổng đơn</span>
            <span className="stat-value">{pagination.total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Chờ xử lý</span>
            <span className="stat-value pending">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Đang giao</span>
            <span className="stat-value shipping">
              {orders.filter(o => o.status === 'shipped').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-box">
            <FaFilter className="filter-icon" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              {Object.entries(ORDER_STATUS).map(([key, status]) => (
                <option key={key} value={key}>{status.text}</option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td className="order-code">
                  <Link to={`/admin/orders/${order._id}`}>
                    #{order.orderCode}
                  </Link>
                </td>
                <td>
                  <div className="customer-info">
                    <strong>{order.customer?.name}</strong>
                    <small>{order.customer?.email}</small>
                    <small>{order.customer?.phone}</small>
                  </div>
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td>
                  <div className="order-items-summary">
                    <FaBox />
                    <span>{order.items?.length || 0} sản phẩm</span>
                  </div>
                </td>
                <td className="total-price">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td>
                  <span className={`payment-status ${order.paymentStatus}`}>
                    {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </span>
                </td>
                <td>
                  <select
                    className={`status-select ${order.status}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    {Object.entries(ORDER_STATUS).map(([key, status]) => (
                      <option key={key} value={key}>{status.text}</option>
                    ))}
                  </select>
                </td>
                <td className="actions-cell">
                  <Link 
                    to={`/admin/orders/${order._id}`} 
                    className="btn-icon view"
                  >
                    <FaEye />
                  </Link>
                  {order.status === 'pending' && (
                    <button 
                      className="btn-icon cancel"
                      onClick={() => handleStatusChange(order._id, 'cancelled')}
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                  {order.status === 'confirmed' && (
                    <button 
                      className="btn-icon ship"
                      onClick={() => handleStatusChange(order._id, 'shipped')}
                    >
                      <FaTruck />
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button 
                      className="btn-icon deliver"
                      onClick={() => handleStatusChange(order._id, 'delivered')}
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.total > pagination.pageSize && (
        <div className="pagination">
          <button
            onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
            disabled={pagination.current === 1}
          >
            Trước
          </button>
          <span>Trang {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}</span>
          <button
            onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
            disabled={pagination.current === Math.ceil(pagination.total / pagination.pageSize)}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;