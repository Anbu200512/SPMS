import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineClipboardList,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineEye,
} from 'react-icons/hi';
import DataTable from '../../components/portal/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { classNames, formatDate } from '../../utils/helpers';

const initialAdmissions = [
  { id: 1, studentName: 'Aarav Sharma', class: '10-A', fatherName: 'Rajesh Sharma', phone: '9876543210', status: 'pending', date: '2026-06-28', address: '123, Street 1, New Delhi', motherName: 'Neha Sharma', dob: '2009-05-15', previousSchool: 'Delhi Public School' },
  { id: 2, studentName: 'Priya Patel', class: '9-B', fatherName: 'Amit Patel', phone: '9876543211', status: 'approved', date: '2026-06-27', address: '456, Street 2, Mumbai', motherName: 'Anita Patel', dob: '2010-08-20', previousSchool: 'Mumbai Public School' },
  { id: 3, studentName: 'Rohan Verma', class: '11-C', fatherName: 'Sunil Verma', phone: '9876543212', status: 'pending', date: '2026-06-26', address: '789, Street 3, Bangalore', motherName: 'Priya Verma', dob: '2008-01-10', previousSchool: 'Bangalore International' },
  { id: 4, studentName: 'Sneha Gupta', class: '8-A', fatherName: 'Vijay Gupta', phone: '9876543213', status: 'approved', date: '2026-06-25', address: '321, Street 4, Delhi', motherName: 'Sarita Gupta', dob: '2011-03-22', previousSchool: 'St. Marys School' },
  { id: 5, studentName: 'Arjun Singh', class: '12-A', fatherName: 'Dharam Singh', phone: '9876543214', status: 'rejected', date: '2026-06-24', address: '654, Street 5, Pune', motherName: 'Kiran Singh', dob: '2007-11-05', previousSchool: 'Pune Academy' },
];

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

export default function Admissions() {
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [activeTab, setActiveTab] = useState('all');
  const [viewModal, setViewModal] = useState(null);
  const [remarks, setRemarks] = useState('');

  const filtered = activeTab === 'all' ? admissions : admissions.filter((a) => a.status === activeTab);

  const handleApprove = (id) => {
    setAdmissions(admissions.map((a) => a.id === id ? { ...a, status: 'approved' } : a));
    setViewModal(null);
  };

  const handleReject = (id) => {
    setAdmissions(admissions.map((a) => a.id === id ? { ...a, status: 'rejected' } : a));
    setViewModal(null);
  };

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'class', label: 'Class' },
    { key: 'fatherName', label: 'Father Name' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={classNames(
          'px-2 py-0.5 text-xs font-medium rounded-full',
          val === 'approved' && 'bg-green-100 text-green-700',
          val === 'pending' && 'bg-yellow-100 text-yellow-700',
          val === 'rejected' && 'bg-red-100 text-red-700',
        )}>
          {val}
        </span>
      ),
    },
    { key: 'date', label: 'Date', render: (val) => formatDate(val) },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineClipboardList className="w-7 h-7 text-primary-500" />
          Admission Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Review and manage student applications</p>
      </div>

      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        onView={(row) => { setViewModal(row); setRemarks(''); }}
      />

      <Modal isOpen={!!viewModal} onClose={() => setViewModal(null)} title="Application Details" size="lg">
        {viewModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-gray-500">Student Name</label><p className="text-sm font-medium text-gray-800">{viewModal.studentName}</p></div>
              <div><label className="text-xs text-gray-500">Class</label><p className="text-sm font-medium text-gray-800">{viewModal.class}</p></div>
              <div><label className="text-xs text-gray-500">Father Name</label><p className="text-sm font-medium text-gray-800">{viewModal.fatherName}</p></div>
              <div><label className="text-xs text-gray-500">Mother Name</label><p className="text-sm font-medium text-gray-800">{viewModal.motherName || '-'}</p></div>
              <div><label className="text-xs text-gray-500">Date of Birth</label><p className="text-sm font-medium text-gray-800">{viewModal.dob ? formatDate(viewModal.dob) : '-'}</p></div>
              <div><label className="text-xs text-gray-500">Phone</label><p className="text-sm font-medium text-gray-800">{viewModal.phone}</p></div>
              <div className="col-span-2"><label className="text-xs text-gray-500">Address</label><p className="text-sm font-medium text-gray-800">{viewModal.address}</p></div>
              <div className="col-span-2"><label className="text-xs text-gray-500">Previous School</label><p className="text-sm font-medium text-gray-800">{viewModal.previousSchool || '-'}</p></div>
              <div className="col-span-2"><label className="text-xs text-gray-500">Status</label>
                <span className={classNames(
                  'inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1',
                  viewModal.status === 'approved' && 'bg-green-100 text-green-700',
                  viewModal.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                  viewModal.status === 'rejected' && 'bg-red-100 text-red-700',
                )}>{viewModal.status}</span>
              </div>
            </div>
            {viewModal.status === 'pending' && (
              <div className="border-t pt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                  <textarea rows={2} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add remarks..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="primary" iconLeft={<HiOutlineCheck className="w-4 h-4" />} onClick={() => handleApprove(viewModal.id)}>Approve</Button>
                  <Button variant="danger" iconLeft={<HiOutlineX className="w-4 h-4" />} onClick={() => handleReject(viewModal.id)}>Reject</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
