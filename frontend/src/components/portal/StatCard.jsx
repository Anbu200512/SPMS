import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';

const StatCard = ({ icon: Icon, label, value, trend, trendLabel, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={classNames('w-12 h-12 rounded-xl flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span
            className={classNames(
              'text-sm font-medium flex items-center gap-1',
              trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-heading font-bold text-gray-800">{value}</p>
      {trendLabel && <p className="text-xs text-gray-400 mt-1">{trendLabel}</p>}
    </motion.div>
  );
};

export default StatCard;
