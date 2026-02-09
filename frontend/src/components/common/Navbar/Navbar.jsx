import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const categories = [
    { id: 1, name: 'Áo thun', slug: 'ao-thun' },
    { id: 2, name: 'Áo sơ mi', slug: 'ao-so-mi' },
    { id: 3, name: 'Quần jean', slug: 'quan-jean' },
    { id: 4, name: 'Quần short', slug: 'quan-short' },
    { id: 5, name: 'Đầm/Váy', slug: 'dam-vay' },
    { id: 6, name: 'Áo khoác', slug: 'ao-khoac' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list">
          {categories.map((category) => (
            <li key={category.id}>
              <Link 
                to={`/shop?category=${category.slug}`}
                className="navbar-link"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;