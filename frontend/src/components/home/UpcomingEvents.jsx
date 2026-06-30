import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/helpers';

const events = [
  { id: 1, title: 'Annual Day Celebration', date: '2025-04-15', time: '10:00 AM', location: 'School Auditorium' },
  { id: 2, title: 'Science Fair', date: '2025-04-20', time: '9:00 AM', location: 'Science Block' },
  { id: 3, title: 'Sports Day', date: '2025-05-01', time: '8:00 AM', location: 'School Ground' },
  { id: 4, title: 'Parent-Teacher Meeting', date: '2025-05-10', time: '2:00 PM', location: 'Classrooms' },
];

const UpcomingEvents = () => {
  return (
    <section className="section-padding bg-primary-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-500 font-medium mb-2">Don't Miss</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700">Upcoming Events</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-heading font-bold text-lg">
                  {new Date(event.date).getDate()}
                </span>
              </div>
              <p className="text-sm text-accent-500 font-medium mb-1">
                {formatDate(event.date)} | {event.time}
              </p>
              <h3 className="font-heading font-semibold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
