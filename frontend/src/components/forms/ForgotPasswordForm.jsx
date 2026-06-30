import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { forgotPassword } from '../../services/authService';
import { showSuccess, showError } from '../ui/Toast';
import Button from '../ui/Button';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPassword(data.email);
      setSent(true);
      showSuccess('Password reset link sent to your email.');
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="text-xl font-heading font-semibold text-gray-800 mb-2">Check Your Email</h3>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to your email address. Please check your inbox.
        </p>
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Back to Login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <p className="text-sm text-gray-600 mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <div className="relative">
          <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </motion.form>
  );
};

export default ForgotPasswordForm;
