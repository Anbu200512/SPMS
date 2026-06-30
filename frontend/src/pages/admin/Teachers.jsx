import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import ActionBar from '../../components/portal/ActionBar';
import DataTable from '../../components/portal/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const initialTeachers = [
  { id: 1, empId: 'TCH-001', name: 'Dr. Rajesh Kumar', qualification: 'PhD Physics', specialization: 'Physics', classes: '11, 12', subjects: 'Physics', phone: '9876543201', email: 'rajesh@school.com' },
  { id: 2, empId: 'TCH-002', name: 'Mrs. Sunita Sharma', qualification: 'M.Sc Mathematics', specialization: 'Mathematics', classes: '9, 10', subjects: 'Maths', phone: '9876543202', email: 'sunita@school.com' },
  { id: 3, empId: 'TCH-003', name: 'Mr. Amit Singh', qualification: 'M.A English', specialization: 'English Literature', classes: '10, 11, 12', subjects: 'English', phone: '9876543203', email: 'amit@school.com' },
];

const specializations = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Hindi', 'History', 'Geography', 'Computer Science', 'Physical Education'];

export default function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', qualification: '', specialization: '', classes: '', subjects: '' });

  const filtered = teachers.filter((t) => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.empId.toLowerCase().includes(search.toLowerCase());
    const matchSpec = !specFilter || t.specialization === specFilter;
    return matchSearch && matchSpec;
  });

  const handleAdd = () => {
    setEditTeacher(null);
    setForm({ name: '', email: '', phone: '', qualification: '', specialization: '', classes: '', subjects: '' });
    setModalOpen(true);
  };

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setForm({ name: teacher.name, email: teacher.email, phone: teacher.phone, qualification: teacher.qualification, specialization: teacher.specialization, classes: teacher.classes, subjects: teacher.subjects });
    setModalOpen(true);
  };

  const handleDelete = (teacher) => {
    if (window.confirm(`Delete teacher ${teacher.name}?`)) setTeachers(teachers.filter((t) => t.id !== teacher.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTeacher) {
      setTeachers(teachers.map((t) => t.id === editTeacher.id ? { ...t, ...form } : t));
    } else {
      setTeachers([...teachers, { id: Date.now(), empId: `TCH-${String(teachers.length + 1).padStart(3, '0')}`, ...form }]);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'empId', label: 'Employee ID' },
    { key: 'name', label: 'Name' },
    { key: 'qualification', label: 'Qualification' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'classes', label: 'Classes' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'phone', label: 'Phone' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineAcademicCap className="w-7 h-7 text-primary-500" />
          Teacher Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage teaching staff records</p>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or employee ID..."
        filters={[
          { key: 'specialization', value: specFilter, options: [{ value: '', label: 'All Specializations' }, ...specializations.map((s) => ({ value: s, label: s }))], onChange: setSpecFilter },
        ]}
        onAdd={handleAdd}
        addLabel="Add Teacher"
      />

      <DataTable columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTeacher ? 'Edit Teacher' : 'Add New Teacher'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input type="text" required value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <select required value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select</option>
                {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Classes</label>
              <input type="text" value={form.classes} onChange={(e) => setForm({ ...form, classes: e.target.value })} placeholder="e.g. 9,10,11" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
              <input type="text" required value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} placeholder="e.g. Physics, Maths" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editTeacher ? 'Update' : 'Add'} Teacher</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
