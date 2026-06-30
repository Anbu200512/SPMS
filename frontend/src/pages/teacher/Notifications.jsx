import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineTrash,
  HiOutlineMailOpen,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineInformationCircle,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/common/EmptyState';

const initialNotifications = [
  {
    id: 1,
    title: 'Staff Meeting Reminder',
    message: 'Staff meeting tomorrow at 3:00 PM in the conference room. Please bring your grade books.',
    type: 'calendar',
    date: '2026-06-30T10:00:00',
    read: false,
  },
  {
    id: 2,
    title: 'Grade Submission Deadline',
    message: 'Final grade sheets must be submitted by Friday, 5:00 PM via the portal.',
    type: 'academic',
    date: '2026-06-29T14:30:00',
    read: false,
  },
  {
    id: 3,
    title: 'PTA Meeting Rescheduled',
    message: 'The PTA meeting has been moved to July 5th at 4:00 PM. All class teachers are requested to attend.',
    type: 'calendar',
    date: '2026-06-28T09:00:00',
    read: false,
  },
  {
    id: 4,
    title: 'New Curriculum Guidelines',
    message: 'Updated curriculum guidelines for the new academic year have been released. Please review them.',
    type: 'info',
    date: '2026-06-27T11:00:00',
    read: true,
  },
  {
    id: 5,
    title: 'Science Fair Registration',
    message: 'Register your students for the inter-school science fair by July 10th.',
    type: 'academic',
    date: '2026-06-26T16:00:00',
    read: true,
  },
  {
    id: 6,
    title: 'Laboratory Equipment Maintenance',
    message: 'Physics lab will be closed for equipment maintenance on July 3rd and 4th.',
    type: 'info',
    date: '2026-06-25T08:30:00',
    read: true,
  },
  {
    id: 7,
    title: 'Attendance Report Due',
    message: 'Monthly attendance reports for June must be submitted by the 2nd of July.',
    type: 'clipboard',
    date: '2026-06-24T13:00:00',
    read: true,
  },
  {
    id: 8,
    title: 'Welcome to Teacher Portal',
    message: 'Welcome to the new teacher portal! Explore the features and let us know your feedback.',
    type: 'info',
    date: '2026-06-20T09:00:00',
    read: true,
  },
];

const typeIcons = {
  calendar: HiOutlineCalendar,
  academic: HiOutlineAcademicCap,
  clipboard: HiOutlineClipboardList,
  info: HiOutlineInformationCircle,
  default: HiOutlineBell,
};

const typeColors = {
  calendar: 'bg-blue-50 text-blue-600',
  academic: 'bg-purple-50 text-purple-600',
  clipboard: 'bg-orange-50 text-orange-600',
  info: 'bg-green-50 text-green-600',
  default: 'bg-gray-50 text-gray-600',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const getIcon = (type) => {
    const Icon = typeIcons[type] || typeIcons.default;
    return Icon;
  };

  return (
    <PortalLayout>
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
              onClick={markAllAsRead}
            >
              Mark All as Read
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
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

        {filteredNotifications.length === 0 ? (
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
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={classNames(
                    'rounded-xl p-4 transition-all',
                    notification.read
                      ? 'bg-white border border-gray-100'
                      : 'bg-primary-50/60 border border-primary-100 shadow-sm'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={classNames(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      typeColors[notification.type] || typeColors.default
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={classNames(
                            'text-sm',
                            notification.read ? 'text-gray-800 font-medium' : 'text-gray-900 font-semibold'
                          )}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <HiOutlineCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">
                          {formatDate(notification.date, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {!notification.read && (
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
      </motion.div>
    </PortalLayout>
  );
};

export default Notifications;
