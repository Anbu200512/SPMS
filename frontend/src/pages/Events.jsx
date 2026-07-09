import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EventsHero from '../components/events/EventsHero';
import EventsCta from '../components/events/EventsCta';
import EventFilters from '../components/events/EventFilters';
import EventList from '../components/events/EventList';
import allEvents from '../components/events/eventsData';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

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
      <EventsHero />

      <section className="section-padding">
        <div className="section-container">
          <EventFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />

          {filteredEvents.length > 0 ? (
            <EventList
              upcomingEvents={upcomingEvents}
              pastEvents={pastEvents}
            />
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg mb-2">No events found</p>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      <EventsCta />
    </motion.div>
  );
};

export default Events;
