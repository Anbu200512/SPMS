import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDate, truncateText } from '../../utils/helpers';

const newsItems = [
  { id: 1, title: 'Annual Sports Day 2025', date: '2025-03-15', excerpt: 'Our annual sports day event was a grand success with students showcasing their athletic talents.', image: '🏃' },
  { id: 2, title: 'Science Exhibition Winners', date: '2025-03-10', excerpt: 'Students from St. Paul\'s won top honors at the district science exhibition.', image: '🔬' },
  { id: 3, title: 'Parent-Teacher Meeting', date: '2025-03-05', excerpt: 'The upcoming parent-teacher meeting is scheduled for March 20th. Your participation is valuable.', image: '📋' },
  { id: 4, title: 'New Academic Session', date: '2025-03-01', excerpt: 'Registration for the new academic year 2025-26 is now open. Enroll your child today!', image: '📚' },
];

const LatestNews = () => {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12"
        >
          <div>
            <p className="text-accent-500 font-medium mb-2">Stay Updated</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">Latest News</h2>
          </div>
          <Link to="/news" className="mt-4 sm:mt-0 text-primary-600 font-medium hover:text-primary-700 transition-colors">
            View All News →
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 card-hover"
            >
              <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-6xl">
                {item.image}
              </div>
              <div className="p-5">
                <p className="text-sm text-accent-500 font-medium mb-2">{formatDate(item.date)}</p>
                <h3 className="font-heading font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{truncateText(item.excerpt, 80)}</p>
                <Link to={`/news/${item.id}`} className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
