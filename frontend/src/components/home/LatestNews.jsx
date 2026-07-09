import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDate, truncateText } from '../../utils/helpers';

const newsItems = [
  {
    id: 1,
    title: 'Annual Sports Day 2025',
    date: '2025-03-15',
    excerpt: 'Our annual sports day event was a grand success with students showcasing their athletic talents.',
    image: 'https://images.unsplash.com/photo-1700914298569-8f396c0802bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QW5udWFsJTIwU3BvcnRzJTIwRGF5JTIwMjAyNXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Event',
  },
  {
    id: 2,
    title: 'Science Exhibition Winners',
    date: '2025-03-10',
    excerpt: 'Students from St. Paul\'s won top honors at the district science exhibition.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    category: 'Achievement',
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting',
    date: '2025-03-05',
    excerpt: 'The upcoming parent-teacher meeting is scheduled for March 20th. Your participation is valuable.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
    category: 'Notice',
  },
  {
    id: 4,
    title: 'New Academic Session',
    date: '2025-03-01',
    excerpt: 'Registration for the new academic year 2025-26 is now open. Enroll your child today!',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmV3JTIwQWNhZGVtaWMlMjBTZXNzaW9ufGVufDB8fDB8fHww',
    category: 'Admissions',
  },
];

const LatestNews = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-primary-50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-50 rounded-full blur-[140px]" />
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
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
            Latest News
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
            <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover the latest happenings and announcements from our school community
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-700 rounded-full shadow-sm">
                  {item.category}
                </span>

                <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-accent-500 text-white text-xs font-medium rounded-lg shadow-sm">
                  {formatDate(item.date)}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {truncateText(item.excerpt, 80)}
                </p>
                <Link
                  to={`/news/${item.id}`}
                  className="inline-flex items-center gap-1.5 text-primary-600 text-sm font-semibold hover:text-primary-700 transition-colors group/link"
                >
                  Read More
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                </Link>
              </div>

              <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View All News
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;
