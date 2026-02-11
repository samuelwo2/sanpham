import React, { useState } from 'react';
import './ConTact.css';

const ConTact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tin nhắn liên hệ:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-detail">
              <h3>Địa chỉ</h3>
              <p>123 Đường ABC, Quận 1, TP.HCM</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-detail">
              <h3>Số điện thoại</h3>
              <p>0123 456 789</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-detail">
              <h3>Email</h3>
              <p>contact@example.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div className="info-detail">
              <h3>Giờ làm việc</h3>
              <p>Thứ 2 - Thứ 6: 8:00 - 17:30</p>
              <p>Thứ 7: 8:00 - 12:00</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Gửi tin nhắn cho chúng tôi</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập email của bạn"
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>Tiêu đề</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Nhập tiêu đề tin nhắn"
              />
            </div>

            <div className="form-group">
              <label>Nội dung</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Nhập nội dung tin nhắn"
              />
            </div>

            <button type="submit" className="submit-btn">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <h2>Bản đồ</h2>
        <div className="map-placeholder">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424570797383!2d106.6986643148009!3d10.776816292319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f47d3b3c1c3%3A0x5f3b0c3f3c3c3c3c!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Bản đồ"
          />
        </div>
      </div>
    </div>
  );
};

export default ConTact;