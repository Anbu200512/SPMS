import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
  { id: 1, emoji: '🏛️', label: 'School Building' },
  { id: 2, emoji: '📚', label: 'Library' },
  { id: 3, emoji: '🔬', label: 'Science Lab' },
  { id: 4, emoji: '⚽', label: 'Sports Day' },
  { id: 5, emoji: '🎭', label: 'Cultural Event' },
  { id: 6, emoji: '🎓', label: 'Graduation' },
];

const GalleryPreview = () => {
  return (
    <section className="section-padding bg-primary-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12"
        >
          <div>
            <p className="text-accent-500 font-medium mb-2">Our Campus</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">Photo Gallery</h2>
          </div>
          <Link to="/gallery" className="mt-4 sm:mt-0 text-primary-600 font-medium hover:text-primary-700 transition-colors">
            View Full Gallery →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`flex items-center justify-center ${index === 0 ? 'h-80' : 'h-48'}`}>
                <span className={`${index === 0 ? 'text-7xl' : 'text-4xl'}`}>{img.emoji}</span>
              </div>
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/60 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
