import React from 'react';
import { motion } from 'framer-motion';

const operatingHours = [
  { day: 'Monday - Friday', hours: '7:30 AM - 5:30 PM', status: 'Open' },
  { day: 'Saturday', hours: '8:00 AM - 1:00 PM', status: 'Reduced' },
  { day: 'Sunday', hours: 'Closed', status: 'Closed' },
  { day: 'Holidays', hours: 'As per academic calendar', status: 'Varies' },
];

const statusStyles = {
  Open: 'bg-emerald-50 text-emerald-700',
  Reduced: 'bg-amber-50 text-amber-700',
  Closed: 'bg-red-50 text-red-700',
  Varies: 'bg-gray-100 text-gray-600',
};

const OperatingHours = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-accent-500 font-medium mb-2">Timings</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Operating Hours</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {operatingHours.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 md:p-5 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-800 text-sm md:text-base">{item.day}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">{item.hours}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[item.status] || ''}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">* Timings may vary during holidays and exam periods</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OperatingHours;
