import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlinePaperClip,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineUser,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { getAssignments, createAssignment, updateAssignment, deleteAssignment, getTeacherProfile } from '../../services/teacherService';

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const validate = (formData) => {
  const errs = {};
  if (!formData.title.trim()) errs.title = 'Title is required';
  if (!formData.description.trim()) errs.description = 'Description is required';
  if (!formData.subject) errs.subject = 'Subject is required';
  if (!formData.class) errs.class = 'Class is required';
  if (!formData.dueDate) {
    errs.dueDate = 'Due date is required';
  } else {
    const d = new Date(formData.dueDate);
    d.setHours(0, 0, 0, 0);
    if (d < TODAY) errs.dueDate = 'Due date must be in the future';
  }
  if (formData.maxMarks !== '' && (isNaN(Number(formData.maxMarks)) || Number(formData.maxMarks) <= 0)) {
    errs.maxMarks = 'Max marks must be a positive number';
  }
  return errs;
};



const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    section: '',
    dueDate: '',
    maxMarks: '',
    file: null,
  });

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await getAssignments();
      const data = res.data?.data || res.data || {};
      setAssignments(data.assignments || []);
    } catch {
      setLoadError('Failed to load assignments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await getTeacherProfile();
      const data = res.data?.data?.teacher || res.data?.teacher || {};
      setTeacherProfile(data);
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
    fetchProfile();
  }, [fetchAssignments, fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', description: '', subject: '', class: '', section: '', dueDate: '', maxMarks: '', file: null });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (assignment) => {
    setEditing(assignment._id);
    setForm({
      title: assignment.title,
      description: assignment.description,
      subject: assignment.subject?._id || '',
      class: assignment.class?._id || '',
      section: assignment.section?._id || '',
      dueDate: assignment.dueDate ? assignment.dueDate.slice(0, 10) : '',
      maxMarks: assignment.maxMarks || '',
      file: null,
    });
    setErrors({});
    setShowModal(true);
  };

  const openSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissions(true);
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('description', form.description);
      payload.append('subject', form.subject);
      payload.append('class', form.class);
      payload.append('section', form.section);
      payload.append('dueDate', form.dueDate);
      payload.append('maxMarks', form.maxMarks);
      if (form.file) {
        payload.append('file', form.file);
      }

      if (editing) {
        await updateAssignment(editing, payload);
        toast.success('Assignment updated successfully');
      } else {
        await createAssignment(payload);
        toast.success('Assignment created successfully');
      }
      setShowModal(false);
      await fetchAssignments();
    } catch {
      toast.error(editing ? 'Failed to update assignment' : 'Failed to create assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      toast.success('Assignment deleted successfully');
      await fetchAssignments();
    } catch {
      toast.error('Failed to delete assignment');
    } finally {
      setDeleting(null);
    }
  };

  const isActive = (dueDate) => {
    if (!dueDate) return false;
    const d = new Date(dueDate);
    d.setHours(0, 0, 0, 0);
    return d >= TODAY;
  };

  const activeAssignments = assignments.filter((a) => isActive(a.dueDate));
  const expiredAssignments = assignments.filter((a) => !isActive(a.dueDate));

  const fieldError = (name) => errors[name] ? errors[name] : null;

  const inputClass = (name) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
      errors[name] ? 'border-red-400' : 'border-gray-300'
    }`;

  const renderCard = (assignment, idx) => {
    const status = isActive(assignment.dueDate) ? 'active' : 'expired';
    const submissions = assignment.submissions ?? 0;
    const totalStudents = assignment.totalStudents ?? 0;
    return (
      <motion.div
        key={assignment._id}
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
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <HiOutlinePencilAlt className="w-3.5 h-3.5" />
                  {assignment.subject?.name || 'N/A'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                  Due: {formatDate(assignment.dueDate)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <HiOutlineUserGroup className="w-3.5 h-3.5" />
                  {assignment.class?.name || 'N/A'} {assignment.section?.name ? `- ${assignment.section.name}` : ''}
                </span>
                {assignment.maxMarks && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <HiOutlineStar className="w-3.5 h-3.5" />
                    Max: {assignment.maxMarks}
                  </span>
                )}
                {assignment.file && (
                  <a
                    href={assignment.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700"
                  >
                    <HiOutlinePaperClip className="w-3.5 h-3.5" />
                    Attachment
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={status === 'active' ? 'success' : 'default'}>
              {status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Submissions:</span>
            <span className="font-medium text-gray-800">
              {submissions}/{totalStudents}
            </span>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden ml-2">
              <div
                className={classNames(
                  'h-full rounded-full',
                  totalStudents > 0 && submissions === totalStudents
                    ? 'bg-green-500'
                    : submissions > 0
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
                )}
                style={{
                  width: `${totalStudents > 0 ? (submissions / totalStudents) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => openSubmissions(assignment)}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="View Submissions"
            >
              <HiOutlineEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => openEdit(assignment)}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Edit"
            >
              <HiOutlinePencilAlt className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleting(assignment._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const isFormValid = Object.keys(validate(form)).length === 0;

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Assignments</h1>
            <p className="text-gray-500 mt-1">Create and manage assignments</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={openCreate}>
            Create Assignment
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 text-sm mt-3">Loading assignments...</p>
          </div>
        ) : loadError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-sm mb-4">{loadError}</p>
            <Button variant="secondary" size="sm" onClick={fetchAssignments}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-heading font-semibold text-gray-800">Active ({activeAssignments.length})</h2>
              </div>
              {activeAssignments.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">No active assignments.</p>
              ) : (
                <div className="space-y-3">
                  {activeAssignments.map((a, idx) => renderCard(a, idx))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineClock className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-heading font-semibold text-gray-800">Expired ({expiredAssignments.length})</h2>
              </div>
              {expiredAssignments.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">No expired assignments.</p>
              ) : (
                <div className="space-y-3">
                  {expiredAssignments.map((a, idx) => renderCard(a, idx))}
                </div>
              )}
            </div>
          </>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Assignment' : 'Create Assignment'} size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={inputClass('title')}
                placeholder="Enter assignment title"
              />
              {fieldError('title') && <p className="text-red-500 text-xs mt-1">{fieldError('title')}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className={`${inputClass('description')} resize-none`}
                placeholder="Enter assignment description"
              />
              {fieldError('description') && <p className="text-red-500 text-xs mt-1">{fieldError('description')}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass('subject')}
                >
                  <option value="">Select</option>
                  {teacherProfile?.subjects?.map((sub) => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
                {fieldError('subject') && <p className="text-red-500 text-xs mt-1">{fieldError('subject')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className={inputClass('class')}
                >
                  <option value="">Select</option>
                  {teacherProfile?.classes?.map((cls) => (
                    <option key={cls._id} value={cls._id}>{cls.name}</option>
                  ))}
                </select>
                {fieldError('class') && <p className="text-red-500 text-xs mt-1">{fieldError('class')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Section</label>
                <select
                  name="section"
                  value={form.section}
                  onChange={handleChange}
                  className={inputClass('section')}
                >
                  <option value="">Select</option>
                  {teacherProfile?.sections?.map((sec) => (
                    <option key={sec._id} value={sec._id}>{sec.name}</option>
                  ))}
                </select>
                {fieldError('section') && <p className="text-red-500 text-xs mt-1">{fieldError('section')}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className={inputClass('dueDate')}
                />
                {fieldError('dueDate') && <p className="text-red-500 text-xs mt-1">{fieldError('dueDate')}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Marks</label>
                <input
                  type="number"
                  name="maxMarks"
                  value={form.maxMarks}
                  onChange={handleChange}
                  className={inputClass('maxMarks')}
                  placeholder="Enter max marks"
                />
                {fieldError('maxMarks') && <p className="text-red-500 text-xs mt-1">{fieldError('maxMarks')}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">File Attachment (optional)</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-primary-50 file:text-primary-700"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit} loading={submitting} disabled={submitting || !isFormValid}>
                {editing ? 'Update Assignment' : 'Create Assignment'}
              </Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Delete Assignment" size="sm">
          <p className="text-gray-600 text-sm">Are you sure you want to delete this assignment? This action cannot be undone.</p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(deleting)}>Delete</Button>
          </div>
        </Modal>

        <Modal isOpen={showSubmissions} onClose={() => setShowSubmissions(false)} title={`Submissions - ${selectedAssignment?.title || ''}`} size="md">
          <p className="text-gray-500 text-sm text-center py-8">Submissions feature coming soon</p>
        </Modal>
      </motion.div>
  );
};

export default Assignments;
