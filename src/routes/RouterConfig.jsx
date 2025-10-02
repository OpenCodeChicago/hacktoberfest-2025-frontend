import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

const Home = lazy(() => import('../pages/Home/Home'));
const Accessibility = lazy(
  () => import('../pages/Accessibility/Accessibility')
);
const PrivacyPolicy = lazy(
  () => import('../pages/PrivacyPolicy/PrivacyPolicyPage')
);
const ReturnPolicy = lazy(() => import('../pages/ReturnPolicy/ReturnPolicy'));

export const RouterConfig = () =>
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="accessibility" element={<Accessibility />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="returns-policy" element={<ReturnPolicy />} />
    </Route>
  );
