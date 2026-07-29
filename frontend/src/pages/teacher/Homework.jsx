import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePaperClip,
  HiOutlineSearch,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { getHomework, createHomework, updateHomework, deleteHomework, getTeacherProfile } from '../../services/teacherService';

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
  return errs;
};

const Homework = () => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    section: '',
    dueDate: '',
    file: null,
  });

  const fetchHomework = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await getHomework({ page, limit: 10 });
      const data = res.data?.data || res.data || {};
      setHomeworkList(data.homework || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch {
      setLoadError('Failed to load homework. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page]);

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
    fetchHomework();
    fetchProfile();
  }, [fetchHomework, fetchProfile]);

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
    setForm({ title: '', description: '', subject: '', class: '', section: '', dueDate: '', file: null });
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (hw) => {
    setEditing(hw._id);
    setForm({
      title: hw.title,
      description: hw.description,
      subject: hw.subject?._id || '',
      class: hw.class?._id || '',
      section: hw.section?._id || '',
      dueDate: hw.dueDate ? hw.dueDate.slice(0, 10) : '',
      file: null,
    });
    setErrors({});
    setShowModal(true);
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
      if (form.file) {
        payload.append('file', form.file);
      }

      if (editing) {
        await updateHomework(editing, payload);
        toast.success('Homework updated successfully');
      } else {
        await createHomework(payload);
        toast.success('Homework created successfully');
      }
      setShowModal(false);
      await fetchHomework();
    } catch {
      toast.error(editing ? 'Failed to update homework' : 'Failed to create homework');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHomework(id);
      toast.success('Homework deleted successfully');
      await fetchHomework();
    } catch {
      toast.error('Failed to delete homework');
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

  const searchedHomework = homeworkList.filter((h) =>
    (h.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeHomework = searchedHomework.filter((h) => isActive(h.dueDate));
  const expiredHomework = searchedHomework.filter((h) => !isActive(h.dueDate));

  const fieldError = (name) => errors[name] ? errors[name] : null;

  const inputClass = (name) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
      errors[name] ? 'border-red-400' : 'border-gray-300'
    }`;

  const renderHomeworkCard = (hw, idx) => {
    const status = isActive(hw.dueDate) ? 'active' : 'expired';
    return (
      <motion.div
        key={hw._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={classNames(
              'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
              status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
            )}>
              <HiOutlineBookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-semibold text-gray-800">{hw.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{hw.description}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <HiOutlineBookOpen className="w-3.5 h-3.5" />
                  {hw.subject?.name || 'N/A'}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                  Due: {formatDate(hw.dueDate)}
                </span>
                <span className="text-xs text-gray-500">
                  {hw.class?.name || 'N/A'} {hw.section?.name ? `- ${hw.section.name}` : ''}
                </span>
                {hw.file && (
                  <a
                    href={hw.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                  >
                    <HiOutlinePaperClip className="w-3.5 h-3.5" />
                    Attachment
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant={status === 'active' ? 'success' : 'default'} size="sm">
              {status === 'active' ? 'Active' : 'Expired'}
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
            onClick={() => setDeleting(hw._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
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
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Homework</h1>
            <p className="text-gray-500 mt-1">Create and manage homework assignments</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={openCreate}>
            Add Homework
          </Button>
        </div>

        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 text-sm mt-3">Loading homework...</p>
          </div>
        ) : loadError ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-sm mb-4">{loadError}</p>
            <Button variant="secondary" size="sm" onClick={fetchHomework}>
              Retry
            </Button>
          </div>
        ) : (
          <>
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <HiChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <HiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Homework' : 'Add Homework'} size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={inputClass('title')}
                placeholder="Enter homework title"
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
                placeholder="Enter homework description"
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">File Attachment (optional)</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-primary-50 file:text-primary-700"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit} loading={submitting} disabled={submitting || !isFormValid}>
                {editing ? 'Update Homework' : 'Add Homework'}
              </Button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Delete Homework" size="sm">
          <p className="text-gray-600 text-sm">Are you sure you want to delete this homework? This action cannot be undone.</p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(deleting)}>Delete</Button>
          </div>
        </Modal>
      </motion.div>
  );
};

export default Homework;
