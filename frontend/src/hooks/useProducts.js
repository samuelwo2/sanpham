import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { toast } from 'react-hot-toast';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialParams);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productService.getAllProducts(params);
      setProducts(data);
      setTotal(data.length);
      
      return data;
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi tải sản phẩm');
      toast.error('Không thể tải danh sách sản phẩm');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialParams);
  }, [initialParams]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  // Search products
  const searchProducts = useCallback(async (query) => {
    try {
      setLoading(true);
      const data = await productService.searchProducts(query);
      setProducts(data);
      setTotal(data.length);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get product by ID
  const getProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by category
  const getProductsByCategory = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      const data = await productService.getProductsByCategory(categoryId);
      setProducts(data);
      setTotal(data.length);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get featured products
  const getFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getFeaturedProducts();
      setProducts(data);
      setTotal(data.length);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get new arrivals
  const getNewArrivals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getNewArrivals();
      setProducts(data);
      setTotal(data.length);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    filters,
    total,
    fetchProducts,
    updateFilters,
    clearFilters,
    searchProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getNewArrivals,
  };
};