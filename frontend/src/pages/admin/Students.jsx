import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUserGroup,
  HiOutlineFilter,
} from 'react-icons/hi';
import ActionBar from '../../components/portal/ActionBar';
import DataTable from '../../components/portal/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { classNames, formatDate } from '../../utils/helpers';

const initialStudents = [
  { id: 1, admissionNo: 'STU-2024-001', name: 'Aarav Sharma', email: 'aarav@example.com', phone: '9876543210', class: '10', section: 'A', parent: 'Rajesh Sharma', parentPhone: '9876543211', dob: '2009-05-15', gender: 'Male', address: '123, Street 1, New Delhi', status: 'active' },
  { id: 2, admissionNo: 'STU-2024-002', name: 'Priya Patel', email: 'priya@example.com', phone: '9876543212', class: '9', section: 'B', parent: 'Amit Patel', parentPhone: '9876543213', dob: '2010-08-20', gender: 'Female', address: '456, Street 2, Mumbai', status: 'active' },
  { id: 3, admissionNo: 'STU-2024-003', name: 'Rohan Verma', email: 'rohan@example.com', phone: '9876543214', class: '11', section: 'C', parent: 'Sunil Verma', parentPhone: '9876543215', dob: '2008-01-10', gender: 'Male', address: '789, Street 3, Bangalore', status: 'inactive' },
];

const classes = ['6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C'];

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', class: '', section: '',
    dob: '', gender: 'Male', address: '', parent: '', parentPhone: '',
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.admissionNo.toLowerCase().includes(search.toLowerCase());
    const matchesClass = !classFilter || s.class === classFilter;
    const matchesSection = !sectionFilter || s.section === sectionFilter;
    return matchesSearch && matchesClass && matchesSection;
  });

  const handleAdd = () => {
    setEditStudent(null);
    setForm({ name: '', email: '', phone: '', class: '', section: '', dob: '', gender: 'Male', address: '', parent: '', parentPhone: '' });
    setModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setForm({ name: student.name, email: student.email, phone: student.phone, class: student.class, section: student.section, dob: student.dob, gender: student.gender, address: student.address, parent: student.parent, parentPhone: student.parentPhone });
    setModalOpen(true);
  };

  const handleDelete = (student) => {
    if (window.confirm(`Delete student ${student.name}?`)) {
      setStudents(students.filter((s) => s.id !== student.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStudent) {
      setStudents(students.map((s) => s.id === editStudent.id ? { ...s, ...form } : s));
    } else {
      setStudents([...students, { id: Date.now(), admissionNo: `STU-2024-${String(students.length + 1).padStart(3, '0')}`, status: 'active', ...form }]);
    }
    setModalOpen(false);
  };

  const columns = [
    { key: 'admissionNo', label: 'Admission No' },
    { key: 'name', label: 'Name' },
    { key: 'class', label: 'Class' },
    { key: 'section', label: 'Section' },
    { key: 'parent', label: 'Parent' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', val === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}>
          {val}
        </span>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineUserGroup className="w-7 h-7 text-primary-500" />
          Student Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage all student records</p>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or admission no..."
        filters={[
          { key: 'class', value: classFilter, options: [{ value: '', label: 'All Classes' }, ...classes.map((c) => ({ value: c, label: `Class ${c}` }))], onChange: setClassFilter },
          { key: 'section', value: sectionFilter, options: [{ value: '', label: 'All Sections' }, ...sections.map((s) => ({ value: s, label: `Section ${s}` }))], onChange: setSectionFilter },
        ]}
        onAdd={handleAdd}
        addLabel="Add Student"
      />

      <DataTable
        columns={columns}
        data={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editStudent ? 'Edit Student' : 'Add New Student'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Class</option>
                {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select required value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Section</option>
                {sections.map((s) => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
              <input type="text" value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone</label>
              <input type="text" value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editStudent ? 'Update' : 'Add'} Student</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
