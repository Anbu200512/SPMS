import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-40 -mb-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
          Enroll Your Child Today
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
          Give your child the gift of quality education. Admissions for the academic year 2025-26 are now open.
          Join the St. Paul's family and watch your child flourish.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/admissions"
            className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Apply Now
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg"
          >
            Schedule a Visit
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
