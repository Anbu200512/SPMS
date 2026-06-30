const express = require('express');
const router = express.Router();
const {
  getExamSchedules,
  getExamSchedule,
  createExamSchedule,
  updateExamSchedule,
  deleteExamSchedule,
} = require('../controllers/examScheduleController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getExamSchedules);
router.get('/:id', protect, getExamSchedule);
router.post('/', protect, authorize('admin'), createExamSchedule);
router.put('/:id', protect, authorize('admin'), updateExamSchedule);
router.delete('/:id', protect, authorize('admin'), deleteExamSchedule);

module.exports = router;
