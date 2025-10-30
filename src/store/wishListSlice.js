import { createSlice } from '@reduxjs/toolkit';

//initialState for wishlist
const initialState = {
  items: [],
};

//wishlist slice (stub implementation)
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      if (!state.items.some((i) => i.id === action.payload.id))
        state.items.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
