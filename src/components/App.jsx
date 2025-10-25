import router from '../routes/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PromoPopup from './PromoPopup';

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <PromoPopup />
    </HelmetProvider>
  );
}
