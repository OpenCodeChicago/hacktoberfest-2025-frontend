import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
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
      <div className="mt-[112px] min-h-screen bg-[#F7FAFF]">
        <SEO
          title="CoreX Nutrition"
          description="CoreX Nutrition official site — explore accessibility, policies, and open-source projects."
          keywords="CoreX Nutrition, Open Source, Accessibility"
        />
        {/* Sets page-specific title/meta */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <TopFooter />
      <BottomFooter />
      <BackToTop showAfter={250} />
    </CartProvider>
  );
}

export default RootLayout;
