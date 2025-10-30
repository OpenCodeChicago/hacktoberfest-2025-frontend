import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../components/SEO';
import ScrollToTop from '../components/ui/ScrollToTop/ScrollToTop';
import TopFooter from '../components/TopFooter';
import MainHeader from '../components/Header';
import Loader from '../components/Loader';
import BottomFooter from '../components/BottomFooter';
import BackToTop from '../components/ui/BackToTopButton/BackToTopButton';
import { CartProvider } from '../context/CartContext';

function RootLayout() {
  return (
    <CartProvider>
      <ScrollToTop />
      <MainHeader />
      <main className="mt-[112px] min-h-screen bg-[#F7FAFF]">
        <SEO
          title="CoreX Nutrition"
          description="CoreX Nutrition official site — explore accessibility, policies, and open-source projects."
          keywords="CoreX Nutrition, Open Source, Accessibility"
        />
        {/* Sets page-specific title/meta */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <TopFooter />
      <BottomFooter />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BackToTop showAfter={250} />
    </CartProvider>
  );
}

export default RootLayout;
