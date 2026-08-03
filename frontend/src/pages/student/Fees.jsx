import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCurrencyRupee,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentDownload,
  HiOutlineRefresh,
} from 'react-icons/hi';
import StatCard from '../../components/portal/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/common/EmptyState';
import { classNames, formatDate, formatCurrency } from '../../utils/helpers';
import { showSuccess, showError, showInfo } from '../../components/ui/Toast';
import { getFees, getMyPayments, createFeeCheckout, getPaymentStatus } from '../../services/studentService';
import { loadRazorpayScript, openRazorpayCheckout } from '../../utils/razorpay';

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

const statusVariant = {
  Paid: 'success',
  Pending: 'warning',
  Partial: 'info',
  Overdue: 'danger',
};

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [payingFeeId, setPayingFeeId] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const [feesRes, paymentsRes] = await Promise.all([
        getFees({ limit: 100 }),
        getMyPayments(),
      ]);
      setFees(feesRes.data?.data?.fees || []);
      setPayments(paymentsRes.data?.data?.payments || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || 'Failed to load fee details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalFees = fees.reduce((sum, f) => sum + (f.amount || 0), 0);
  const totalPaid = fees.reduce((sum, f) => sum + (f.paidAmount || 0), 0);
  const totalDue = totalFees - totalPaid;

  const feeSummary = [
    { label: 'Total Fees', value: formatCurrency(totalFees), icon: HiOutlineCurrencyRupee, color: 'blue' },
    { label: 'Paid', value: formatCurrency(totalPaid), icon: HiOutlineCheckCircle, color: 'green' },
    { label: 'Due', value: formatCurrency(totalDue), icon: HiOutlineClock, color: 'red' },
  ];

  const verifyPayment = (orderId) => {
    let attempts = 0;
    const poll = async () => {
      try {
        const res = await getPaymentStatus(orderId);
        const status = res.data?.data?.payment?.status;
        if (status === 'Success') {
          showSuccess('Payment successful! Your fee has been updated.');
          setPayingFeeId(null);
          await loadData();
          return;
        }
        if (status === 'Failed') {
          showError('Payment failed. Please try again.');
          setPayingFeeId(null);
          return;
        }
      } catch {
        // keep polling
      }
      attempts += 1;
      if (attempts <= 15) {
        setTimeout(poll, 2000);
      } else {
        setPayingFeeId(null);
        showInfo('Payment is being processed. Please check your fee details shortly.');
      }
    };
    poll();
  };

  const handlePayNow = async (fee) => {
    setPayingFeeId(fee._id);
    try {
      const res = await createFeeCheckout(fee._id);
      const { orderId, keyId, amount, currency, paymentMethods } = res.data?.data || {};
      await loadRazorpayScript();
      openRazorpayCheckout({
        key: keyId,
        orderId,
        amount,
        currency,
        description: `${fee.feeType} Fee`,
        prefill: {},
        paymentMethods: paymentMethods || [],
        handler: () => verifyPayment(orderId),
      });
    } catch (err) {
      showError(err?.response?.data?.message || 'Unable to start payment. Please try again.');
      setPayingFeeId(null);
    }
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
    <motion.div variants={container} initial="hidden" animate="show" className="p-4 md:p-6">
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
          {fees.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={<HiOutlineCurrencyRupee className="w-12 h-12" />}
                title="No fees assigned"
                description="No fees have been assigned to you yet."
              />
            </div>
          ) : (
            <>
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
                    {fees.map((fee, idx) => (
                      <motion.tr
                        key={fee._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{fee.feeType}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(fee.amount)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(fee.dueDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant={statusVariant[fee.status] || 'info'} size="sm">
                            {fee.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {fee.paymentDate ? formatDate(fee.paymentDate) : '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          {fee.status !== 'Paid' ? (
                            <Button
                              variant="primary"
                              size="sm"
                              loading={payingFeeId === fee._id}
                              disabled={payingFeeId !== null && payingFeeId !== fee._id}
                              iconLeft={<HiOutlineCurrencyRupee className="w-4 h-4" />}
                              onClick={() => handlePayNow(fee)}
                            >
                              {fee.paidAmount > 0 ? 'Pay Balance' : 'Pay Now'}
                            </Button>
                          ) : (
                            <span className="text-sm text-green-600 font-medium flex items-center justify-end gap-1">
                              <HiOutlineCheckCircle className="w-4 h-4" />
                              Paid
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Due Amount</span>
                <span className="text-lg font-bold text-red-600">{formatCurrency(totalDue)}</span>
              </div>
            </>
          )}
        </motion.div>

        <motion.div variants={item} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HiOutlineCurrencyRupee className="w-5 h-5 text-primary-500" />
            Payment History
          </h2>
          {payments.length === 0 ? (
            <EmptyState title="No payment history" />
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment._id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={classNames(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    payment.status === 'Success' ? 'bg-green-50' : 'bg-gray-50'
                  )}>
                    <HiOutlineCheckCircle className={classNames('w-5 h-5', payment.status === 'Success' ? 'text-green-600' : 'text-gray-400')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">{formatCurrency(payment.amount)}</p>
                      <Badge variant={payment.status === 'Success' ? 'success' : 'warning'} size="sm">
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{payment.fee?.feeType || 'Fee Payment'}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span>{formatDate(payment.createdAt)}</span>
                      <span>·</span>
                      <span>{payment.paymentMode}</span>
                    </div>
                    {payment.transactionId && (
                      <p className="text-xs text-gray-400 mt-0.5">Ref: {payment.transactionId}</p>
                    )}
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
    </motion.div>
  );
};

export default Fees;
