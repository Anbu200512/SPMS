import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin } from 'react-icons/hi2';

const ContactMap = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent-500 font-semibold mb-3">
            Visit Our Campus
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">
            Find Us Here
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96"
        >
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineMapPin className="w-7 h-7 text-accent-600" />
              </div>
              <p className="text-gray-600 font-semibold">123, School Street, Educational District</p>
              <p className="text-gray-500 text-sm">City - 600001</p>
              <p className="text-gray-400 text-xs mt-3">Interactive map integration coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;
