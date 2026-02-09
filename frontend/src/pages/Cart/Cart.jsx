import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            <Link to="/shop" className="btn-primary">
              <FaArrowLeft /> Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Giỏ hàng của bạn</h1>
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <h3>Sản phẩm ({itemCount})</h3>
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Xóa tất cả
              </button>
            </div>
            
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h4 className="item-name">{item.name}</h4>
                    {item.size && <p className="item-variant">Size: {item.size}</p>}
                    {item.color && <p className="item-variant">Màu: {item.color.name}</p>}
                  </div>
                  
                  <div className="cart-item-price">
                    <span className="price">{formatCurrency(item.price)}</span>
                  </div>
                  
                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="cart-item-subtotal">
                    <span className="subtotal">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  
                  <div className="cart-item-remove">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>Tóm tắt đơn hàng</h3>
            
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>{total >= 500000 ? 'Miễn phí' : '30.000đ'}</span>
            </div>
            
            <div className="summary-row total">
              <span>Tổng cộng:</span>
              <span className="total-price">
                {formatCurrency(total >= 500000 ? total : total + 30000)}
              </span>
            </div>
            
            <div className="summary-actions">
              <Link to="/shop" className="btn-outline continue-shopping">
                <FaArrowLeft /> Tiếp tục mua sắm
              </Link>
              <Link to="/checkout" className="btn-primary checkout-btn">
                Thanh toán
              </Link>
            </div>
            
            <div className="summary-notice">
              <p>🛒 Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
              <p>🔄 Đổi trả trong vòng 30 ngày</p>
              <p>🔒 Thanh toán an toàn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;