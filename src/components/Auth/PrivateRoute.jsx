import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ redirectTo = '/login', children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectTo} replace />;
}
