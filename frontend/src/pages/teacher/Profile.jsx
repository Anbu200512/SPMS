import React, { useState, useEffect } from 'react';
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
  HiOutlineLockClosed,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { classNames, formatDate, getInitials } from '../../utils/helpers';

import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { getTeacherProfile, updateProfile, updatePassword } from '../../services/teacherService';
import { showSuccess, showError } from '../../components/ui/Toast';

const Profile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    getTeacherProfile()
      .then((res) => {
        const t = res.data.data.teacher;
        setTeacher(t);
        setForm({
          email: t.user?.email || '',
          phone: t.user?.phone || '',
          address: t.address || '',
          city: t.city || '',
          state: t.state || '',
          pincode: t.pincode || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load profile');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    }
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone must be 10 digits';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    try {
      const payload = {};
      if (form.email !== teacher.user?.email) payload.email = form.email;
      if (form.phone !== teacher.user?.phone) payload.phone = form.phone;
      if (form.address !== (teacher.address || '')) payload.address = form.address;
      if (form.city !== (teacher.city || '')) payload.city = form.city;
      if (form.state !== (teacher.state || '')) payload.state = form.state;
      if (form.pincode !== (teacher.pincode || '')) payload.pincode = form.pincode;
      if (Object.keys(payload).length > 0) {
        await updateProfile(payload);
        const res = await getTeacherProfile();
        const t = res.data.data.teacher;
        setTeacher(t);
        setForm({
          email: t.user?.email || '',
          phone: t.user?.phone || '',
          address: t.address || '',
          city: t.city || '',
          state: t.state || '',
          pincode: t.pincode || '',
        });
      }
      setEditing(false);
      showSuccess('Profile updated successfully');
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setPasswordSaving(true);
    try {
      await updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess('Password updated successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleCancel = () => {
    const hasUnsavedChanges =
      form.email !== (teacher.user?.email || '') ||
      form.phone !== (teacher.user?.phone || '') ||
      form.address !== (teacher.address || '') ||
      form.city !== (teacher.city || '') ||
      form.state !== (teacher.state || '') ||
      form.pincode !== (teacher.pincode || '');
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Discard them?')) {
      return;
    }
    setEditing(false);
    if (teacher) {
      setForm({
        email: teacher.user?.email || '',
        phone: teacher.user?.phone || '',
        address: teacher.address || '',
        city: teacher.city || '',
        state: teacher.state || '',
        pincode: teacher.pincode || '',
      });
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
    );
  }

  const t = teacher;
  const fullAddress = [t.address, t.city, t.state, t.pincode].filter(Boolean).join(', ');

  const infoItems = [
    { label: 'Employee ID', value: t.employeeId, icon: HiOutlineIdentification },
    { label: 'Qualification', value: t.qualification, icon: HiOutlineAcademicCap },
    { label: 'Specialization', value: t.specialization, icon: HiOutlineBookOpen },
    { label: 'Experience', value: t.experience, icon: HiOutlineBriefcase },
    { label: 'Email', value: t.user?.email, icon: HiOutlineMail },
    { label: 'Phone', value: t.user?.phone, icon: HiOutlinePhone },
    { label: 'Address', value: fullAddress, icon: HiOutlineLocationMarker },
    { label: 'Date of Joining', value: formatDate(t.joiningDate), icon: HiOutlineBriefcase },
    { label: 'Blood Group', value: t.bloodGroup, icon: HiOutlineUser },
  ];

  const classes = t.classes || [];

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal information</p>
          </div>
          <Button
            variant={editing ? 'primary' : 'outline'}
            iconLeft={editing ? <HiOutlineSave className="w-4 h-4" /> : <HiOutlinePencil className="w-4 h-4" />}
            onClick={editing ? handleSave : () => setEditing(true)}
            loading={saving}
            className="self-start sm:self-auto"
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-4xl font-heading font-bold shadow-lg mb-4">
                  {getInitials(t.user?.name)}
                </div>
                <h2 className="text-xl font-heading font-bold text-gray-800">{t.user?.name}</h2>
                <p className="text-sm text-primary-600 font-medium mt-1">{t.specialization || 'Teacher'}</p>
                <Badge variant="success" size="sm" className="mt-2">Active</Badge>
                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Gender</span>
                    <span className="font-medium text-gray-800">{t.gender}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">Blood Group</span>
                    <span className="font-medium text-gray-800">{t.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Joined</span>
                    <span className="font-medium text-gray-800">{formatDate(t.joiningDate)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infoItems.map((item) => {
                  const isEditable = editing && ['email', 'phone', 'address'].includes(
                    item.label.toLowerCase().replace(/\s+/g, '')
                  );
                  return (
                    <div key={item.label} className={`flex items-start gap-3 p-3 rounded-lg bg-gray-50 ${item.label === 'Address' && editing ? 'md:col-span-2' : ''}`}>
                      <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-primary-500 flex-shrink-0 shadow-sm">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                        {isEditable && item.label === 'Address' ? (
                          <div className="mt-1 space-y-2">
                            <input
                              type="text"
                              name="address"
                              value={form.address || ''}
                              onChange={handleChange}
                              placeholder="Street address"
                              className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                name="city"
                                value={form.city || ''}
                                onChange={handleChange}
                                placeholder="City"
                                className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                              <input
                                type="text"
                                name="state"
                                value={form.state || ''}
                                onChange={handleChange}
                                placeholder="State"
                                className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                              <input
                                type="text"
                                name="pincode"
                                value={form.pincode || ''}
                                onChange={handleChange}
                                placeholder="Pincode"
                                className="w-full text-sm text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </div>
                          </div>
                        ) : isEditable ? (
                          <div>
                            <input
                              type="text"
                              name={item.label.toLowerCase().replace(/\s+/g, '')}
                              value={form[item.label.toLowerCase().replace(/\s+/g, '')] || ''}
                              onChange={handleChange}
                              className="mt-1 w-full text-sm text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            {formErrors[item.label.toLowerCase().replace(/\s+/g, '')] && (
                              <p className="text-xs text-red-500 mt-1">{formErrors[item.label.toLowerCase().replace(/\s+/g, '')]}</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-gray-800 mt-0.5 break-words">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Assigned Classes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {classes.length === 0 ? (
                  <p className="text-sm text-gray-400 col-span-2 text-center py-4">No classes assigned.</p>
                ) : (
                  classes.map((cls, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all"
                    >
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                        <HiOutlineBookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{cls.name}</p>
                        {cls.section && <p className="text-xs text-gray-500">Section {cls.section}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-sm text-green-600">{passwordSuccess}</p>
                )}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    iconLeft={<HiOutlineLockClosed className="w-4 h-4" />}
                    loading={passwordSaving}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>

            {editing && (
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  iconLeft={<HiOutlineX className="w-4 h-4" />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  iconLeft={<HiOutlineSave className="w-4 h-4" />}
                  onClick={handleSave}
                  loading={saving}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
  );
};

export default Profile;
