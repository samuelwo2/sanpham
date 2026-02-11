import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../components/product/ProductList/ProductList';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { productService } from '../../services/productService';
import './Home.css';
import bannerImg from '../../assets/banner.jpg'; // Import ảnh banner chính
import saleBannerImg from '../../assets/sale-banner.jpg'; // Import ảnh banner sale
import denimImg from '../../assets/denim-collection.jpg'; // Import ảnh denim
import tetSaleImg from '../../assets/tet-sale.jpg'; // Import ảnh tết sale

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [featured, newArrivalsData, bestSellersData, saleData] = await Promise.all([
        productService.getFeaturedProducts(),
        productService.getNewArrivals(),
        productService.getBestSellers(),
        productService.getSaleProducts()
      ]);
      
      setFeaturedProducts(featured);
      setNewArrivals(newArrivalsData);
      setBestSellers(bestSellersData);
      setSaleProducts(saleData);
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
      {/* Hero Section với ảnh nền */}
      <section 
        className="hero-section" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImg})`
        }}
      >
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">SALE UP TO 50%</span>
            <h1 className="hero-title">Thời Trang Mới Mỗi Ngày</h1>
            <p className="hero-subtitle">
              Khám phá bộ sưu tập quần áo mới nhất với giá tốt nhất
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary hero-btn">
                Mua sắm ngay
              </Link>
              <Link to="/sale" className="btn-outline-light">
                Xem khuyến mãi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Banner với ảnh nền */}
      <section className="sale-banner-section">
        <div className="container">
          <div 
            className="sale-banner"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(238, 90, 36, 0.9), rgba(255, 107, 107, 0.9)), url(${saleBannerImg})`
            }}
          >
            <div className="sale-banner-content">
              <span className="sale-tag">GIẢM GIÁ ĐẾN 50%</span>
              <h2>Summer Sale 2024</h2>
              <p>Đồ dòng ưu đãi đến 30% - Tặng bao lì xì cho mọi đơn hàng</p>
              <div className="sale-price">
                <span className="old-price">1.499.000đ</span>
                <span className="new-price">749.000đ</span>
              </div>
              <Link to="/sale" className="btn-sale">Mua ngay - Giá tốt 149k</Link>
            </div>
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
          <div className="section-header">
            <h2 className="section-title">Hàng mới về</h2>
            <span className="section-badge">New</span>
          </div>
          <ProductList products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers">
        <div className="container">
          <h2 className="section-title">Hàng bán chạy</h2>
          <span className="best-seller-tag">Hot</span>
          <ProductList products={bestSellers} columns={4} />
        </div>
      </section>

      {/* Collection Banner với ảnh nền */}
      <section className="collection-section">
        <div className="container">
          <div className="collection-grid">
            <div 
              className="collection-item denim"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${denimImg})`
              }}
            >
              <div className="collection-content">
                <span className="collection-tag">DENIM</span>
                <h3>Phong cách cá tính</h3>
                <p>Ưu đãi lên đến 30%</p>
                <Link to="/shop?category=denim" className="btn-collection">
                  Khám phá ngay
                </Link>
              </div>
            </div>
            <div 
              className="collection-item tet-sale"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${tetSaleImg})`
              }}
            >
              <div className="collection-content">
                <span className="collection-tag">SALE TẾT</span>
                <h3>Giảm giá lên đến 50%</h3>
                <p>Duy nhất trong tháng này</p>
                <Link to="/sale" className="btn-collection">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="sale-products">
        <div className="container">
          <div className="sale-header">
            <h2 className="section-title">SALE TẾT 50%</h2>
            <span className="sale-percent">-50%</span>
          </div>
          <ProductList products={saleProducts} columns={4} />
        </div>
      </section>

      {/* Features Banner */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Miễn phí vận chuyển</h3>
              <p>Cho đơn hàng từ 500.000đ</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Đổi trả trong 30 ngày</h3>
              <p>Đảm bảo chất lượng</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💬</div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Hotline: 0123 456 789</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎁</div>
              <h3>Quà tặng hấp dẫn</h3>
              <p>Nhiều ưu đãi bất ngờ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;