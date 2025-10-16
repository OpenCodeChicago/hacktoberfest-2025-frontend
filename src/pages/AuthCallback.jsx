// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

/**
 * Try several common query param names that backends use:
 * - token
 * - jwt
 * - access_token
 *
 * If no token is present, show error and optionally keep user on page.
 */
const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const token =
      search.get('token') || search.get('jwt') || search.get('access_token');

    // Sometimes backends redirect with a fragment (after #) like: #token=...
    let fragmentToken = null;
    if (!token && window.location.hash) {
      const hash = new URLSearchParams(window.location.hash.replace('#', ''));
      fragmentToken =
        hash.get('token') || hash.get('jwt') || hash.get('access_token');
    }

    const finalToken = token || fragmentToken;
    if (!finalToken) {
      // No token present; try to call backend endpoint to exchange code (optional)
      // But for now, fail politely
      dispatch(loginFailure('No token found in callback URL'));
      console.error('No token found in OAuth callback URL');
      return;
    }

    (async () => {
      try {
        dispatch(loginStart());
        // Persist token
        localStorage.setItem('token', finalToken);
        // Update Redux
        dispatch(loginSuccess(finalToken));
        console.log('User authenticated (Google SSO). Token stored.');
        // small delay to show UI state (if you want)
        setTimeout(() => {
          // Redirect to home or to a stateful route:
          navigate('/', { replace: true });
        }, 300);
      } catch (err) {
        console.error('Error during processing OAuth callback', err);
        dispatch(loginFailure(err?.message || 'Failed to handle OAuth callback'));
      }
    })();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded shadow p-6 text-center">
        <h2 className="text-lg font-semibold mb-3">Signing you in…</h2>
        <p className="text-sm text-gray-600">
          Please wait while we finalise your sign-in with Google.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
