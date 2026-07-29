import React, { useState, useEffect } from 'react';
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
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import StatCard from '../../components/portal/StatCard';
import { getTeacherDashboard } from '../../services/teacherService';

const quickActions = [
  { label: 'Mark Attendance', path: '/teacher/attendance', icon: HiOutlineClipboardList, color: 'bg-blue-50 text-blue-600' },
  { label: 'Create Assignment', path: '/teacher/assignments', icon: HiOutlinePencilAlt, color: 'bg-purple-50 text-purple-600' },
  { label: 'Upload Materials', path: '/teacher/study-materials', icon: HiOutlineUpload, color: 'bg-green-50 text-green-600' },
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeacherDashboard()
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (error) {
      return (
        <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
      );
  }

  const teacherName = data?.teacher?.user?.name || 'Teacher';
  const stats = [
    { label: 'Assigned Classes', value: data?.stats?.assignedClasses ?? '0', icon: HiOutlineBookOpen, color: 'primary', trend: 0 },
    { label: 'Total Students', value: data?.stats?.totalStudents ?? '0', icon: HiOutlineUserGroup, color: 'accent', trend: 0 },
    { label: 'Subjects', value: data?.stats?.subjects ?? '0', icon: HiOutlineAcademicCap, color: 'blue', trend: 0 },
    { label: 'Pending Assignments', value: data?.stats?.pendingAssignments ?? '0', icon: HiOutlineClipboardList, color: 'purple', trend: 0 },
    { label: 'Pending Homework', value: data?.stats?.pendingHomework ?? '0', icon: HiOutlinePencilAlt, color: 'red', trend: 0 },
    { label: "Today's Attendance", value: data?.stats?.todayAttendance ?? '0%', icon: HiOutlineCalendar, color: 'green', trend: 0 },
  ];

  const periods = data?.todayTimetable?.[0]?.periods || [];
  const upcomingExams = data?.upcomingExams || [];
  const notices = data?.notices || [];
  const recentEvents = data?.recentEvents || [];

  return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">
            Welcome back, {teacherName}
          </h1>
          <p className="text-gray-500 mt-1">Here is your teaching overview for today.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-lg font-heading font-semibold text-gray-800">Today's Schedule</h2>
                <Link
                  to="/teacher/timetable"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 whitespace-nowrap"
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
                    {periods.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-sm text-gray-400">No classes scheduled for today.</td>
                      </tr>
                    ) : (
                      periods.map((period, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-2 text-sm text-gray-600">
                            {period.startTime} - {period.endTime}
                          </td>
                          <td className="py-3 px-2 text-sm font-medium text-gray-800">{period.subject}</td>
                          <td className="py-3 px-2 text-sm text-gray-600">{period.class}</td>
                          <td className="py-3 px-2 text-sm text-gray-600">{period.roomNo}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {upcomingExams.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineExclamationCircle className="w-5 h-5 text-primary-500" />
                  <h2 className="text-lg font-heading font-semibold text-gray-800">Upcoming Exams</h2>
                </div>
                <div className="space-y-3">
                  {upcomingExams.map((exam, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-primary-50/30 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{exam.subject}</p>
                        <p className="text-xs text-gray-500">{exam.className || exam.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-600">{formatDate(exam.date)}</p>
                        {exam.type && <p className="text-xs text-gray-400">{exam.type}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recentEvents.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineStar className="w-5 h-5 text-accent-500" />
                  <h2 className="text-lg font-heading font-semibold text-gray-800">Recent Events</h2>
                </div>
                <div className="space-y-3">
                  {recentEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">{event.title}</p>
                        {event.description && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{event.description}</p>
                        )}
                        {event.date && (
                          <p className="text-xs text-gray-400 mt-1">{formatDate(event.date)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Notices</h2>
              <div className="space-y-3">
                {notices.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No notices at this time.</p>
                ) : (
                  notices.map((notice, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                          {notice.title || notice.message}
                        </p>
                        {notice.title && notice.message && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notice.message}</p>
                        )}
                        {notice.createdAt && (
                          <p className="text-xs text-gray-400 mt-1">{formatDate(notice.createdAt)}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
};

export default Dashboard;
