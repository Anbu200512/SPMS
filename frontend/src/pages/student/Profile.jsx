import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineIdentification,
  HiOutlinePencil,
  HiOutlineX,
  HiOutlineSave,
  HiOutlineHeart,
  HiOutlineUsers,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const student = {
    name: 'Student Name',
    admissionNo: 'STU2024001',
    class: '10',
    section: 'A',
    rollNumber: '12',
    dob: '15 Jan 2010',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '123, Main Street, Cityville, State - 600001',
    email: 'student@school.com',
    phone: '+91 9876543210',
    parentName: 'Parent Name',
    parentRelation: 'Father',
    parentPhone: '+91 9876543211',
    parentEmail: 'parent@email.com',
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditModal(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500">View and manage your personal information</p>
        </div>
        <Button variant="primary" size="md" iconLeft={<HiOutlinePencil className="w-4 h-4" />} onClick={() => setEditModal(true)}>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
          >
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary-600">
                {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-gray-500 text-sm">Class {student.class} - Section {student.section}</p>
            <div className="mt-4 inline-block">
              <Badge variant="info" size="md">{student.admissionNo}</Badge>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <HiOutlineMail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-700">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-700">{student.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HiOutlineUser className="w-5 h-5 text-primary-500" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Full Name</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.name}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Date of Birth</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.dob}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Gender</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.gender}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Blood Group</label>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  <Badge variant="info" size="sm">{student.bloodGroup}</Badge>
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Address</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.address}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HiOutlineIdentification className="w-5 h-5 text-primary-500" />
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Admission No</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.admissionNo}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Class</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.class}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Section</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.section}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Roll Number</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.rollNumber}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HiOutlineUsers className="w-5 h-5 text-primary-500" />
              Parent Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Parent Name</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.parentName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Relationship</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.parentRelation}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Parent Phone</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.parentPhone}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Parent Email</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{student.parentEmail}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => setEditModal(false)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={student.name}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={student.email}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    defaultValue={student.phone}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    defaultValue="2010-01-15"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    defaultValue={student.gender}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    defaultValue={student.bloodGroup}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows={2}
                    defaultValue={student.address}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                  <input
                    type="text"
                    defaultValue={student.parentName}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone</label>
                  <input
                    type="text"
                    defaultValue={student.parentPhone}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
              <Button variant="primary" loading={saving} iconLeft={<HiOutlineSave className="w-4 h-4" />} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
