import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';

const subjects = [
  { name: 'Mathematics', icon: '📐', description: 'Building analytical and problem-solving skills' },
  { name: 'Science', icon: '🔬', description: 'Exploring the wonders of the natural world' },
  { name: 'English', icon: '📚', description: 'Developing language and communication skills' },
  { name: 'Social Studies', icon: '🌍', description: 'Understanding society and history' },
  { name: 'Computer Science', icon: '💻', description: 'Preparing for the digital future' },
  { name: 'Languages', icon: '🗣️', description: 'Learning Tamil, Hindi, and French' },
];

const Academics = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <PageHeader title="Academics" subtitle="Comprehensive curriculum for holistic development" />
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-4">Our Curriculum</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow the Tamil Nadu State Board curriculum, enriched with modern teaching methodologies,
              digital learning tools, and comprehensive assessment systems to ensure academic excellence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-5xl mb-4">{subject.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-primary-700 mb-3">{subject.name}</h3>
                <p className="text-gray-600">{subject.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
};

export default Academics;
