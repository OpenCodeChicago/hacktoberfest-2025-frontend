import { Outlet } from 'react-router-dom';
import Header from '../components/Header/MainHeader';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main content area - Outlet renders child routes */}
      <main className="flex-grow pt-16"> {/* pt-16 to account for fixed header */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}