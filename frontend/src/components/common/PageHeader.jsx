import React from 'react';
import { motion } from 'framer-motion';

const defaultBg = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80';

const PageHeader = ({ title, subtitle, background, children }) => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src={background || defaultBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-transparent" />
      </div>

      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent-400 via-primary-500 to-accent-400 z-10" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-accent-500/5 to-transparent" />
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute top-1/3 right-20 w-16 h-16 border border-white/5 rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full" />
            <span className="w-12 h-px bg-accent-400/60" />
            <span className="text-accent-400/80 text-xs uppercase tracking-[0.25em] font-medium">St. Paul's</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 max-w-2xl"
            >
              <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                {subtitle}
              </p>
            </motion.div>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 md:mt-16"
          >
            {children}
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-16 right-16 z-10 hidden md:block"
      >
        <div className="h-px bg-gradient-to-r from-accent-400/40 via-primary-500/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default PageHeader;
