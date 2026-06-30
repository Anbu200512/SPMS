import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineAcademicCap,
  HiOutlineChevronRight,
  HiOutlineEye,
} from 'react-icons/hi';
import { classNames } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const classesData = [
  {
    id: 1,
    name: 'Class 10',
    section: 'A',
    subject: 'Physics',
    studentsCount: 42,
    room: '101',
    schedule: 'Mon, Wed, Fri - 8:00 AM',
  },
  {
    id: 2,
    name: 'Class 12',
    section: 'B',
    subject: 'Physics',
    studentsCount: 38,
    room: '201',
    schedule: 'Tue, Thu, Sat - 8:45 AM',
  },
  {
    id: 3,
    name: 'Class 11',
    section: 'A',
    subject: 'Physics',
    studentsCount: 45,
    room: '202',
    schedule: 'Mon, Wed, Fri - 9:30 AM',
  },
  {
    id: 4,
    name: 'Class 9',
    section: 'C',
    subject: 'Science',
    studentsCount: 40,
    room: '103',
    schedule: 'Tue, Thu - 10:30 AM',
  },
  {
    id: 5,
    name: 'Class 10',
    section: 'B',
    subject: 'Physics Lab',
    studentsCount: 42,
    room: 'Lab 1',
    schedule: 'Wed - 12:00 PM',
  },
];

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

  return (
    <PortalLayout>
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

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {classesData.map((cls) => (
            <motion.div
              key={cls.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
              onClick={() => setSelectedClass(selectedClass === cls.id ? null : cls.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                  <HiOutlineBookOpen className="w-6 h-6" />
                </div>
                <Badge variant="info" size="sm">{cls.subject}</Badge>
              </div>
              <h3 className="text-lg font-heading font-semibold text-gray-800">
                {cls.name} - {cls.section}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{cls.subject}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineUserGroup className="w-4 h-4" />
                  <span>{cls.studentsCount} Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineClipboardList className="w-4 h-4" />
                  <span>Room {cls.room}</span>
                </div>
              </div>

              {selectedClass === cls.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 pt-4 border-t border-gray-100 space-y-2"
                >
                  <p className="text-xs text-gray-500 mb-2">Quick Actions</p>
                  <Link
                    to="/teacher/attendance"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    <HiOutlineClipboardList className="w-4 h-4" />
                    Take Attendance
                  </Link>
                  <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <HiOutlineEye className="w-4 h-4" />
                    View Students
                  </button>
                  <Link
                    to="/teacher/marks"
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
      </motion.div>
    </PortalLayout>
  );
};

export default Classes;
