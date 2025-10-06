import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SEO from '../components/SEO';
import TopFooter from '../components/Footer';
import MainHeader from '../components/Header';
import TopHeader from '../components/TopHeader';

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <MainHeader />
      <main className="pt-24">
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
              className="text-center py-16 text-gray-500"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              Loading content...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <TopFooter />
      {/* <Footer /> */}
    </div>
  );
}

export default RootLayout;
