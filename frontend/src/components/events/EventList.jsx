import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const EventList = ({ upcomingEvents, pastEvents }) => {
  return (
    <>
      {upcomingEvents.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-heading font-bold text-gray-800">Upcoming Events</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-800 mb-8">Past Events</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EventList;
