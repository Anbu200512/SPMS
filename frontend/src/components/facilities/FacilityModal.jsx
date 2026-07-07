import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineClock, HiOutlineStatusOnline, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlinePhone, HiOutlineX } from 'react-icons/hi';

const FacilityModal = ({ facility, onClose }) => {
  return (
    <AnimatePresence>
      {facility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 md:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <HiOutlineX className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center ${facility.textColor}`}>
                    {facility.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white">{facility.title}</h3>
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                      {facility.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-8">

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">{facility.longDescription}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
                {[
                  { icon: HiOutlineUserGroup, label: 'Capacity', value: facility.capacity },
                  { icon: HiOutlineClock, label: 'Timing', value: facility.timing },
                  { icon: HiOutlineStatusOnline, label: 'Total', value: facility.total },
                  { icon: HiOutlineLocationMarker, label: 'Location', value: facility.location },
                  { icon: HiOutlineCalendar, label: 'In-Charge', value: facility.incharge },
                  { icon: HiOutlinePhone, label: 'Contact', value: facility.phone },
                ].map((info, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3 md:p-4">
                    <info.icon className={`w-4 h-4 md:w-5 md:h-5 ${facility.textColor} mb-1.5`} />
                    <p className="text-xs text-gray-500">{info.label}</p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 mt-0.5 leading-tight">{info.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-heading font-semibold text-gray-800 mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {facility.features.map(f => (
                    <span key={f} className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium ${facility.bgLight} ${facility.textColor}`}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FacilityModal;
