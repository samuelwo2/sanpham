// Xóa import api không dùng
import { mockProducts } from '../utils/products';

export const productService = {
  // Get all products
  getAllProducts: async (params = {}) => {
    // For demo, return mock data
    let products = [...mockProducts];
    
    // Apply filters
    if (params.category) {
      products = products.filter(p => p.categorySlug === params.category);
    }
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }
    
    return products;
  },
  
  // Get product by ID
  getProductById: async (id) => {
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  },
  
  // Get products by category
  getProductsByCategory: async (categoryId) => {
    return mockProducts.filter(p => p.categorySlug === categoryId);
  },
  
  // Search products
  searchProducts: async (query) => {
    const searchTerm = query.toLowerCase();
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  },
  
  // Get featured products
  getFeaturedProducts: async () => {
    return mockProducts.filter(product => product.featured);
  },
  
  // Get new arrivals
  getNewArrivals: async () => {
    return [...mockProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);
  },
  
  // Get related products
  getRelatedProducts: async (productId, categoryId, limit = 4) => {
    return mockProducts
      .filter(p => p.categorySlug === categoryId && p.id !== parseInt(productId))
      .slice(0, limit);
  },
};

// Export mặc định nếu cần
export default productService;