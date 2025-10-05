import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout'; // Assuming you have a layout component
import Login from '../components/login';
// Import your other pages/components here
// import Home from '../pages/Home';
// import About from '../pages/About';
// etc.

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Layout with Header and Footer
    children: [
      {
        index: true,
        element: <Home />, // Your home page component
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'garage-sale',
        element: <GarageSale />, // Your garage sale page
      },
      {
        path: 'products',
        element: <Products />, // Your products page
      },
      {
        path: 'about',
        element: <About />, // Your about page
      },
      // Add more routes as needed
    ],
  },
]);

export default router;