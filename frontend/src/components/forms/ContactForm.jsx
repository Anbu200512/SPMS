import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import api from '../../services/api';
import { showSuccess, showError } from '../ui/Toast';
import Button from '../ui/Button';

const ContactForm = () => {
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
      await api.post('/contact', data);
      showSuccess('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to send message. Please try again.');
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <div className="relative">
            <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Your name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

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
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
          <div className="relative">
            <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              {...register('phone')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
          <select
            {...register('subject', { required: 'Please select a subject' })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white ${
              errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select subject</option>
            <option value="admissions">Admissions</option>
            <option value="general">General Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="complaint">Complaint</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={5}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Write your message here..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        Send Message
      </Button>
    </motion.form>
  );
};

export default ContactForm;
