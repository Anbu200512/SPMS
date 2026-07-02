import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';

const categoryColors = {
  Academic: 'bg-blue-100 text-blue-700',
  Cultural: 'bg-purple-100 text-purple-700',
  Sports: 'bg-green-100 text-green-700',
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const EventCard = ({ event }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
  >
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-32 bg-gradient-to-b from-primary-500 to-primary-700 text-white p-4 flex sm:flex-col items-center justify-center gap-1">
        <span className="text-3xl font-heading font-bold">
          {new Date(event.date).getDate()}
        </span>
        <span className="text-sm font-medium uppercase opacity-90">
          {new Date(event.date).toLocaleString('en-US', { month: 'short' })}
        </span>
        <span className="text-xs opacity-75">
          {new Date(event.date).getFullYear()}
        </span>
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-heading font-semibold text-gray-800">{event.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${categoryColors[event.category] || 'bg-gray-100 text-gray-600'}`}>
            {event.category}
          </span>
        </div>
        <div className="flex gap-4 mb-3">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1.5">
            <HiOutlineClock className="w-4 h-4" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <HiOutlineLocationMarker className="w-4 h-4" />
            {event.venue}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default EventCard;
