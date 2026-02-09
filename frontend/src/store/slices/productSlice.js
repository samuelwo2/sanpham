import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải sản phẩm');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải chi tiết sản phẩm');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    featuredProducts: [],
    newArrivals: [],
    currentProduct: null,
    loading: false,
    error: null,
    filters: {
      category: null,
      priceRange: [0, 1000000],
      sortBy: 'newest',
    },
  },
  reducers: {
    // Set filters
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: [0, 1000000],
        sortBy: 'newest',
      };
    },
    
    // Clear current product
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setFilter, 
  clearFilters, 
  clearCurrentProduct,
  clearError 
} = productSlice.actions;

export default productSlice.reducer;