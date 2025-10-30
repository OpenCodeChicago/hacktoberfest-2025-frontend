import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SuggestionCard({ prod, onClose }) {
  const [imageError, setImageError] = useState(false);
  const prodId = prod.id || prod._id;
  const handleTitleClick = () => {
    if (onClose) onClose();
  };
  return (
    <div
      className="border border-gray-200 rounded min-w-[140px] max-w-[160px] p-2 hover:shadow-md transition group flex-shrink-0"
      role="listitem"
    >
      <div className="relative w-full h-20 mb-2">
        {/* always render img, fall back to public default if missing or on error */}
        <img
          src={
            prod.imageUrl || prod.image || '/images/product-default-image.jpg'
          }
          alt={prod.name || prod.title || 'Product image'}
          className="w-full h-full object-contain rounded"
          loading="lazy"
          decoding="async"
          width="160"
          height="80"
          onError={(e) => {
            // ensure we don't loop infinitely if default also fails
            if (
              e.currentTarget.src.includes('/images/product-default-image.jpg')
            ) {
              setImageError(true);
              return;
            }
            e.currentTarget.src = '/images/product-default-image.jpg';
            setImageError(true);
          }}
        />

        {/* optional decorative fallback when even default fails */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <p className="text-xs font-medium text-gray-900 line-clamp-2">
        <Link
          to={`/products/${prodId}`}
          onClick={handleTitleClick}
          tabIndex={0}
          className="hover:underline"
        >
          {prod.name || prod.title}
        </Link>
      </p>
      <p className="text-xs text-blue-600 font-semibold mt-1">
        ${prod.price || 0}
      </p>
    </div>
  );
}
