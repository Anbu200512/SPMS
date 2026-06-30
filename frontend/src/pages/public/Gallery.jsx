import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';

const categories = ['All', 'Campus', 'Events', 'Cultural', 'Sports'];

const galleryImages = [
  { id: 1, title: 'School Building', category: 'Campus', color: 'bg-blue-500' },
  { id: 2, title: 'Science Exhibition', category: 'Events', color: 'bg-green-500' },
  { id: 3, title: 'Annual Day Celebration', category: 'Cultural', color: 'bg-purple-500' },
  { id: 4, title: 'Sports Day', category: 'Sports', color: 'bg-red-500' },
  { id: 5, title: 'Library Interior', category: 'Campus', color: 'bg-amber-500' },
  { id: 6, title: 'Music Competition', category: 'Cultural', color: 'bg-pink-500' },
  { id: 7, title: 'Computer Lab', category: 'Campus', color: 'bg-cyan-500' },
  { id: 8, title: 'Basketball Tournament', category: 'Sports', color: 'bg-orange-500' },
  { id: 9, title: 'Teachers Day', category: 'Events', color: 'bg-indigo-500' },
  { id: 10, title: 'Dance Performance', category: 'Cultural', color: 'bg-rose-500' },
  { id: 11, title: 'Playground', category: 'Campus', color: 'bg-emerald-500' },
  { id: 12, title: 'Athletics Meet', category: 'Sports', color: 'bg-yellow-500' },
  { id: 13, title: 'Workshop Session', category: 'Events', color: 'bg-teal-500' },
  { id: 14, title: 'Art Exhibition', category: 'Cultural', color: 'bg-violet-500' },
  { id: 15, title: 'Classroom', category: 'Campus', color: 'bg-sky-500' },
  { id: 16, title: 'Cricket Match', category: 'Sports', color: 'bg-lime-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader
        title="Photo Gallery"
        subtitle="Capturing memories and moments throughout the academic year"
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                layout
                onClick={() => setSelectedImage(image)}
                className={`${image.color} rounded-xl overflow-hidden cursor-pointer break-inside-avoid ${
                  index % 3 === 0 ? 'h-72' : index % 3 === 1 ? 'h-56' : 'h-64'
                } relative group`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/80 text-5xl opacity-30">
                    {image.category === 'Campus' ? '🏛' : image.category === 'Events' ? '🎪' : image.category === 'Cultural' ? '🎭' : '⚽'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium">{image.title}</p>
                  <p className="text-white/70 text-sm">{image.category}</p>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📸</div>
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <div className={`${selectedImage.color} rounded-2xl overflow-hidden shadow-2xl`}>
                <div className="h-80 md:h-96 flex items-center justify-center relative">
                  <span className="text-white/30 text-8xl">
                    {selectedImage.category === 'Campus' ? '🏛' : selectedImage.category === 'Events' ? '🎪' : selectedImage.category === 'Cultural' ? '🎭' : '⚽'}
                  </span>
                </div>
                <div className="bg-white p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-heading font-semibold text-gray-800">{selectedImage.title}</h3>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-500">Category: {selectedImage.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
