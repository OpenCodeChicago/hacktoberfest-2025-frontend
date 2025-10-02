import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';

// Create a root container for React 18+
const root = createRoot(document.getElementById('root'));

// Render the app inside StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
