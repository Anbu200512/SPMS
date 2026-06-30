import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/forms/LoginForm';

const Login = () => {
  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
