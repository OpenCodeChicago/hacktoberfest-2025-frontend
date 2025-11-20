import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { logout as logoutAction } from '../../../store/authSlice';
import { authServices } from '../../../services/api';
import { toast } from 'react-toastify';

// small client-side sanitizer for server-provided messages (avoid rendering HTML / long traces)
function sanitizeErrorMessage(message) {
  if (typeof message !== 'string') return 'An error occurred';
  return message
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .substring(0, 200);
}

function ProfileMenu() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await authServices.logout();
      toast.success('You have been logged out.');
    } catch (err) {
      const raw =
        err?.response?.data?.message || err?.message || 'Logout failed';
      const message = sanitizeErrorMessage(raw);
      console.error('Logout request failed', message);
    } finally {
      try {
        localStorage.removeItem('hasSession');
      } catch (storageErr) {
        const rawStorage = storageErr?.message || storageErr;
        const storageMsg = sanitizeErrorMessage(rawStorage);
        console.error('Failed to clear hasSession flag', storageMsg);
      }
      dispatch(logoutAction());
      setUserMenuOpen(false);
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleMenuKeyDown = (e) => {
    const key = e.key || e.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 'Escape') {
      setUserMenuOpen(false);
    }
    // optional: close on Tab to let focus move away
    if (key === 'Tab') {
      setUserMenuOpen(false);
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (
        userMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [userMenuOpen]);

  return (
    <div
      className="relative"
      ref={userMenuRef}
      onMouseEnter={() => {
        if (isAuthenticated) setUserMenuOpen(true);
      }}
      onMouseLeave={() => setUserMenuOpen(false)}
    >
      <button
        aria-label="User Account"
        aria-haspopup="true"
        aria-expanded={userMenuOpen}
        onClick={() => {
          if (!isAuthenticated) navigate('/login');
          else setUserMenuOpen((s) => !s);
        }}
        onFocus={() => isAuthenticated && setUserMenuOpen(true)} // open on keyboard focus
        className="transform transition-transform duration-200 hover:scale-110 hover:text-black cursor-pointer p-2 inline-flex items-center justify-center"
      >
        <User className="h-5 w-5" />
      </button>

      {/* Dropdown for authenticated users */}
      {isAuthenticated && userMenuOpen && (
        <div
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
          onKeyDown={handleMenuKeyDown} // Escape / Tab handling
        >
          <ul role="none" className="divide-y divide-gray-100">
            <li role="none">
              <button
                type="button"
                role="menuitem"
                tabIndex={0}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                onClick={() => {
                  setUserMenuOpen(false);
                  navigate('/profile');
                }}
              >
                Profile
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                tabIndex={0}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
