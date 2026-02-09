import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import './ProductList.css';

const ProductList = ({ products, loading, columns = 4 }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <p>Không tìm thấy sản phẩm nào.</p>
      </div>
    );
  }

  return (
    <div className={`product-list grid-${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;