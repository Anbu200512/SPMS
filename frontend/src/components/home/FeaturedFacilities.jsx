import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineComputerDesktop,
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineTrophy,
  HiOutlineMusicalNote,
  HiOutlineHeart,
} from 'react-icons/hi2';

const facilities = [
  {
    icon: HiOutlineComputerDesktop,
    title: 'Smart Classrooms',
    desc: 'Technology-enabled classrooms for interactive learning',
  },
  {
    icon: HiOutlineBeaker,
    title: 'Science Labs',
    desc: 'Well-equipped physics, chemistry, and biology laboratories',
  },
  {
    icon: HiOutlineBookOpen,
    title: 'Library',
    desc: 'Extensive collection of books, journals, and digital resources',
  },
  {
    icon: HiOutlineTrophy,
    title: 'Sports Complex',
    desc: 'Modern facilities for indoor and outdoor sports',
  },
  {
    icon: HiOutlineMusicalNote,
    title: 'Music & Arts',
    desc: 'Dedicated spaces for music, dance, and visual arts',
  },
  {
    icon: HiOutlineHeart,
    title: 'Health Center',
    desc: 'On-campus medical facility with trained staff',
  },
];

const FeaturedFacilities = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-80 h-80 bg-accent-50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-100 rounded-full blur-[140px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-50 rounded-full text-sm font-semibold text-accent-700 mb-4">
            <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
            Our Infrastructure
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
            Featured Facilities
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
            <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            World-class infrastructure designed to provide an enriching educational experience
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {facilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-6 md:p-7 flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-gray-900 mb-1.5 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 h-1 bg-gradient-to-r from-primary-500 to-accent-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore All Facilities
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
