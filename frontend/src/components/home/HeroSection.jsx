import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=1200&q=80',
    badge: 'Established 1982',
    title: "St. Paul's",
    subtitle: 'Matriculation School',
    desc: 'Empowering young minds with quality education, rigorous character building, and holistic development. Where every child\'s potential is nurtured with dedication.',
    cta: { text: 'Explore Admissions', link: '/admissions' },
    cta2: { text: 'Contact Us', link: '/contact' },
  },
  {
    image: 'https://images.unsplash.com/photo-1719159381962-4170890ada4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2Nob29sJTIwaW1hZ2VzfGVufDB8fDB8fHww',
    badge: 'Academics',
    title: 'Shaping Bright',
    subtitle: 'Futures',
    desc: 'A track record of outstanding academic performance with dedicated faculty and innovative teaching methodologies that inspire excellence.',
    cta: { text: 'Our Programs', link: '/academics' },
    cta2: { text: 'Learn More', link: '/about' },
  },
  {
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80',
    badge: 'Holistic',
    title: 'Beyond the',
    subtitle: 'Classroom',
    desc: 'Extensive programs in sports, arts, music, and cultural activities ensuring every student discovers and nurtures their unique talents.',
    cta: { text: 'Explore Activities', link: '/facilities' },
    cta2: { text: 'Contact Us', link: '/contact' },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative mt-16 min-h-screen flex items-center overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-1 px-1.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white mb-8 shadow-lg w-fit mx-auto lg:mx-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-400" />
                </span>
                <span className="tracking-wide uppercase">{slide.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 leading-[1.05] tracking-tight">
                {slide.title}
                <span className="block text-primary-500 mt-2">
                  {slide.subtitle}
                </span>
              </h1>

              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {slide.desc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to={slide.cta.link}
                  className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  {slide.cta.text}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <Link
                  to={slide.cta2.link}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                >
                  {slide.cta2.text}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current ? 'w-10 bg-accent-400' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
