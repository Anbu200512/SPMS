import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineStatusOnline, HiOutlineUserGroup, HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';

const statsData = [
  { label: 'Total Facilities', value: 25, suffix: '+', icon: HiOutlineStatusOnline },
  { label: 'Students Served', value: 3200, suffix: '+', icon: HiOutlineUserGroup },
  { label: 'Dedicated Staff', value: 85, suffix: '+', icon: HiOutlineCalendar },
  { label: 'Years of Excellence', value: 28, suffix: '', icon: HiOutlineClock },
];

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <>{count}{suffix}</>;
};

const FacilityStats = () => {
  const [liveStats, setLiveStats] = useState(statsData.map(s => s.value));

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => prev.map(s => s + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {statsData.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 text-center border border-white/10 hover:bg-white/15 transition-all duration-300"
        >
          <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto text-accent-400 mb-2" />
          <div className="text-2xl md:text-3xl font-heading font-bold text-white">
            <AnimatedCounter value={liveStats[idx]} suffix={stat.suffix} />
          </div>
          <p className="text-xs md:text-sm text-white/60 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FacilityStats;
