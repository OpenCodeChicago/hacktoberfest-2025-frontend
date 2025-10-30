import router from '../routes/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {useAuthInitializer} from '../hooks/useAuthInitializer';

export default function App() {
  useAuthInitializer()
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
