import React, { useState, useEffect, useCallback } from 'react'; // Thêm useCallback
import { useParams } from 'react-router-dom';
// Xóa useSelector không dùng
import ProductDetail from '../../components/product/ProductDetail/ProductDetail';
import ProductList from '../../components/product/ProductList/ProductList';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { productService } from '../../services/productService';
// Xóa import addToCart không dùng
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  // Xóa dispatch không dùng
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dùng useCallback để tránh dependency warning
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await productService.getProductById(id);
      setProduct(productData);
      
      // Fetch related products
      const related = await productService.getProductsByCategory(productData.categorySlug);
      setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4));
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [id]); // Thêm id vào dependency

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]); // Thêm fetchProduct vào dependency

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Sản phẩm không tồn tại</h2>
        <p>Sản phẩm bạn đang tìm kiếm không có sẵn.</p>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <ProductDetail product={product} />
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">Sản phẩm liên quan</h2>
            <ProductList products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;