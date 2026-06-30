import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import RegisterForm from '../../components/forms/RegisterForm';

const Register = () => {
  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">Register to get started</p>
      </div>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
