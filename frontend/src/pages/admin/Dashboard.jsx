import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineClipboardCheck,
  HiOutlineCurrencyRupee,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import StatCard from '../../components/portal/StatCard';
import { classNames, formatCurrency } from '../../utils/helpers';

const stats = [
  { icon: HiOutlineUserGroup, label: 'Total Students', value: '1,234', trend: 8, color: 'primary' },
  { icon: HiOutlineAcademicCap, label: 'Teachers', value: '86', trend: 2, color: 'blue' },
  { icon: HiOutlineBookOpen, label: 'Classes', value: '24', trend: 0, color: 'purple' },
  { icon: HiOutlineClipboardCheck, label: 'Pending Admissions', value: '18', trend: -5, color: 'red' },
  { icon: HiOutlineCurrencyRupee, label: 'Monthly Revenue', value: formatCurrency(1250000).replace('₹', '₹' ), trend: 12, color: 'green' },
  { icon: HiOutlineUsers, label: 'Active Users', value: '1,089', trend: 4, color: 'accent' },
];

const recentAdmissions = [
  { name: 'Aarav Sharma', class: '10-A', father: 'Rajesh Sharma', date: '28 Jun 2026', status: 'pending' },
  { name: 'Priya Patel', class: '9-B', father: 'Amit Patel', date: '27 Jun 2026', status: 'approved' },
  { name: 'Rohan Verma', class: '11-C', father: 'Sunil Verma', date: '26 Jun 2026', status: 'pending' },
  { name: 'Sneha Gupta', class: '8-A', father: 'Vijay Gupta', date: '25 Jun 2026', status: 'approved' },
  { name: 'Arjun Singh', class: '12-A', father: 'Dharam Singh', date: '24 Jun 2026', status: 'rejected' },
];

const upcomingEvents = [
  { title: 'Annual Day Celebration', date: '15 Jul 2026', time: '10:00 AM', venue: 'Auditorium' },
  { title: 'PTA Meeting', date: '20 Jul 2026', time: '2:00 PM', venue: 'Conference Hall' },
  { title: 'Science Exhibition', date: '25 Jul 2026', time: '9:00 AM', venue: 'Science Block' },
  { title: 'Sports Day', date: '5 Aug 2026', time: '8:00 AM', venue: 'Sports Ground' },
];

const quickActions = [
  { label: 'Add Student', icon: HiOutlineUserGroup, color: 'bg-blue-50 text-blue-600' },
  { label: 'Record Attendance', icon: HiOutlineClipboardCheck, color: 'bg-green-50 text-green-600' },
  { label: 'Add Teacher', icon: HiOutlineAcademicCap, color: 'bg-purple-50 text-purple-600' },
  { label: 'Collect Fee', icon: HiOutlineCurrencyRupee, color: 'bg-amber-50 text-amber-600' },
  { label: 'Create Event', icon: HiOutlineCalendar, color: 'bg-pink-50 text-pink-600' },
  { label: 'Send Notice', icon: HiOutlineEye, color: 'bg-indigo-50 text-indigo-600' },
];

const recentActivity = [
  { action: 'New student admission approved', user: 'Admin', time: '2 hours ago', type: 'success' },
  { action: 'Fee payment of ₹15,000 received', user: 'Admin', time: '3 hours ago', type: 'info' },
  { action: 'Attendance marked for Class 10-A', user: 'Ravi Sir', time: '5 hours ago', type: 'default' },
  { action: 'New teacher profile created', user: 'Admin', time: '1 day ago', type: 'warning' },
  { action: 'Exam schedule for Term 1 published', user: 'Admin', time: '2 days ago', type: 'info' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const chartData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 75 },
  { label: 'Mar', value: 85 },
  { label: 'Apr', value: 55 },
  { label: 'May', value: 70 },
  { label: 'Jun', value: 90 },
  { label: 'Jul', value: 80 },
];

export default function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here is what is happening today.</p>
        </div>
        <span className="text-sm text-gray-400">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-gray-800">Revenue Overview</h3>
            <span className="text-sm text-primary-600 font-medium">This Year</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {chartData.map((item) => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '160px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg"
                  />
                </div>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-gray-800">Recent Admissions</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentAdmissions.map((admission) => (
              <div key={admission.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                    {admission.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{admission.name}</p>
                    <p className="text-xs text-gray-400">{admission.class} | {admission.father}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={classNames(
                    'inline-block px-2 py-0.5 text-xs font-medium rounded-full',
                    admission.status === 'approved' && 'bg-green-100 text-green-700',
                    admission.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                    admission.status === 'rejected' && 'bg-red-100 text-red-700',
                  )}>
                    {admission.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{admission.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-gray-800">Upcoming Events</h3>
            <HiOutlineCalendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-50 text-accent-600 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold leading-tight">{event.date.split(' ')[0]}</span>
                  <span className="text-[10px] leading-tight">{event.date.split(' ')[1]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{event.title}</p>
                  <p className="text-xs text-gray-400">{event.time} | {event.venue}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2">
            View All Events
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-gray-800">Quick Actions</h3>
            <HiOutlineArrowRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center', action.color)}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-gray-800">Recent Activity</h3>
            <span className="text-xs text-gray-400">Live</span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={classNames(
                  'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                  activity.type === 'success' && 'bg-green-500',
                  activity.type === 'info' && 'bg-blue-500',
                  activity.type === 'warning' && 'bg-yellow-500',
                  activity.type === 'default' && 'bg-gray-400',
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.user} | {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
