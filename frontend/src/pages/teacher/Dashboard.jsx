import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlinePencilAlt,
  HiOutlineUpload,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import StatCard from '../../components/portal/StatCard';

const stats = [
  { label: 'Assigned Classes', value: '5', icon: HiOutlineBookOpen, color: 'primary', trend: 0 },
  { label: 'Total Students', value: '156', icon: HiOutlineUserGroup, color: 'accent', trend: 12 },
  { label: 'Pending Tasks', value: '8', icon: HiOutlineClipboardList, color: 'red', trend: -5 },
  { label: 'Attendance Today', value: '94%', icon: HiOutlineCalendar, color: 'green', trend: 2 },
];

const quickActions = [
  { label: 'Mark Attendance', path: '/teacher/attendance', icon: HiOutlineClipboardList, color: 'bg-blue-50 text-blue-600' },
  { label: 'Create Assignment', path: '/teacher/assignments', icon: HiOutlinePencilAlt, color: 'bg-purple-50 text-purple-600' },
  { label: 'Upload Materials', path: '/teacher/materials', icon: HiOutlineUpload, color: 'bg-green-50 text-green-600' },
];

const schedule = [
  { time: '08:00 - 08:45', subject: 'Mathematics', class: '10-A', room: '101' },
  { time: '08:45 - 09:30', subject: 'Physics', class: '12-B', room: '201' },
  { time: '09:30 - 10:15', subject: 'Chemistry', class: '11-A', room: '202' },
  { time: '10:15 - 10:30', subject: 'Break', class: '-', room: '-' },
  { time: '10:30 - 11:15', subject: 'Mathematics', class: '9-C', room: '103' },
  { time: '11:15 - 12:00', subject: 'Physics Lab', class: '12-B', room: 'Lab 1' },
  { time: '12:00 - 12:45', subject: 'Study Period', class: '10-B', room: '104' },
];

const recentNotifications = [
  { id: 1, message: 'Staff meeting tomorrow at 3 PM', time: '1 hour ago', unread: true },
  { id: 2, message: 'Submit grade sheets by Friday', time: '3 hours ago', unread: true },
  { id: 3, message: 'PTA meeting rescheduled', time: '1 day ago', unread: false },
  { id: 4, message: 'New curriculum guidelines released', time: '2 days ago', unread: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  return (
    <PortalLayout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">
            Welcome back, Dr. Sharma
          </h1>
          <p className="text-gray-500 mt-1">Here is your teaching overview for today.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-gray-800">Today's Schedule</h2>
                <Link
                  to="/teacher/timetable"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  Full Timetable <HiOutlineChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Time</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Class</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((period, idx) => (
                      <tr
                        key={idx}
                        className={classNames(
                          'border-b border-gray-50 hover:bg-gray-50 transition-colors',
                          period.subject === 'Break' && 'bg-gray-50'
                        )}
                      >
                        <td className="py-3 px-2 text-sm text-gray-600">{period.time}</td>
                        <td className="py-3 px-2 text-sm font-medium text-gray-800">{period.subject}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{period.class}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{period.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center', action.color)}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                      {action.label}
                    </span>
                    <HiOutlineChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-gray-800">Recent Notifications</h2>
                <Link
                  to="/teacher/notifications"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={classNames(
                      'flex items-start gap-3 p-3 rounded-lg',
                      n.unread ? 'bg-primary-50/50' : 'hover:bg-gray-50'
                    )}
                  >
                    <div
                      className={classNames(
                        'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                        n.unread ? 'bg-primary-500' : 'bg-transparent'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 line-clamp-2">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PortalLayout>
  );
};

export default Dashboard;
