import React from 'react';
import { motion } from 'framer-motion';

const facilities = [
  { icon: '💻', title: 'Smart Classrooms', desc: 'Technology-enabled classrooms for interactive learning' },
  { icon: '🔬', title: 'Science Labs', desc: 'Well-equipped physics, chemistry, and biology laboratories' },
  { icon: '📖', title: 'Library', desc: 'Extensive collection of books, journals, and digital resources' },
  { icon: '⚽', title: 'Sports Complex', desc: 'Modern facilities for indoor and outdoor sports' },
  { icon: '🎵', title: 'Music & Arts', desc: 'Dedicated spaces for music, dance, and visual arts' },
  { icon: '💊', title: 'Health Center', desc: 'On-campus medical facility with trained staff' },
];

const FeaturedFacilities = () => {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-500 font-medium mb-2">Our Infrastructure</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">Featured Facilities</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-5 p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
