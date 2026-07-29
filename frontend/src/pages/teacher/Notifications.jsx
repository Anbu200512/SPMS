import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineMailOpen,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { getNotifications, markNotificationRead } from '../../services/teacherService';
import { showError } from '../../components/ui/Toast';

const typeIcons = {
  Info: HiOutlineInformationCircle,
  Warning: HiOutlineExclamationCircle,
  Success: HiOutlineCheckCircle,
  Error: HiOutlineExclamationCircle,
  calendar: HiOutlineCalendar,
  academic: HiOutlineAcademicCap,
  clipboard: HiOutlineClipboardList,
  default: HiOutlineBell,
};

const typeColors = {
  Info: 'bg-blue-50 text-blue-600',
  Warning: 'bg-orange-50 text-orange-600',
  Success: 'bg-green-50 text-green-600',
  Error: 'bg-red-50 text-red-600',
  calendar: 'bg-blue-50 text-blue-600',
  academic: 'bg-purple-50 text-purple-600',
  clipboard: 'bg-orange-50 text-orange-600',
  default: 'bg-gray-50 text-gray-600',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = async (p = page) => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await getNotifications({ page: p, limit: 10 });
      const data = res.data?.data || {};
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      if (data.pagination) setTotalPages(data.pagination.pages || 1);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load notifications';
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      showError('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markNotificationRead('all');
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch {
      showError('Failed to mark all as read');
    }
  };

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const getIcon = (type) => typeIcons[type] || typeIcons.default;
  const getColor = (type) => typeColors[type] || typeColors.default;

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500 mt-1">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'No unread notifications'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              iconLeft={<HiOutlineMailOpen className="w-4 h-4" />}
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'unread'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={classNames(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                filter === f
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              {f}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-white text-primary-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <HiOutlineBell className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-gray-700 mb-2">Failed to load notifications</h3>
            <p className="text-gray-500 text-center max-w-sm mb-6">{loadError}</p>
            <Button onClick={() => fetchNotifications()} variant="primary">
              <HiOutlineRefresh className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <Card>
            <EmptyState
              icon={<HiOutlineBell className="w-12 h-12" />}
              title="No notifications"
              description="You're all caught up! No new notifications to show."
            />
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification, idx) => {
              const Icon = getIcon(notification.type);
              return (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={classNames(
                    'rounded-xl p-4 transition-all',
                    notification.isRead
                      ? 'bg-white border border-gray-100'
                      : 'bg-primary-50/60 border border-primary-100 shadow-sm'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={classNames(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      getColor(notification.type)
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={classNames(
                            'text-sm',
                            notification.isRead ? 'text-gray-800 font-medium' : 'text-gray-900 font-semibold'
                          )}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification._id)}
                              className="p-1.5 text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <HiOutlineCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">
                          {formatDate(notification.createdAt, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
  );
};

export default Notifications;