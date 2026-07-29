import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { classNames } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { getTeacherTimetable } from '../../services/teacherService';
import { showError } from '../../components/ui/Toast';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const rawDayIndex = new Date().getDay();
const currentDayIndex = rawDayIndex === 0 ? 0 : rawDayIndex - 1;

const getCurrentTimeStr = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const isTimeBetween = (current, start, end) => {
  if (!start || !end) return false;
  return current >= start && current <= end;
};

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingDay, setViewingDay] = useState(currentDayIndex >= 0 && currentDayIndex < 6 ? currentDayIndex : 0);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTeacherTimetable();
      setTimetables(res.data?.data?.timetables || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to fetch timetable';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  const nextDay = () => setViewingDay((viewingDay + 1) % 6);
  const prevDay = () => setViewingDay((viewingDay - 1 + 6) % 6);

  const dayTimetables = timetables.filter((t) => t.day === days[viewingDay]);
  const dayPeriods = dayTimetables
    .flatMap((t) =>
      (t.periods || []).map((p) => ({
        ...p,
        className: t.class?.name,
        sectionName: t.section?.name,
      }))
    )
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  const calcHours = (start, end) => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  };

  const isToday = viewingDay === currentDayIndex;
  const currentTime = isToday ? getCurrentTimeStr() : null;

  const subjectCount = dayPeriods.filter((p) => p.subject?.name && p.subject.name !== 'Free' && p.subject.name !== 'Study Period' && p.subject.name !== 'Staff Meeting').length;
  const uniqueClasses = [...new Set(dayPeriods.filter((p) => p.className).map((p) => p.className))];
  const freeCount = dayPeriods.filter((p) => p.subject?.name === 'Free').length;
  const teachingHours = dayPeriods
    .filter((p) => p.subject?.name && p.subject.name !== 'Free' && p.subject.name !== 'Staff Meeting')
    .reduce((sum, p) => sum + calcHours(p.startTime, p.endTime), 0);

  return (
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

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <HiOutlineCalendar className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-gray-700 mb-2">Failed to load timetable</h3>
            <p className="text-gray-500 text-center max-w-sm mb-6">{error}</p>
            <Button onClick={fetchTimetable} variant="primary">
              <HiOutlineRefresh className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <>
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
                    {isToday && 'Today\'s Schedule'}
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
                {dayPeriods.length === 0 ? (
                  <div className="text-center py-8 text-sm text-gray-400">No classes scheduled for this day.</div>
                ) : (
                  dayPeriods.map((period, idx) => {
                    const subjectName = period.subject?.name || 'N/A';
                    const isFree = subjectName === 'Free' || subjectName === 'Study Period' || subjectName === 'Staff Meeting';
                    const isCurrent = isToday && currentTime && isTimeBetween(currentTime, period.startTime, period.endTime);

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={classNames(
                          'flex items-center gap-4 p-3 rounded-lg transition-colors',
                          isCurrent
                            ? 'bg-primary-50 border border-primary-300 shadow-sm'
                            : isFree
                            ? 'bg-gray-50'
                            : 'bg-white border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30'
                        )}
                      >
                        <div className="w-28 flex-shrink-0 flex items-center gap-1">
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse flex-shrink-0" />
                          )}
                          <span className={classNames(
                            'text-sm font-medium',
                            isCurrent ? 'text-primary-700' : 'text-gray-600'
                          )}>
                            {period.startTime} - {period.endTime}
                          </span>
                        </div>
                        <div className={classNames(
                          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                          isCurrent
                            ? 'bg-primary-100 text-primary-600'
                            : isFree
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-primary-50 text-primary-600'
                        )}>
                          <HiOutlineBookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={classNames(
                            'text-sm font-medium',
                            isCurrent ? 'text-primary-800 font-semibold' : isFree ? 'text-gray-600' : 'text-gray-800'
                          )}>
                            {subjectName}
                            {isCurrent && <span className="ml-2 text-xs text-primary-500 font-normal">(Ongoing)</span>}
                          </p>
                          {(period.className || period.sectionName) && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {period.className}{period.sectionName ? ` - ${period.sectionName}` : ''}
                            </p>
                          )}
                        </div>
                        {period.roomNo && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
                            <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                            {period.roomNo}
                          </div>
                        )}
                        {!isFree && subjectName !== '' && (
                          <Badge variant={isCurrent ? 'success' : 'info'} size="sm">{subjectName}</Badge>
                        )}
                      </motion.div>
                    );
                  })
                )}
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
                    <p className="text-xl font-heading font-bold text-gray-800">{dayPeriods.length}</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                    <HiOutlineBookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Assigned Classes</p>
                    <p className="text-xl font-heading font-bold text-gray-800">{uniqueClasses.length}</p>
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
                    <p className="text-xl font-heading font-bold text-gray-800">{freeCount}</p>
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
                    <p className="text-xl font-heading font-bold text-gray-800">{teachingHours.toFixed(1)}h</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </motion.div>
  );
};

export default Timetable;
