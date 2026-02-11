import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Về Chúng Tôi</h1>
          <p>Hành trình mang thời trang chất lượng đến mọi người</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <h2>Câu Chuyện Của Chúng Tôi</h2>
            <p>
              Được thành lập vào năm 2024, Shop Thời Trang ra đời với sứ mệnh mang đến 
              cho khách hàng những sản phẩm thời trang chất lượng cao với giá cả hợp lý.
            </p>
            <p>
              Chúng tôi tin rằng thời trang không chỉ là quần áo, mà còn là cách thể hiện 
              cá tính và phong cách sống. Vì vậy, mỗi sản phẩm trong cửa hàng đều được 
              lựa chọn kỹ lưỡng từ các nhà cung cấp uy tín.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Chất Lượng</h3>
              <p>Cam kết sản phẩm chất lượng cao, kiểm tra kỹ lưỡng trước khi đến tay khách hàng.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Uy Tín</h3>
              <p>Đặt chữ tín lên hàng đầu, minh bạch trong mọi giao dịch.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚚</div>
              <h3>Phục Vụ</h3>
              <p>Giao hàng nhanh chóng, hỗ trợ tận tình 24/7.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Sáng Tạo</h3>
              <p>Không ngừng đổi mới, cập nhật xu hướng mới nhất.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Sản phẩm</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Khách hàng</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Đối tác</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Hỗ trợ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Đội Ngũ Của Chúng Tôi</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>Nguyễn Văn A</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-desc">Với 10 năm kinh nghiệm trong ngành thời trang</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Trần Thị B</h3>
              <p className="member-role">Creative Director</p>
              <p className="member-desc">Chuyên gia xu hướng và thiết kế</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Lê Văn C</h3>
              <p className="member-role">Technical Lead</p>
              <p className="member-desc">Phát triển nền tảng và trải nghiệm người dùng</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Bạn đã sẵn sàng khám phá?</h2>
          <p>Hãy ghé thăm cửa hàng của chúng tôi và tìm kiếm phong cách riêng của bạn</p>
          <Link to="/shop" className="btn-primary">
            Mua sắm ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;