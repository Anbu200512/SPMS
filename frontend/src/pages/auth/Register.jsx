import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../../components/forms/RegisterForm';

const Register = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">Register to get started</p>
      </div>
      <RegisterForm />
    </motion.div>
  );
};

export default Register;
