import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <PageHeader title="About Us" subtitle="Discover the story of St. Paul's Matriculation School" />
      <section className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-6">Our Legacy of Excellence</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                St. Paul's Matriculation School has been a beacon of quality education for over two decades. 
                Founded with the vision of nurturing young minds, we have consistently strived to provide 
                an environment that fosters academic excellence, character development, and holistic growth.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our dedicated faculty, state-of-the-art infrastructure, and innovative teaching methodologies 
                ensure that every student receives the best possible education. We believe in nurturing not 
                just scholars, but responsible citizens who will contribute meaningfully to society.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At St. Paul's, we don't just educate; we inspire. Our students consistently achieve outstanding 
                results in academics, sports, and co-curricular activities, making us one of the most respected 
                educational institutions in the region.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <p className="text-primary-600 font-medium">School Building</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-500/20 rounded-full blur-xl" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary-500/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
};

export default About;
