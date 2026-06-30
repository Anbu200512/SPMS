import { motion } from 'framer-motion';
import StatCard from '../../components/portal/StatCard';
import {
  HiOutlineClipboardCheck,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineBell,
  HiOutlineAcademicCap,
} from 'react-icons/hi';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const stats = [
    { label: 'Attendance', value: '92%', icon: HiOutlineClipboardCheck, color: 'green', trend: '+2' },
    { label: 'Pending Assignments', value: '5', icon: HiOutlineBookOpen, color: 'blue', trend: '3 pending' },
    { label: 'Upcoming Exams', value: '2', icon: HiOutlineCalendar, color: 'orange', trend: 'upcoming' },
    { label: 'Due Fees', value: '\u20B915,000', icon: HiOutlineCurrencyDollar, color: 'red', trend: 'due' },
  ];

  const recentActivity = [
    { title: 'Mathematics Assignment', desc: 'Submitted on time', time: '2 hours ago' },
    { title: 'Attendance Marked', desc: 'Present - 15 Jun 2026', time: 'Today' },
    { title: 'Exam Schedule', desc: 'Mid-term exams announced', time: 'Yesterday' },
    { title: 'Fee Payment', desc: 'Tuition fee paid for June', time: '3 days ago' },
  ];

  const upcomingEvents = [
    { title: 'Annual Day', date: '25', month: 'Jul', venue: 'School Auditorium' },
    { title: 'Sports Meet', date: '10', month: 'Aug', venue: 'Playground' },
    { title: 'PTA Meeting', date: '05', month: 'Jul', venue: 'Conference Hall' },
    { title: 'Science Fair', date: '18', month: 'Aug', venue: 'Science Block' },
  ];

  const notifications = [
    { title: 'Assignment Deadline', message: 'Physics assignment due tomorrow', time: '1 hour ago', unread: true },
    { title: 'Exam Schedule Updated', message: 'Mid-term schedule has been revised', time: '5 hours ago', unread: true },
    { title: 'Fee Reminder', message: 'Library fee payment pending', time: '1 day ago', unread: false },
  ];

  return (
    <div className="p-4 md:p-6">
      <motion.div variants={item} initial="hidden" animate="show">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, Student Name</h1>
        <p className="text-gray-500 mb-6">Here's your academic overview</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{act.title}</p>
                  <p className="text-sm text-gray-500">{act.desc}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="relative">
                  <HiOutlineBell className="w-5 h-5 text-gray-400" />
                  {n.unread && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.message}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{n.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HiOutlineAcademicCap className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">Upcoming Events</span>
              </div>
            </div>
            <div className="mt-3 space-y-3">
              {upcomingEvents.slice(0, 2).map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-primary-50 rounded-lg">
                  <div className="text-center min-w-[40px]">
                    <div className="text-lg font-bold text-primary-600 leading-none">{event.date}</div>
                    <div className="text-xs text-primary-400">{event.month}</div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
