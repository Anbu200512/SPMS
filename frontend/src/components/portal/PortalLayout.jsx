import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineChevronDown,
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import { getInitials, classNames } from '../../utils/helpers';

const PortalLayout = ({ children, role: propRole }) => {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div
        className={classNames(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-heading font-semibold text-gray-800">
                {propRole === 'admin' ? 'Admin Portal' : propRole === 'teacher' ? 'Teacher Portal' : 'Student Portal'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <HiOutlineBell className="w-6 h-6" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(user?.name)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
                  <HiOutlineChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        <Link
                          to={`/${user?.role}/profile`}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <HiOutlineUser className="w-4 h-4" />
                          Profile
                        </Link>
                        <button
                          onClick={() => { setProfileOpen(false); logout(); }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
