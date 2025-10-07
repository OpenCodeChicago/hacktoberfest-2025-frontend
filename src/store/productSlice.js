import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts as apiGetProducts, getProductById as apiGetProductById } from '../api/productService.js';

// Async thunk for fetching products with optional parameters
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await apiGetProducts(params);

      if (!result || result.success === false) {
        // normalize error shape
        throw new Error(result?.error || 'Failed to fetch products');
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

// Async thunk for fetching a product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const result = await apiGetProductById(id);

      if (!result || result.success === false) {
        throw new Error(result?.error || 'Failed to fetch product');
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

// Initial state
const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  hasNextPage: false,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        // Handle different response structures
        if (action.payload.products) {
          // If response has products array and metadata
          state.products = action.payload.products;
          state.totalCount = action.payload.totalCount || action.payload.products.length;
          state.currentPage = action.payload.currentPage || 1;
          state.hasNextPage = action.payload.hasNextPage || false;
        } else if (Array.isArray(action.payload)) {
          // If response is directly an array of products
          state.products = action.payload;
          state.totalCount = action.payload.length;
          state.currentPage = 1;
          state.hasNextPage = false;
        } else {
          // Fallback for unexpected response structure
          state.products = action.payload.data || [];
          state.totalCount = action.payload.total || 0;
          state.currentPage = action.payload.page || 1;
          state.hasNextPage = action.payload.hasNext || false;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      })
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProduct = null;
      });
  },
});

export const { clearError, clearCurrentProduct, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;