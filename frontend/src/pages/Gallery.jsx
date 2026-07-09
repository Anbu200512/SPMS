import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryFilters from '../components/gallery/GalleryFilters';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import FeaturedVideos from '../components/gallery/FeaturedVideos';
import GalleryCta from '../components/gallery/GalleryCta';
import galleryImages from '../components/gallery/galleryData';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <GalleryHero />

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

      <FeaturedVideos />

      <GalleryCta />

      <GalleryLightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </motion.div>
  );
};

export default Gallery;
