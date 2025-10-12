// Simple utility to manage cart products.
// Stores/retrieves an array of cart item objects in localStorage under the key `cart`.

export function getCart() {
  try {
    const raw = localStorage.getItem('cart');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    // If localStorage access fails (SSR or permission), return empty array
    return [];
  }
}

export function getCartItemCount() {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
}

export function addToCart(product, selectedFlavor = null, quantity = 1) {
  if (!product) return false;
  try {
    const current = getCart();
    const productId = product.id || product._id;

    // Create unique key for product + flavor combination
    const cartItemKey = selectedFlavor
      ? `${productId}_${selectedFlavor}`
      : productId;

    // Check if this exact combination already exists
    const existingItemIndex = current.findIndex(
      (item) => item.cartItemKey === cartItemKey
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      current[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const cartItem = {
        cartItemKey,
        id: productId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || product.image,
        selectedFlavor: selectedFlavor,
        quantity: quantity,
        salePercentage: product.sale,
        addedAt: Date.now(),
      };
      current.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(current));
    return true;
  } catch {
    return false;
  }
}

export function removeFromCart(cartItemKey) {
  if (!cartItemKey) return false;
  try {
    const current = getCart();
    const filtered = current.filter((item) => item.cartItemKey !== cartItemKey);
    localStorage.setItem('cart', JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function isInCart(product, selectedFlavor = null) {
  if (!product) return false;
  try {
    const cart = getCart();
    const productId = product.id || product._id;
    const cartItemKey = selectedFlavor
      ? `${productId}_${selectedFlavor}`
      : productId;

    return cart.some((item) => item.cartItemKey === cartItemKey);
  } catch {
    return false;
  }
}

export function toggleCart(product, selectedFlavor = null) {
  if (!product) return false;

  const productId = product.id || product._id;
  const cartItemKey = selectedFlavor
    ? `${productId}_${selectedFlavor}`
    : productId;
  const isCurrentlyInCart = isInCart(product, selectedFlavor);

  if (isCurrentlyInCart) {
    removeFromCart(cartItemKey);
    return false; // Removed from cart
  } else {
    addToCart(product, selectedFlavor, 1);
    return true; // Added to cart
  }
}

export default {
  getCart,
  getCartItemCount,
  addToCart,
  removeFromCart,
  isInCart,
  toggleCart,
};
