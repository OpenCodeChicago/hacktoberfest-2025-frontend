import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import './index.css';

// Create a root container for React 18+
const root = createRoot(document.getElementById('root'));

// Render the app inside StrictMode with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
