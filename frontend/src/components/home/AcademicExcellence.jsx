import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  { icon: '📊', title: 'Board Results', desc: 'Consistent 100% pass rate in board examinations with top ranks' },
  { icon: '🏆', title: 'Competitions', desc: 'Regular winners in district, state, and national level competitions' },
  { icon: '💡', title: 'Innovation', desc: 'Smart classrooms and digital learning initiatives for modern education' },
  { icon: '🌐', title: 'Co-curricular', desc: 'Extensive programs in sports, arts, music, and cultural activities' },
];

const AcademicExcellence = () => {
  return (
    <section className="section-padding bg-primary-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-500 font-medium mb-2">Our Achievements</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">
            Academic Excellence
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicExcellence;
