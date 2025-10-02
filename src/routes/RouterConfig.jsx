import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

const Home = lazy(() => import('../pages/Home/Home'));
const Accessibility = lazy(
  () => import('../pages/Accessibility/Accessibility')
);
const CollectionSection = lazy(() => import('../pages/ShopCollection/CollectionSection'));

export const RouterConfig = () =>
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="accessibility" element={<Accessibility />} />
      <Route path="collection" element={<CollectionSection />} />
    </Route>
  );
