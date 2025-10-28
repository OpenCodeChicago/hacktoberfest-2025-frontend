import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Small, local helpers kept inside the context to centralize cart logic.
function getCart() {
  try {
    const raw = localStorage.getItem('cart');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistCart(nextItems) {
  try {
    localStorage.setItem('cart', JSON.stringify(nextItems));
  } catch {
    // ignore localStorage errors
  }
}

function makeCartItemKey(product, selectedFlavor = null) {
  if (!product) return null;
  const productId = product.id ?? product._id ?? product.productId;
  if (!productId) return null;
  return selectedFlavor ? `${String(productId)}_${String(selectedFlavor)}` : String(productId);
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = getCart() || [];
      const map = new Map();
      raw.forEach((it) => {
        const rawKey = it.cartItemKey || it.id || it.productId;
        if (!rawKey) return;
        const key = String(rawKey);
        map.set(key, { ...it, cartItemKey: key });
      });
      return Array.from(map.values());
    } catch {
      return [];
    }
  });

  // Persist helper
  const persist = useCallback((nextItems) => {
    persistCart(nextItems);
  }, []);

  // Sync when other tabs or legacy utilities update the cart
  useEffect(() => {
    // Shallow comparison: same length and same (key, quantity) pairs in same order
    const shallowEquals = (a = [], b = []) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if ((a[i].cartItemKey || a[i].id) !== (b[i].cartItemKey || b[i].id)) return false;
        if ((a[i].quantity || 0) !== (b[i].quantity || 0)) return false;
      }
      return true;
    };

    const sync = () => {
      try {
        const external = getCart() || [];
        const normalized = external.map((it) => {
          const key = String(it.cartItemKey || it.id || it.productId || '');
          return { ...it, cartItemKey: key };
        });
        if (!shallowEquals(normalized, items)) setItems(normalized);
      } catch {
        // ignore
      }
    };

    const handleStorage = (e) => {
      // Only react when the `cart` key changed or on generic storage
      if (!e || e.key === null || e.key === 'cart') sync();
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [items]);

  // Cart helpers (use shared utils for key generation)
  const getItemQuantity = useCallback((product, selectedFlavor = null) => {
    if (!product) return 0;
    const key = makeCartItemKey(product, selectedFlavor) || product.cartItemKey;
    const found = items.find((it) => it.cartItemKey === key);
    return found ? found.quantity || 0 : 0;
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.reduce((total, it) => total + (it.quantity || 0), 0);
  }, [items]);

  const addItem = useCallback((product, selectedFlavor = null, quantity = 1) => {
    if (!product || quantity <= 0) return false;
    const key = makeCartItemKey(product, selectedFlavor) || product.cartItemKey;
    if (!key) return false;
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.cartItemKey === key);
      const next = prev.slice();
      if (idx >= 0) {
        // set existing to provided quantity (avoid accidental double increments)
        next[idx] = { ...next[idx], quantity: quantity };
      } else {
        const productId = product.id ?? product._id ?? product.productId;
        const salePercent = product.sale ?? product.salePercentage ?? 0;
        next.push({
          cartItemKey: key,
          id: productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl || product.image,
          selectedFlavor: selectedFlavor,
          quantity,
          salePercentage: salePercent,
          addedAt: Date.now(),
        });
      }
      persist(next);
      return next;
    });
    return true;
  }, [persist]);

  const updateItemQuantity = useCallback((product, selectedFlavor = null, newQuantity) => {
    if (!product || newQuantity < 0) return false;
    const key = makeCartItemKey(product, selectedFlavor) || product.cartItemKey;
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.cartItemKey === key);
      if (idx >= 0) {
        const next = prev.slice();
        if (newQuantity === 0) {
          next.splice(idx, 1);
        } else {
          next[idx] = { ...next[idx], quantity: newQuantity };
        }
        persist(next);
        return next;
      }
      return prev;
    });
    return true;
  }, [persist]);

  const removeItem = useCallback((cartItemKey) => {
    if (!cartItemKey) return false;
    setItems((prev) => {
      const next = prev.filter((it) => it.cartItemKey !== cartItemKey);
      persist(next);
      return next;
    });
    return true;
  }, [persist]);

  const clearCart = useCallback(() => {
    setItems([]);
    persist([]);
  }, [persist]);

  const value = {
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    getItemQuantity,
    getItemCount,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

export default CartContext;
