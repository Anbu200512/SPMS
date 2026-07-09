import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock, HiOutlineChevronDown } from 'react-icons/hi2';

const contactMethods = [
  { icon: HiOutlineMapPin, label: 'Visit Us', value: '123, School Street, Edu District' },
  { icon: HiOutlinePhone, label: 'Call Us', value: '+91 98765 43210' },
  { icon: HiOutlineEnvelope, label: 'Email Us', value: 'info@stpaulsschool.edu' },
  { icon: HiOutlineClock, label: 'School Hours', value: 'Mon–Fri: 8:00 AM – 3:30 PM' },
];

const ContactHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1500&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-accent-400/40 via-accent-400 to-accent-400/40 z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-5 gap-12 w-full items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white/60 mb-8">
              <span className="w-2 h-2 bg-accent-400 rounded-full" />
              Get in Touch
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-white leading-[1.05] tracking-tight">
              We'd Love to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-primary-400">
                Hear From You
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              Whether you have a question about admissions, school programs, or just want to say hello —
              we're here and ready to help.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {['Admissions', 'Academics', 'Campus Tours', 'General'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-2 space-y-4"
          >
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center group-hover:bg-accent-500/30 transition-colors duration-300">
                  <method.icon className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40 font-medium">{method.label}</p>
                  <p className="text-sm font-semibold text-white/90">{method.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-32 right-8 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">Scroll</span>
          <HiOutlineChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactHero;
