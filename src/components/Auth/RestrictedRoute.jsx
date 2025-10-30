import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RestrictedRoute({ redirectTo = '/', children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // If user is authenticated, redirect to the provided path (default '/'),
  // otherwise render the child routes (login/register) or children prop.
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
}
