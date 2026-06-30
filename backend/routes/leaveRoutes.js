const express = require('express');
const router = express.Router();
const {
  getLeaves,
  getLeave,
  createLeave,
  updateLeave,
  deleteLeave,
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getLeaves);
router.get('/:id', protect, getLeave);
router.post('/', protect, createLeave);
router.put('/:id', protect, authorize('admin', 'teacher'), updateLeave);
router.delete('/:id', protect, authorize('admin'), deleteLeave);

module.exports = router;
