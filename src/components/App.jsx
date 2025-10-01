import { useState } from 'react';
import AccessibilityPage from './AccessibilityPage';

export default function App() {
  const [showAccessibilityPage, setShowAccessibilityPage] = useState(false);

  if (showAccessibilityPage) {
    return (
      <div>
        <nav className="p-4 bg-gray-100">
          <button 
            onClick={() => setShowAccessibilityPage(false)}
            className="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            ← Back to Home
          </button>
        </nav>
        <AccessibilityPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 space-y-6 p-8">
      <h1 className="text-4xl font-bold">Hacktoberfest 2025</h1>
      <h2 className="text-2xl">Open Code Chicago</h2>
      <p className="text-lg max-w-xl">
        Welcome to the Hacktoberfest 2025 frontend project! This is a React
        application styled with Tailwind CSS. Feel free to explore Figma designs
        and the code, make contributions, and enhance the app!
      </p>
      
      <div className="mt-6">
        <button
          onClick={() => setShowAccessibilityPage(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Accessibility Page
        </button>
      </div>
    </div>
  );
}