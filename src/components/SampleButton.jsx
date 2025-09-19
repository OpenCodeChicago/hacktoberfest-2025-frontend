import React from 'react';

export default function SampleButton({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      {children || 'Sample Button'}
    </button>
  );
}
