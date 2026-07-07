import React from 'react';
import { motion } from 'framer-motion';

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

const heightClasses = ['h-72', 'h-56', 'h-64'];

const GalleryGrid = ({ images, onSelect }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          layout
          onClick={() => onSelect(image)}
          className={`rounded-xl overflow-hidden cursor-pointer break-inside-avoid ${heightClasses[index % 3]} relative group`}
        >
          <img
            src={image.image}
            alt={image.title}
            loading="lazy"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
  );
};

export default GalleryGrid;
