import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../../../store/slices/cartSlice';
import { formatCurrency } from '../../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.images[0]} alt={product.name} />
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
      </Link>
      
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < Math.floor(product.rating) ? 'filled' : ''}
            />
          ))}
          <span className="rating-count">({product.reviewCount})</span>
        </div>
        
        <div className="product-price">
          {product.discount ? (
            <>
              <span className="current-price">
                {formatCurrency(product.price * (1 - product.discount / 100))}
              </span>
              <span className="original-price">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="current-price">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
        
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <FaShoppingCart /> Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;