// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

/**
 * Simple helper to decode JWT payload without external dependency.
 * Returns null if token invalid.
 */
const decodeJwt = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(json);
  } catch (err) {
    console.error('Failed to decode JWT', err);
    return null;
  }
};

const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const userFromStorage = tokenFromStorage ? decodeJwt(tokenFromStorage) : null;

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      const token = action.payload;
      state.token = token;
      state.user = decodeJwt(token) || null;
      state.isAuthenticated = !!token;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload || 'Login failed';
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = !!action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setLoading,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
