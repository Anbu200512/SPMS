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
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent-50 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-primary-200" />

              <div className="relative w-full h-[460px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                  alt="St. Paul's School Building"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Established</p>
                      <p className="text-white font-bold text-lg">1982</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-7 -right-7 bg-accent-500 rounded-2xl p-6 shadow-2xl z-10"
              >
                <span className="block text-3xl font-bold text-white">25+</span>
                <span className="text-accent-100 text-sm font-medium">Years of Excellence</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-sm font-semibold text-primary-700 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Welcome to
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-black mb-6 leading-[1.15]">
              St. Paul's
              <span className="block text-primary-500">Matriculation School</span>
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-14 h-1 bg-primary-500 rounded-full" />
              <span className="w-8 h-1 bg-accent-400 rounded-full" />
            </div>

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
              className="group inline-flex items-center gap-3 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Learn More About Us</span>
              <span className="group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <span className="block text-3xl md:text-4xl font-bold text-primary-500 mb-1 group-hover:text-primary-600 transition-colors">
                  {stat.value}
                </span>
                <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
