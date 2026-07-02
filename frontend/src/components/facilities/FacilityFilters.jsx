import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineFilter, HiOutlineX } from 'react-icons/hi';

const categories = ['All', 'Academic', 'Sports', 'Infrastructure', 'Health', 'Cultural'];

const FacilityFilters = ({ activeCategory, onCategoryChange }) => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-heading font-bold text-gray-800"
      >
        Explore Our <span className="text-gradient">Facilities</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden sm:flex flex-wrap gap-2"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <button
        onClick={() => setShowMobileFilter(true)}
        className="sm:hidden flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium"
      >
        <HiOutlineFilter className="w-4 h-4" />
        {activeCategory}
      </button>

      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 sm:hidden"
            onClick={() => setShowMobileFilter(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-semibold text-gray-800">Filter by Category</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <HiOutlineX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { onCategoryChange(cat); setShowMobileFilter(false); }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FacilityFilters;
