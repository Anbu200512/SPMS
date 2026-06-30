import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineBookOpen,
} from 'react-icons/hi';
import Badge from '../../components/ui/Badge';
import { classNames } from '../../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const periods = [
  'Period 1\n8:00 - 8:45',
  'Period 2\n8:45 - 9:30',
  'Period 3\n9:30 - 10:15',
  'Break\n10:15 - 10:30',
  'Period 4\n10:30 - 11:15',
  'Period 5\n11:15 - 12:00',
  'Period 6\n12:00 - 12:45',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timetableData = {
  Monday: [
    { subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { subject: 'Physics', teacher: 'Mr. Kumar', room: '102' },
    { subject: 'Chemistry', teacher: 'Ms. Patel', room: '103' },
    { type: 'break' },
    { subject: 'English', teacher: 'Mrs. Singh', room: '104' },
    { subject: 'Computer Science', teacher: 'Mr. Verma', room: 'Lab 1' },
    { subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
  ],
  Tuesday: [
    { subject: 'English', teacher: 'Mrs. Singh', room: '104' },
    { subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { subject: 'Physics', teacher: 'Mr. Kumar', room: '102' },
    { type: 'break' },
    { subject: 'Chemistry', teacher: 'Ms. Patel', room: '103' },
    { subject: 'Biology', teacher: 'Dr. Gupta', room: '105' },
    { subject: 'History', teacher: 'Mr. Rao', room: '106' },
  ],
  Wednesday: [
    { subject: 'Biology', teacher: 'Dr. Gupta', room: '105' },
    { subject: 'English', teacher: 'Mrs. Singh', room: '104' },
    { subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { type: 'break' },
    { subject: 'Physics', teacher: 'Mr. Kumar', room: '102' },
    { subject: 'Chemistry', teacher: 'Ms. Patel', room: '103' },
    { subject: 'Computer Science', teacher: 'Mr. Verma', room: 'Lab 1' },
  ],
  Thursday: [
    { subject: 'Chemistry', teacher: 'Ms. Patel', room: '103' },
    { subject: 'Biology', teacher: 'Dr. Gupta', room: '105' },
    { subject: 'English', teacher: 'Mrs. Singh', room: '104' },
    { type: 'break' },
    { subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { subject: 'History', teacher: 'Mr. Rao', room: '106' },
    { subject: 'Physics', teacher: 'Mr. Kumar', room: '102' },
  ],
  Friday: [
    { subject: 'Physics', teacher: 'Mr. Kumar', room: '102' },
    { subject: 'Chemistry', teacher: 'Ms. Patel', room: '103' },
    { subject: 'Biology', teacher: 'Dr. Gupta', room: '105' },
    { type: 'break' },
    { subject: 'English', teacher: 'Mrs. Singh', room: '104' },
    { subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { subject: 'Computer Science', teacher: 'Mr. Verma', room: 'Lab 1' },
  ],
  Saturday: [
    { subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { subject: 'English', teacher: 'Mrs. Singh', room: '104' },
    { subject: 'Physics', teacher: 'Mr. Kumar', room: '102' },
    { type: 'break' },
    { subject: 'Chemistry', teacher: 'Ms. Patel', room: '103' },
    { subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
    null,
  ],
};

const today = new Date();
const todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];

const Timetable = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Class Timetable</h1>
        <p className="text-gray-500 mb-6">Weekly schedule for Class 10 - Section A</p>
      </motion.div>

      <motion.div variants={item} className="overflow-x-auto">
        <div className="min-w-[900px] bg-white rounded-xl shadow-sm border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Day
                </th>
                {periods.map((p, i) => {
                  const [label, time] = p.split('\n');
                  const isBreak = label === 'Break';
                  return (
                    <th
                      key={i}
                      className={classNames(
                        'px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider min-w-[110px]',
                        isBreak ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'
                      )}
                    >
                      <div>{label}</div>
                      {!isBreak && <div className="text-[10px] font-normal mt-0.5 text-gray-400">{time}</div>}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {days.map((day) => {
                const isToday = day === todayName;
                const dayData = timetableData[day];
                return (
                  <motion.tr
                    key={day}
                    variants={item}
                    className={classNames(
                      'transition-colors',
                      isToday ? 'bg-primary-50/50' : 'hover:bg-gray-50'
                    )}
                  >
                    <td className="sticky left-0 bg-white px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                        )}
                        <span
                          className={classNames(
                            'text-sm font-medium',
                            isToday ? 'text-primary-600' : 'text-gray-800'
                          )}
                        >
                          {day}
                        </span>
                        {isToday && (
                          <Badge variant="info" size="sm">Today</Badge>
                        )}
                      </div>
                    </td>
                    {dayData.map((slot, idx) => {
                      if (!slot) {
                        return <td key={idx} className="px-3 py-3 text-center text-sm text-gray-400">-</td>;
                      }
                      if (slot.type === 'break') {
                        return (
                          <td key={idx} className="px-3 py-3 text-center bg-orange-50">
                            <span className="text-xs text-orange-600 font-medium">Break</span>
                          </td>
                        );
                      }
                      return (
                        <td key={idx} className="px-3 py-3">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-800 leading-tight">{slot.subject}</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <HiOutlineUser className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{slot.teacher}</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <HiOutlineLocationMarker className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">{slot.room}</span>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <HiOutlineCalendar className="w-5 h-5 text-primary-500" />
          Today's Schedule
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timetableData[todayName]?.filter((s) => s && !s.type).map((slot, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <HiOutlineBookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">{slot.subject}</p>
                <p className="text-xs text-gray-500">{slot.teacher} · {slot.room}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Timetable;
