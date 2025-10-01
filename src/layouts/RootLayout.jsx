import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      {/* <TopHeader /> */}
      {/* <Header /> */}
      {/* <main> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {/* </main> */}
      {/* <Footer /> */}
    </>
  );
}

export default RootLayout;
