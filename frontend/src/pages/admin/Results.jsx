import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineClipboardCheck,
  HiOutlineCheckCircle,
  HiOutlineEye,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const exams = ['Term 1 Exams', 'Mid Term Exams', 'Final Exams'];
const classes = ['6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C'];

const initialResults = [
  { id: 1, studentName: 'Aarav Sharma', rollNo: '01', marks: { Mathematics: 85, Science: 78, English: 92 }, total: 255, percentage: 85, status: 'draft' },
  { id: 2, studentName: 'Priya Patel', rollNo: '02', marks: { Mathematics: 92, Science: 88, English: 95 }, total: 275, percentage: 91.7, status: 'draft' },
  { id: 3, studentName: 'Rohan Verma', rollNo: '03', marks: { Mathematics: 65, Science: 72, English: 78 }, total: 215, percentage: 71.7, status: 'draft' },
  { id: 4, studentName: 'Sneha Gupta', rollNo: '04', marks: { Mathematics: 78, Science: 82, English: 88 }, total: 248, percentage: 82.7, status: 'draft' },
];

const publishedResults = [
  { id: 5, exam: 'Term 1 Exams', class: '10', section: 'A', publishedAt: '2026-06-15', status: 'published' },
  { id: 6, exam: 'Final Exams', class: '12', section: 'A', publishedAt: '2026-03-20', status: 'published' },
];

const subjects = ['Mathematics', 'Science', 'English'];

export default function Results() {
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [results, setResults] = useState(initialResults);
  const [published, setPublished] = useState(publishedResults);
  const [editingMarks, setEditingMarks] = useState({});

  const handleMarksChange = (studentId, subject, value) => {
    setEditingMarks({ ...editingMarks, [`${studentId}-${subject}`]: value });
  };

  const saveMarks = (studentId) => {
    setResults(results.map((r) => {
      if (r.id !== studentId) return r;
      const newMarks = { ...r.marks };
      subjects.forEach((sub) => {
        const key = `${studentId}-${sub}`;
        if (editingMarks[key] !== undefined) {
          newMarks[sub] = Number(editingMarks[key]);
        }
      });
      const total = Object.values(newMarks).reduce((a, b) => a + b, 0);
      return { ...r, marks: newMarks, total, percentage: Math.round((total / (subjects.length * 100)) * 100 * 10) / 10 };
    }));
  };

  const publishResults = () => {
    setResults(results.map((r) => ({ ...r, status: 'published' })));
    setPublished([...published, { id: Date.now(), exam: selectedExam, class: selectedClass, section: selectedSection, publishedAt: new Date().toISOString().split('T')[0], status: 'published' }]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineClipboardCheck className="w-7 h-7 text-primary-500" />
          Results Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Enter and publish exam results</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Exam</label>
            <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">{exams.map((e) => <option key={e} value={e}>{e}</option>)}</select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">{classes.map((c) => <option key={c} value={c}>Class {c}</option>)}</select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Section</label>
            <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">{sections.map((s) => <option key={s} value={s}>Section {s}</option>)}</select>
          </div>
          <div className="flex-1" />
          <Button variant="primary" iconLeft={<HiOutlineCheckCircle className="w-4 h-4" />} onClick={publishResults}>Publish Results</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Roll</th>
                {subjects.map((sub) => (
                  <th key={sub} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{sub}</th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">%</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{r.studentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.rollNo}</td>
                  {subjects.map((sub) => (
                    <td key={sub} className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingMarks[`${r.id}-${sub}`] ?? r.marks[sub] ?? ''}
                        onChange={(e) => handleMarksChange(r.id, sub, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{r.total}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.percentage}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', r.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => saveMarks(r.id)} className="text-xs text-primary-600 hover:text-primary-700 font-medium">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Published Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Exam</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Section</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Published On</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {published.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{r.exam}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.class}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.section}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{r.publishedAt}</td>
                  <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">{r.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 text-gray-400 hover:text-primary-600"><HiOutlineEye className="w-4 h-4" /></button>
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
