import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle } from 'lucide-react';

/**
 * A user-friendly component to display when there's a server-side error.
 * It shows additional technical details only in development mode.
 */
export const ApiErrorDisplay = ({ developerError }) => {
  // In Vite, environment variables are accessed via import.meta.env
  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <div className="text-center h-64 flex flex-col items-center justify-center bg-red-50 rounded-lg border border-red-200 p-4 m-2">
      <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-red-800">Oops! Something went wrong on our end.</h3>
      <p className="text-red-600 mt-1">We're sorry for the inconvenience. Our team has been notified and is working on a fix.</p>
      <p className="text-sm text-gray-500 mt-4">Please try again in a little while.</p>

      {isDevelopment && developerError && <p className="text-xs mt-4 text-gray-400">Dev Info: {developerError}</p>}
    </div>
  );
};

ApiErrorDisplay.propTypes = {
  developerError: PropTypes.string,
};