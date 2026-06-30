import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlinePaperAirplane,
  HiOutlineClock,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames, formatDate } from '../../utils/helpers';

const initialNotifications = [
  { id: 1, title: 'PTA Meeting Reminder', message: 'This is a reminder that the quarterly PTA meeting is scheduled for July 20th at 2:00 PM in the Conference Hall.', recipients: 'All Parents', sentAt: '2026-06-28 10:00 AM', status: 'sent' },
  { id: 2, title: 'Fee Payment Due', message: 'Dear parents, the tuition fee for July is due by July 10th. Please make the payment at the earliest.', recipients: 'All Parents', sentAt: '2026-06-25 09:00 AM', status: 'sent' },
  { id: 3, title: 'Holiday Notice', message: 'The school will remain closed on August 15th on account of Independence Day.', recipients: 'All', sentAt: '2026-06-20 11:00 AM', status: 'sent' },
  { id: 4, title: 'Exam Schedule', message: 'Term 1 exam schedule has been published. Please check the portal for details.', recipients: 'Class 10', sentAt: '2026-06-18 02:00 PM', status: 'sent' },
];

const recipientOptions = [
  { value: 'all', label: 'All (Students & Parents)' },
  { value: 'students', label: 'All Students' },
  { value: 'teachers', label: 'All Teachers' },
  { value: 'parents', label: 'All Parents' },
  { value: 'class', label: 'Specific Class' },
];

const classes = ['6', '7', '8', '9', '10', '11', '12'];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('send');
  const [form, setForm] = useState({ title: '', message: '', recipients: 'all', class: '' });
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const recipientLabel = form.recipients === 'class' ? `Class ${form.class}` : recipientOptions.find((r) => r.value === form.recipients)?.label;
    setNotifications([{ id: Date.now(), title: form.title, message: form.message, recipients: recipientLabel, sentAt: new Date().toLocaleString(), status: 'sent' }, ...notifications]);
    setForm({ title: '', message: '', recipients: 'all', class: '' });
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
                <select value={form.recipients} onChange={(e) => setForm({ ...form, recipients: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {recipientOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              {form.recipients === 'class' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Select Class</option>
                    {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" iconLeft={<HiOutlinePaperAirplane className="w-4 h-4" />}>Send Notification</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-heading font-semibold text-gray-800">{n.title}</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">{n.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{n.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><HiOutlineMail className="w-3.5 h-3.5" /> {n.recipients}</span>
                    <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" /> {n.sentAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
