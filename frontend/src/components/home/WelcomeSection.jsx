import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const stats = [
  { value: '25+', label: 'Years Legacy' },
  { value: '5000+', label: 'Students' },
  { value: '200+', label: 'Faculty' },
  { value: '100%', label: 'Pass Rate' },
];

const WelcomeSection = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-maroon-50 rounded-full blur-[120px]" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-gray-50 rounded-full blur-[80px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative">
              <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                  alt="Students at St. Paul's"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-3">
                <div className="bg-maroon-800 rounded-xl p-5 shadow-xl text-center">
                  <span className="block text-2xl font-bold text-white">25+</span>
                  <span className="text-maroon-200 text-xs">Years</span>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-xl text-center border border-gray-100">
                  <span className="block text-2xl font-bold text-maroon-800">5000+</span>
                  <span className="text-gray-500 text-xs">Students</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-maroon-50 rounded-full text-sm font-semibold text-maroon-800 mb-6">
              <span className="w-2 h-2 bg-maroon-800 rounded-full" />
              Welcome to
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-black mb-6 leading-[1.15]">
              St. Paul's
              <span className="block text-maroon-800">Matriculation School</span>
            </h2>

            <div className="w-16 h-1 bg-maroon-800 rounded-full mb-6" />

            <p className="text-gray-600 mb-5 leading-relaxed text-lg">
              At St. Paul's, we believe that education is not just about academic excellence but about
              nurturing well-rounded individuals who are prepared to face the challenges of tomorrow.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Our dedicated faculty, modern infrastructure, and innovative teaching methodologies create
              an environment where every student can thrive and discover their unique potential.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-maroon-800 text-white font-semibold rounded-xl hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Learn More About Us
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div key={i} className="relative bg-white rounded-xl border border-gray-100 p-6 text-center shadow-lg hover:shadow-xl transition-shadow group">
              <div className="absolute inset-0 bg-maroon-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <span className="block text-3xl md:text-4xl font-bold text-maroon-800 mb-1">{stat.value}</span>
                <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
