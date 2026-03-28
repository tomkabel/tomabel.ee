import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-cyan-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
