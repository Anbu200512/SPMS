import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryLightbox = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 md:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-black/40">
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            <div className="flex items-center justify-between mt-4 px-2">
              <div>
                <h3 className="text-lg font-heading font-semibold text-white">{image.title}</h3>
                <p className="text-sm text-gray-400">{image.category}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryLightbox;
