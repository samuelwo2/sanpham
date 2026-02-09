import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = ({ count }) => {
  return (
    <div className="cart-icon-wrapper">
      <FaShoppingCart />
      {count > 0 && (
        <span className="cart-count">{count}</span>
      )}
    </div>
  );
};

export default CartIcon;