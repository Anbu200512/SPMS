import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePaperAirplane, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

const subjects = ['Admissions Inquiry', 'Academic Information', 'Campus Tour', 'General Feedback', 'Other'];

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject) errs.subject = 'Please select a subject';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
          <HiOutlineCheckCircle className="w-8 h-8 text-accent-600" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-primary-700 mb-2">Message Sent!</h3>
        <p className="text-gray-500 max-w-md">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
          className="mt-6 px-6 py-3 text-sm font-semibold text-accent-600 bg-accent-50 rounded-xl hover:bg-accent-100 transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent-400/30 ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
              <HiOutlineExclamationCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent-400/30 ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
              <HiOutlineExclamationCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Phone Number <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-sm outline-none transition-all duration-200 hover:border-gray-300 focus:ring-2 focus:ring-accent-400/30"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Subject <span className="text-red-400">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent-400/30 ${
              errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            } ${!form.subject ? 'text-gray-400' : ''}`}
          >
            <option value="" disabled>Select a subject</option>
            {subjects.map((s) => (
              <option key={s} value={s} className="text-gray-900">{s}</option>
            ))}
          </select>
          {errors.subject && (
            <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
              <HiOutlineExclamationCircle className="w-3.5 h-3.5" /> {errors.subject}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent-400/30 resize-none ${
            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        />
        {errors.message && (
          <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
            <HiOutlineExclamationCircle className="w-3.5 h-3.5" /> {errors.message}
          </p>
        )}
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full px-6 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base"
      >
        <HiOutlinePaperAirplane className="w-4 h-4" />
        Send Message
      </motion.button>
    </form>
  );
};

export default ContactForm;
