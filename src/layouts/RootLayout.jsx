import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SEO from '../components/SEO';
import TopFooter from '../components/Footer';
import MainHeader from '../components/Header';

function RootLayout() {
  return (
    <>
      {/* <TopHeader /> */}
      <MainHeader />
      <main>
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
    </>
  );
}

export default RootLayout;
