import React from 'react';
import { motion } from 'framer-motion';

const PrincipalMessage = () => {
  return (
    <section className="section-padding bg-primary-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/10 rounded-full -ml-12 -mb-12" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl">👩‍🏫</span>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-heading font-bold text-primary-700 mb-2">
                    Principal's Message
                  </h2>
                  <p className="text-gray-500 italic">
                    "Education is the most powerful weapon which you can use to change the world."
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="text-6xl text-accent-200 absolute -top-4 -left-2">"</div>
                <p className="text-gray-600 leading-relaxed text-lg px-6 relative z-10">
                  At St. Paul's, we are committed to providing an educational experience that goes
                  beyond textbooks. Our goal is to create an environment where students not only excel
                  academically but also develop strong character, leadership skills, and a sense of
                  social responsibility. We believe in nurturing every child's unique talents and
                  guiding them to become confident, compassionate, and successful individuals.
                </p>
              </div>

              <div className="mt-8 text-center md:text-right">
                <p className="font-heading font-semibold text-primary-700 text-lg">Dr. Sarah Johnson</p>
                <p className="text-gray-500">Principal, St. Paul's Matriculation School</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
