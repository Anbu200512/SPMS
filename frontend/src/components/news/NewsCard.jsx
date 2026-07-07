import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar } from 'react-icons/hi';
import { formatDate, truncateText } from '../../utils/helpers';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const categoryEmoji = {
  Achievements: '🏆',
  Campus: '🏛',
  Events: '🎉',
  Sports: '⚽',
};

const NewsCard = ({ post }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
        {post.category}
      </span>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
        <HiOutlineCalendar className="w-4 h-4" />
        <span>{formatDate(post.date)}</span>
      </div>
      <h3 className="text-lg font-heading font-semibold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{truncateText(post.excerpt, 120)}</p>
      <Link
        to="#"
        className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
      >
        Read More
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  </motion.div>
);

export default NewsCard;
