import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlinePlus,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/common/EmptyState';
import { getTeacherLeaves, createTeacherLeave } from '../../services/teacherService';
import api from '../../services/api';
import { showSuccess, showError } from '../../components/ui/Toast';

const leaveTypes = ['Sick', 'Casual', 'Earned', 'Other'];

const statusVariant = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'danger',
};

const statusIcon = {
  Pending: HiOutlineClock,
  Approved: HiOutlineCheckCircle,
  Rejected: HiOutlineXCircle,
};

const statusTabs = ['All', 'Pending', 'Approved', 'Rejected'];

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await getTeacherLeaves({ page, limit: 10 });
      setLeaves(res.data?.data?.leaves || res.data?.leaves || []);
      setTotalPages(res.data?.data?.pagination?.pages || res.data?.pagination?.pages || 1);
    } catch {
      showError('Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openApply = () => {
    setForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.leaveType || !form.startDate || !form.endDate || !form.reason) {
      showError('Please fill all required fields');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (form.startDate < today) {
      showError('Start date cannot be in the past');
      return;
    }
    if (form.endDate < form.startDate) {
      showError('End date must be on or after start date');
      return;
    }

    try {
      setSubmitting(true);
      const data = {
        leaveType: form.leaveType,
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason,
      };
      await createTeacherLeave(data);
      showSuccess('Leave request submitted successfully');
      setShowModal(false);
      await fetchLeaves();
    } catch {
      showError('Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (leaveId) => {
    try {
      await api.delete(`/leaves/${leaveId}`);
      showSuccess('Leave request cancelled');
      await fetchLeaves();
    } catch {
      showError('Failed to cancel leave request');
    }
  };

  const handleTabChange = (tab) => {
    setFilterStatus(tab);
    setPage(1);
  };

  const filteredLeaves = filterStatus === 'All'
    ? leaves
    : leaves.filter((l) => l.status === filterStatus);

  const currentYear = new Date().getFullYear();
  const leavesThisYear = leaves.filter((l) => {
    const d = new Date(l.startDate || l.createdAt);
    return d.getFullYear() === currentYear;
  });
  const totalTaken = leavesThisYear.length;
  const approvedCount = leavesThisYear.filter((l) => l.status === 'Approved').length;
  const pendingCount = leavesThisYear.filter((l) => l.status === 'Pending').length;

  if (loading) {
    return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" />
        </div>
    );
  }

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Leave Management</h1>
            <p className="text-gray-500 mt-1">Apply and track your leave requests</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={openApply}>
            Apply Leave
          </Button>
        </div>

        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">{totalTaken}</p>
              <p className="text-xs text-blue-600 mt-1">Total Leaves ({currentYear})</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{approvedCount}</p>
              <p className="text-xs text-green-600 mt-1">Approved</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
              <p className="text-xs text-yellow-600 mt-1">Pending</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-2 border-b border-gray-200 pb-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                filterStatus === tab
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredLeaves.length === 0 ? (
          <Card>
            <EmptyState
              icon={<HiOutlineCalendar className="w-12 h-12" />}
              title="No leave requests"
              description={
                filterStatus === 'All'
                  ? "You haven't applied for any leave yet. Click 'Apply Leave' to submit your first request."
                  : `No ${filterStatus.toLowerCase()} leave requests found.`
              }
            />
          </Card>
        ) : (
          <Card padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Leave Type</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Reason</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Applied On</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave, idx) => {
                    const StatusIcon = statusIcon[leave.status] || HiOutlineClock;
                    return (
                      <motion.tr
                        key={leave._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                              <HiOutlineDocumentText className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-800">{leave.leaveType}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600">
                            <div>{formatDate(leave.startDate)}</div>
                            <div className="text-xs text-gray-400">to {formatDate(leave.endDate)}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-600 max-w-[200px] truncate">{leave.reason}</p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={statusVariant[leave.status] || 'default'}>
                            <span className="flex items-center gap-1">
                              <StatusIcon className="w-3.5 h-3.5" />
                              {leave.status}
                            </span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm text-gray-500">{formatDate(leave.createdAt)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {leave.status === 'Pending' && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleCancel(leave._id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-100">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <HiChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <HiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </Card>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Apply for Leave" size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Leave Type</label>
              <select
                name="leaveType"
                value={form.leaveType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select leave type</option>
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                placeholder="Describe the reason for your leave..."
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
              <HiOutlineDocumentText className="w-4 h-4 inline mr-1" />
              File upload requires FormData. Use the attachment feature via the dedicated upload option if available.
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit} loading={submitting} disabled={submitting}>
                Submit Request
              </Button>
            </div>
          </div>
        </Modal>
      </motion.div>
  );
};

export default Leave;
