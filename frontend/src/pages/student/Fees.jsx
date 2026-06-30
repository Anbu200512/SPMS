import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCurrencyRupee,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineDocumentDownload,
  HiOutlineArrowRight,
  HiOutlineX,
} from 'react-icons/hi';
import StatCard from '../../components/portal/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { classNames, formatDate, formatCurrency } from '../../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Fees = () => {
  const [payModal, setPayModal] = useState(null);
  const [processing, setProcessing] = useState(false);

  const feeSummary = [
    { label: 'Total Fees', value: formatCurrency(45000), icon: HiOutlineCurrencyRupee, color: 'blue' },
    { label: 'Paid', value: formatCurrency(30000), icon: HiOutlineCheckCircle, color: 'green' },
    { label: 'Due', value: formatCurrency(15000), icon: HiOutlineClock, color: 'red' },
  ];

  const feeBreakdown = [
    { type: 'Tuition Fee', amount: 25000, dueDate: '2026-04-15', status: 'paid', paidDate: '2026-04-10' },
    { type: 'Library Fee', amount: 3000, dueDate: '2026-04-15', status: 'paid', paidDate: '2026-04-10' },
    { type: 'Laboratory Fee', amount: 5000, dueDate: '2026-06-30', status: 'pending', paidDate: null },
    { type: 'Sports Fee', amount: 2000, dueDate: '2026-06-30', status: 'pending', paidDate: null },
    { type: 'Transport Fee', amount: 5000, dueDate: '2026-07-15', status: 'pending', paidDate: null },
    { type: 'Computer Lab Fee', amount: 3000, dueDate: '2026-05-15', status: 'paid', paidDate: '2026-05-12' },
    { type: 'Miscellaneous', amount: 2000, dueDate: '2026-06-30', status: 'partial', paidDate: '2026-06-15' },
  ];

  const paymentHistory = [
    { receiptNo: 'RCPT-2026-001', date: '2026-04-10', amount: 28000, mode: 'Online Transfer', status: 'completed' },
    { receiptNo: 'RCPT-2026-002', date: '2026-05-12', amount: 3000, mode: 'Debit Card', status: 'completed' },
    { receiptNo: 'RCPT-2026-003', date: '2026-06-15', amount: 1000, mode: 'Cash', status: 'completed' },
  ];

  const totalDue = feeBreakdown
    .filter((f) => f.status === 'pending' || f.status === 'partial')
    .reduce((sum, f) => sum + f.amount, 0);

  const handlePayNow = (fee) => {
    setPayModal(fee);
  };

  const processPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPayModal(null);
    }, 2000);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Fee Details</h1>
        <p className="text-gray-500 mb-6">View and manage your fee payments</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {feeSummary.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Fee Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feeBreakdown.map((fee, idx) => {
                  const statusVariant = {
                    paid: 'success',
                    pending: 'warning',
                    partial: 'info',
                  };
                  return (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{fee.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(fee.amount)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(fee.dueDate)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant={statusVariant[fee.status]} size="sm">
                          {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{fee.paidDate ? formatDate(fee.paidDate) : '-'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        {fee.status !== 'paid' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            iconLeft={<HiOutlineCurrencyRupee className="w-4 h-4" />}
                            onClick={() => handlePayNow(fee)}
                          >
                            Pay Now
                          </Button>
                        ) : (
                          <span className="text-sm text-green-600 font-medium flex items-center justify-end gap-1">
                            <HiOutlineCheckCircle className="w-4 h-4" />
                            Paid
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Due Amount</span>
            <span className="text-lg font-bold text-red-600">{formatCurrency(totalDue)}</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HiOutlineCurrencyRupee className="w-5 h-5 text-primary-500" />
            Payment History
          </h2>
          {paymentHistory.length === 0 ? (
            <EmptyState title="No payment history" />
          ) : (
            <div className="space-y-4">
              {paymentHistory.map((payment, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiOutlineCheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">{formatCurrency(payment.amount)}</p>
                      <Badge variant="success" size="sm">Completed</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{payment.receiptNo}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span>{formatDate(payment.date)}</span>
                      <span>·</span>
                      <span>{payment.mode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full" iconLeft={<HiOutlineDocumentDownload className="w-4 h-4" />}>
              Download Receipt
            </Button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {payModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setPayModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md relative z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Pay Fee</h2>
                <button
                  onClick={() => setPayModal(null)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Fee Type</span>
                    <span className="text-sm font-medium text-gray-800">{payModal.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Amount</span>
                    <span className="text-lg font-bold text-primary-600">{formatCurrency(payModal.amount)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Online Transfer', 'Debit Card', 'Credit Card', 'UPI'].map((method) => (
                      <label
                        key={method}
                        className="flex items-center justify-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                      >
                        <input type="radio" name="payment" className="sr-only" />
                        <span className="text-sm font-medium text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1" onClick={() => setPayModal(null)}>Cancel</Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    loading={processing}
                    iconLeft={<HiOutlineArrowRight className="w-4 h-4" />}
                    onClick={processPayment}
                  >
                    Pay {formatCurrency(payModal.amount)}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Fees;
