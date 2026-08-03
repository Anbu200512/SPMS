import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlinePaperAirplane,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames, formatDate } from '../../utils/helpers';
import { showSuccess, showError } from '../../components/ui/Toast';
import { getAll, createNotification, getSentNotifications } from '../../services/dataService';

const recipientOptions = [
  { value: 'all', label: 'All (Students & Teachers)' },
  { value: 'students', label: 'All Students' },
  { value: 'teachers', label: 'All Teachers' },
  { value: 'parents', label: 'All Parents' },
  { value: 'class', label: 'Specific Class' },
];

const audienceIconMap = {
  'All (Students & Teachers)': HiOutlineUsers,
  'All Students': HiOutlineUserGroup,
  'All Teachers': HiOutlineUserGroup,
  'All Parents': HiOutlineUsers,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [classes, setClasses] = useState([]);
  const [activeTab, setActiveTab] = useState('send');
  const [form, setForm] = useState({ title: '', message: '', recipients: 'all', class: '' });
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  useEffect(() => {
    getAll('classes', { limit: 100 })
      .then((res) => setClasses(res.data?.data?.classes || []))
      .catch(() => setClasses([]));
  }, []);

  useEffect(() => {
    if (activeTab !== 'history') return;
    setLoading(true);
    getSentNotifications({ page, limit: 10 })
      .then((res) => {
        const data = res.data?.data || {};
        setNotifications(data.notifications || []);
        if (data.pagination) setTotalPages(data.pagination.pages || 1);
      })
      .catch(() => showError('Failed to load notification history'))
      .finally(() => setLoading(false));
  }, [activeTab, page]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (form.recipients === 'class' && !form.class) {
      showError('Please select a class');
      return;
    }
    setSending(true);
    try {
      const res = await createNotification({
        title: form.title,
        message: form.message,
        recipients: form.recipients,
        class: form.recipients === 'class' ? form.class : undefined,
      });
      const count = res.data?.data?.count;
      showSuccess(count ? `Notification sent to ${count} recipients` : 'Notification sent successfully');
      setForm({ title: '', message: '', recipients: 'all', class: '' });
      setPage(1);
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to send notification');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineBell className="w-7 h-7 text-primary-500" />
          Notifications
        </h1>
        <p className="text-gray-500 text-sm mt-1">Send and manage notifications</p>
      </div>

      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[{ key: 'send', label: 'Send Notification' }, { key: 'history', label: 'History' }, { key: 'schedule', label: 'Schedule' }].map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={classNames('px-4 py-2 text-sm font-medium rounded-md transition-colors', activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700')}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'send' && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <select value={form.recipients} onChange={(e) => setForm({ ...form, recipients: e.target.value, class: '' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {recipientOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              {form.recipients === 'class' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Select Class</option>
                    {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" loading={sending} iconLeft={<HiOutlinePaperAirplane className="w-4 h-4" />}>Send Notification</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white rounded-xl p-10 border border-gray-100 shadow-sm text-center">
              <HiOutlineBell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No notifications sent yet.</p>
            </div>
          ) : (
            notifications.map((n) => {
              const AudienceIcon = audienceIconMap[n.audience] || HiOutlineBell;
  const getAudienceLabel = (n) => {
    if (n.recipients === 'class') {
      const cls = classes.find((c) => c._id === n.class);
      return cls ? cls.name : 'Specific Class';
    }
    return recipientOptions.find((r) => r.value === n.recipients)?.label || 'All';
  };

  return (
                <div key={n._id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base font-heading font-semibold text-gray-800">{n.title}</h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Sent</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{n.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1"><HiOutlineMail className="w-3.5 h-3.5" /> {n.audience || 'All'}</span>
                        <span className="flex items-center gap-1"><HiOutlineUsers className="w-3.5 h-3.5" /> {n.count} recipient{n.count > 1 ? 's' : ''}</span>
                        <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" /> {formatDate(n.createdAt, { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        <AudienceIcon className="w-3.5 h-3.5 text-gray-400" />
                        {(n.recipients || []).slice(0, 5).map((r) => (
                          <span key={r._id} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{r.name}</span>
                        ))}
                        {n.recipients && n.recipients.length > 5 && (
                          <span className="text-xs text-gray-400">+{n.recipients.length - 5} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineCalendar className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-heading font-semibold text-gray-800">Schedule Notification</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Select date and time to schedule a notification (feature coming soon).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
            <Button disabled>Schedule (Coming Soon)</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
