import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCartFromStorage } from '../store/cartSlice';
import { getCart } from '../utils/cart';

export const useCartPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage on app start
    const savedCart = getCart();
    if (savedCart && savedCart.length > 0) {
      dispatch(loadCartFromStorage({ items: savedCart }));
    }
  }, [dispatch]);

  // Sync Redux changes back to localStorage
  useEffect(() => {
    const handleBeforeUnload = () => {
      // This will be handled by the cart slice actions
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
};
