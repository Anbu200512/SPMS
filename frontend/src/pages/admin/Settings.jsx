import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCog,
  HiOutlineSave,
  HiOutlineAcademicCap,
  HiOutlineCurrencyRupee,
  HiOutlineUsers,
  HiOutlineCalendar,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const initialSettings = {
  schoolName: 'SPMS School',
  address: '123, Education Avenue, Knowledge City, State - 123456',
  phone: '+91 1234567890',
  email: 'info@spmschool.com',
  website: 'www.spmschool.com',
  academicYear: '2026-27',
  sessionStart: '2026-04-01',
  sessionEnd: '2027-03-31',
  tuitionFee: '15000',
  libraryFee: '500',
  sportsFee: '2000',
  labFee: '3000',
  transportFee: '2500',
  lateFeePenalty: '100',
  discountType: 'percentage',
  discountValue: '10',
};

const activeSessions = [
  { id: 1, year: '2026-27', start: '2026-04-01', end: '2027-03-31', active: true },
  { id: 2, year: '2025-26', start: '2025-04-01', end: '2026-03-31', active: false },
];

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: 'general', label: 'General', icon: HiOutlineCog },
    { key: 'academic', label: 'Academic Year', icon: HiOutlineCalendar },
    { key: 'fees', label: 'Fee Structure', icon: HiOutlineCurrencyRupee },
    { key: 'sessions', label: 'Sessions', icon: HiOutlineUsers },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineCog className="w-7 h-7 text-primary-500" />
          School Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">Configure school information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={classNames(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.key ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-semibold text-gray-800">
                {tabs.find((t) => t.key === activeTab)?.label}
              </h3>
              <div className="flex items-center gap-3">
                {saved && <span className="text-sm text-green-600 font-medium">Settings saved!</span>}
                <Button iconLeft={<HiOutlineSave className="w-4 h-4" />} onClick={handleSave}>Save Settings</Button>
              </div>
            </div>

            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                    <input type="text" value={settings.schoolName} onChange={(e) => handleChange('schoolName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea rows={2} value={settings.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" value={settings.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={settings.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="url" value={settings.website} onChange={(e) => handleChange('website', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                    <input type="text" value={settings.academicYear} onChange={(e) => handleChange('academicYear', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Start</label>
                    <input type="date" value={settings.sessionStart} onChange={(e) => handleChange('sessionStart', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session End</label>
                    <input type="date" value={settings.sessionEnd} onChange={(e) => handleChange('sessionEnd', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Fee (Monthly)</label>
                    <input type="number" value={settings.tuitionFee} onChange={(e) => handleChange('tuitionFee', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Library Fee (Annual)</label>
                    <input type="number" value={settings.libraryFee} onChange={(e) => handleChange('libraryFee', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sports Fee (Annual)</label>
                    <input type="number" value={settings.sportsFee} onChange={(e) => handleChange('sportsFee', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lab Fee (Annual)</label>
                    <input type="number" value={settings.labFee} onChange={(e) => handleChange('labFee', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transport Fee (Monthly)</label>
                    <input type="number" value={settings.transportFee} onChange={(e) => handleChange('transportFee', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Late Fee Penalty</label>
                    <input type="number" value={settings.lateFeePenalty} onChange={(e) => handleChange('lateFeePenalty', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                    <select value={settings.discountType} onChange={(e) => handleChange('discountType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                    <input type="number" value={settings.discountValue} onChange={(e) => handleChange('discountValue', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Year</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Start</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">End</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {activeSessions.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{session.year}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{session.start}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{session.end}</td>
                          <td className="px-4 py-3 text-center">
                            {session.active ? (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Inactive</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {!session.active && <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">Activate</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
