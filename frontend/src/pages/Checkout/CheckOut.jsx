import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CheckOut.css';

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    address: '',
    city: '',
    phone: user?.phone || '',
    paymentMethod: 'cod',
    note: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra giỏ hàng
    if (!cartItems || cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      navigate('/cart');
      return;
    }

    // Xử lý đặt hàng
    const orderData = {
      ...formData,
      items: cartItems,
      totalAmount: calculateTotal(),
      orderDate: new Date().toISOString()
    };

    console.log('Đơn hàng:', orderData);
    
    // Gọi API đặt hàng ở đây
    // dispatch(createOrder(orderData));
    
    alert('Đặt hàng thành công!');
    navigate('/orders'); // Chuyển đến trang đơn hàng
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 500000 ? 0 : 30000;
    return subtotal + shipping;
  };

  const shippingFee = calculateSubtotal() > 500000 ? 0 : 30000;

  return (
    <div className="checkout-container">
      <h1>Thanh toán đơn hàng</h1>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Số nhà, tên đường, phường/xã"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Thành phố *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn thành phố</option>
                  <option value="hcm">Hồ Chí Minh</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="danang">Đà Nẵng</option>
                  <option value="haiphong">Hải Phòng</option>
                  <option value="cantho">Cần Thơ</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Phương thức thanh toán *</label>
              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="banking"
                    checked={formData.paymentMethod === 'banking'}
                    onChange={handleChange}
                  />
                  <span>Chuyển khoản ngân hàng</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === 'momo'}
                    onChange={handleChange}
                  />
                  <span>Ví MoMo</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Ghi chú (không bắt buộc)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows="3"
                placeholder="Ghi chú về đơn hàng, ví dụ: giao hàng giờ hành chính"
              />
            </div>

            <button type="submit" className="checkout-btn">
              Đặt hàng
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-price">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Tạm tính</span>
                  <span>{calculateSubtotal().toLocaleString()}đ</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <span className={shippingFee === 0 ? 'free-shipping' : ''}>
                    {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString()}đ`}
                  </span>
                </div>
                {shippingFee === 0 && (
                  <div className="shipping-note">
                    🎉 Miễn phí vận chuyển cho đơn hàng từ 500,000đ
                  </div>
                )}
                <div className="summary-row total">
                  <span>Tổng cộng</span>
                  <span>{calculateTotal().toLocaleString()}đ</span>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <p>Giỏ hàng của bạn đang trống</p>
              <button onClick={() => navigate('/shop')}>
                Mua sắm ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;