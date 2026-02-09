import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import './Header.css';
import CartIcon from './CartIcon';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <h1>ShopThoiTrang</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link></li>
              <li><Link to="/shop" onClick={() => setIsMenuOpen(false)}>Cửa hàng</Link></li>
              <li><Link to="#" onClick={() => setIsMenuOpen(false)}>Danh mục</Link></li>
              <li><Link to="#" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link></li>
            </ul>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            <Link to="/cart" className="cart-icon">
              <CartIcon count={itemCount} />
            </Link>
            
            <Link to={isAuthenticated ? "/account" : "/login"} className="user-icon">
              <FaUser />
            </Link>
            
            <button 
              className="menu-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;