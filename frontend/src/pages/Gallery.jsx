import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';
import GalleryFilters from '../components/gallery/GalleryFilters';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import galleryImages from '../components/gallery/galleryData';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <PageHeader
        title="Photo Gallery"
        subtitle="Capturing memories and moments throughout the academic year"
      />

      <section className="section-padding">
        <div className="section-container">
          <GalleryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {filteredImages.length > 0 ? (
            <GalleryGrid
              images={filteredImages}
              onSelect={setSelectedImage}
            />
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📸</div>
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <GalleryLightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
      <Footer />
    </motion.div>
  );
};

export default Gallery;
