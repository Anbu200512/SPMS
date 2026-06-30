import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineMail,
  HiOutlineMailOpen,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
  HiOutlineAcademicCap,
  HiOutlineCurrencyRupee,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { classNames } from '../../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const iconMap = {
  academic: HiOutlineAcademicCap,
  fee: HiOutlineCurrencyRupee,
  event: HiOutlineCalendar,
  alert: HiOutlineExclamationCircle,
  info: HiOutlineInformationCircle,
};

const iconBgMap = {
  academic: 'bg-blue-50 text-blue-600',
  fee: 'bg-red-50 text-red-600',
  event: 'bg-purple-50 text-purple-600',
  alert: 'bg-orange-50 text-orange-600',
  info: 'bg-gray-50 text-gray-600',
};

const initialNotifications = [
  { id: 1, type: 'academic', title: 'Assignment Submission', message: 'Mathematics assignment graded. Check your marks.', time: '10 min ago', read: false },
  { id: 2, type: 'event', title: 'Exam Schedule Updated', message: 'Mid-term examination schedule has been revised. Check the new dates.', time: '1 hour ago', read: false },
  { id: 3, type: 'fee', title: 'Fee Payment Reminder', message: 'Your laboratory fee of ₹5,000 is due on 30th June.', time: '3 hours ago', read: false },
  { id: 4, type: 'info', title: 'School Holiday', message: 'School will remain closed on 2nd July on account of Foundation Day.', time: '1 day ago', read: true },
  { id: 5, type: 'alert', title: 'Attendance Warning', message: 'Your attendance has dropped below 75%. Please ensure regular attendance.', time: '2 days ago', read: true },
  { id: 6, type: 'academic', title: 'New Study Material', message: 'Physics chapter 5 notes have been uploaded to study materials.', time: '3 days ago', read: true },
  { id: 7, type: 'event', title: 'Sports Meet Registration', message: 'Registration for Annual Sports Meet is now open. Last date: 15th July.', time: '5 days ago', read: true },
];

const Notifications = () => {
  const [tab, setTab] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications);

  const filtered =
    tab === 'all' ? notifications : tab === 'unread' ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Notifications</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'No unread notifications'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="primary" size="md" iconLeft={<HiOutlineCheckCircle className="w-4 h-4" />} onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-2 mb-6">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: notifications.filter((n) => !n.read).length },
          { key: 'read', label: 'Read', count: notifications.filter((n) => n.read).length },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={classNames(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2',
              tab === t.key
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {t.label}
            <Badge
              variant={tab === t.key ? 'default' : 'info'}
              size="sm"
              className={classNames(tab === t.key ? 'bg-white/20 text-white' : '')}
            >
              {t.count}
            </Badge>
          </button>
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div variants={item}>
          <EmptyState
            icon={<HiOutlineBell className="w-16 h-16" />}
            title="No notifications"
            description={tab === 'unread' ? 'You have no unread notifications' : 'No notifications to show'}
          />
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {filtered.map((n, i) => {
            const Icon = iconMap[n.type] || HiOutlineInformationCircle;
            return (
              <motion.div
                key={n.id}
                variants={item}
                className={classNames(
                  'bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-sm',
                  n.read ? 'border-gray-100' : 'border-primary-200 bg-primary-50/30'
                )}
                onClick={() => markAsRead(n.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBgMap[n.type])}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className={classNames(
                          'text-sm',
                          n.read ? 'text-gray-700' : 'text-gray-900 font-semibold'
                        )}>
                          {n.title}
                        </h3>
                        {!n.read && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className={classNames(
                      'text-sm mt-1',
                      n.read ? 'text-gray-500' : 'text-gray-600'
                    )}>
                      {n.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      {!n.read && (
                        <button
                          onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                          className="text-xs text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
                        >
                          <HiOutlineMailOpen className="w-3.5 h-3.5" />
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                        className="text-xs text-gray-400 hover:text-red-600 font-medium flex items-center gap-1"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Notifications;
