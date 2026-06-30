import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { classNames } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeSlots = [
  '08:00 - 08:45',
  '08:45 - 09:30',
  '09:30 - 10:15',
  '10:15 - 10:30',
  '10:30 - 11:15',
  '11:15 - 12:00',
  '12:00 - 12:45',
];

const timetableData = {
  Monday: [
    { subject: 'Physics', class: '10-A', room: '101' },
    { subject: 'Physics Lab', class: '12-B', room: 'Lab 1' },
    { subject: 'Physics', class: '11-A', room: '202' },
    null,
    { subject: 'Science', class: '9-C', room: '103' },
    { subject: 'Free', class: '', room: '' },
    { subject: 'Study Period', class: '10-B', room: '104' },
  ],
  Tuesday: [
    { subject: 'Physics', class: '12-B', room: '201' },
    { subject: 'Physics', class: '10-A', room: '101' },
    { subject: 'Free', class: '', room: '' },
    null,
    { subject: 'Physics', class: '11-A', room: '202' },
    { subject: 'Science', class: '9-C', room: '103' },
    { subject: 'Staff Meeting', class: '', room: 'Conference Room' },
  ],
  Wednesday: [
    { subject: 'Physics Lab', class: '12-B', room: 'Lab 1' },
    { subject: 'Physics', class: '11-A', room: '202' },
    { subject: 'Physics', class: '10-A', room: '101' },
    null,
    { subject: 'Free', class: '', room: '' },
    { subject: 'Science', class: '9-C', room: '103' },
    { subject: 'Physics', class: '10-B', room: '104' },
  ],
  Thursday: [
    { subject: 'Physics', class: '11-A', room: '202' },
    { subject: 'Free', class: '', room: '' },
    { subject: 'Physics', class: '12-B', room: '201' },
    null,
    { subject: 'Physics Lab', class: '10-A', room: 'Lab 2' },
    { subject: 'Science', class: '9-C', room: '103' },
    { subject: 'Free', class: '', room: '' },
  ],
  Friday: [
    { subject: 'Physics', class: '10-A', room: '101' },
    { subject: 'Physics', class: '12-B', room: '201' },
    { subject: 'Free', class: '', room: '' },
    null,
    { subject: 'Physics', class: '11-A', room: '202' },
    { subject: 'Study Period', class: '9-C', room: '103' },
    { subject: 'Science', class: '10-B', room: '104' },
  ],
  Saturday: [
    { subject: 'Physics', class: '12-B', room: '201' },
    { subject: 'Physics', class: '11-A', room: '202' },
    { subject: 'Free', class: '', room: '' },
    null,
    { subject: 'Science', class: '10-A', room: '101' },
    null,
    null,
  ],
};

const currentDayIndex = new Date().getDay() - 1;

const Timetable = () => {
  const [viewingDay, setViewingDay] = useState(currentDayIndex >= 0 && currentDayIndex < 6 ? currentDayIndex : 0);

  const nextDay = () => setViewingDay((viewingDay + 1) % 6);
  const prevDay = () => setViewingDay((viewingDay - 1 + 6) % 6);

  const isBreak = (slotIdx) => slotIdx === 3;

  return (
    <PortalLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">My Timetable</h1>
          <p className="text-gray-500 mt-1">Your weekly class schedule</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {days.map((day, idx) => (
            <button
              key={day}
              onClick={() => setViewingDay(idx)}
              className={classNames(
                'px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                viewingDay === idx
                  ? 'bg-primary-500 text-white shadow-md'
                  : idx === currentDayIndex
                  ? 'bg-primary-50 text-primary-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              {day}
              {idx === currentDayIndex && (
                <span className="ml-1.5 text-xs opacity-75">(Today)</span>
              )}
            </button>
          ))}
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevDay}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-heading font-semibold text-gray-800">{days[viewingDay]}</h2>
              <p className="text-sm text-gray-500">
                {viewingDay === currentDayIndex && 'Today\'s Schedule'}
              </p>
            </div>
            <button
              onClick={nextDay}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {timeSlots.map((time, idx) => {
              const period = timetableData[days[viewingDay]]?.[idx];

              if (isBreak(idx)) {
                return (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-28 flex-shrink-0">
                      <span className="text-sm text-gray-500">{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineClock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-500">Break</span>
                    </div>
                  </div>
                );
              }

              if (!period) {
                return (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-lg">
                    <div className="w-28 flex-shrink-0">
                      <span className="text-sm text-gray-500">{time}</span>
                    </div>
                    <span className="text-sm text-gray-400">No class</span>
                  </div>
                );
              }

              const isFree = period.subject === 'Free' || period.subject === 'Study Period' || period.subject === 'Staff Meeting';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={classNames(
                    'flex items-center gap-4 p-3 rounded-lg transition-colors',
                    isFree
                      ? 'bg-gray-50'
                      : 'bg-white border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30'
                  )}
                >
                  <div className="w-28 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">{time}</span>
                  </div>
                  <div className={classNames(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    isFree ? 'bg-gray-100 text-gray-500' : 'bg-primary-50 text-primary-600'
                  )}>
                    <HiOutlineBookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={classNames(
                      'text-sm font-medium',
                      isFree ? 'text-gray-600' : 'text-gray-800'
                    )}>
                      {period.subject}
                    </p>
                    {period.class && (
                      <p className="text-xs text-gray-500 mt-0.5">{period.class}</p>
                    )}
                  </div>
                  {period.room && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
                      <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                      {period.room}
                    </div>
                  )}
                  {!isFree && period.subject !== '' && (
                    <Badge variant="info" size="sm">{period.subject}</Badge>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                <HiOutlineBookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Periods</p>
                <p className="text-xl font-heading font-bold text-gray-800">
                  {timetableData[days[viewingDay]]?.filter(Boolean).filter(p => p.subject !== 'Free').length || 0}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                <HiOutlineBookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Classes</p>
                <p className="text-xl font-heading font-bold text-gray-800">
                  {timetableData[days[viewingDay]]?.filter(Boolean).filter(p => p.subject && p.class && p.subject !== 'Free' && p.subject !== 'Study Period' && p.subject !== 'Staff Meeting').length || 0}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                <HiOutlineClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Free Periods</p>
                <p className="text-xl font-heading font-bold text-gray-800">
                  {timetableData[days[viewingDay]]?.filter(Boolean).filter(p => p.subject === 'Free').length || 0}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                <HiOutlineCalendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Teaching Hours</p>
                <p className="text-xl font-heading font-bold text-gray-800">
                  {timetableData[days[viewingDay]]?.filter(Boolean).filter(p => p.subject && p.subject !== 'Free' && p.subject !== 'Break' && p.subject !== 'Staff Meeting').length * 0.75 || 0}h
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </PortalLayout>
  );
};

export default Timetable;
