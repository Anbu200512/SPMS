import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCamera, HiOutlineHeart } from 'react-icons/hi2';

const GalleryCta = () => {
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6">
          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
          Share Your Moments
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
          Capture the <span className="text-accent-400">Memories</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
          Have a great photo from a school event? Share it with us and be featured in our gallery.
          Together, let's build a beautiful collection of St. Paul's memories.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <HiOutlineCamera className="w-5 h-5" />
            Submit Your Photos
          </Link>
          <Link
            to="/events"
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg flex items-center gap-2"
          >
            <HiOutlineHeart className="w-5 h-5" />
            View Upcoming Events
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default GalleryCta;
