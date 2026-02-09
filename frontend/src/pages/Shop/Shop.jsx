import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/product/ProductList/ProductList';
import ProductFilter from '../../components/product/ProductFilter/ProductFilter';
import Pagination from '../../components/product/ProductList/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { productService } from '../../services/productService';
import './Shop.css';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    categories: [],
    sizes: [],
    colors: []
  });

  const itemsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      
      let data;
      if (category) {
        data = await productService.getProductsByCategory(category);
      } else if (search) {
        data = await productService.searchProducts(search);
      } else {
        data = await productService.getAllProducts();
      }
      
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.categoryId)
      );
    }

    // Filter by sizes
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Filter by colors
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => filters.colors.includes(color.name))
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1 className="page-title">Cửa hàng</h1>
          <p className="product-count">
            Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} 
            của {filteredProducts.length} sản phẩm
          </p>
        </div>

        <div className="shop-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <ProductFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <ProductList 
                  products={currentProducts} 
                  columns={3}
                  loading={loading}
                />
                
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;