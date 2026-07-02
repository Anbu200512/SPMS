import React from 'react';
import { motion } from 'framer-motion';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-500 text-sm mt-1">Reset your password in a few steps</p>
      </div>
      <ForgotPasswordForm />
    </motion.div>
  );
};

export default ForgotPassword;
