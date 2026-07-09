import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendarDays, HiOutlineChevronDown } from 'react-icons/hi2';

const upcomingDates = [
  { date: 'Dec 15', title: 'Annual Day Celebration', category: 'Cultural' },
  { date: 'Jan 25', title: 'Science Exhibition', category: 'Academic' },
  { date: 'Feb 10', title: 'Sports Day', category: 'Sports' },
];

const EventsHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1500&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-accent-400/40 via-accent-400 to-accent-400/40 z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white/60 mb-8">
            <HiOutlineCalendarDays className="w-4 h-4 text-accent-400" />
            <span>St. Paul's School Events</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl"
        >
          School{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-primary-400">
            Events
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
        >
          Stay updated with the latest events and activities at St. Paul's — from academic workshops to grand celebrations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          {[
            { value: '12+', label: 'Events/Year' },
            { value: '4', label: 'Categories' },
            { value: '500+', label: 'Participants' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl font-black text-accent-400">{stat.value}</span>
              <span className="text-xs uppercase tracking-[0.15em] text-white/40 font-medium">
                {stat.label}
              </span>
              {i < 2 && <span className="w-px h-7 bg-white/10 ml-3" />}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium shrink-0">
                Upcoming
              </span>
              <span className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
                {upcomingDates.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <div className="text-center leading-tight">
                        <span className="block text-xs font-bold text-accent-400">{event.date.split(' ')[0]}</span>
                        <span className="block text-[10px] text-white/40">{event.date.split(' ')[1]}</span>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <p className="text-xs font-medium text-white/80 whitespace-nowrap">{event.title}</p>
                        <p className="text-[10px] text-white/40">{event.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-32 right-8 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">Scroll</span>
          <HiOutlineChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EventsHero;
