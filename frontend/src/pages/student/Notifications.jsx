import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineMailOpen,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
  HiOutlineAcademicCap,
  HiOutlineCurrencyRupee,
  HiOutlineCalendar,
  HiOutlineRefresh,
} from 'react-icons/hi';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { classNames, formatDate } from '../../utils/helpers';
import { showSuccess, showError } from '../../components/ui/Toast';
import { getNotifications, markNotificationRead } from '../../services/studentService';

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

const typeIconMap = {
  Info: HiOutlineInformationCircle,
  Warning: HiOutlineExclamationCircle,
  Error: HiOutlineExclamationCircle,
  Success: HiOutlineCheckCircle,
  academic: HiOutlineAcademicCap,
  fee: HiOutlineCurrencyRupee,
  event: HiOutlineCalendar,
  alert: HiOutlineExclamationCircle,
  default: HiOutlineInformationCircle,
};

const typeBgMap = {
  Info: 'bg-blue-50 text-blue-600',
  Warning: 'bg-orange-50 text-orange-600',
  Error: 'bg-red-50 text-red-600',
  Success: 'bg-green-50 text-green-600',
  academic: 'bg-blue-50 text-blue-600',
  fee: 'bg-red-50 text-red-600',
  event: 'bg-purple-50 text-purple-600',
  alert: 'bg-orange-50 text-orange-600',
  default: 'bg-gray-50 text-gray-600',
};

const Notifications = () => {
  const [tab, setTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await getNotifications({ page: 1, limit: 50 });
      const data = res.data?.data || {};
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setLoadError(err?.response?.data?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filtered =
    tab === 'all'
      ? notifications
      : tab === 'unread'
        ? notifications.filter((n) => !n.isRead)
        : notifications.filter((n) => n.isRead);

  const markAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      showError('Failed to mark as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await markNotificationRead('all');
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      showSuccess('All notifications marked as read');
    } catch {
      showError('Failed to mark all as read');
    }
  };

  const getIcon = (type) => typeIconMap[type] || typeIconMap.default;
  const getBg = (type) => typeBgMap[type] || typeBgMap.default;

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

      <motion.div variants={item} className="flex items-center gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: notifications.filter((n) => !n.isRead).length },
          { key: 'read', label: 'Read', count: notifications.filter((n) => n.isRead).length },
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

      {loading ? (
        <motion.div variants={item} className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </motion.div>
      ) : loadError ? (
        <motion.div variants={item} className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <HiOutlineBell className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-gray-700 mb-2">Failed to load notifications</h3>
          <p className="text-gray-500 text-center max-w-sm mb-6">{loadError}</p>
          <Button onClick={fetchNotifications}>
            <HiOutlineRefresh className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </motion.div>
      ) : filtered.length === 0 ? (
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
            const Icon = getIcon(n.type);
            return (
              <motion.div
                key={n._id}
                variants={item}
                className={classNames(
                  'bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-sm',
                  n.isRead ? 'border-gray-100' : 'border-primary-200 bg-primary-50/30'
                )}
                onClick={() => !n.isRead && markAsRead(n._id)}
              >
                <div className="flex items-start gap-4">
                  <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', getBg(n.type))}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className={classNames(
                          'text-sm',
                          n.isRead ? 'text-gray-700' : 'text-gray-900 font-semibold'
                        )}>
                          {n.title}
                        </h3>
                        {!n.isRead && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">
                        {formatDate(n.createdAt, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={classNames(
                      'text-sm mt-1',
                      n.isRead ? 'text-gray-500' : 'text-gray-600'
                    )}>
                      {n.message}
                    </p>
                    {!n.isRead && (
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); markAsRead(n._id); }}
                          className="text-xs text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
                        >
                          <HiOutlineMailOpen className="w-3.5 h-3.5" />
                          Mark as read
                        </button>
                      </div>
                    )}
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
