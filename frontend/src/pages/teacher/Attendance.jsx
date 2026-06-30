import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineCheck,
} from 'react-icons/hi';
import { classNames, formatDate, getStatusColor } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const initialStudents = [
  { id: 1, name: 'Aarav Patel', rollNo: 'S001', status: '' },
  { id: 2, name: 'Aadhya Sharma', rollNo: 'S002', status: '' },
  { id: 3, name: 'Aryan Singh', rollNo: 'S003', status: '' },
  { id: 4, name: 'Diya Gupta', rollNo: 'S004', status: '' },
  { id: 5, name: 'Ishaan Verma', rollNo: 'S005', status: '' },
  { id: 6, name: 'Kavya Reddy', rollNo: 'S006', status: '' },
  { id: 7, name: 'Mohit Joshi', rollNo: 'S007', status: '' },
  { id: 8, name: 'Neha Kumar', rollNo: 'S008', status: '' },
  { id: 9, name: 'Rohit Malhotra', rollNo: 'S009', status: '' },
  { id: 10, name: 'Sneha Patel', rollNo: 'S010', status: '' },
];

const previousRecords = [
  { date: '2026-06-29', class: '10-A', present: 38, absent: 2, late: 2 },
  { date: '2026-06-28', class: '10-A', present: 40, absent: 1, late: 1 },
  { date: '2026-06-27', class: '10-A', present: 37, absent: 3, late: 2 },
  { date: '2026-06-26', class: '12-B', present: 35, absent: 2, late: 1 },
  { date: '2026-06-25', class: '12-B', present: 36, absent: 1, late: 1 },
];

const Attendance = () => {
  const [students, setStudents] = useState(initialStudents);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitted, setSubmitted] = useState(false);

  const markAllPresent = () => {
    setStudents(students.map((s) => ({ ...s, status: 'Present' })));
  };

  const updateStatus = (id, status) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <HiOutlineCheckCircle className="w-4 h-4" />;
      case 'Absent': return <HiOutlineXCircle className="w-4 h-4" />;
      case 'Late': return <HiOutlineClock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <PortalLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Manage Attendance</h1>
          <p className="text-gray-500 mt-1">Mark and manage student attendance</p>
        </div>

        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select Class</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </Card>

        {selectedClass && selectedSection && (
          <>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-gray-800">
                  Students - Class {selectedClass} Section {selectedSection}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={<HiOutlineCheck className="w-4 h-4" />}
                  onClick={markAllPresent}
                >
                  Mark All Present
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">#</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Roll No</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                      <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-2 text-sm text-gray-500">{idx + 1}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{student.rollNo}</td>
                        <td className="py-3 px-2 text-sm font-medium text-gray-800">{student.name}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {['Present', 'Absent', 'Late'].map((status) => (
                              <button
                                key={status}
                                onClick={() => updateStatus(student.id, status)}
                                className={classNames(
                                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1',
                                  student.status === status
                                    ? status === 'Present'
                                      ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
                                      : status === 'Absent'
                                      ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
                                      : 'bg-orange-100 text-orange-700 ring-2 ring-orange-500'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                )}
                              >
                                {getStatusIcon(status)}
                                {status}
                              </button>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                  Submit Attendance
                </Button>
              </div>
            </Card>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm"
              >
                Attendance has been submitted successfully for Class {selectedClass} Section {selectedSection} on{' '}
                {formatDate(selectedDate)}.
              </motion.div>
            )}
          </>
        )}

        <Card>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Previous Attendance Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Class</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Present</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Absent</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Late</th>
                </tr>
              </thead>
              <tbody>
                {previousRecords.map((record, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 text-sm text-gray-600">{formatDate(record.date)}</td>
                    <td className="py-3 px-2 text-sm font-medium text-gray-800">{record.class}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="success">{record.present}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="danger">{record.absent}</Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="warning">{record.late}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </PortalLayout>
  );
};

export default Attendance;
