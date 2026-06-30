import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineBookOpen,
  HiOutlineIdentification,
  HiOutlinePencil,
  HiOutlineSave,
  HiOutlineX,
} from 'react-icons/hi';
import { classNames, formatDate } from '../../utils/helpers';
import PortalLayout from '../../components/portal/PortalLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const teacherData = {
  name: 'Dr. Amit Sharma',
  employeeId: 'TCH-2021-0042',
  qualification: 'Ph.D. in Physics',
  specialization: 'Quantum Mechanics & Electrodynamics',
  experience: '12 years',
  email: 'amit.sharma@sms.edu',
  phone: '+91 98765 43210',
  address: '42, Sunshine Apartments, MG Road, Mumbai - 400001',
  dateOfJoining: '2021-06-01',
  gender: 'Male',
  bloodGroup: 'B+',
  classes: [
    { name: 'Class 10-A', subject: 'Physics' },
    { name: 'Class 12-B', subject: 'Physics' },
    { name: 'Class 11-A', subject: 'Physics' },
    { name: 'Class 9-C', subject: 'Science' },
    { name: 'Class 10-B', subject: 'Physics Lab' },
  ],
};

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...teacherData });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
  };

  const infoItems = [
    { label: 'Employee ID', value: form.employeeId, icon: HiOutlineIdentification },
    { label: 'Qualification', value: form.qualification, icon: HiOutlineAcademicCap },
    { label: 'Specialization', value: form.specialization, icon: HiOutlineBookOpen },
    { label: 'Experience', value: form.experience, icon: HiOutlineBriefcase },
    { label: 'Email', value: form.email, icon: HiOutlineMail },
    { label: 'Phone', value: form.phone, icon: HiOutlinePhone },
    { label: 'Date of Joining', value: formatDate(form.dateOfJoining), icon: HiOutlineBriefcase },
    { label: 'Blood Group', value: form.bloodGroup, icon: HiOutlineUser },
  ];

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
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal information</p>
          </div>
          <Button
            variant={editing ? 'primary' : 'outline'}
            iconLeft={editing ? <HiOutlineSave className="w-4 h-4" /> : <HiOutlinePencil className="w-4 h-4" />}
            onClick={editing ? handleSave : () => setEditing(true)}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-4xl font-heading font-bold shadow-lg mb-4">
                  AS
                </div>
                <h2 className="text-xl font-heading font-bold text-gray-800">{form.name}</h2>
                <p className="text-sm text-primary-600 font-medium mt-1">Physics Teacher</p>
                <Badge variant="success" size="sm" className="mt-2">Active</Badge>
                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Gender</span>
                    <span className="font-medium text-gray-800">{form.gender}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Blood Group</span>
                    <span className="font-medium text-gray-800">{form.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Joined</span>
                    <span className="font-medium text-gray-800">{formatDate(form.dateOfJoining)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-primary-500 flex-shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                      {editing && ['email', 'phone', 'address'].includes(item.label.toLowerCase().replace(/\s+/g, '')) ? (
                        <input
                          type="text"
                          name={item.label.toLowerCase().replace(/\s+/g, '')}
                          value={form[item.label.toLowerCase().replace(/\s+/g, '')] || ''}
                          onChange={handleChange}
                          className="mt-1 w-full text-sm text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Assigned Classes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.classes.map((cls, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all"
                  >
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                      <HiOutlineBookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{cls.name}</p>
                      <p className="text-xs text-gray-500">{cls.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {editing && (
              <div className="flex justify-end gap-3">
                <Button variant="secondary" iconLeft={<HiOutlineX className="w-4 h-4" />} onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" iconLeft={<HiOutlineSave className="w-4 h-4" />} onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </PortalLayout>
  );
};

export default Profile;
