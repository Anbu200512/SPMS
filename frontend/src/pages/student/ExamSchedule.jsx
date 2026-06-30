import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlineFilter,
} from 'react-icons/hi';
import Badge from '../../components/ui/Badge';
import { classNames, formatDate } from '../../utils/helpers';

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

const exams = {
  'Mid-Term Examinations': [
    { subject: 'Mathematics', date: '2026-07-15', startTime: '9:00 AM', endTime: '11:00 AM', maxMarks: 100, room: 'Hall A' },
    { subject: 'Physics', date: '2026-07-17', startTime: '9:00 AM', endTime: '10:30 AM', maxMarks: 75, room: 'Hall B' },
    { subject: 'Chemistry', date: '2026-07-19', startTime: '9:00 AM', endTime: '10:30 AM', maxMarks: 75, room: 'Hall A' },
    { subject: 'English', date: '2026-07-22', startTime: '9:00 AM', endTime: '11:00 AM', maxMarks: 100, room: 'Hall C' },
    { subject: 'Biology', date: '2026-07-24', startTime: '9:00 AM', endTime: '10:30 AM', maxMarks: 75, room: 'Hall B' },
  ],
  'Unit Test - 3': [
    { subject: 'Computer Science', date: '2026-07-28', startTime: '10:00 AM', endTime: '11:00 AM', maxMarks: 25, room: 'Lab 1' },
    { subject: 'History', date: '2026-07-29', startTime: '10:00 AM', endTime: '11:00 AM', maxMarks: 25, room: 'Room 106' },
    { subject: 'Mathematics', date: '2026-07-30', startTime: '10:00 AM', endTime: '11:00 AM', maxMarks: 25, room: 'Room 101' },
  ],
};

const ExamSchedule = () => {
  const [selectedTerm, setSelectedTerm] = useState('all');
  const today = new Date();

  const filteredExams = useMemo(() => {
    const entries = Object.entries(exams);
    if (selectedTerm === 'all') return entries;
    return entries.filter(([name]) => name === selectedTerm);
  }, [selectedTerm]);

  const nextExam = useMemo(() => {
    let nearest = null;
    Object.values(exams).flat().forEach((exam) => {
      const examDate = new Date(exam.date);
      if (examDate >= today) {
        if (!nearest || examDate < new Date(nearest.date)) {
          nearest = exam;
        }
      }
    });
    return nearest;
  }, []);

  const getCountdown = (date) => {
    const diff = new Date(date) - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Past';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days left`;
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Exam Schedule</h1>
        <p className="text-gray-500 mb-6">View upcoming examinations and schedules</p>
      </motion.div>

      {nextExam && (
        <motion.div variants={item} className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-primary-100 text-sm mb-1">Next Exam</p>
              <h3 className="text-xl font-bold">{nextExam.subject}</h3>
              <p className="text-primary-100 text-sm mt-1">
                {formatDate(nextExam.date)} · {nextExam.startTime} - {nextExam.endTime}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {getCountdown(nextExam.date)}
              </div>
              <p className="text-primary-100 text-sm">{nextExam.room}</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={item} className="mb-6">
        <div className="flex items-center gap-3">
          <HiOutlineFilter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
          >
            <option value="all">All Examinations</option>
            {Object.keys(exams).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {filteredExams.map(([examName, examList], groupIdx) => (
        <motion.div
          key={examName}
          variants={item}
          className="mb-6 last:mb-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineAcademicCap className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-800">{examName}</h2>
            <Badge variant="info" size="sm">{examList.length} subjects</Badge>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Marks</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Countdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {examList.map((exam, idx) => {
                    const countdown = getCountdown(exam.date);
                    const isPast = countdown === 'Past';
                    return (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={classNames(
                          'hover:bg-gray-50 transition-colors',
                          countdown === 'Today' ? 'bg-primary-50/50' : ''
                        )}
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-800">{exam.subject}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(exam.date)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{exam.startTime} - {exam.endTime}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{exam.maxMarks}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{exam.room}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge
                            variant={
                              isPast ? 'default' : countdown === 'Today' ? 'success' : countdown === 'Tomorrow' ? 'warning' : 'info'
                            }
                            size="sm"
                          >
                            {countdown}
                          </Badge>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExamSchedule;
