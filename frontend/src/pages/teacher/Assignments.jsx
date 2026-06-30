import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlinePaperClip,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

const initialAssignments = [
  {
    id: 1,
    title: 'Newton\'s Laws Problem Set',
    subject: 'Physics',
    class: '10-A',
    dueDate: '2026-07-05',
    description: 'Solve 10 problems from Chapter 3: Newton\'s Laws of Motion.',
    submissions: 38,
    totalStudents: 42,
    status: 'active',
  },
  {
    id: 2,
    title: 'Optics Lab Report',
    subject: 'Physics',
    class: '12-B',
    dueDate: '2026-07-08',
    description: 'Write a lab report on the refraction experiment conducted in class.',
    submissions: 30,
    totalStudents: 38,
    status: 'active',
  },
  {
    id: 3,
    title: 'Thermodynamics Assignment',
    subject: 'Physics',
    class: '11-A',
    dueDate: '2026-06-25',
    description: 'Complete the problem set on thermodynamics from Chapter 5.',
    submissions: 45,
    totalStudents: 45,
    status: 'expired',
  },
  {
    id: 4,
    title: 'Electricity Worksheet',
    subject: 'Science',
    class: '9-C',
    dueDate: '2026-07-02',
    description: 'Fill in the blanks and solve numerical problems on electricity.',
    submissions: 35,
    totalStudents: 40,
    status: 'active',
  },
];

const Assignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    subject: '',
    class: '',
    dueDate: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', subject: '', class: '', dueDate: '', description: '' });
    setShowModal(true);
  };

  const openEdit = (assignment) => {
    setEditing(assignment.id);
    setForm({
      title: assignment.title,
      subject: assignment.subject,
      class: assignment.class,
      dueDate: assignment.dueDate,
      description: assignment.description,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editing) {
      setAssignments(
        assignments.map((a) =>
          a.id === editing ? { ...a, ...form } : a
        )
      );
    } else {
      setAssignments([
        ...assignments,
        { ...form, id: Date.now(), submissions: 0, totalStudents: 0, status: 'active' },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <PortalLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Assignments</h1>
            <p className="text-gray-500 mt-1">Create and manage assignments</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={openCreate}>
            Create Assignment
          </Button>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment, idx) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                    <HiOutlineDocumentText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-gray-800">{assignment.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <HiOutlinePencilAlt className="w-3.5 h-3.5" />
                        {assignment.subject}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <HiOutlineCalendar className="w-3.5 h-3.5" />
                        Due: {formatDate(assignment.dueDate)}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <HiOutlineUserGroup className="w-3.5 h-3.5" />
                        {assignment.class}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={assignment.status === 'active' ? 'success' : 'default'}>
                    {assignment.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Submissions:</span>
                  <span className="font-medium text-gray-800">
                    {assignment.submissions}/{assignment.totalStudents}
                  </span>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden ml-2">
                    <div
                      className={classNames(
                        'h-full rounded-full',
                        assignment.submissions === assignment.totalStudents
                          ? 'bg-green-500'
                          : assignment.submissions > 0
                          ? 'bg-primary-500'
                          : 'bg-gray-200'
                      )}
                      style={{
                        width: `${assignment.totalStudents > 0
                          ? (assignment.submissions / assignment.totalStudents) * 100
                          : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(assignment)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <HiOutlinePencilAlt className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Assignment' : 'Create Assignment'} size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder="Enter assignment title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                placeholder="Enter assignment description"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="">Select Class</option>
                  <option value="9-A">9-A</option>
                  <option value="9-B">9-B</option>
                  <option value="10-A">10-A</option>
                  <option value="10-B">10-B</option>
                  <option value="11-A">11-A</option>
                  <option value="12-B">12-B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Attach File (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                <HiOutlinePaperClip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>
                {editing ? 'Update Assignment' : 'Create Assignment'}
              </Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </PortalLayout>
  );
};

export default Assignments;
