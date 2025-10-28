import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/productService';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartProgressBar from './CartProgressBar';
import CartSuggestions from './CartSuggestions';

export default function CartDrawer({ isOpen, onClose }) {
  const { items: contextItems, removeItem, updateItemQuantity } = useCart();
  const [items, setItems] = useState(contextItems || []);
  const [suggestions, setSuggestions] = useState([]);

  // Sync items from context and handle Escape key
  useEffect(() => {
    setItems(contextItems || []);

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [contextItems, isOpen, onClose]);

  // Load random products for "You may also like" - ONLY when drawer opens
  useEffect(() => {
    let active = true;

    if (!isOpen) {
      // Clear suggestions when drawer is closed to avoid stale items
      setSuggestions([]);
      return () => {
        active = false;
      };
    }

    const loadSuggestions = async () => {
      try {
        const response = await getProducts();
        if (!active) return;

        // Extract products from the nested response structure
        const all = response?.data?.products || [];
        if (!all || all.length === 0) {
          setSuggestions([]);
          return;
        }

        // Filter out products already in cart
        const cartProductIds = (contextItems || []).map((ci) => ci.id);
        const filtered = all.filter((p) => {
          const prodId = p.id || p._id;
          return !cartProductIds.includes(prodId);
        });

        const shuffled = filtered.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 4);
        setSuggestions(selected);
      } catch {
        if (active) setSuggestions([]);
      }
    };

    loadSuggestions();

    return () => {
      active = false;
    };
  }, [isOpen, contextItems]); // fetch only when drawer opens

  const isEmpty = items.length === 0;

  // Calculate subtotal with sale prices
  const subtotal = items.reduce((sum, item) => {
    const basePrice = item.price || 0;
    const salePercent = item.salePercentage || 0;
    const finalPrice =
      salePercent > 0 ? basePrice * (1 - salePercent / 100) : basePrice;
    return sum + finalPrice * (item.quantity || 1);
  }, 0);

  // Calculate milestone progress
  const milestones = [
    { amount: 75, label: 'Free Shipping' },
    { amount: 115, label: 'Free Shaker' },
    { amount: 150, label: 'Free T-Shirt' },
  ];

  const progressPercent = Math.min((subtotal / 150) * 100, 100);
  const currentMilestone = milestones.find((m) => subtotal < m.amount);

  const handleRemove = (cartItemKey) => {
    removeItem(cartItemKey);
  };

  const handleQuantityChange = (item, newQty) => {
    if (newQty <= 0) {
      handleRemove(item.cartItemKey);
      return;
    }
    updateItemQuantity(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        sale: item.salePercentage,
      },
      item.selectedFlavor,
      newQty
    );
  };

  // Ensure cart items are always rendered in the order they were added (by addedAt, oldest first)
  const orderedItems = items
    .slice()
    .sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[999]"
          aria-label="Close cart"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[40%] bg-white shadow-2xl z-[1000] transform transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition group"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-gray-700 transform transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isEmpty ? (
            // Empty State
            <>
              {/* Greyed Progress Bar */}
              <CartProgressBar
                subtotal={0}
                milestones={milestones}
                progressPercent={0}
                currentMilestone={milestones[0]}
              />
              <div className="text-center py-12">
                <p className="text-gray-600 text-sm font-medium mb-6">
                  Your cart is empty
                </p>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="text-gray-800 underline"
                >
                  Explore our products.
                </Link>
              </div>

              {/* Suggestions for Empty Cart */}
              <CartSuggestions suggestions={suggestions} />
            </>
          ) : (
            // Full Cart
            <>
              {/* Progress Bar */}
              <CartProgressBar
                subtotal={subtotal}
                milestones={milestones}
                progressPercent={progressPercent}
                currentMilestone={currentMilestone}
              />

              {/* Cart Items */}
              {/* Cart items list */}
              <div
                className="space-y-4 max-h-96 overflow-y-auto"
                aria-label="Cart items list"
              >
                {orderedItems.map((item) => (
                  <CartItem
                    key={item.cartItemKey}
                    item={{
                      ...item,
                      imageUrl:
                        item.imageUrl ||
                        item.image ||
                        item.img ||
                        '/images/product-default-image.jpg',
                    }}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    onClose={onClose}
                  />
                ))}
              </div>

              {/* Suggestions */}
              <CartSuggestions suggestions={suggestions} onClose={onClose} />

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 space-y-3 -mx-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Subtotal:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <a
                  href="#"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition"
                >
                  Proceed to Checkout
                </a>
                <button
                  onClick={onClose}
                  className="w-full border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
