import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from 'react-icons/hi';
import ActionBar from '../../components/portal/ActionBar';
import DataTable from '../../components/portal/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@spms.com', role: 'admin', status: 'active', lastLogin: '2026-06-30 09:15 AM' },
  { id: 2, name: 'Dr. Rajesh Kumar', email: 'rajesh@spms.com', role: 'teacher', status: 'active', lastLogin: '2026-06-29 10:30 AM' },
  { id: 3, name: 'Mrs. Sunita Sharma', email: 'sunita@spms.com', role: 'teacher', status: 'active', lastLogin: '2026-06-28 08:45 AM' },
  { id: 4, name: 'Mr. Amit Singh', email: 'amit@spms.com', role: 'teacher', status: 'inactive', lastLogin: '2026-06-15 11:00 AM' },
  { id: 5, name: 'Accountant Office', email: 'accounts@spms.com', role: 'accountant', status: 'active', lastLogin: '2026-06-30 08:00 AM' },
];

const roles = ['admin', 'teacher', 'accountant', 'staff'];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'teacher' });

  const filtered = users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAdd = () => {
    setForm({ name: '', email: '', password: '', role: 'teacher' });
    setModalOpen(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Delete user ${user.name}?`)) setUsers(users.filter((u) => u.id !== user.id));
  };

  const toggleStatus = (user) => {
    setUsers(users.map((u) => u.id === user.id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const changeRole = (user) => {
    const currentIdx = roles.indexOf(user.role);
    const nextRole = roles[(currentIdx + 1) % roles.length];
    if (window.confirm(`Change ${user.name}'s role to "${nextRole}"?`)) {
      setUsers(users.map((u) => u.id === user.id ? { ...u, role: nextRole } : u));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { id: Date.now(), ...form, status: 'active', lastLogin: '-' }]);
    setModalOpen(false);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (val) => <span className="capitalize">{val}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', val === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}>{val}</span>
      ),
    },
    { key: 'lastLogin', label: 'Last Login' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineUsers className="w-7 h-7 text-primary-500" />
          User Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage system users and roles</p>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or email..."
        filters={[
          { key: 'role', value: roleFilter, options: [{ value: '', label: 'All Roles' }, ...roles.map((r) => ({ value: r, label: r.charAt(0).toUpperCase() + r.slice(1) }))], onChange: setRoleFilter },
        ]}
        onAdd={handleAdd}
        addLabel="Add User"
      />

      <DataTable
        columns={columns}
        data={filtered}
        actions={true}
        onDelete={handleDelete}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New User">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {roles.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
