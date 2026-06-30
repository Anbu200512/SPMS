const express = require('express');
const router = express.Router();
const {
  getFees,
  getFee,
  createFee,
  updateFee,
  deleteFee,
  recordPayment,
} = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getFees);
router.get('/:id', protect, getFee);
router.post('/', protect, authorize('admin'), createFee);
router.put('/:id', protect, authorize('admin'), updateFee);
router.delete('/:id', protect, authorize('admin'), deleteFee);
router.post('/:feeId/pay', protect, authorize('admin'), recordPayment);

module.exports = router;
