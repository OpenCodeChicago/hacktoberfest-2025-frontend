import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home/Home'));
const Accessibility = lazy(
  () => import('../pages/Accessibility/Accessibility')
);
const PrivacyPolicy = lazy(
  () => import('../pages/PrivacyPolicy/PrivacyPolicyPage')
);
const ReturnPolicy = lazy(() => import('../pages/ReturnPolicy/ReturnPolicy'));
const About = lazy(() => import('../pages/About/About'));
const ShippingPolicy = lazy(()=>import('../pages/ShippingPolicy/ShippingPage') );
const ProductPage = lazy(() => import('../pages/Products/ProductPage'));

// Router configuration
export const RouterConfig = () =>
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="accessibility" element={<Accessibility />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="return-policy" element={<ReturnPolicy />} />{' '}
      {/* changed to singular for clarity */}
      <Route path="about-corex" element={<About />} />
      <Route path="shipping-policy" element={<ShippingPolicy />} />
    </Route>
  );
