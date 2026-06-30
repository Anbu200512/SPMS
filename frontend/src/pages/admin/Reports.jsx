import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineChartBar,
  HiOutlineDownload,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineClipboardCheck,
  HiOutlineCurrencyRupee,
  HiOutlineAcademicCap,
  HiOutlineUsers,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { classNames } from '../../utils/helpers';

const reportTypes = [
  { key: 'students', label: 'Student List', icon: HiOutlineUserGroup, color: 'bg-blue-50 text-blue-600' },
  { key: 'attendance', label: 'Attendance Report', icon: HiOutlineClipboardCheck, color: 'bg-green-50 text-green-600' },
  { key: 'fees', label: 'Fee Collection Report', icon: HiOutlineCurrencyRupee, color: 'bg-amber-50 text-amber-600' },
  { key: 'results', label: 'Results Report', icon: HiOutlineAcademicCap, color: 'bg-purple-50 text-purple-600' },
  { key: 'teachers', label: 'Teacher List', icon: HiOutlineUsers, color: 'bg-pink-50 text-pink-600' },
];

const classes = ['6', '7', '8', '9', '10', '11', '12'];

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [generating, setGenerating] = useState(null);

  const handleGenerate = (reportKey) => {
    setGenerating(reportKey);
    setTimeout(() => setGenerating(null), 1500);
  };

  const reportIcons = {
    students: HiOutlineUserGroup,
    attendance: HiOutlineClipboardCheck,
    fees: HiOutlineCurrencyRupee,
    results: HiOutlineAcademicCap,
    teachers: HiOutlineUsers,
  };

  const getReportIcon = (key) => reportIcons[key] || HiOutlineDocumentText;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineChartBar className="w-7 h-7 text-primary-500" />
          Reports
        </h1>
        <p className="text-gray-500 text-sm mt-1">Generate and export reports</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Filters</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">From Date</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To Date</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Classes</option>
              {classes.map((c) => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          const isLoading = generating === report.key;
          return (
            <motion.div
              key={report.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={classNames('w-12 h-12 rounded-xl flex items-center justify-center', report.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-semibold text-gray-800">{report.label}</h3>
                  <p className="text-xs text-gray-400">Generate {report.label.toLowerCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  loading={isLoading}
                  iconLeft={<HiOutlineDocumentText className="w-4 h-4" />}
                  onClick={() => handleGenerate(report.key)}
                >
                  Generate
                </Button>
                <Button size="sm" variant="outline" iconLeft={<HiOutlineDownload className="w-4 h-4" />}>
                  CSV
                </Button>
                <Button size="sm" variant="outline" iconLeft={<HiOutlineDownload className="w-4 h-4" />}>
                  PDF
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
