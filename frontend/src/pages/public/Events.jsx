import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import PageHeader from '../../components/common/PageHeader';
import { formatDate } from '../../utils/helpers';

const allEvents = [
  {
    id: 1,
    title: 'Annual Day Celebration',
    date: '2026-12-15',
    time: '10:00 AM - 1:00 PM',
    venue: 'School Auditorium',
    description: 'Join us for the grand Annual Day celebration featuring cultural performances, award ceremonies, and more.',
    category: 'Cultural',
    isUpcoming: true,
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    date: '2026-11-20',
    time: '9:00 AM - 12:00 PM',
    venue: 'School Campus',
    description: 'Quarterly parent-teacher meeting to discuss student progress and academic performance.',
    category: 'Academic',
    isUpcoming: true,
  },
  {
    id: 3,
    title: 'Science Exhibition',
    date: '2027-01-25',
    time: '10:00 AM - 4:00 PM',
    venue: 'Science Block',
    description: 'Students showcase their innovative science projects and experiments.',
    category: 'Academic',
    isUpcoming: true,
  },
  {
    id: 4,
    title: 'Sports Day',
    date: '2027-02-10',
    time: '8:00 AM - 5:00 PM',
    venue: 'School Ground',
    description: 'Annual sports day with various athletic events, races, and team competitions.',
    category: 'Sports',
    isUpcoming: true,
  },
  {
    id: 5,
    title: 'Cultural Fest',
    date: '2027-03-05',
    time: '9:00 AM - 6:00 PM',
    venue: 'School Campus',
    description: 'A vibrant cultural festival featuring music, dance, drama, and art competitions.',
    category: 'Cultural',
    isUpcoming: true,
  },
  {
    id: 6,
    title: 'Workshop on Robotics',
    date: '2026-10-05',
    time: '10:00 AM - 3:00 PM',
    venue: 'Computer Lab',
    description: 'Hands-on workshop on robotics and AI for high school students.',
    category: 'Academic',
    isUpcoming: false,
  },
  {
    id: 7,
    title: 'Independence Day',
    date: '2026-08-15',
    time: '8:00 AM - 10:00 AM',
    venue: 'School Ground',
    description: 'Celebration of Independence Day with flag hoisting, parade, and cultural programs.',
    category: 'Cultural',
    isUpcoming: false,
  },
  {
    id: 8,
    title: 'Teacher\'s Day',
    date: '2026-09-05',
    time: '9:00 AM - 12:00 PM',
    venue: 'School Auditorium',
    description: 'Students celebrate Teacher\'s Day with special performances and activities.',
    category: 'Cultural',
    isUpcoming: false,
  },
  {
    id: 9,
    title: 'Inter-School Debate',
    date: '2026-07-20',
    time: '9:00 AM - 4:00 PM',
    venue: 'Seminar Hall',
    description: 'Inter-school debate competition on contemporary topics.',
    category: 'Academic',
    isUpcoming: false,
  },
  {
    id: 10,
    title: 'Freshers Party',
    date: '2026-06-15',
    time: '10:00 AM - 1:00 PM',
    venue: 'School Auditorium',
    description: 'Welcome party for new students joining the school.',
    category: 'Cultural',
    isUpcoming: false,
  },
  {
    id: 11,
    title: 'Basketball Tournament',
    date: '2026-09-25',
    time: '8:00 AM - 5:00 PM',
    venue: 'Basketball Court',
    description: 'Annual inter-class basketball tournament.',
    category: 'Sports',
    isUpcoming: false,
  },
  {
    id: 12,
    title: 'Annual Picnic',
    date: '2026-02-20',
    time: '7:00 AM - 6:00 PM',
    venue: 'City Park',
    description: 'Annual school picnic for all students and staff.',
    category: 'Cultural',
    isUpcoming: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const categoryColors = {
  Academic: 'bg-blue-100 text-blue-700',
  Cultural: 'bg-purple-100 text-purple-700',
  Sports: 'bg-green-100 text-green-700',
};

const EventCard = ({ event, index }) => (
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
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg font-heading font-semibold text-gray-800">{event.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${categoryColors[event.category] || 'bg-gray-100 text-gray-600'}`}>
            {event.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Academic', 'Cultural', 'Sports'];

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter((e) => e.isUpcoming);
  const pastEvents = filteredEvents.filter((e) => !e.isUpcoming);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeader
        title="School Events"
        subtitle="Stay updated with the latest events and activities at St. Paul's"
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

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
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
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
                {pastEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </motion.div>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg mb-2">No events found</p>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Events;
