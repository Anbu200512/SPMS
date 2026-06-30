import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineCurrencyRupee,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChevronLeft,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { classNames, getInitials } from '../../utils/helpers';
import useAuth from '../../hooks/useAuth';

const menuItems = {
  admin: [
    { label: 'Dashboard', path: '/admin', icon: HiOutlineHome },
    { label: 'Students', path: '/admin/students', icon: HiOutlineUserGroup },
    { label: 'Teachers', path: '/admin/teachers', icon: HiOutlineUserGroup },
    { label: 'Classes', path: '/admin/classes', icon: HiOutlineBookOpen },
    { label: 'Sections', path: '/admin/sections', icon: HiOutlineBookOpen },
    { label: 'Subjects', path: '/admin/subjects', icon: HiOutlineBookOpen },
    { label: 'Admissions', path: '/admin/admissions', icon: HiOutlineClipboardList },
    { label: 'Attendance', path: '/admin/attendance', icon: HiOutlineClipboardList },
    { label: 'Exams', path: '/admin/exams', icon: HiOutlineChartBar },
    { label: 'Results', path: '/admin/results', icon: HiOutlineChartBar },
    { label: 'Fees', path: '/admin/fees', icon: HiOutlineCurrencyRupee },
    { label: 'Gallery', path: '/admin/gallery', icon: HiOutlineBookOpen },
    { label: 'Events', path: '/admin/events', icon: HiOutlineCalendar },
    { label: 'News', path: '/admin/news', icon: HiOutlineBookOpen },
    { label: 'CMS', path: '/admin/cms', icon: HiOutlineBookOpen },
    { label: 'Users', path: '/admin/users', icon: HiOutlineUserGroup },
    { label: 'Notifications', path: '/admin/notifications', icon: HiOutlineBell },
    { label: 'Reports', path: '/admin/reports', icon: HiOutlineChartBar },
    { label: 'Settings', path: '/admin/settings', icon: HiOutlineCog },
  ],
  teacher: [
    { label: 'Dashboard', path: '/teacher', icon: HiOutlineHome },
    { label: 'My Classes', path: '/teacher/classes', icon: HiOutlineBookOpen },
    { label: 'Profile', path: '/teacher/profile', icon: HiOutlineUserGroup },
    { label: 'Attendance', path: '/teacher/attendance', icon: HiOutlineClipboardList },
    { label: 'Assignments', path: '/teacher/assignments', icon: HiOutlineClipboardList },
    { label: 'Homework', path: '/teacher/homework', icon: HiOutlineClipboardList },
    { label: 'Marks Entry', path: '/teacher/marks-entry', icon: HiOutlineChartBar },
    { label: 'Study Materials', path: '/teacher/study-materials', icon: HiOutlineBookOpen },
    { label: 'Timetable', path: '/teacher/timetable', icon: HiOutlineCalendar },
    { label: 'Notifications', path: '/teacher/notifications', icon: HiOutlineBell },
  ],
  student: [
    { label: 'Dashboard', path: '/student', icon: HiOutlineHome },
    { label: 'Profile', path: '/student/profile', icon: HiOutlineUserGroup },
    { label: 'Attendance', path: '/student/attendance', icon: HiOutlineClipboardList },
    { label: 'Timetable', path: '/student/timetable', icon: HiOutlineCalendar },
    { label: 'Assignments', path: '/student/assignments', icon: HiOutlineClipboardList },
    { label: 'Homework', path: '/student/homework', icon: HiOutlineClipboardList },
    { label: 'Study Materials', path: '/student/study-materials', icon: HiOutlineBookOpen },
    { label: 'Exam Schedule', path: '/student/exam-schedule', icon: HiOutlineCalendar },
    { label: 'Results', path: '/student/results', icon: HiOutlineChartBar },
    { label: 'Fees', path: '/student/fees', icon: HiOutlineCurrencyRupee },
    { label: 'Notifications', path: '/student/notifications', icon: HiOutlineBell },
    { label: 'Leave Application', path: '/student/leave-application', icon: HiOutlineCalendar },
  ],
};

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role || 'student';
  const items = menuItems[role] || menuItems.student;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0">
            SP
          </div>
          {!collapsed && (
            <div>
              <p className="font-heading font-semibold text-sm text-gray-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          )}
        </div>
        <button onClick={onToggle} className="hidden lg:block p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
          <HiOutlineChevronLeft className={classNames('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={classNames(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <HiOutlineLogout className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={classNames(
          'hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 fixed left-0 top-0 z-30',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
