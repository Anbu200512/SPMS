import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineStar, HiOutlineBadgeCheck } from 'react-icons/hi';

const highlights = [
  { icon: HiOutlineAcademicCap, label: 'Years of Excellence', value: '24+' },
  { icon: HiOutlineUserGroup, label: 'Students', value: '2,500+' },
  { icon: HiOutlineStar, label: 'Teachers', value: '150+' },
  { icon: HiOutlineBadgeCheck, label: 'Awards', value: '50+' },
];

const SchoolHighlights = () => {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-b from-primary-50 to-white border border-primary-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-xl flex items-center justify-center">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-2">
                {item.value}
              </div>
              <div className="text-gray-600 font-medium">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolHighlights;
