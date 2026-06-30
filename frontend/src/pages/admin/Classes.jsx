import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineBookOpen,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineLink,
} from 'react-icons/hi';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const initialClasses = [
  { id: 1, name: 'Class 6', code: 'CLS-06', sections: ['A', 'B'] },
  { id: 2, name: 'Class 7', code: 'CLS-07', sections: ['A', 'B', 'C'] },
  { id: 3, name: 'Class 8', code: 'CLS-08', sections: ['A', 'B'] },
  { id: 4, name: 'Class 9', code: 'CLS-09', sections: ['A', 'B', 'C'] },
  { id: 5, name: 'Class 10', code: 'CLS-10', sections: ['A', 'B', 'C', 'D'] },
  { id: 6, name: 'Class 11', code: 'CLS-11', sections: ['A', 'B'] },
  { id: 7, name: 'Class 12', code: 'CLS-12', sections: ['A', 'B'] },
];

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editClass, setEditClass] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', sections: '' });

  const handleAdd = () => {
    setEditClass(null);
    setForm({ name: '', code: '', sections: '' });
    setModalOpen(true);
  };

  const handleEdit = (cls) => {
    setEditClass(cls);
    setForm({ name: cls.name, code: cls.code, sections: cls.sections.join(', ') });
    setModalOpen(true);
  };

  const handleDelete = (cls) => {
    setDeleteConfirm(cls);
  };

  const confirmDelete = () => {
    setClasses(classes.filter((c) => c.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sections = form.sections.split(',').map((s) => s.trim()).filter(Boolean);
    if (editClass) {
      setClasses(classes.map((c) => c.id === editClass.id ? { ...c, ...form, sections } : c));
    } else {
      setClasses([...classes, { id: Date.now(), ...form, sections }]);
    }
    setModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineBookOpen className="w-7 h-7 text-primary-500" />
          Class Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage classes and sections</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={handleAdd}>Add Class</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {classes.map((cls) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-heading font-semibold text-gray-800">{cls.name}</h3>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{cls.code}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">Sections:</span>
              {cls.sections.map((sec) => (
                <span key={sec} className="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">{sec}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
              <button onClick={() => handleEdit(cls)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <HiOutlinePencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => window.alert('Navigate to Sections page')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <HiOutlineLink className="w-3.5 h-3.5" /> Sections
              </button>
              <button onClick={() => handleDelete(cls)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto">
                <HiOutlineTrash className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editClass ? 'Edit Class' : 'Add New Class'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Code</label>
            <input type="text" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sections</label>
            <input type="text" required value={form.sections} onChange={(e) => setForm({ ...form, sections: e.target.value })} placeholder="A, B, C (comma separated)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editClass ? 'Update' : 'Add'} Class</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-600 text-sm mb-6">Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </motion.div>
  );
}
