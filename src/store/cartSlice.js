import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartService from '../api/cartService';

// Initial state for cart
const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
  synced: false, // Track if cart is synced with backend
};

/**
 * Async thunk to fetch user's cart from backend
 */
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart');
    }
  }
);

/**
 * Async thunk to add item to cart
 */
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, selectedFlavor }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart({
        productId,
        quantity,
        selectedFlavor,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

/**
 * Async thunk to remove item from cart
 */
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to remove item from cart'
      );
    }
  }
);

/**
 * Async thunk to update cart item quantity
 */
export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItemQuantity(
        productId,
        quantity
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to update cart item quantity'
      );
    }
  }
);

/**
 * Async thunk to clear entire cart
 */
export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.clearCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  }
);

// Helper function to calculate cart totals
const calculateTotals = (items) => {
  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const totalAmount = items.reduce((sum, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    const salePercentage = item.salePercentage || 0;
    const finalPrice =
      salePercentage > 0 ? price * (1 - salePercentage / 100) : price;
    return sum + finalPrice * quantity;
  }, 0);
  return { totalQuantity, totalAmount };
};

// Cart slice with async thunks
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.synced = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
        state.synced = true;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.synced = false;
      });

    // Add to Cart
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both formats: array directly or wrapped in items property
        state.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload.items || [];
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
        state.synced = true;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Remove from Cart
    builder
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload.items || [];
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Quantity
    builder
      .addCase(updateQuantityAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload.items || [];
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalAmount = totals.totalAmount;
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Clear Cart
    builder
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError, clearError, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
