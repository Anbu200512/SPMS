import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { showSuccess, showError } from '../ui/Toast';
import Button from '../ui/Button';

const LeaveForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/leave', data);
      showSuccess('Leave application submitted successfully.');
      reset();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to submit leave application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Leave Type *</label>
          <select
            {...register('leaveType', { required: 'Leave type is required' })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
              errors.leaveType ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select leave type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
            <option value="emergency">Emergency Leave</option>
            <option value="other">Other</option>
          </select>
          {errors.leaveType && <p className="mt-1 text-sm text-red-500">{errors.leaveType.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Days</label>
          <input
            type="number"
            {...register('days', { required: 'Number of days is required', min: 1 })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.days ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Number of days"
          />
          {errors.days && <p className="mt-1 text-sm text-red-500">{errors.days.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
          <input
            type="date"
            {...register('startDate', { required: 'Start date is required' })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.startDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date *</label>
          <input
            type="date"
            {...register('endDate', { required: 'End date is required' })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.endDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason *</label>
        <textarea
          {...register('reason', { required: 'Reason is required' })}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
            errors.reason ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Please provide a detailed reason for leave"
        />
        {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        Submit Leave Application
      </Button>
    </motion.form>
  );
};

export default LeaveForm;
