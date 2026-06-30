import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlinePaperAirplane,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineBriefcase,
} from 'react-icons/hi';
import StatCard from '../../components/portal/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { classNames, formatDate } from '../../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const LeaveApplication = () => {
  const [form, setForm] = useState({ type: 'sick', startDate: '', endDate: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const leaveBalances = [
    { label: 'Sick Leave', value: '8', icon: HiOutlineHeart, color: 'blue', trend: `${12} total` },
    { label: 'Casual Leave', value: '5', icon: HiOutlineBriefcase, color: 'green', trend: `${10} total` },
    { label: 'Earned Leave', value: '3', icon: HiOutlineClock, color: 'purple', trend: `${5} total` },
  ];

  const leaveHistory = [
    { type: 'Sick Leave', startDate: '2026-06-09', endDate: '2026-06-10', days: 2, status: 'approved', remarks: 'Medical leave' },
    { type: 'Casual Leave', startDate: '2026-05-20', endDate: '2026-05-20', days: 1, status: 'approved', remarks: 'Personal work' },
    { type: 'Sick Leave', startDate: '2026-04-15', endDate: '2026-04-16', days: 2, status: 'rejected', remarks: 'Insufficient documents' },
    { type: 'Earned Leave', startDate: '2026-03-10', endDate: '2026-03-12', days: 3, status: 'approved', remarks: 'Family function' },
    { type: 'Casual Leave', startDate: '2026-02-05', endDate: '2026-02-05', days: 1, status: 'pending', remarks: '' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ type: 'sick', startDate: '', endDate: '', reason: '' });
      setShowForm(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    const variantMap = {
      approved: 'success',
      rejected: 'danger',
      pending: 'warning',
    };
    return (
      <Badge variant={variantMap[status] || 'default'} size="sm">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Leave Application</h1>
          <p className="text-gray-500">Apply for leave and track your requests</p>
        </div>
        {!showForm && (
          <Button variant="primary" iconLeft={<HiOutlinePaperAirplane className="w-4 h-4" />} onClick={() => setShowForm(true)}>
            Apply for Leave
          </Button>
        )}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {leaveBalances.map((bal, i) => (
          <motion.div key={i} variants={item}>
            <StatCard {...bal} />
          </motion.div>
        ))}
      </motion.div>

      {showForm && (
        <motion.div
          variants={item}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HiOutlineDocumentText className="w-5 h-5 text-primary-500" />
            Apply for Leave
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="earned">Earned Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
              <textarea
                rows={3}
                value={form.reason}
                onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
                required
                placeholder="Please provide a detailed reason for your leave..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" loading={submitting} iconLeft={<HiOutlinePaperAirplane className="w-4 h-4" />}>
                Submit Application
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <motion.div variants={item} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <HiOutlineClipboardList className="w-5 h-5 text-primary-500" />
            Leave History
          </h2>
          <span className="text-sm text-gray-400">{leaveHistory.length} records</span>
        </div>

        {leaveHistory.length === 0 ? (
          <EmptyState title="No leave applications" description="You haven't applied for any leave yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Days</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaveHistory.map((leave, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{leave.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(leave.startDate)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(leave.endDate)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{leave.days}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(leave.status)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{leave.remarks || '-'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LeaveApplication;
