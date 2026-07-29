import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineAcademicCap,
  HiOutlineEye,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { classNames } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/common/EmptyState';
import { getTeacherProfile, getTeacherStudents } from '../../services/teacherService';
import { showError } from '../../components/ui/Toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [studentClass, setStudentClass] = useState(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTeacherProfile();
      setClasses(res.data.data.teacher.classes || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to fetch classes';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleViewStudents = async (cls) => {
    try {
      setStudentsLoading(true);
      setStudentClass(cls);
      const res = await getTeacherStudents({ class: cls._id });
      setStudents(res.data.data.students || []);
      setShowStudents(true);
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to fetch students');
    } finally {
      setStudentsLoading(false);
    }
  };

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">My Classes</h1>
          <p className="text-gray-500 mt-1">View and manage your assigned classes</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <HiOutlineBookOpen className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-gray-700 mb-2">Failed to load classes</h3>
            <p className="text-gray-500 text-center max-w-sm mb-6">{error}</p>
            <Button onClick={fetchClasses} variant="primary">
              <HiOutlineRefresh className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : classes.length === 0 ? (
          <EmptyState
            icon={<HiOutlineBookOpen />}
            title="No classes assigned yet"
            description="You haven't been assigned any classes for this academic year."
          />
        ) : (
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <motion.div
                key={cls._id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
                onClick={() => setSelectedClass(selectedClass === cls._id ? null : cls._id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                    <HiOutlineBookOpen className="w-6 h-6" />
                  </div>
                  <Badge variant="info" size="sm">{cls.code || 'Class'}</Badge>
                </div>
                <h3 className="text-lg font-heading font-semibold text-gray-800">
                  {cls.name} - {cls.section?.name || cls.section}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{cls.code}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <HiOutlineUserGroup className="w-4 h-4" />
                    <span>{cls.studentsCount || 0} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <HiOutlineClipboardList className="w-4 h-4" />
                    <span>Room {cls.room || 'N/A'}</span>
                  </div>
                </div>

                {selectedClass === cls._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-gray-100 space-y-2"
                  >
                    <p className="text-xs text-gray-500 mb-2">Quick Actions</p>
                    <Link
                      to={`/teacher/attendance?classId=${cls._id}`}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <HiOutlineClipboardList className="w-4 h-4" />
                      Take Attendance
                    </Link>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleViewStudents(cls); }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                      View Students
                    </button>
                    <Link
                      to={`/teacher/marks?classId=${cls._id}`}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <HiOutlineAcademicCap className="w-4 h-4" />
                      Add Marks
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

      <Modal
        isOpen={showStudents}
        onClose={() => setShowStudents(false)}
        title={studentClass ? `${studentClass.name} - ${studentClass.section?.name || studentClass.section} Students` : 'Students'}
        size="xl"
      >
        {studentsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : students.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No students found in this class.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent Name</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent Phone</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-gray-800">
                      {student.user?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-600">{student.rollNo}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{student.parentName || 'N/A'}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{student.parentPhone || 'N/A'}</td>
                    <td className="py-3 px-3 text-sm">
                      <Badge
                        variant={
                          (student.attendance?.percentage || 0) >= 75 ? 'success' :
                          (student.attendance?.percentage || 0) >= 50 ? 'warning' : 'danger'
                        }
                        size="sm"
                      >
                        {student.attendance?.percentage != null
                          ? `${student.attendance.percentage}%`
                          : 'N/A'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
      </motion.div>
  );
};

export default Classes;
