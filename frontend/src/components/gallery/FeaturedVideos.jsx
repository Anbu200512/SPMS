import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlay, HiOutlineClock } from 'react-icons/hi2';

const videos = [
  {
    id: 1,
    title: 'Annual Day Celebration 2024',
    category: 'Cultural',
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80',
    duration: '12:30',
    description: 'Highlights from our grand annual day celebration featuring student performances, cultural acts, and award ceremonies.',
  },
  {
    id: 2,
    title: 'Sports Day 2024 Highlights',
    category: 'Sports',
    thumbnail: 'https://media.istockphoto.com/id/466335022/photo/space-hopper-challenge.webp?a=1&b=1&s=612x612&w=0&k=20&c=S2_tobBpnCGmGD8V_lu7_hXEF1HqhcG3SMsNAxoKscg=',
    duration: '8:45',
    description: 'Relive the excitement of our annual sports day with track events, team competitions, and prize distribution.',
  },
  {
    id: 3,
    title: 'Science Exhibition Tour',
    category: 'Events',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
    duration: '15:20',
    description: 'A walkthrough of our annual science exhibition showcasing innovative student projects and experiments.',
  },
  {
    id: 4,
    title: 'Campus Walkthrough',
    category: 'Campus',
    thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
    duration: '6:50',
    description: 'Take a virtual tour of our sprawling campus including classrooms, labs, sports facilities, and more.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FeaturedVideos = () => {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary-50 rounded-full blur-[140px] translate-x-1/3" />
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-accent-50 rounded-full blur-[120px] -translate-x-1/4" />
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
            Media
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-3">
            Featured Videos
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-0.5 bg-primary-200 rounded-full" />
            <span className="w-6 h-0.5 bg-accent-400 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Relive our favorite moments through video highlights from across the school year
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-md group-hover:shadow-xl transition-all duration-500">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                    <HiOutlinePlay className="w-6 h-6 text-primary-600 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-xs font-medium flex items-center gap-1.5">
                  <HiOutlineClock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-heading font-semibold text-gray-800 text-sm group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{video.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
