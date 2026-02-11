import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { adminService } from '../../../services/adminService';
import { productService } from '../../../services/productService';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import './Products.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await adminService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      await adminService.deleteProduct(selectedProduct.id);
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Quản lý sản phẩm</h1>
        <Link to="/admin/products/add" className="btn-add">
          <FaPlus /> Thêm sản phẩm
        </Link>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(category => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Giá KM</th>
              <th>Tồn kho</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="product-thumbnail"
                  />
                </td>
                <td className="product-name-cell">
                  <span className="product-name">{product.name}</span>
                  {product.featured && (
                    <span className="featured-badge">Nổi bật</span>
                  )}
                </td>
                <td>{product.category}</td>
                <td className="price-cell">
                  {formatCurrency(product.price)}
                </td>
                <td className="price-cell sale">
                  {product.discountPrice ? formatCurrency(product.discountPrice) : '-'}
                </td>
                <td>
                  <span className={`stock-badge ${product.inStock ? 'in' : 'out'}`}>
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </td>
                <td>{formatDate(product.createdAt)}</td>
                <td className="actions-cell">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="btn-icon view"
                    target="_blank"
                  >
                    <FaEye />
                  </Link>
                  <Link 
                    to={`/admin/products/edit/${product.id}`} 
                    className="btn-icon edit"
                  >
                    <FaEdit />
                  </Link>
                  <button 
                    className="btn-icon delete"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct?.name}"?</p>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn-delete"
                onClick={handleDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;