import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineSave,
  HiOutlineAcademicCap,
  HiOutlineFilter,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const studentsData = [
  { id: 1, name: 'Aarav Patel', rollNo: 'S001', marks: '', total: 100, grade: '' },
  { id: 2, name: 'Aadhya Sharma', rollNo: 'S002', marks: '', total: 100, grade: '' },
  { id: 3, name: 'Aryan Singh', rollNo: 'S003', marks: '', total: 100, grade: '' },
  { id: 4, name: 'Diya Gupta', rollNo: 'S004', marks: '', total: 100, grade: '' },
  { id: 5, name: 'Ishaan Verma', rollNo: 'S005', marks: '', total: 100, grade: '' },
  { id: 6, name: 'Kavya Reddy', rollNo: 'S006', marks: '', total: 100, grade: '' },
  { id: 7, name: 'Mohit Joshi', rollNo: 'S007', marks: '', total: 100, grade: '' },
  { id: 8, name: 'Neha Kumar', rollNo: 'S008', marks: '', total: 100, grade: '' },
  { id: 9, name: 'Rohit Malhotra', rollNo: 'S009', marks: '', total: 100, grade: '' },
  { id: 10, name: 'Sneha Patel', rollNo: 'S010', marks: '', total: 100, grade: '' },
];

const previousMarks = [
  { exam: 'Mid Term 2026', class: '10-A', subject: 'Physics', date: '2026-05-15', status: 'completed' },
  { exam: 'Unit Test 2', class: '12-B', subject: 'Physics', date: '2026-04-20', status: 'completed' },
  { exam: 'Quarterly Exam', class: '11-A', subject: 'Physics', date: '2026-03-10', status: 'completed' },
];

const calculateGrade = (marks, total) => {
  const percentage = (marks / total) * 100;
  if (percentage >= 91) return 'A+';
  if (percentage >= 81) return 'A';
  if (percentage >= 71) return 'B+';
  if (percentage >= 61) return 'B';
  if (percentage >= 51) return 'C+';
  if (percentage >= 41) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
};

const MarksEntry = () => {
  const [students, setStudents] = useState(studentsData.map((s) => ({ ...s })));
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [saved, setSaved] = useState(false);

  const updateMarks = (id, value) => {
    const marks = value === '' ? '' : Math.min(parseFloat(value) || 0, 100);
    const grade = marks !== '' ? calculateGrade(marks, 100) : '';
    setStudents(
      students.map((s) => (s.id === id ? { ...s, marks, grade } : s))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const allEntered = students.every((s) => s.marks !== '');

  return (
    <PortalLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Marks Entry</h1>
          <p className="text-gray-500 mt-1">Enter and manage student marks</p>
        </div>

        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select Exam</option>
                <option value="unit-test-1">Unit Test 1</option>
                <option value="unit-test-2">Unit Test 2</option>
                <option value="quarterly">Quarterly Exam</option>
                <option value="mid-term">Mid Term</option>
                <option value="final">Final Exam</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select Subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
          </div>
        </Card>

        {selectedExam && selectedClass && selectedSection && selectedSubject && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-semibold text-gray-800">
                Student Marks - {selectedSubject}
              </h2>
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <HiOutlineCheckCircle className="w-4 h-4" />
                    Saved successfully
                  </span>
                )}
                <Button
                  variant="primary"
                  iconLeft={<HiOutlineSave className="w-4 h-4" />}
                  onClick={handleSave}
                  disabled={!allEntered}
                >
                  Save Marks
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Roll No</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Marks (out of 100)</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Percentage</th>
                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => {
                    const percentage = student.marks !== '' ? ((student.marks / 100) * 100).toFixed(1) : '-';
                    return (
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
                        <td className="py-3 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={student.marks}
                            onChange={(e) => updateMarks(student.id, e.target.value)}
                            className="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-3 px-2 text-center text-sm font-medium text-gray-800">
                          {percentage !== '-' ? `${percentage}%` : '-'}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {student.grade && (
                            <Badge
                              variant={
                                ['A+', 'A', 'B+'].includes(student.grade)
                                  ? 'success'
                                  : student.grade === 'F'
                                  ? 'danger'
                                  : 'warning'
                              }
                            >
                              {student.grade}
                            </Badge>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <Card>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Previously Entered Marks</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Exam</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Class</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {previousMarks.map((record, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 text-sm font-medium text-gray-800">{record.exam}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{record.class}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{record.subject}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{formatDate(record.date)}</td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant="success">Completed</Badge>
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

export default MarksEntry;
