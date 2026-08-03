import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCurrencyRupee,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlinePlus,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineRefresh,
} from 'react-icons/hi';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/common/EmptyState';
import { classNames, formatCurrency, formatDate } from '../../utils/helpers';
import { showSuccess, showError } from '../../components/ui/Toast';
import { getAll, create, update, remove, getAllPayments, recordFeePayment } from '../../services/dataService';

const feeStructure = [
  { id: 1, name: 'Tuition Fee', amount: 15000, frequency: 'Monthly', class: 'all' },
  { id: 2, name: 'Library Fee', amount: 500, frequency: 'Annual', class: 'all' },
  { id: 3, name: 'Sports Fee', amount: 2000, frequency: 'Annual', class: 'all' },
  { id: 4, name: 'Lab Fee', amount: 3000, frequency: 'Annual', class: '9-12' },
  { id: 5, name: 'Transport Fee', amount: 2500, frequency: 'Monthly', class: 'all' },
];

const feeTypes = ['Tuition', 'Transport', 'Library', 'Sports', 'Other'];
const paymentModes = ['Cash', 'Card', 'Online', 'Cheque', 'DD'];

const statusVariant = {
  Paid: 'success',
  Pending: 'warning',
  Partial: 'info',
  Overdue: 'danger',
};

const toDateInput = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const studentName = (ref) => ref?.user?.name || ref?.name || '—';
const studentLabel = (s) =>
  s?.user?.name
    ? `${s.user.name}${s.class?.name ? ` (${s.class.name}` : ''}${s.section?.name ? ` - ${s.section.name}` : ''}${s.class?.name ? ')' : ''}`
    : '—';

const pendingAmount = (fee) => Math.max((fee?.amount || 0) - (fee?.paidAmount || 0), 0);

export default function Fees() {
  const [activeTab, setActiveTab] = useState('records');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [search, setSearch] = useState('');

  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [feeModal, setFeeModal] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [feeSaving, setFeeSaving] = useState(false);
  const [feeForm, setFeeForm] = useState({
    student: '', feeType: 'Tuition', amount: '', dueDate: '', academicYear: '',
  });

  const [collectModal, setCollectModal] = useState(false);
  const [collectSaving, setCollectSaving] = useState(false);
  const [collectForm, setCollectForm] = useState({
    student: '', feeId: '', amount: '', paymentMode: 'Cash', date: toDateInput(new Date()), receiptNo: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [feesRes, studentsRes, paymentsRes] = await Promise.all([
        getAll('fees', { limit: 200 }),
        getAll('students', { limit: 500 }),
        getAllPayments({ limit: 200 }),
      ]);
      setFees(feesRes.data?.data?.fees || []);
      setStudents(studentsRes.data?.data?.students || []);
      setPayments(paymentsRes.data?.data?.payments || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || 'Failed to load fee data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalCollected = payments
    .filter((p) => p.status === 'Success')
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalDue = fees.reduce((sum, f) => sum + pendingAmount(f), 0);
  const collectionRate =
    totalCollected + totalDue === 0 ? 0 : Math.round((totalCollected / (totalCollected + totalDue)) * 100);

  const tabs = [
    { key: 'structure', label: 'Fee Structure' },
    { key: 'records', label: 'Student Records' },
    { key: 'collect', label: 'Collect Fee' },
    { key: 'history', label: 'Payment History' },
    { key: 'dues', label: 'Due Report' },
  ];

  const filteredFees = fees.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      studentName(f.student).toLowerCase().includes(q) ||
      (f.feeType || '').toLowerCase().includes(q) ||
      (f.class?.name || '').toLowerCase().includes(q)
    );
  });

  const filteredPayments = payments.filter((p) => {
    if (!dateFrom && !dateTo) return true;
    const d = new Date(p.paymentDate || p.createdAt);
    if (dateFrom && d < new Date(dateFrom)) return false;
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      if (d > end) return false;
    }
    return true;
  });

  const dueRows = [];
  const dueMap = new Map();
  fees
    .filter((f) => pendingAmount(f) > 0)
    .forEach((f) => {
      const id = f.student?._id || 'unknown';
      if (!dueMap.has(id)) {
        const row = { student: f.student, due: 0 };
        dueMap.set(id, row);
        dueRows.push(row);
      }
      dueMap.get(id).due += pendingAmount(f);
    });
  dueRows.sort((a, b) => b.due - a.due);

  const availableCollectFees = fees.filter(
    (f) => pendingAmount(f) > 0 && (!collectForm.student || f.student?._id === collectForm.student)
  );

  const openAddFee = () => {
    setEditingFee(null);
    setFeeForm({ student: '', feeType: 'Tuition', amount: '', dueDate: '', academicYear: '' });
    setFeeModal(true);
  };

  const openEditFee = (fee) => {
    setEditingFee(fee);
    setFeeForm({
      student: fee.student?._id || '',
      feeType: fee.feeType || 'Tuition',
      amount: String(fee.amount || ''),
      dueDate: toDateInput(fee.dueDate),
      academicYear: fee.academicYear || '',
    });
    setFeeModal(true);
  };

  const openCollect = (fee) => {
    setCollectForm({
      student: fee.student?._id || '',
      feeId: fee._id,
      amount: String(pendingAmount(fee)),
      paymentMode: 'Cash',
      date: toDateInput(new Date()),
      receiptNo: '',
    });
    setCollectModal(true);
  };

  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    if (!feeForm.student) return showError('Please select a student');
    if (!feeForm.amount || Number(feeForm.amount) <= 0) return showError('Please enter a valid fee amount');
    setFeeSaving(true);
    try {
      const payload = {
        student: feeForm.student,
        feeType: feeForm.feeType,
        amount: Number(feeForm.amount),
        dueDate: new Date(feeForm.dueDate).toISOString(),
        academicYear: feeForm.academicYear || undefined,
      };
      if (editingFee) {
        delete payload.student;
        await update('fees', editingFee._id, payload);
        showSuccess('Fee balance updated successfully');
      } else {
        await create('fees', payload);
        showSuccess('Fee assigned to student successfully');
      }
      setFeeModal(false);
      await loadData();
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to save fee');
    } finally {
      setFeeSaving(false);
    }
  };

  const handleCollectSubmit = async (e) => {
    e.preventDefault();
    if (!collectForm.feeId) return showError('Please select a fee');
    if (!collectForm.amount || Number(collectForm.amount) <= 0) return showError('Please enter a valid amount');
    setCollectSaving(true);
    try {
      await recordFeePayment(collectForm.feeId, {
        amount: Number(collectForm.amount),
        paymentMode: collectForm.paymentMode,
        receiptNo: collectForm.receiptNo || undefined,
        paymentDate: collectForm.date ? new Date(collectForm.date).toISOString() : undefined,
      });
      showSuccess('Payment recorded successfully');
      setCollectModal(false);
      await loadData();
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to record payment');
    } finally {
      setCollectSaving(false);
    }
  };

  const handleDelete = async (fee) => {
    if (!window.confirm(`Delete the ${fee.feeType || ''} fee for ${studentName(fee.student)}?`)) return;
    try {
      await remove('fees', fee._id);
      showSuccess('Fee deleted successfully');
      await loadData();
    } catch (err) {
      showError(err?.response?.data?.message || 'Failed to delete fee');
    }
  };

  const handleCollectStudentChange = (studentId) => {
    const updated = { ...collectForm, student: studentId, feeId: '' };
    setCollectForm(updated);
  };

  const handleCollectFeeChange = (feeId) => {
    const fee = fees.find((f) => f._id === feeId);
    setCollectForm({
      ...collectForm,
      feeId,
      amount: fee ? String(pendingAmount(fee)) : '',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <HiOutlineRefresh className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-gray-600 mb-4">{loadError}</p>
        <Button onClick={loadData}>Retry</Button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center gap-3">
            <HiOutlineCurrencyRupee className="w-7 h-7 text-primary-500" />
            Fee Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Set fee balances per student and track online & offline collections</p>
        </div>
        <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={openAddFee}>
          Assign Fee
        </Button>
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
          <p className="text-2xl font-bold text-blue-700">{collectionRate}%</p>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        {activeTab === 'records' && (
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <div className="relative">
              <HiOutlineSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student, fee type or class..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <>
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
          </>
        )}
        <div className="ml-auto">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={classNames('px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors', activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700')}>{tab.label}</button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'structure' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-heading font-semibold text-gray-800">Fee Structure (Reference)</h3>
            <p className="text-sm text-gray-500 mt-1">Reference amounts. Assign a fee balance to each student under Student Records.</p>
          </div>
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
          {filteredFees.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={<HiOutlineCurrencyRupee className="w-12 h-12" />}
                title="No fees assigned"
                description="Assign a fee balance to a student using the Assign Fee button."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Class</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Fee Type</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Paid</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Due</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredFees.map((fee) => (
                    <tr key={fee._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{studentName(fee.student)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{fee.class?.name || fee.student?.class?.name || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{fee.feeType}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{formatCurrency(fee.amount)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{formatCurrency(fee.paidAmount)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-red-600 text-right">{formatCurrency(pendingAmount(fee))}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={statusVariant[fee.status] || 'default'} size="sm">{fee.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatDate(fee.dueDate)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditFee(fee)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors" title="Edit balance">
                            <HiOutlinePencilAlt className="w-4 h-4" />
                          </button>
                          <button onClick={() => openCollect(fee)} className="px-3 py-1.5 text-xs text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors" disabled={pendingAmount(fee) === 0}>
                            Collect
                          </button>
                          <button onClick={() => handleDelete(fee)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete fee">
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'collect' && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-gray-800">Collect Fee</h3>
              <p className="text-sm text-gray-500 mt-1">Record an offline payment against a pending fee balance.</p>
            </div>
            <Button iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={() => openCollect(null)}>New Collection</Button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Student</label>
            <select value={collectForm.student} onChange={(e) => handleCollectStudentChange(e.target.value)} className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Students</option>
              {students.map((s) => <option key={s._id} value={s._id}>{studentLabel(s)}</option>)}
            </select>
          </div>
          {availableCollectFees.length === 0 ? (
            <EmptyState title="No pending fees" description="No fee balances are pending collection." />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Fee Type</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Due</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {availableCollectFees.map((fee) => (
                    <tr key={fee._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{studentName(fee.student)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{fee.feeType}</td>
                      <td className="px-6 py-4 text-sm font-medium text-red-600 text-right">{formatCurrency(pendingAmount(fee))}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm" iconLeft={<HiOutlineCurrencyRupee className="w-4 h-4" />} onClick={() => openCollect(fee)}>Collect</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {filteredPayments.length === 0 ? (
            <div className="py-12">
              <EmptyState title="No payments recorded" description="Online (Razorpay) and offline payments will appear here." />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Receipt</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Fee Type</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Mode</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPayments.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{p.receiptNo || p.transactionId || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{studentName(p.student)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.fee?.feeType || 'Fee Payment'}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 text-right">{formatCurrency(p.amount)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatDate(p.paymentDate || p.createdAt)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.paymentMode}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={p.status === 'Success' ? 'success' : p.status === 'Failed' ? 'danger' : 'warning'} size="sm">{p.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'dues' && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Due Fee Report</h3>
          {dueRows.length === 0 ? (
            <EmptyState title="No dues pending" description="All assigned fee balances have been cleared." />
          ) : (
            <div className="space-y-3">
              {dueRows.map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{studentName(row.student)}</p>
                    <p className="text-xs text-gray-500">{row.student?.class?.name || '—'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{formatCurrency(row.due)}</p>
                    <p className="text-xs text-gray-400">Due amount</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal isOpen={feeModal} onClose={() => setFeeModal(false)} title={editingFee ? 'Edit Fee Balance' : 'Assign Fee to Student'} size="md">
        <form onSubmit={handleFeeSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            {editingFee ? (
              <input type="text" disabled value={studentName(editingFee.student)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500" />
            ) : (
              <select required value={feeForm.student} onChange={(e) => setFeeForm({ ...feeForm, student: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select Student</option>
                {students.map((s) => <option key={s._id} value={s._id}>{studentLabel(s)}</option>)}
              </select>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
              <select required value={feeForm.feeType} onChange={(e) => setFeeForm({ ...feeForm, feeType: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {feeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Balance)</label>
              <input type="number" min="1" required value={feeForm.amount} onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })} placeholder="e.g. 15000" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input type="date" required value={feeForm.dueDate} onChange={(e) => setFeeForm({ ...feeForm, dueDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
              <input type="text" value={feeForm.academicYear} onChange={(e) => setFeeForm({ ...feeForm, academicYear: e.target.value })} placeholder="e.g. 2026-27" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setFeeModal(false)}>Cancel</Button>
            <Button type="submit" loading={feeSaving}>{editingFee ? 'Update Balance' : 'Assign Fee'}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={collectModal} onClose={() => setCollectModal(false)} title="Collect Fee" size="md">
        <form onSubmit={handleCollectSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <select value={collectForm.student} onChange={(e) => handleCollectStudentChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Select Student</option>
              {students.map((s) => <option key={s._id} value={s._id}>{studentLabel(s)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
            <select required value={collectForm.feeId} onChange={(e) => handleCollectFeeChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Select Fee</option>
              {availableCollectFees.map((f) => (
                <option key={f._id} value={f._id}>{f.feeType} — {formatCurrency(pendingAmount(f))} due</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input type="number" min="1" required value={collectForm.amount} onChange={(e) => setCollectForm({ ...collectForm, amount: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <select value={collectForm.paymentMode} onChange={(e) => setCollectForm({ ...collectForm, paymentMode: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                {paymentModes.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={collectForm.date} onChange={(e) => setCollectForm({ ...collectForm, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receipt No (optional)</label>
              <input type="text" value={collectForm.receiptNo} onChange={(e) => setCollectForm({ ...collectForm, receiptNo: e.target.value })} placeholder="Auto-generated if empty" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setCollectModal(false)}>Cancel</Button>
            <Button type="submit" loading={collectSaving}>Record Payment</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
