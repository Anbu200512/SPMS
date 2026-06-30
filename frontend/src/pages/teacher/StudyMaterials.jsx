import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/common/EmptyState';

const initialMaterials = [
  {
    id: 1,
    title: 'Newton\'s Laws - Chapter 3 Notes',
    type: 'PDF',
    class: '10-A',
    subject: 'Physics',
    description: 'Comprehensive notes covering Newton\'s three laws of motion with examples.',
    uploadedAt: '2026-06-28',
    fileSize: '2.4 MB',
  },
  {
    id: 2,
    title: 'Optics Lab Video Tutorial',
    type: 'Video',
    class: '12-B',
    subject: 'Physics',
    description: 'Step-by-step video guide for the refraction experiment.',
    uploadedAt: '2026-06-25',
    fileSize: '45 MB',
  },
  {
    id: 3,
    title: 'Thermodynamics Formula Sheet',
    type: 'PDF',
    class: '11-A',
    subject: 'Physics',
    description: 'Quick reference formula sheet for thermodynamics chapter.',
    uploadedAt: '2026-06-20',
    fileSize: '1.1 MB',
  },
  {
    id: 4,
    title: 'Electricity Interactive Simulation',
    type: 'Link',
    class: '9-C',
    subject: 'Science',
    description: 'Interactive online simulation for understanding electric circuits.',
    uploadedAt: '2026-06-18',
    fileSize: '-',
  },
];

const typeIcons = {
  PDF: HiOutlineDocumentText,
  Video: HiOutlineVideoCamera,
  Link: HiOutlineLink,
  Document: HiOutlineDocumentText,
};

const typeColors = {
  PDF: 'bg-red-50 text-red-600',
  Video: 'bg-purple-50 text-purple-600',
  Link: 'bg-blue-50 text-blue-600',
  Document: 'bg-green-50 text-green-600',
};

const StudyMaterials = () => {
  const [materials, setMaterials] = useState(initialMaterials);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [form, setForm] = useState({
    title: '',
    type: 'PDF',
    class: '',
    subject: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setMaterials([
      ...materials,
      {
        ...form,
        id: Date.now(),
        uploadedAt: new Date().toISOString().split('T')[0],
        fileSize: '-',
      },
    ]);
    setShowModal(false);
    setForm({ title: '', type: 'PDF', class: '', subject: '', description: '' });
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const getTypeIcon = (type) => {
    const Icon = typeIcons[type] || HiOutlineDocumentText;
    return Icon;
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
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">Study Materials</h1>
            <p className="text-gray-500 mt-1">Upload and manage learning resources</p>
          </div>
          <Button variant="primary" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowModal(true)}>
            Upload Material
          </Button>
        </div>

        <div className="flex items-center justify-between">
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

        {materials.length === 0 ? (
          <Card>
            <EmptyState
              icon={<HiOutlineUpload className="w-12 h-12" />}
              title="No materials uploaded"
              description="Upload your first study material to get started."
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
              return (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center', typeColors[material.type] || 'bg-gray-50 text-gray-600')}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={material.type === 'Link' ? 'info' : 'default'} size="sm">
                      {material.type}
                    </Badge>
                  </div>
                  <h3 className="text-base font-heading font-semibold text-gray-800 line-clamp-1">{material.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{material.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-gray-500">{material.class}</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-500">{material.subject}</span>
                    {material.fileSize && material.fileSize !== '-' && (
                      <>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-xs text-gray-500">{material.fileSize}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{formatDate(material.uploadedAt)}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {material.type !== 'Link' && (
                        <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Download">
                          <HiOutlineDownload className="w-4 h-4" />
                        </button>
                      )}
                      {material.type === 'Link' && (
                        <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Open">
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(material.id)}
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
              return (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className={classNames('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', typeColors[material.type] || 'bg-gray-50 text-gray-600')}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{material.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{material.class} - {material.subject}</p>
                  </div>
                  <div className="hidden sm:block">
                    <Badge variant={material.type === 'Link' ? 'info' : 'default'} size="sm">{material.type}</Badge>
                  </div>
                  <span className="text-xs text-gray-400 hidden md:block">{formatDate(material.uploadedAt)}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {material.type !== 'Link' && (
                      <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Download">
                        <HiOutlineDownload className="w-4 h-4" />
                      </button>
                    )}
                    {material.type === 'Link' && (
                      <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Open">
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(material.id)}
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Study Material" size="lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder="Enter material title"
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
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="PDF">PDF</option>
                  <option value="Document">Document</option>
                  <option value="Video">Video</option>
                  <option value="Link">Link</option>
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                <HiOutlineUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, MP4, or URL</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" iconLeft={<HiOutlineUpload className="w-4 h-4" />} onClick={handleSubmit}>
                Upload Material
              </Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </PortalLayout>
  );
};

export default StudyMaterials;
