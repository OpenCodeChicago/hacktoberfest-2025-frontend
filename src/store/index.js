import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;