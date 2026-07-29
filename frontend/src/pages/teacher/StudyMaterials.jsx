import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineUpload,
  HiOutlineTrash,
  HiOutlineDocumentText,
  HiOutlineVideoCamera,
  HiOutlineLink,
  HiOutlineBookOpen,
  HiOutlineDownload,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineRefresh,
  HiOutlineFilter,
  HiOutlineX,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/common/EmptyState';
import {
  getStudyMaterials,
  createStudyMaterial,
  deleteStudyMaterial,
  getTeacherProfile,
} from '../../services/teacherService';

const typeIcons = {
  Notes: HiOutlineDocumentText,
  PPT: HiOutlineDocumentText,
  Video: HiOutlineVideoCamera,
  Reference: HiOutlineLink,
  Worksheet: HiOutlineDocumentText,
};

const typeColors = {
  Notes: 'bg-blue-50 text-blue-600',
  PPT: 'bg-purple-50 text-purple-600',
  Video: 'bg-red-50 text-red-600',
  Reference: 'bg-green-50 text-green-600',
  Worksheet: 'bg-orange-50 text-orange-600',
};

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [submitting, setSubmitting] = useState(false);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [filterClass, setFilterClass] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: '',
    type: 'Notes',
    class: '',
    subject: '',
    description: '',
    file: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const params = {};
      if (filterClass) params.class = filterClass;
      if (filterSubject) params.subject = filterSubject;
      const res = await getStudyMaterials(params);
      setMaterials(res.data?.data?.materials || []);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load study materials';
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeacherProfile()
      .then((res) => {
        const p = res.data?.data?.teacher || res.data?.teacher || {};
        setTeacherProfile(p);
        if (p.classes?.length > 0 && !filterClass) setFilterClass(p.classes[0]._id || p.classes[0]);
        if (p.subjects?.length > 0 && !filterSubject) setFilterSubject(p.subjects[0]._id || p.subjects[0]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [filterClass, filterSubject]);

  const validateForm = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.type) errs.type = 'Type is required';
    if (!form.class) errs.class = 'Class is required';
    if (!form.subject) errs.subject = 'Subject is required';
    if (!form.file && !form.fileUrl) errs.file = 'File is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, file });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('type', form.type);
      formData.append('class', form.class);
      formData.append('subject', form.subject);
      formData.append('description', form.description);
      if (form.file) formData.append('file', form.file);

      await createStudyMaterial(formData);
      toast.success('Study material uploaded successfully');
      setShowModal(false);
      setForm({ title: '', type: 'Notes', class: filterClass || '', subject: filterSubject || '', description: '', file: null });
      setFormErrors({});
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchMaterials();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to upload material');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      await deleteStudyMaterial(id);
      toast.success('Material deleted');
      fetchMaterials();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete material');
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return '#';
    if (filePath.startsWith('http')) return filePath;
    return `/${filePath.replace(/\\/g, '/')}`;
  };

  const getTypeIcon = (type) => typeIcons[type] || HiOutlineDocumentText;

  const classes = teacherProfile?.classes || [];
  const subjects = teacherProfile?.subjects || [];

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Study Materials</h1>
            <p className="text-gray-500 mt-1">Upload and manage learning resources</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowModal(true)}>
            Upload Material
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Classes</option>
              {classes.map((c) => {
                const val = c._id || c.id || c.name || c;
                const label = c.name || c;
                return <option key={val} value={val}>{label}</option>;
              })}
            </select>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => {
                const val = s._id || s.id || s.name || s;
                const label = s.name || s;
                return <option key={val} value={val}>{label}</option>;
              })}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{materials.length} materials</p>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={classNames(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={classNames(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <HiOutlineBookOpen className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-gray-700 mb-2">Failed to load materials</h3>
            <p className="text-gray-500 text-center max-w-sm mb-6">{loadError}</p>
            <Button onClick={fetchMaterials} variant="primary">
              <HiOutlineRefresh className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : materials.length === 0 ? (
          <Card>
            <EmptyState
              icon={<HiOutlineUpload className="w-12 h-12" />}
              title="No materials uploaded"
              description={filterClass || filterSubject ? 'No materials match your filter criteria.' : 'Upload your first study material to get started.'}
              action={
                <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowModal(true)}>
                  Upload Material
                </Button>
              }
            />
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material, idx) => {
              const Icon = getTypeIcon(material.type);
              const type = material.type || 'Notes';
              const subjectName = material.subject?.name || material.subject || '';
              const className = material.class?.name || material.class || '';
              const sectionName = material.section?.name || '';
              return (
                <motion.div
                  key={material._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center', typeColors[type] || 'bg-gray-50 text-gray-600')}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={type === 'Reference' ? 'info' : 'default'} size="sm">{type}</Badge>
                  </div>
                  <h3 className="text-base font-heading font-semibold text-gray-800 line-clamp-1">{material.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{material.description}</p>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs text-gray-500">{className}{sectionName ? ` - ${sectionName}` : ''}</span>
                    {subjectName && (
                      <>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-xs text-gray-500">{subjectName}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{formatDate(material.createdAt || material.uploadedAt)}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {material.file && (
                        <a
                          href={getFileUrl(material.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <HiOutlineDownload className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(material._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {materials.map((material, idx) => {
              const Icon = getTypeIcon(material.type);
              const type = material.type || 'Notes';
              const subjectName = material.subject?.name || material.subject || '';
              const className = material.class?.name || material.class || '';
              return (
                <motion.div
                  key={material._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', typeColors[type] || 'bg-gray-50 text-gray-600')}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{material.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{className} - {subjectName}</p>
                  </div>
                  <div className="hidden sm:block">
                    <Badge variant={type === 'Reference' ? 'info' : 'default'} size="sm">{type}</Badge>
                  </div>
                  <span className="text-xs text-gray-400 hidden md:block">{formatDate(material.createdAt || material.uploadedAt)}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {material.file && (
                      <a
                        href={getFileUrl(material.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <HiOutlineDownload className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(material._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <Modal isOpen={showModal} onClose={() => { setShowModal(false); setFormErrors({}); }} title="Upload Study Material" size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={classNames(
                  'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm',
                  formErrors.title ? 'border-red-300' : 'border-gray-300'
                )}
                placeholder="Enter material title"
              />
              {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={classNames(
                    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm',
                    formErrors.type ? 'border-red-300' : 'border-gray-300'
                  )}
                >
                  <option value="Notes">Notes</option>
                  <option value="PPT">PPT</option>
                  <option value="Video">Video</option>
                  <option value="Reference">Reference</option>
                  <option value="Worksheet">Worksheet</option>
                </select>
                {formErrors.type && <p className="text-xs text-red-500 mt-1">{formErrors.type}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class *</label>
                <select
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className={classNames(
                    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm',
                    formErrors.class ? 'border-red-300' : 'border-gray-300'
                  )}
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => {
                    const val = c._id || c.id || c.name || c;
                    const label = c.name || c;
                    return <option key={val} value={val}>{label}</option>;
                  })}
                </select>
                {formErrors.class && <p className="text-xs text-red-500 mt-1">{formErrors.class}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={classNames(
                    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm',
                    formErrors.subject ? 'border-red-300' : 'border-gray-300'
                  )}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((s) => {
                    const val = s._id || s.id || s.name || s;
                    const label = s.name || s;
                    return <option key={val} value={val}>{label}</option>;
                  })}
                </select>
                {formErrors.subject && <p className="text-xs text-red-500 mt-1">{formErrors.subject}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">File *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
              >
                {form.file ? (
                  <div className="flex items-center justify-center gap-2">
                    <HiOutlineDocumentText className="w-6 h-6 text-primary-500" />
                    <span className="text-sm text-gray-700">{form.file.name}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setForm({ ...form, file: null }); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <HiOutlineX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <HiOutlineUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, PPT, PPTX, MP4 (Max 50MB)</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.png,.jpg,.jpeg"
              />
              {formErrors.file && <p className="text-xs text-red-500 mt-1">{formErrors.file}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => { setShowModal(false); setFormErrors({}); }}>Cancel</Button>
              <Button variant="primary" iconLeft={<HiOutlineUpload className="w-4 h-4" />} onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Uploading...' : 'Upload Material'}
              </Button>
            </div>
          </div>
        </Modal>
      </motion.div>
  );
};

export default StudyMaterials;