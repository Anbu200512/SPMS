const express = require('express');
const router = express.Router();
const {
  getFees,
  getFee,
  createFee,
  updateFee,
  deleteFee,
  recordPayment,
  createCheckout,
  getPaymentStatus,
  getMyPayments,
  getAllPayments,
  handleWebhook,
} = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/auth');

router.post('/payment/webhook', handleWebhook);
router.get('/payments/mine', protect, getMyPayments);
router.get('/payments', protect, authorize('admin'), getAllPayments);
router.get('/payment/status/:orderId', protect, getPaymentStatus);
router.post('/:feeId/checkout', protect, authorize('student'), createCheckout);
router.post('/:feeId/pay', protect, authorize('admin'), recordPayment);

router.get('/', protect, getFees);
router.get('/:id', protect, getFee);
router.post('/', protect, authorize('admin'), createFee);
router.put('/:id', protect, authorize('admin'), updateFee);
router.delete('/:id', protect, authorize('admin'), deleteFee);

module.exports = router;
