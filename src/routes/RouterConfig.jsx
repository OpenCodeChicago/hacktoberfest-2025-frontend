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
const TermsOfService = lazy(() => import('../pages/TermsOfService/TermsOfService'));
const ShippingPolicy = lazy(() => import('../pages/ShippingPolicy/ShippingPolicy'));
const About = lazy(() => import('../pages/About/About'));

// Router configuration
export const RouterConfig = () =>
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="accessibility" element={<Accessibility />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="return-policy" element={<ReturnPolicy />} />
      <Route path="terms-of-service" element={<TermsOfService />} />
      <Route path="shipping-policy" element={<ShippingPolicy />} />
      <Route path="about-corex" element={<About />} />
    </Route>
  );
