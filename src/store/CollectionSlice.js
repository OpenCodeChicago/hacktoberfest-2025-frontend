import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCollectionById } from '../api/collectionService';

// Async thunk to fetch a collection by ID/slug
export const fetchCollectionById = createAsyncThunk(
  'collections/fetchById',
  async (collectionId, { rejectWithValue }) => {
    try {
      const data = await getCollectionById(collectionId);
      return data;
    } catch (error) {
      // Log detailed error for debugging
      console.error('Collection fetch error:', error);
      // Return generic user-friendly message
      return rejectWithValue(
        'Unable to load collection. Please try again later.'
      );
    }
  }
);

const collectionSlice = createSlice({
  name: 'collections',
  initialState: {
    currentCollection: null,
    products: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 50,
      total: 0,
    },
  },
  reducers: {
    clearCurrentCollection: (state) => {
      state.currentCollection = null;
      state.products = [];
      state.error = null;
      state.pagination = {
        page: 1,
        limit: 50,
        total: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCollection = action.payload.collections;
        state.products = action.payload.products || [];
        state.pagination = {
          page: action.payload.page || 1,
          limit: action.payload.limit || 50,
          total: action.payload.total || 0,
        };
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { clearCurrentCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
