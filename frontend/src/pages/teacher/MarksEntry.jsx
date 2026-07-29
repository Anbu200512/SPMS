import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineSave,
  HiOutlineAcademicCap,
  HiOutlineFilter,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import {
  getTeacherProfile,
  getTeacherStudents,
  getExams,
  getResults,
  bulkCreateResults,
} from '../../services/teacherService';

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
  const [students, setStudents] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [maxMarks, setMaxMarks] = useState(100);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [previousMarks, setPreviousMarks] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [profileRes, examsRes] = await Promise.all([
          getTeacherProfile(),
          getExams(),
        ]);
        const profile = profileRes.data;
        const profileData = profile.data?.teacher || profile.teacher || profile.data || profile;

        const assignedClasses = profileData.classes || profileData.assignedClasses || [];
        const assignedSections = profileData.sections || profileData.assignedSections || [];
        const assignedSubjects = profileData.subjects || profileData.assignedSubjects || [];

        setClasses(assignedClasses);
        setSections(assignedSections);
        setSubjects(assignedSubjects);

        const examsData = examsRes.data?.data?.schedules || examsRes.data?.schedules || examsRes.data?.data || [];
        setExams(Array.isArray(examsData) ? examsData : []);

        if (assignedClasses.length > 0 && assignedClasses[0] !== selectedClass) {
          setSelectedClass(assignedClasses[0]);
        }
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!selectedExam || !selectedClass || !selectedSection || !selectedSubject) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [studentsRes, resultsRes] = await Promise.all([
          getTeacherStudents({
            class: selectedClass,
            section: selectedSection,
            subject: selectedSubject,
          }),
          getResults({
            examName: selectedExam,
            class: selectedClass,
            section: selectedSection,
            subject: selectedSubject,
          }),
        ]);

        const studentResp = studentsRes.data?.data?.students || studentsRes.data?.students || studentsRes.data?.data || [];
        const studentList = Array.isArray(studentResp) ? studentResp : [];
        const resultsResp = resultsRes.data?.data?.results || resultsRes.data?.results || resultsRes.data?.data || [];
        const resultsData = Array.isArray(resultsResp) ? resultsResp : [];

        const existingResultsMap = {};
        if (Array.isArray(resultsData)) {
          resultsData.forEach((r) => {
            const studentId = r.student?._id || r.student?.id || r.student;
            existingResultsMap[studentId] = r;
          });
        }

        const merged = studentList.map((s) => {
          const existing = existingResultsMap[s._id || s.id];
          const marks = existing ? existing.marksObtained ?? '' : '';
          const grade = marks !== '' ? calculateGrade(Number(marks), maxMarks) : '';
          return {
            id: s._id || s.id,
            name: s.name,
            rollNo: s.rollNo || s.rollNumber || s.admissionNo || '',
            marks,
            total: maxMarks,
            grade,
          };
        });

        setStudents(merged);
      } catch (err) {
        setError('Failed to load students or results');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedExam, selectedClass, selectedSection, selectedSubject, maxMarks]);

  useEffect(() => {
    if (!selectedExam || !selectedClass || !selectedSection || !selectedSubject) return;

    const loadPrevious = async () => {
      try {
        const res = await getResults({
          examName: selectedExam,
          class: selectedClass,
          section: selectedSection,
          subject: selectedSubject,
        });
        const data = res.data?.data?.results || res.data?.results || res.data?.data || [];
        setPreviousMarks(Array.isArray(data) ? data : []);
      } catch {
        setPreviousMarks([]);
      }
    };
    loadPrevious();
  }, [selectedExam, selectedClass, selectedSection, selectedSubject]);

  const updateMarks = (id, value) => {
    const marks = value === '' ? '' : Math.min(parseFloat(value) || 0, maxMarks);
    const grade = marks !== '' ? calculateGrade(marks, maxMarks) : '';
    setStudents(
      students.map((s) => (s.id === id ? { ...s, marks, grade } : s))
    );
  };

  const handleSave = async () => {
    setSubmitting(true);
    setError('');
    setSuccessMsg('');
    try {
      const results = students.map((s) => ({
        student: s.id,
        examName: selectedExam,
        class: selectedClass,
        section: selectedSection,
        subject: selectedSubject,
        marksObtained: Number(s.marks),
        maxMarks: maxMarks,
        examDate: new Date().toISOString().split('T')[0],
        term: selectedExam,
      }));

      await bulkCreateResults({ results });
      setSaved(true);
      setSuccessMsg('Marks saved successfully');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save marks');
    } finally {
      setSubmitting(false);
    }
  };

  const allEntered = students.length > 0 && students.every((s) => s.marks !== '');

  const selectedExamObj = exams.find(
    (e) => (e._id || e.id || e.name) === selectedExam
  );
  const getExamName = (val) => {
    const e = exams.find((x) => (x._id || x.id || x.name) === val);
    return e?.name || e?.examName || val;
  };

  const performanceStats = useMemo(() => {
    const withMarks = students.filter((s) => s.marks !== '');
    if (withMarks.length === 0) return null;
    const marksArr = withMarks.map((s) => Number(s.marks));
    const avg = marksArr.reduce((a, b) => a + b, 0) / marksArr.length;
    const highest = Math.max(...marksArr);
    const lowest = Math.min(...marksArr);
    const passCount = withMarks.filter((s) => (Number(s.marks) / maxMarks) * 100 >= 33).length;
    return { avg: avg.toFixed(1), highest, lowest, passCount, total: withMarks.length };
  }, [students, maxMarks]);

  if (loading && classes.length === 0) {
    return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
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
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Marks Entry</h1>
          <p className="text-gray-500 mt-1">Enter and manage student marks</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {successMsg}
          </div>
        )}

        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
              >
                <option value="">Select Exam</option>
                {exams.map((exam) => {
                  const val = exam._id || exam.id || exam.name;
                  const label = exam.name || exam.examName;
                  return (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  );
                })}
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
                {classes.map((cls) => {
                  const val = cls?._id || cls?.id || cls?.name || cls;
                  const label = cls?.name || cls;
                  return (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  );
                })}
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
                {sections.map((sec) => {
                  const val = sec?._id || sec?.id || sec?.name || sec;
                  const label = sec?.name || sec;
                  return (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  );
                })}
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
                {subjects.map((sub) => {
                  const val = sub?._id || sub?.id || sub?.name || sub;
                  const label = sub?.name || sub;
                  return (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Marks</label>
              <input
                type="number"
                min="1"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </Card>

        {selectedExam && selectedClass && selectedSection && selectedSubject && (
          <Card>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-heading font-semibold text-gray-800">
                  Student Marks - {getExamName(selectedExam)}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {saved && (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <HiOutlineCheckCircle className="w-4 h-4" />
                      Saved
                    </span>
                  )}
                  <Button
                    variant="primary"
                    iconLeft={<HiOutlineSave className="w-4 h-4" />}
                    onClick={handleSave}
                    disabled={!allEntered || submitting}
                  >
                    {submitting ? 'Saving...' : 'Save Marks'}
                  </Button>
                </div>
              </div>

            {loading && students.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">Loading students...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">No students found for this selection.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">#</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Roll No</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Student Name</th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Marks (out of {maxMarks})</th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Percentage</th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => {
                      const percentage = student.marks !== '' ? ((student.marks / maxMarks) * 100).toFixed(1) : '-';
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
                              max={maxMarks}
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
            )}
          </Card>
        )}

        {performanceStats && (
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineChartBar className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-heading font-semibold text-gray-800">Student Performance</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{performanceStats.avg}</p>
                <p className="text-xs text-blue-600 mt-1">Average Marks</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-700">{performanceStats.highest}</p>
                <p className="text-xs text-green-600 mt-1">Highest Marks</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-700">{performanceStats.lowest}</p>
                <p className="text-xs text-orange-600 mt-1">Lowest Marks</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-700">{performanceStats.passCount}/{performanceStats.total}</p>
                <p className="text-xs text-purple-600 mt-1">Pass Count</p>
              </div>
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
                {previousMarks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-sm text-gray-400">
                      No previous marks found.
                    </td>
                  </tr>
                ) : (
                  previousMarks.map((record, idx) => (
                    <tr key={record._id || idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 text-sm font-medium text-gray-800">
                        {record.examName || record.exam}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600">{record.class}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{record.subject}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">
                        {formatDate(record.examDate || record.date)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
  );
};

export default MarksEntry;
