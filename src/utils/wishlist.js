// Simple utility to manage wishlist products.
// Stores/retrieves an array of product objects in localStorage under the key `wishlist`.

export function getWishlist() {
  try {
    const raw = localStorage.getItem('wishlist');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    // If localStorage access fails (SSR or permission), return empty array
    return [];
  }
}

export function isInWishlist(productId) {
  try {
    const wishlist = getWishlist();
    return wishlist.some((p) => (p.id || p._id) === productId);
  } catch {
    return false;
  }
}

export function addToWishlist(product) {
  if (!product || !product.id && !product._id) return false; // Ensure product has an ID
  try {
    const current = getWishlist();
    const productId = product.id || product._id;

    // Check if already exists
    const exists = current.some((p) => (p.id || p._id) === productId);
    if (exists) return false; // Prevent adding duplicates

    // Create a sanitized product object to store
    const sanitizedProduct = {
      id: productId,
      name: product.name, // Ensure only non-sensitive data is stored
      image: product.image, // Example of non-sensitive data
      // Add other non-sensitive fields as needed
    };

    // Add to wishlist
    current.push(sanitizedProduct);
    localStorage.setItem('wishlist', JSON.stringify(current));
    return true;
  } catch {
    return false;
  }
}

export function RemoveFromWishlist(productId) {
  if (!productId) return false;
  try {
    const current = getWishlist();
    const filtered = current.filter((p) => (p.id || p._id) !== productId);
    localStorage.setItem('wishlist', JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function toggleWishlist(product) {
  if (!product || !product.id && !product._id) return false; // Ensure product has an ID

  const productId = product.id || product._id;
  const isCurrentlyInWishlist = isInWishlist(productId);

  if (isCurrentlyInWishlist) {
    RemoveFromWishlist(productId);
    return false; // Removed from wishlist
  } else {
    addToWishlist(product);
    return true; // Added to wishlist
  }
}

export default {
  getWishlist,
  isInWishlist,
  addToWishlist,
  RemoveFromWishlist,
  toggleWishlist,
};
