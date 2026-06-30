import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-heading font-bold text-primary-500 mb-4">404</div>
        <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
