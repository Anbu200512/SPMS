import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../../components/forms/LoginForm';

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
      </div>
      <LoginForm />
    </motion.div>
  );
};

export default Login;
