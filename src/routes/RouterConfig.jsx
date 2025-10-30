import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import PrivateRoute from '../components/Auth/PrivateRoute';
import RestrictedRoute from '../components/Auth/RestrictedRoute';

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
const ShippingPolicy = lazy(
  () => import('../pages/ShippingPolicy/ShippingPage')
);
const Products = lazy(() => import('../pages/Products/Products'));
const ProductPage = lazy(() => import('../pages/Products/ProductPage'));

const TermsOfService = lazy(
  () => import('../pages/TermsOfService/TermsOfService')
);
const GarageSale = lazy(() => import('../pages/GarageSale/GarageSale'));

const CollectionsPage = lazy(
  () => import('../pages/Collections/CollectionsPage')
);

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const Profile = lazy(() => import('../pages/Profile'));
const Checkout = lazy(() => import('../pages/Checkout'));

const NotFound = lazy(() => import('../pages/PageNotFound/NotFound'));

// Router configuration
export const RouterConfig = () =>
  createRoutesFromElements(
    <>
      {/* Restrict login/register pages when user is authenticated */}
      <Route path="/register" element={<RestrictedRoute><Register /></RestrictedRoute>} />
      
      <Route path="/login" element={<RestrictedRoute><Login /></RestrictedRoute>} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="products/:id" element={<ProductPage />} />
        
        {/* Example protected routes */}
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />

        <Route path="garage-sale" element={<GarageSale />} />
        <Route path="collections/:name" element={<CollectionsPage />} />
        <Route path="about-corex" element={<About />} />
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
