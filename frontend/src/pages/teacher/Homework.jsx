import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

const initialHomework = [
  {
    id: 1,
    title: 'Complete Exercise 5.2',
    subject: 'Physics',
    class: '10-A',
    dueDate: '2026-07-02',
    description: 'Solve questions 1-10 from Exercise 5.2',
    status: 'active',
  },
  {
    id: 2,
    title: 'Write chemical equations',
    subject: 'Science',
    class: '9-C',
    dueDate: '2026-07-01',
    description: 'Write balanced chemical equations for 20 reactions',
    status: 'active',
  },
  {
    id: 3,
    title: 'Derive lens formula',
    subject: 'Physics',
    class: '12-B',
    dueDate: '2026-06-28',
    description: 'Derive the lens maker formula with proper steps',
    status: 'expired',
  },
  {
    id: 4,
    title: 'Numerical problems on motion',
    subject: 'Physics',
    class: '11-A',
    dueDate: '2026-06-25',
    description: 'Solve 15 numerical problems from Chapter 4',
    status: 'expired',
  },
];

const Homework = () => {
  const [homeworkList, setHomeworkList] = useState(initialHomework);
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

  const openEdit = (hw) => {
    setEditing(hw.id);
    setForm({
      title: hw.title,
      subject: hw.subject,
      class: hw.class,
      dueDate: hw.dueDate,
      description: hw.description,
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editing) {
      setHomeworkList(
        homeworkList.map((h) =>
          h.id === editing ? { ...h, ...form } : h
        )
      );
    } else {
      setHomeworkList([
        ...homeworkList,
        { ...form, id: Date.now(), status: 'active' },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setHomeworkList(homeworkList.filter((h) => h.id !== id));
  };

  const activeHomework = homeworkList.filter((h) => h.status === 'active');
  const expiredHomework = homeworkList.filter((h) => h.status === 'expired');

  const renderHomeworkCard = (hw, idx) => (
    <motion.div
      key={hw.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={classNames(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            hw.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
          )}>
            <HiOutlineBookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-heading font-semibold text-gray-800">{hw.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{hw.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <HiOutlineBookOpen className="w-3.5 h-3.5" />
                {hw.subject}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <HiOutlineCalendar className="w-3.5 h-3.5" />
                Due: {formatDate(hw.dueDate)}
              </span>
              <span className="text-xs text-gray-500">{hw.class}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant={hw.status === 'active' ? 'success' : 'default'} size="sm">
            {hw.status === 'active' ? 'Active' : 'Expired'}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => openEdit(hw)}
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          title="Edit"
        >
          <HiOutlinePencilAlt className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(hw.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <HiOutlineTrash className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

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
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Homework</h1>
            <p className="text-gray-500 mt-1">Create and manage homework assignments</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={openCreate}>
            Add Homework
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-heading font-semibold text-gray-800">Active ({activeHomework.length})</h2>
          </div>
          {activeHomework.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">No active homework.</p>
          ) : (
            <div className="space-y-3">
              {activeHomework.map((hw, idx) => renderHomeworkCard(hw, idx))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineClock className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-heading font-semibold text-gray-800">Expired ({expiredHomework.length})</h2>
          </div>
          {expiredHomework.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">No expired homework.</p>
          ) : (
            <div className="space-y-3">
              {expiredHomework.map((hw, idx) => renderHomeworkCard(hw, idx))}
            </div>
          )}
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Homework' : 'Add Homework'} size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder="Enter homework title"
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
                placeholder="Enter homework description"
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
                  <option value="">Select</option>
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
                  <option value="">Select</option>
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
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>
                {editing ? 'Update Homework' : 'Add Homework'}
              </Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </PortalLayout>
  );
};

export default Homework;
