import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { loginSuccess, setToken } from './store/authSlice';
import axiosInstance from './api/axiosInstance';
import './index.css';

// Create a root container for React 18+
const root = createRoot(document.getElementById('root'));

// Render the app inside StrictMode with Redux Provider
// Validate session on startup using cookie-based refresh flow
// Flow: POST /auth/refresh (uses HttpOnly refresh cookie) -> if token returned, set in-memory token -> GET /users/current to populate user
// Set VITE_SKIP_SESSION_CHECK=true in .env to skip this during local dev if the session endpoint is unavailable.
const skip = import.meta.env.VITE_SKIP_SESSION_CHECK === 'true';
if (!skip) {
  (async () => {
    try {
      // Attempt to refresh using the server-set httpOnly cookie
      const refreshResp = await axiosInstance.post('/auth/refresh');
      const refreshPayload = refreshResp?.data || {};
      const token = refreshPayload.token || null;

      if (token) {
        // store the access token in memory only
        store.dispatch(setToken(token));
      }

      // Fetch current user info (server should validate using refresh cookie or the newly set token)
      const userResp = await axiosInstance.get('/users/current');
      const userPayload = userResp?.data || {};
      const user = userPayload.user || userPayload.data || null;

      if (user && token) {
        store.dispatch(loginSuccess({ user, token }));
      }
    } catch (err) {
      // silent: user not logged in or session check failed
      if (import.meta.env.DEV) console.debug('Session check / refresh failed:', err?.message || err);
    }
  })();
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
