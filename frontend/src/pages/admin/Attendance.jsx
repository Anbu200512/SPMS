import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineClipboardCheck,
  HiOutlineDownload,
  HiOutlineSearch,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMinusCircle,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const classes = ['6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C'];

const students = [
  { id: 1, name: 'Aarav Sharma', rollNo: '01', status: 'present' },
  { id: 2, name: 'Priya Patel', rollNo: '02', status: 'present' },
  { id: 3, name: 'Rohan Verma', rollNo: '03', status: 'absent' },
  { id: 4, name: 'Sneha Gupta', rollNo: '04', status: 'late' },
  { id: 5, name: 'Arjun Singh', rollNo: '05', status: 'present' },
  { id: 6, name: 'Kavya Reddy', rollNo: '06', status: 'present' },
  { id: 7, name: 'Vikram Joshi', rollNo: '07', status: 'absent' },
  { id: 8, name: 'Neha Kapoor', rollNo: '08', status: 'present' },
  { id: 9, name: 'Rahul Mishra', rollNo: '09', status: 'present' },
  { id: 10, name: 'Ananya Tiwari', rollNo: '10', status: 'late' },
];

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(students);

  const presentCount = attendance.filter((s) => s.status === 'present').length;
  const absentCount = attendance.filter((s) => s.status === 'absent').length;
  const lateCount = attendance.filter((s) => s.status === 'late').length;

  const toggleStatus = (id) => {
    setAttendance(attendance.map((s) => {
      if (s.id !== id) return s;
      const next = { present: 'absent', absent: 'late', late: 'present' };
      return { ...s, status: next[s.status] };
    }));
  };

  const statusIcon = (status) => {
    if (status === 'present') return <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'absent') return <HiOutlineXCircle className="w-5 h-5 text-red-500" />;
    return <HiOutlineMinusCircle className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineClipboardCheck className="w-7 h-7 text-primary-500" />
          Attendance Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Mark and manage student attendance</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Section</label>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {sections.map((s) => <option key={s} value={s}>Section {s}</option>)}
            </select>
          </div>
          <div className="flex-1" />
          <Button variant="outline" iconLeft={<HiOutlineDownload className="w-4 h-4" />}>Export CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Present', count: presentCount, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Absent', count: absentCount, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Late', count: lateCount, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map((stat) => (
          <div key={stat.label} className={classNames('rounded-xl p-4 text-center', stat.bg)}>
            <p className={classNames('text-2xl font-bold', stat.color)}>{stat.count}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendance.map((student, idx) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={classNames(
                      'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full',
                      student.status === 'present' && 'bg-green-100 text-green-700',
                      student.status === 'absent' && 'bg-red-100 text-red-700',
                      student.status === 'late' && 'bg-yellow-100 text-yellow-700',
                    )}>
                      {statusIcon(student.status)}
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => toggleStatus(student.id)}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
