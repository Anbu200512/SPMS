import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown } from 'react-icons/hi';

const faqData = [
  {
    q: 'Can parents visit the facilities during school hours?',
    a: 'Yes, parents can visit the campus on working days between 9:00 AM and 3:00 PM with prior appointment. Please contact the admin office to schedule a guided tour.',
  },
  {
    q: 'Are the sports facilities available on weekends?',
    a: 'Yes, our sports facilities are open on Saturdays from 6:00 AM to 1:00 PM for students. Prior registration with the sports department is required.',
  },
  {
    q: 'How does the school ensure safety in the labs?',
    a: 'All labs follow strict safety protocols including safety showers, fire extinguishers, first-aid kits, and trained lab assistants. Students are given safety orientation before using any lab facilities.',
  },
  {
    q: 'Is transportation available for all areas?',
    a: 'Our buses cover 40+ routes across the city. You can check route availability during admission or contact the transport office for route mapping near your location.',
  },
  {
    q: 'What medical facilities are available on campus?',
    a: 'We have a well-equipped medical room with a full-time nurse, visiting doctor twice a week, and an ambulance on standby. Regular health check-ups and awareness camps are conducted throughout the year.',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FacilityFAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-accent-500 font-medium mb-2">FAQs</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Frequently Asked Questions</h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqData.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800 text-sm md:text-base pr-4">{faq.q}</span>
                <HiOutlineChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FacilityFAQ;
