import React from 'react';
import { motion } from 'framer-motion';

const categories = ['All', 'Campus', 'Events', 'Cultural', 'Sports'];

const GalleryFilters = ({ activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  );
};

export default GalleryFilters;
