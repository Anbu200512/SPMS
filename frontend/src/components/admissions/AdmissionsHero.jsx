import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '450+', label: 'Students Enrolled' },
  { value: '50+', label: 'Expert Faculty' },
  { value: '98%', label: 'Success Rate' },
  { value: '25+', label: 'Years of Excellence' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AdmissionsHero = () => {
  const scrollToForm = () => {
    const el = document.getElementById('application-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary-900">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.istockphoto.com/id/936987328/photo/young-man-writing-college-or-university-application-form-with-laptop-student-applying-to.webp?a=1&b=1&s=612x612&w=0&k=20&c=FxJpKWBf1ERJO8ALzSRUzH-MrBXoCYXgza4bKV2-aCw="
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/95 via-primary-900/80 to-primary-400/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-transparent to-primary-900/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800/40 via-transparent to-accent-500/10" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large subtle circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-accent-400/10 rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="absolute -top-16 -right-16 w-[350px] h-[350px] border border-white/5 rounded-full"
        />
        {/* Small floating circles */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[15%] w-3 h-3 bg-accent-400/30 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[8%] w-2 h-2 bg-white/20 rounded-full"
        />
        {/* Vertical accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-400 via-primary-400/50 to-accent-400" />
        {/* Bottom accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
          className="absolute bottom-0 left-12 right-12 h-[2px] bg-gradient-to-r from-accent-400/50 via-primary-400/30 to-transparent origin-left hidden md:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 bg-accent-400 rounded-full animate-pulse" />
            <span className="w-14 h-px bg-accent-400/60" />
            <span className="text-accent-400 text-xs uppercase tracking-[0.3em] font-semibold">
              St. Paul&apos;s School
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Shaping Tomorrow&apos;s{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                Leaders
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-400 to-accent-500 origin-left rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 md:mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-xl"
          >
            Empowering students with world-class education, values, and opportunities.
            Your future begins here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={scrollToForm}
              className="group relative px-8 py-4 bg-accent-500 text-primary-900 font-heading font-bold rounded-lg overflow-hidden transition-all duration-300 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Apply Now
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <a
              href="#process"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                className="group"
              >
                <div className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-1 group-hover:text-accent-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsHero;
