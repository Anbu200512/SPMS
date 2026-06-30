import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineFilter,
} from 'react-icons/hi';
import StatCard from '../../components/portal/StatCard';
import Badge from '../../components/ui/Badge';
import { classNames } from '../../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [view, setView] = useState('list');

  const stats = [
    { label: 'Total Days', value: '85', icon: HiOutlineCalendar, color: 'blue' },
    { label: 'Present', value: '78', icon: HiOutlineClipboardCheck, color: 'green' },
    { label: 'Absent', value: '5', icon: HiOutlineExclamationCircle, color: 'red' },
    { label: 'Attendance %', value: '91.8%', icon: HiOutlineClock, color: 'purple', trend: '+2' },
  ];

  const attendanceData = [
    { date: '15 Jun 2026', day: 'Monday', status: 'Present', remarks: '' },
    { date: '14 Jun 2026', day: 'Sunday', status: 'Holiday', remarks: 'Weekly off' },
    { date: '13 Jun 2026', day: 'Saturday', status: 'Present', remarks: '' },
    { date: '12 Jun 2026', day: 'Friday', status: 'Present', remarks: '' },
    { date: '11 Jun 2026', day: 'Thursday', status: 'Late', remarks: 'Reached 10 min late' },
    { date: '10 Jun 2026', day: 'Wednesday', status: 'Present', remarks: '' },
    { date: '09 Jun 2026', day: 'Tuesday', status: 'Absent', remarks: 'Medical leave' },
    { date: '08 Jun 2026', day: 'Monday', status: 'Present', remarks: '' },
    { date: '05 Jun 2026', day: 'Friday', status: 'Present', remarks: '' },
    { date: '04 Jun 2026', day: 'Thursday', status: 'Present', remarks: '' },
  ];

  const getStatusBadge = (status) => {
    const variantMap = {
      Present: 'success',
      Absent: 'danger',
      Late: 'warning',
      Holiday: 'default',
    };
    return (
      <Badge variant={variantMap[status] || 'default'} size="sm">
        {status}
      </Badge>
    );
  };

  const getStatusDot = (status) => {
    const colorMap = {
      Present: 'bg-green-500',
      Absent: 'bg-red-500',
      Late: 'bg-yellow-500',
      Holiday: 'bg-gray-300',
    };
    return <span className={classNames('w-2 h-2 rounded-full', colorMap[status] || 'bg-gray-300')} />;
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Attendance</h1>
        <p className="text-gray-500 mb-6">Track your attendance records</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <HiOutlineFilter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
            >
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
            >
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={classNames(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                view === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={classNames(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                view === 'calendar' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              Calendar
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Day</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {attendanceData.map((record, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{record.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{record.day}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{record.remarks || '-'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">{d}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const record = attendanceData.find((r) => r.date.includes(`${day} Jun`));
              return (
                <div
                  key={i}
                  className={classNames(
                    'aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors cursor-pointer',
                    record
                      ? record.status === 'Present'
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : record.status === 'Absent'
                        ? 'bg-red-50 text-red-700 hover:bg-red-100'
                        : record.status === 'Late'
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  )}
                >
                  <span className="font-medium leading-none">{day}</span>
                  {record && (
                    <span className={classNames('w-1.5 h-1.5 rounded-full mt-1', getStatusDot(record.status))} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Present
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            Absent
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            Late
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Attendance;
