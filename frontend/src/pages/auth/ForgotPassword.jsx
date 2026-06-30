import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-500 text-sm mt-1">Reset your password in a few steps</p>
      </div>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
