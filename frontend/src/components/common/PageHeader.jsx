import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, background }) => {
  return (
    <section className="relative pt-20 md:pt-24">
      <div
        className={`relative min-h-[300px] md:min-h-[350px] flex items-center justify-center ${
          background
            ? ''
            : 'bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700'
        }`}
        style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {background && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        )}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
