import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCurrencyRupee,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlinePlus,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { classNames, formatCurrency } from '../../utils/helpers';

const classes = ['6', '7', '8', '9', '10', '11', '12'];

const feeStructure = [
  { id: 1, name: 'Tuition Fee', amount: 15000, frequency: 'Monthly', class: 'all' },
  { id: 2, name: 'Library Fee', amount: 500, frequency: 'Annual', class: 'all' },
  { id: 3, name: 'Sports Fee', amount: 2000, frequency: 'Annual', class: 'all' },
  { id: 4, name: 'Lab Fee', amount: 3000, frequency: 'Annual', class: '9-12' },
  { id: 5, name: 'Transport Fee', amount: 2500, frequency: 'Monthly', class: 'all' },
];

const studentFees = [
  { id: 1, name: 'Aarav Sharma', class: '10', section: 'A', totalFee: 23000, paid: 18000, due: 5000, status: 'partial', lastPayment: '2026-06-15' },
  { id: 2, name: 'Priya Patel', class: '9', section: 'B', totalFee: 23000, paid: 23000, due: 0, status: 'paid', lastPayment: '2026-06-10' },
  { id: 3, name: 'Rohan Verma', class: '11', section: 'C', totalFee: 26000, paid: 10000, due: 16000, status: 'partial', lastPayment: '2026-05-20' },
  { id: 4, name: 'Sneha Gupta', class: '8', section: 'A', totalFee: 20000, paid: 0, due: 20000, status: 'unpaid', lastPayment: '-' },
];

const paymentHistory = [
  { id: 1, student: 'Aarav Sharma', amount: 5000, date: '2026-06-15', mode: 'Cash', receipt: 'RCP-001' },
  { id: 2, student: 'Priya Patel', amount: 23000, date: '2026-06-10', mode: 'Online', receipt: 'RCP-002' },
  { id: 3, student: 'Rohan Verma', amount: 5000, date: '2026-05-20', mode: 'Cheque', receipt: 'RCP-003' },
];

export default function Fees() {
  const [activeTab, setActiveTab] = useState('structure');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [collectModal, setCollectModal] = useState(false);
  const [collectForm, setCollectForm] = useState({ student: '', amount: '', mode: 'Cash', date: new Date().toISOString().split('T')[0] });

  const tabs = [
    { key: 'structure', label: 'Fee Structure' },
    { key: 'records', label: 'Student Records' },
    { key: 'collect', label: 'Collect Fee' },
    { key: 'history', label: 'Payment History' },
    { key: 'dues', label: 'Due Report' },
  ];

  const totalCollected = paymentHistory.reduce((a, p) => a + p.amount, 0);
  const totalDue = studentFees.reduce((a, s) => a + s.due, 0);

  const handleCollectFee = (e) => {
    e.preventDefault();
    setCollectModal(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
          <HiOutlineCurrencyRupee className="w-7 h-7 text-primary-500" />
          Fee Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage fees, collections, and dues</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-green-600 font-medium">Total Collected</p>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(totalCollected)}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm text-red-600 font-medium">Total Due</p>
          <p className="text-2xl font-bold text-red-700">{formatCurrency(totalDue)}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-600 font-medium">Collection Rate</p>
          <p className="text-2xl font-bold text-blue-700">{totalDue === 0 ? 100 : Math.round((totalCollected / (totalCollected + totalDue)) * 100)}%</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">&nbsp;</label>
          <Button variant="outline" iconLeft={<HiOutlineDownload className="w-4 h-4" />}>Export</Button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={classNames('px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors', activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700')}>{tab.label}</button>
        ))}
      </div>

      {activeTab === 'structure' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Fee Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Applicable Classes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feeStructure.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{fee.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(fee.amount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{fee.frequency}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{fee.class === 'all' ? 'All Classes' : fee.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Fee</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Paid</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {studentFees.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{s.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{s.class}-{s.section}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(s.totalFee)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(s.paid)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-red-600">{formatCurrency(s.due)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={classNames('px-2 py-0.5 text-xs font-medium rounded-full', s.status === 'paid' && 'bg-green-100 text-green-700', s.status === 'partial' && 'bg-yellow-100 text-yellow-700', s.status === 'unpaid' && 'bg-red-100 text-red-700')}>{s.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setCollectForm({ student: s.name, amount: String(s.due), mode: 'Cash', date: new Date().toISOString().split('T')[0] }); setCollectModal(true); }} className="text-xs text-primary-600 hover:text-primary-700 font-medium">Collect</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'collect' && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-4">Click on a student record above to collect fee, or use the quick collect button below.</p>
          <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={() => { setCollectForm({ student: '', amount: '', mode: 'Cash', date: new Date().toISOString().split('T')[0] }); setCollectModal(true); }}>New Collection</Button>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Receipt</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentHistory.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{p.receipt}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{p.student}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{formatCurrency(p.amount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{p.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{p.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'dues' && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Due Fee Report</h3>
          <div className="space-y-3">
            {studentFees.filter((s) => s.due > 0).map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.class}-{s.section}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">{formatCurrency(s.due)}</p>
                  <p className="text-xs text-gray-400">Due amount</p>
                </div>
              </div>
            ))}
            {studentFees.filter((s) => s.due > 0).length === 0 && <p className="text-sm text-gray-500">No dues pending.</p>}
          </div>
        </div>
      )}

      <Modal isOpen={collectModal} onClose={() => setCollectModal(false)} title="Collect Fee">
        <form onSubmit={handleCollectFee} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <input type="text" required value={collectForm.student} onChange={(e) => setCollectForm({ ...collectForm, student: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input type="number" required value={collectForm.amount} onChange={(e) => setCollectForm({ ...collectForm, amount: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <select value={collectForm.mode} onChange={(e) => setCollectForm({ ...collectForm, mode: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">Demand Draft</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" required value={collectForm.date} onChange={(e) => setCollectForm({ ...collectForm, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setCollectModal(false)}>Cancel</Button>
            <Button type="submit">Record Payment</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
