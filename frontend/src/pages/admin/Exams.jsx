import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineChartBar,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCalendar,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { classNames, formatDate } from '../../utils/helpers';

const initialExams = [
  { id: 1, name: 'Term 1 Exams', term: 'Term 1', class: '10', date: '2026-09-15', status: 'upcoming', subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'] },
  { id: 2, name: 'Mid Term Exams', term: 'Mid Term', class: '9', date: '2026-08-01', status: 'upcoming', subjects: ['Mathematics', 'Science', 'English'] },
  { id: 3, name: 'Final Exams', term: 'Term 2', class: '12', date: '2026-03-01', status: 'completed', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'] },
];

const classes = ['6', '7', '8', '9', '10', '11', '12'];
const subjectsList = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education'];
const terms = ['Term 1', 'Term 2', 'Mid Term', 'Pre-Board'];

const scheduleSlots = [
  { day: 'Monday', subject: 'Mathematics', date: '2026-09-15', time: '9:00 AM - 11:00 AM', room: '101' },
  { day: 'Tuesday', subject: 'Science', date: '2026-09-16', time: '9:00 AM - 11:00 AM', room: '102' },
  { day: 'Wednesday', subject: 'English', date: '2026-09-17', time: '9:00 AM - 11:00 AM', room: '103' },
];

export default function Exams() {
  const [exams, setExams] = useState(initialExams);
  const [examModal, setExamModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [form, setForm] = useState({ name: '', term: '', class: '', date: '', subjects: [] });
  const [scheduleForm, setScheduleForm] = useState({ subject: '', date: '', time: '', room: '' });

  const handleAddExam = () => {
    setSelectedExam(null);
    setForm({ name: '', term: '', class: '', date: '', subjects: [] });
    setExamModal(true);
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setForm({ name: exam.name, term: exam.term, class: exam.class, date: exam.date, subjects: exam.subjects });
    setExamModal(true);
  };

  const handleDeleteExam = (exam) => {
    if (window.confirm(`Delete exam ${exam.name}?`)) setExams(exams.filter((e) => e.id !== exam.id));
  };

  const handleSubmitExam = (e) => {
    e.preventDefault();
    if (selectedExam) {
      setExams(exams.map((ex) => ex.id === selectedExam.id ? { ...ex, ...form } : ex));
    } else {
      setExams([...exams, { id: Date.now(), ...form, status: 'upcoming' }]);
    }
    setExamModal(false);
  };

  const toggleSubject = (sub) => {
    setForm((f) => ({
      ...f,
      subjects: f.subjects.includes(sub) ? f.subjects.filter((s) => s !== sub) : [...f.subjects, sub],
    }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineChartBar className="w-7 h-7 text-primary-500" />
          Exam Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage exams</p>
      </div>

      <div className="flex justify-end gap-3 mb-6">
        <Button variant="outline" iconLeft={<HiOutlineCalendar className="w-4 h-4" />} onClick={() => setScheduleModal(true)}>Add Schedule</Button>
        <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={handleAddExam}>Create Exam</Button>
      </div>

      <div className="space-y-4">
        {exams.map((exam) => (
          <motion.div key={exam.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-heading font-semibold text-gray-800">{exam.name}</h3>
                  <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', exam.status === 'upcoming' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700')}>{exam.status}</span>
                </div>
                <p className="text-sm text-gray-500">Term: {exam.term} | Class: {exam.class} | Date: {formatDate(exam.date)}</p>
                <div className="flex items-center gap-2 mt-2">
                  {exam.subjects.map((sub) => (
                    <span key={sub} className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">{sub}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEditExam(exam)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><HiOutlinePencil className="w-4 h-4" /></button>
                <button onClick={() => handleDeleteExam(exam)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><HiOutlineTrash className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mt-6">
        <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Exam Schedule</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Day</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scheduleSlots.map((slot, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{slot.day}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{slot.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(slot.date)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{slot.time}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{slot.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={examModal} onClose={() => setExamModal(false)} title={selectedExam ? 'Edit Exam' : 'Create Exam'} size="lg">
        <form onSubmit={handleSubmitExam} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
              <select required value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Term</option>
                {terms.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Class</option>
                {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
            <div className="flex flex-wrap gap-2">
              {subjectsList.map((sub) => (
                <button key={sub} type="button" onClick={() => toggleSubject(sub)} className={classNames('px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors', form.subjects.includes(sub) ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300')}>
                  {sub}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setExamModal(false)}>Cancel</Button>
            <Button type="submit">{selectedExam ? 'Update' : 'Create'} Exam</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={scheduleModal} onClose={() => setScheduleModal(false)} title="Add Schedule Slot">
        <form onSubmit={(e) => { e.preventDefault(); setScheduleModal(false); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select required value={scheduleForm.subject} onChange={(e) => setScheduleForm({ ...scheduleForm, subject: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select</option>
                {subjectsList.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={scheduleForm.date} onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="text" required value={scheduleForm.time} onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })} placeholder="9:00 AM - 11:00 AM" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
              <input type="text" required value={scheduleForm.room} onChange={(e) => setScheduleForm({ ...scheduleForm, room: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setScheduleModal(false)}>Cancel</Button>
            <Button type="submit">Add Schedule</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
