import router from '../routes/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import authInitializer from '../utils/authinitializer';

export default function App() {
  authInitializer()
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
