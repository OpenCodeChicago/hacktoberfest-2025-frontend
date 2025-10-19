import { Suspense } from 'react';
// Import ScrollRestoration along with Outlet
import { Outlet, ScrollRestoration } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../components/SEO';
import TopFooter from '../components/TopFooter';
import MainHeader from '../components/Header';
import Loader from '../components/Loader';
import BottomFooter from '../components/BottomFooter';

function RootLayout() {
  return (
    <>
      {/*  FIX THE SCROLL BUG HERE  */}
      {/* ScrollRestoration automatically scrolls to top on new route, 
          and restores position on back/forward navigation. 
      */}
      <ScrollRestoration /> 

      <MainHeader />
      <main className="mt-[84px] min-h-screen">
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
    </>
  );
}

export default RootLayout;