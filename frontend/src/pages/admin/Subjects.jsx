import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen } from 'react-icons/hi';
import ActionBar from '../../components/portal/ActionBar';
import DataTable from '../../components/portal/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const initialSubjects = [
  { id: 1, name: 'Mathematics', code: 'MAT-10', class: '10', teacher: 'Mrs. Sunita Sharma' },
  { id: 2, name: 'Physics', code: 'PHY-11', class: '11', teacher: 'Dr. Rajesh Kumar' },
  { id: 3, name: 'English', code: 'ENG-10', class: '10', teacher: 'Mr. Amit Singh' },
  { id: 4, name: 'Chemistry', code: 'CHM-11', class: '11', teacher: 'Dr. Rajesh Kumar' },
  { id: 5, name: 'Hindi', code: 'HIN-09', class: '9', teacher: 'Mrs. Priya Gupta' },
];

const classes = ['6', '7', '8', '9', '10', '11', '12'];
const teachers = ['Dr. Rajesh Kumar', 'Mrs. Sunita Sharma', 'Mr. Amit Singh', 'Mrs. Priya Gupta', 'Mr. Vikram Singh'];

export default function Subjects() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', class: '', teacher: '' });

  const filtered = subjects.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
    const matchClass = !classFilter || s.class === classFilter;
    return matchSearch && matchClass;
  });

  const handleAdd = () => {
    setEditSubject(null);
    setForm({ name: '', code: '', class: '', teacher: '' });
    setModalOpen(true);
  };

  const handleEdit = (subject) => {
    setEditSubject(subject);
    setForm({ name: subject.name, code: subject.code, class: subject.class, teacher: subject.teacher });
    setModalOpen(true);
  };

  const handleDelete = (subject) => {
    if (window.confirm(`Delete subject ${subject.name}?`)) setSubjects(subjects.filter((s) => s.id !== subject.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editSubject) {
      setSubjects(subjects.map((s) => s.id === editSubject.id ? { ...s, ...form } : s));
    } else {
      setSubjects([...subjects, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'class', label: 'Class' },
    { key: 'teacher', label: 'Teacher' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineBookOpen className="w-7 h-7 text-primary-500" />
          Subject Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage subjects and teacher assignments</p>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or code..."
        filters={[
          { key: 'class', value: classFilter, options: [{ value: '', label: 'All Classes' }, ...classes.map((c) => ({ value: c, label: `Class ${c}` }))], onChange: setClassFilter },
        ]}
        onAdd={handleAdd}
        addLabel="Add Subject"
      />

      <DataTable columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editSubject ? 'Edit Subject' : 'Add New Subject'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
              <input type="text" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Class</option>
                {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
              <select required value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Teacher</option>
                {teachers.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editSubject ? 'Update' : 'Add'} Subject</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
