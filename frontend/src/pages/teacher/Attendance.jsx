import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineSearch,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import {
  getTeacherProfile,
  getTeacherStudents,
  markAttendance,
  getAttendance,
} from '../../services/teacherService';

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getTeacherProfile();
        const teacherData = res.data?.data?.teacher || res.data?.teacher || {};
        setClasses(teacherData.classes || []);
      } catch {
        toast.error('Failed to load classes');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (!selectedClassId) {
      setStudents([]);
      setAttendanceRecords([]);
      return;
    }
    const loadStudents = async () => {
      try {
        const res = await getTeacherStudents({ class: selectedClassId });
        const studentList = res.data?.data?.students || res.data?.students || [];
        setStudents(studentList.map((s) => ({ ...s, status: '' })));
      } catch {
        toast.error('Failed to load students');
        setStudents([]);
      }
    };
    loadStudents();
  }, [selectedClassId]);

  useEffect(() => {
    if (!selectedClassId) {
      setAttendanceRecords([]);
      return;
    }
    const loadAttendance = async () => {
      try {
        const res = await getAttendance({ class: selectedClassId, date: selectedDate, page: historyPage, limit: 10 });
        const data = res.data?.data || res.data || {};
        setAttendanceRecords(data.records || []);
        setHistoryTotalPages(data.pagination?.pages || 1);
      } catch {
        setAttendanceRecords([]);
      }
    };
    loadAttendance();
  }, [selectedClassId, selectedDate, historyPage]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClassId(classId);
    const cls = classes.find((c) => c._id === classId);
    if (cls) {
      setSelectedClassName(cls.name);
      setSelectedSection(cls.section?.name || cls.section);
    } else {
      setSelectedClassName('');
      setSelectedSection('');
    }
    setSubmitted(false);
    setHistoryPage(1);
  };

  const markAllPresent = () => {
    setStudents(students.map((s) => ({ ...s, status: 'Present' })));
  };

  const markAllAbsent = () => {
    setStudents(students.map((s) => ({ ...s, status: 'Absent' })));
  };

  const updateStatus = (id, status) => {
    setStudents(students.map((s) => (s._id === id ? { ...s, status } : s)));
  };

  const handleSubmit = async () => {
    if (!students.some((s) => s.status)) {
      toast.error('Please mark attendance for at least one student');
      return;
    }
    setSubmitting(true);
    try {
      const records = students
        .filter((s) => s.status)
        .map((s) => ({
          student: s._id,
          class: selectedClassId,
          section: selectedSection,
          date: selectedDate,
          status: s.status,
          remarks: '',
        }));
      await markAttendance({ records });
      toast.success('Attendance submitted successfully');
      setSubmitted(true);
      const res = await getAttendance({ class: selectedClassId, date: selectedDate, page: historyPage, limit: 10 });
      const data = res.data?.data || res.data || {};
      setAttendanceRecords(data.records || []);
      setHistoryTotalPages(data.pagination?.pages || 1);
    } catch {
      toast.error('Failed to submit attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditRecord = async (record, newStatus) => {
    try {
      await markAttendance({
        records: [{
          student: record.student?._id || record.student,
          class: selectedClassId,
          section: selectedSection,
          date: selectedDate,
          status: newStatus,
          remarks: '',
        }],
      });
      toast.success('Attendance record updated');
      const res = await getAttendance({ class: selectedClassId, date: selectedDate, page: historyPage, limit: 10 });
      const data = res.data?.data || res.data || {};
      setAttendanceRecords(data.records || []);
      setHistoryTotalPages(data.pagination?.pages || 1);
    } catch {
      toast.error('Failed to update record');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <HiOutlineCheckCircle className="w-4 h-4" />;
      case 'Absent': return <HiOutlineXCircle className="w-4 h-4" />;
      case 'Late': return <HiOutlineClock className="w-4 h-4" />;
      default: return null;
    }
  };

  const presentCount = attendanceRecords.filter((r) => r.status === 'Present').length;
  const absentCount = attendanceRecords.filter((r) => r.status === 'Absent').length;
  const lateCount = attendanceRecords.filter((r) => r.status === 'Late').length;

  const filteredStudents = students.filter((s) =>
    (s.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Manage Attendance</h1>
          <p className="text-gray-500 mt-1">Mark and manage student attendance</p>
        </div>

        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Class & Section</label>
              <select
                value={selectedClassId}
                onChange={handleClassChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    Class {cls.name} - {cls.section?.name || cls.section}
                  </option>
                ))}
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

        {selectedClassId && (
          <>
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-heading font-semibold text-gray-800">
                  Students - Class {selectedClassName} Section {selectedSection}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={<HiOutlineCheck className="w-4 h-4" />}
                    onClick={markAllPresent}
                  >
                    All Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={<HiOutlineXCircle className="w-4 h-4" />}
                    onClick={markAllAbsent}
                  >
                    All Absent
                  </Button>
                </div>
              </div>

              <div className="relative mb-4">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {filteredStudents.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">No students found.</p>
              ) : (
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
                      {filteredStudents.map((student, idx) => (
                        <motion.tr
                          key={student._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-2 text-sm text-gray-500">{idx + 1}</td>
                          <td className="py-3 px-2 text-sm text-gray-600">{student.rollNo}</td>
                          <td className="py-3 px-2 text-sm font-medium text-gray-800">{student.user?.name || 'Unknown'}</td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {['Present', 'Absent', 'Late'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => updateStatus(student._id, status)}
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
              )}

              {students.length > 0 && (
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                  <Button variant="primary" size="lg" onClick={handleSubmit} loading={submitting}>
                    Submit Attendance
                  </Button>
                </div>
              )}
            </Card>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm"
              >
                Attendance has been submitted successfully for Class {selectedClassName} Section {selectedSection} on{' '}
                {formatDate(selectedDate)}.
              </motion.div>
            )}

            {attendanceRecords.length > 0 && (
              <Card>
                <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">
                  Attendance Records - {formatDate(selectedDate)}
                </h2>
                <div className="flex gap-3 mb-4">
                  <Badge variant="success">{presentCount} Present</Badge>
                  <Badge variant="danger">{absentCount} Absent</Badge>
                  <Badge variant="warning">{lateCount} Late</Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Roll No</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Student</th>
                        <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords.map((record, idx) => (
                        <tr key={record._id || idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-2 text-sm text-gray-600">{record.student?.rollNo || '-'}</td>
                          <td className="py-3 px-2 text-sm font-medium text-gray-800">{record.student?.user?.name || 'Unknown'}</td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {['Present', 'Absent', 'Late'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleEditRecord(record, status)}
                                  className={classNames(
                                    'px-2 py-1 rounded text-xs font-medium transition-all',
                                    record.status === status
                                      ? status === 'Present'
                                        ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
                                        : status === 'Absent'
                                        ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
                                        : 'bg-orange-100 text-orange-700 ring-2 ring-orange-500'
                                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                  )}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {historyTotalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                      disabled={historyPage <= 1}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <HiChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {historyPage} of {historyTotalPages}
                    </span>
                    <button
                      onClick={() => setHistoryPage((p) => Math.min(historyTotalPages, p + 1))}
                      disabled={historyPage >= historyTotalPages}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <HiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </Card>
            )}
          </>
        )}
      </motion.div>
  );
};

export default Attendance;
