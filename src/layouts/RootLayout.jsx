import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../components/SEO';
import TopFooter from '../components/Footer';
import MainHeader from '../components/Header';


function RootLayout() {
  return (
    <>
      <MainHeader />
      <main className="mt-[84px]">
        <SEO
          title="CoreX Nutrition"
          description="CoreX Nutrition official site — explore accessibility, policies, and open-source projects."
          keywords="CoreX Nutrition, Open Source, Accessibility"
        />
        {/* Sets page-specific title/meta */}
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              className="text-center py-8 text-gray-500"
            >
              Loading content...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <TopFooter />
      {/* <Footer /> */}

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
