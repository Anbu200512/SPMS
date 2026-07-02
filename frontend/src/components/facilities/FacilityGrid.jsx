import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineClock } from 'react-icons/hi';

const getStatus = (timing) => {
  if (timing === '24/7') return { text: 'Open 24/7', color: 'bg-emerald-500', pulse: true };
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [start, end] = timing.split(' - ').map(t => {
    const [h, m] = t.replace(/(AM|PM)/, '').trim().split(':').map(Number);
    const isPM = t.includes('PM');
    let hours = h;
    if (isPM && h !== 12) hours += 12;
    if (!isPM && h === 12) hours = 0;
    return hours * 60 + (m || 0);
  });
  const isOpen = currentMinutes >= start && currentMinutes <= end;
  return {
    text: isOpen ? 'Open Now' : 'Closed',
    color: isOpen ? 'bg-emerald-500' : 'bg-red-500',
    pulse: isOpen,
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const FacilityGrid = ({ facilities, onSelect }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {facilities.map((facility) => {
        const status = getStatus(facility.timing);
        return (
          <motion.div
            key={facility.id}
            variants={itemVariants}
            layout
            onClick={() => onSelect(facility)}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group cursor-pointer card-hover"
          >
            <div className="relative h-40 md:h-48 overflow-hidden">
              <img
                src={facility.image}
                alt={facility.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  status.text === 'Open Now' || status.text === 'Open 24/7'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.color} ${status.pulse ? 'animate-pulse' : ''}`} />
                  {status.text}
                </span>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3 ${facility.textColor}`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center`}>
                  {facility.icon}
                </div>
                <h3 className="text-white font-heading font-semibold text-sm md:text-base drop-shadow-lg">{facility.title}</h3>
              </div>
            </div>
            <div className="p-4 md:p-5">
              <h3 className="text-base md:text-lg font-heading font-semibold text-gray-800 mb-2">{facility.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">{facility.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {facility.features.slice(0, 3).map(f => (
                  <span key={f} className={`px-2 py-0.5 text-xs rounded-full ${facility.bgLight} ${facility.textColor}`}>
                    {f}
                  </span>
                ))}
                {facility.features.length > 3 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">
                    +{facility.features.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 border-t border-gray-100 pt-3">
                <HiOutlineUserGroup className="w-3.5 h-3.5" />
                <span>{facility.capacity}</span>
                <HiOutlineClock className="w-3.5 h-3.5 ml-2" />
                <span>{facility.timing}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FacilityGrid;
