import { useState } from 'react';
import { X } from 'lucide-react';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!isOpen) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative">
            {/* Error state */}
            {imageError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
                <svg
                  className="w-24 h-24 text-gray-400"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="64" height="64" rx="8" fill="#F3F4F6" />
                  <path
                    d="M10 44L26 28l12 12 18-22"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            {/* Product image with simple error handling */}
            <img 
              src={product.image || product.imageUrl || '/images/product-default-image.jpg'} 
              alt={product.name || 'Product image'}
              className="w-full rounded-lg shadow-lg"
              onError={handleImageError}
            />
          </div>

          {/* Product Info */}
          <div>
            <button 
              onClick={onClose}
              className="float-right text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold mb-2">{product.name || 'Product Name'}</h2>
            <p className="text-2xl text-blue-600 font-bold mb-4">${product.price || '0.00'}</p>
            
            {/* Rating stars - placeholder for now */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">(128 reviews)</span>
            </div>

            {/* Product description with truncation */}
            <div className="mb-6">
              <p className="text-gray-700">
                {product.description 
                  ? product.description.length > 300 
                    ? `${product.description.substring(0, 300)}...` 
                    : product.description
                  : 'No description available for this product.'
                }
              </p>
            </div>

            {/* Flavors if available */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Available Flavors:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  // Navigate to product page
                  window.location.href = `/products/${product.id || product._id}`;
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                View Full Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;