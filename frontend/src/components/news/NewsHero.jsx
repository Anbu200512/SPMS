import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineNewspaper, HiOutlineChevronDown } from 'react-icons/hi2';

const latestHeadlines = [
  { title: "Students Shine in Board Exams", date: 'May 20' },
  { title: 'New Science Lab Inaugurated', date: 'May 15' },
  { title: 'Inter-School Sports Champions', date: 'May 10' },
];

const NewsHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1659084622165-6391a99e5ae8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG5ld3N8ZW58MHx8MHx8fDA%3D"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-accent-400/40 via-accent-400 to-accent-400/40 z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white/60 mb-8">
            <HiOutlineNewspaper className="w-4 h-4 text-accent-400" />
            <span>St. Paul's School Newsroom</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl"
        >
          News &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-primary-400">
            Updates
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
        >
          Latest news, achievements, and announcements from St. Paul's School — stay informed about everything happening on campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          {[
            { value: '100+', label: 'Articles' },
            { value: '6', label: 'Categories' },
            { value: '25+', label: 'Years' },
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
                Headlines
              </span>
              <span className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
                {latestHeadlines.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <div className="text-center leading-tight">
                        <span className="block text-[9px] uppercase tracking-wider text-accent-400 font-semibold">{item.date}</span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <p className="text-xs font-medium text-white/80 whitespace-nowrap max-w-[180px] truncate">{item.title}</p>
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

export default NewsHero;
