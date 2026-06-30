import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import ActionBar from '../../components/portal/ActionBar';
import DataTable from '../../components/portal/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const initialSections = [
  { id: 1, name: 'A', class: '10', roomNo: '101', capacity: 40 },
  { id: 2, name: 'B', class: '10', roomNo: '102', capacity: 40 },
  { id: 3, name: 'C', class: '10', roomNo: '103', capacity: 38 },
  { id: 4, name: 'A', class: '9', roomNo: '201', capacity: 42 },
  { id: 5, name: 'B', class: '9', roomNo: '202', capacity: 40 },
  { id: 6, name: 'A', class: '8', roomNo: '301', capacity: 35 },
];

const classes = ['6', '7', '8', '9', '10', '11', '12'];

export default function Sections() {
  const [sections, setSections] = useState(initialSections);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [form, setForm] = useState({ name: '', class: '', roomNo: '', capacity: '' });

  const filtered = sections.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.roomNo.includes(search);
    const matchClass = !classFilter || s.class === classFilter;
    return matchSearch && matchClass;
  });

  const handleAdd = () => {
    setEditSection(null);
    setForm({ name: '', class: '', roomNo: '', capacity: '' });
    setModalOpen(true);
  };

  const handleEdit = (section) => {
    setEditSection(section);
    setForm({ name: section.name, class: section.class, roomNo: section.roomNo, capacity: String(section.capacity) });
    setModalOpen(true);
  };

  const handleDelete = (section) => {
    if (window.confirm(`Delete section ${section.class}-${section.name}?`)) setSections(sections.filter((s) => s.id !== section.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, capacity: Number(form.capacity) };
    if (editSection) {
      setSections(sections.map((s) => s.id === editSection.id ? { ...s, ...data } : s));
    } else {
      setSections([...sections, { id: Date.now(), ...data }]);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Section Name' },
    { key: 'class', label: 'Class' },
    { key: 'roomNo', label: 'Room No' },
    { key: 'capacity', label: 'Capacity' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineViewGridAdd className="w-7 h-7 text-primary-500" />
          Section Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage class sections and rooms</p>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search sections..."
        filters={[
          { key: 'class', value: classFilter, options: [{ value: '', label: 'All Classes' }, ...classes.map((c) => ({ value: c, label: `Class ${c}` }))], onChange: setClassFilter },
        ]}
        onAdd={handleAdd}
        addLabel="Add Section"
      />

      <DataTable columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editSection ? 'Edit Section' : 'Add New Section'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Class</option>
                {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
              <input type="text" required value={form.roomNo} onChange={(e) => setForm({ ...form, roomNo: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input type="number" required value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editSection ? 'Update' : 'Add'} Section</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
