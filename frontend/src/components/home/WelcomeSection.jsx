import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-accent-500 font-medium mb-2">Welcome to</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-6">
              St. Paul's Matriculation School
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At St. Paul's, we believe that education is not just about academic excellence but about
              nurturing well-rounded individuals who are prepared to face the challenges of tomorrow.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our dedicated faculty, modern infrastructure, and innovative teaching methodologies create
              an environment where every student can thrive and discover their unique potential.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              Learn More About Us
              <span>→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full h-80 md:h-96 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🎓</div>
                <p className="text-primary-600 font-medium">Excellence in Education</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-500/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
