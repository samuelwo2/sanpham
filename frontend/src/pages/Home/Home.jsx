import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../components/product/ProductList/ProductList';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { productService } from '../../services/productService'; // FIXED
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Sử dụng productService
      const featured = await productService.getFeaturedProducts();
      const newArrivalsData = await productService.getNewArrivals();
      
      setFeaturedProducts(featured);
      setNewArrivals(newArrivalsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Thời Trang Mới Mỗi Ngày</h1>
            <p className="hero-subtitle">
              Khám phá bộ sưu tập quần áo mới nhất với giá tốt nhất
            </p>
            <Link to="/shop" className="btn-primary hero-btn">
              Mua sắm ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <ProductList products={featuredProducts} columns={4} />
          <div className="view-all">
            <Link to="/shop" className="btn-outline">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <div className="container">
          <h2 className="section-title">Hàng mới về</h2>
          <ProductList products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Banner Section */}
      <section className="banner-section">
        <div className="container">
          <div className="banner-grid">
            <div className="banner-item">
              <div className="banner-content">
                <h3>Miễn phí vận chuyển</h3>
                <p>Cho đơn hàng từ 500.000đ</p>
              </div>
            </div>
            <div className="banner-item">
              <div className="banner-content">
                <h3>Đổi trả trong 30 ngày</h3>
                <p>Đảm bảo chất lượng</p>
              </div>
            </div>
            <div className="banner-item">
              <div className="banner-content">
                <h3>Hỗ trợ 24/7</h3>
                <p>Hotline: 0123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;